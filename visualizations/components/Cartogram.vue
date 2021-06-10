<template>
  <div ref="container" class="visualization-container">
    <svg :width="sizes.width" :height="sizes.height" class="cartogram">
      <g :transform="`translate(${-margins.left / 4}, ${transformTop})`">
        <g v-for="(element, e) in ParsedData" :key="e" :class="element.name">
          <rect
            :x="element.x"
            :y="element.y"
            width="19"
            height="19"
            :fill="element.fill"
            @mouseenter="toggleCountryLabel(element)"
          />
        </g>
        <CartogramLabel v-if="isEmpty === false" :current-label="activeCountry" />
      </g>
      <CartogramLegend :transform="transformLegend" />
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
import CartogramLabel from './accessories/CartogramLabel.vue'

export default {
  name: 'Cartogram',
  components: {
    CartogramLegend,
    CartogramLabel
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
      margins: { top: 0, left: 0, right: 0, bottom: 0 },
      transformTop: 0,
      transformLegend: null,
      activeCountry: {},
      isEmpty: true,
      // Change names to change what is highlighted in steps
      activeSubRegions: [
        ['Western Asia'], // 1
        ['Middle Africa'], // 2
        ['Eastern Africa', 'Egypt', 'Sudan'], // 3
        ['Bolivia', 'Colombia'] // 4
      ]
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
          fill: this.changeFillColor(this.step, d),
          score: d.score,
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
    toggleCountryLabel (country) {
      const { activeSubRegions, step } = this
      const statusArrayLength = activeSubRegions.length
      if (step > statusArrayLength) {
        this.activeCountry = country
        this.isEmpty = false
      } else {
        this.isEmpty = true
        this.activeCountry = {}
      }
    },
    // Step logic for fill color
    changeFillColor (step, d) {
      const { activeSubRegions, colorScale } = this
      const invalid = d.score === -9999 || d.score === null
      const statusArrayLength = activeSubRegions.length
      const currentArrayInMatrix = activeSubRegions[step - 1]

      if (step === 0 && !invalid) {
        return colorScale(d.score)
      } else if (step > 0 && step <= statusArrayLength) {
        const isSubRegion = currentArrayInMatrix.includes(d.subRegion)
        const isCountry = currentArrayInMatrix.includes(d.name)
        return (isSubRegion || isCountry) && !invalid
          ? colorScale(d.score)
          : '#eee'
      } else if (step > statusArrayLength && !invalid) {
        return colorScale(d.score)
      } else {
        return '#eee'
      }
    },
    calcSvgSizes () {
      const { margins, sizes } = this
      const container = this.$refs.container
      const height = container.clientHeight
      const width = container.clientWidth

      this.sizes.height = height
      this.sizes.width = width

      this.margins.top = width > 900 ? height / 12 : height / 6
      this.margins.bottom = width > 900 ? height / 10 : height / 6
      this.margins.left = width > 900 ? width / 5 : width / 12
      this.margins.right = width > 900 ? width / 6 : width / 12

      this.transformTop = width > 900 ? -90 : 60
      this.transformLegend = width > 900
        ? `translate(30,${sizes.height - margins.bottom})`
        : `translate(${margins.left},${sizes.height - margins.bottom / 1.5})`
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
      transition: fill 0.5s;
    }
  }
}

</style>
