<template>
  <div ref="container" class="visualization-container">
    <svg :width="sizes.width" :height="sizes.height" class="cartogram">
      <rect
        :width="sizes.width"
        :height="sizes.height"
        fill="white"
        @mouseenter="toggleCountryLabel({})"
      />
      <g :transform="`translate(${-margins.left / 4}, ${transformTop})`">
        <g v-for="(element, e) in ParsedData" :key="e" :class="element.name">
          <rect
            :x="element.x"
            :y="element.y"
            :width="cube"
            :height="cube"
            :fill="element.fill"
            @mouseenter="toggleCountryLabel(element)"
          />
        </g>
        <g
          v-for="(element, e) in ParsedData"
          :key="`${e}-labels`"
          class="label-group"
          :class="{toggled: element === activeCountry}"
        >
          <CartogramLabel :current-label="element" />
        </g>
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
import countries from 'i18n-iso-countries'
import CartogramLegend from './accessories/CartogramLegend.vue'
import CartogramLabel from './accessories/CartogramLabel.vue'

countries.registerLocale(require('i18n-iso-countries/langs/de.json'))

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
      cube: 19,
      transformTop: 0,
      transformLegend: null,
      activeCountry: {},
      isEmpty: true
    }
  },
  computed: {
    ...mapState({ step: 'globalStep', activeSubRegions: 'activeSubRegions' }),
    ParsedData () {
      return this.waterStress.map((d) => {
        return {
          name: d.name,
          x: this.xScale(d.x),
          y: this.xScale(d.y),
          fill: this.changeFillColor(this.step, d),
          score: d.score,
          iso_a3: d.iso_a3,
          label: countries.getName(d.iso_a3, 'de')
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
        .range([rgb('#784210'), rgb('#ffe7cf'), rgb('#8db3d8')])
    }
  },
  mounted () {
    this.calcSvgSizes()
  },
  methods: {
    toggleCountryLabel (country) {
      this.activeCountry = country
      this.isEmpty = false
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

      this.margins.top = width > 900 ? height / 10 : height / 6
      this.margins.bottom = width > 900 ? height / 10 : height / 6
      this.margins.left = width > 900 ? width / 5 : width / 12
      this.margins.right = width > 900 ? width / 6 : width / 12

      this.cube = width < 624 ? 16 : 19
      this.cube = width > 900 ? 22 : 19

      this.transformTop = width > 900 ? -100 : 50
      this.transformLegend = width > 900
        ? `translate(30,${sizes.height - margins.bottom})`
        : `translate(${margins.left / 2},${sizes.height - margins.bottom / 2.5})`
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
      stroke: #eee;
      transition: fill 0.5s;
    }
  }
  g.label-group {
    opacity: 0;
    cursor: default;
    transition: opacity 0.5s;
  }

  g.toggled {
    opacity: 1;
    transition: opacity 0.5s;
  }
}

</style>
