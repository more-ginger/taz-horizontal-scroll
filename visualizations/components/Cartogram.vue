<template>
  <div ref="container" class="visualization-container">
    <svg :width="sizes.width" :height="sizes.height" class="cartogram">
      <!-- <text x="10" y="10">{{ currentname }}</text> -->
      <g :transform="`translate(${-margins.left / 4}, 60)`">
        <g v-for="(element, e) in ParsedData" :key="e" :class="element.name">
          <rect
            :x="element.x"
            :y="element.y"
            width="19"
            height="19"
            :fill="element.fill"
          />
        </g>
      </g>
      <CartogramLegend :transform="`translate(${margins.left},${sizes.height - margins.bottom / 1.5})`" />
    </svg>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { scaleLinear, scaleDiverging } from 'd3-scale'
import { extent } from 'd3-array'
import { rgb } from 'd3-color'
import { interpolateRgb } from 'd3-interpolate'
import CartogramLegend from './accessories/CartogramLegend.vue'

export default {
  name: 'Cartogram',
  components: {
    CartogramLegend
  },
  props: {
    waterStress: {
      type: Array,
      default () { return [] }
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sizes: { width: 0, height: 0 },
      margins: { top: 0, left: 0, right: 0, bottom: 0 }
    }
  },
  computed: {
    ...mapState({ step: 'globalStep' }),
    ParsedData () {
      return this.waterStress.map((d) => {
        return {
          name: d.name,
          x: this.xScale(d.x),
          y: this.xScale(d.y),
          fill: d.score === -9999 || d.score === null ? 'white' : this.colorScale(d.score),
          iso_a3: d.iso_a3
        }
      }).filter(function (el) {
        return el.name !== undefined
      })
    },
    xScale () {
      return scaleLinear()
        .domain(extent(this.waterStress.map(d => d.x)))
        .range([this.margins.left, this.sizes.width - this.margins.right])
    },
    yScale () {
      return scaleLinear()
        .domain(extent(this.waterStress.map(d => d.y)))
        .range([this.margins.top, this.sizes.height - this.margins.bottom])
    },
    colorScale () {
      return scaleDiverging().domain([5, 2.5, 1])
        .interpolator(interpolateRgb)
        .range([rgb('#784210'), rgb('#ffe7cf'), rgb('#41929f')])
    }
  },
  mounted () {
    this.calcSvgSizes()
  },
  methods: {
    calcSvgSizes () {
      const container = this.$refs.container
      const height = container.clientHeight
      const width = container.clientWidth
      this.sizes.height = height
      this.sizes.width = width
      this.margins.top = width > 900 ? height / 10 : height / 6
      this.margins.bottom = width > 900 ? height / 10 : height / 6
      this.margins.left = width > 900 ? width / 6 : width / 12
      this.margins.right = width > 900 ? width / 6 : width / 12
    }
  }
}
</script>

<style lang="scss" scoped>
.visualization-container {
  height: 100vh;
  svg {
    rect {
      fill: ghostwhite default;
      stroke-width: 0.2;
      stroke: black;
    }
  }
}

</style>
