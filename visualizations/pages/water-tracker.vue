<template>
  <div class="visualization-outer">
    <div class="visualization-container">
      <div class="labels">
        <div class="column-1">
          Access to clean water (%)
        </div>
        <div class="column-2">
          Country
        </div>
        <div class="column-3">
          Access to basic water services (%)
        </div>
      </div>
      <div v-for="(country, c) in groupedByCountry" :key="c" class="inner-container">
        <svg>
          <g v-for="(access, a) in country" :key="a" transform="translate(-30,0)">
            <rect
              rx="2"
              width="5"
              :height="access.y"
              :x="access.x"
              :y="PopulationChartSizes.height - 5 - access.y"
              :fill="colorScale(access.y)"
            />
          </g>
          <!-- <path :d="countriesLinecharts[c].line" stroke="black" fill="gray"/> -->
        </svg>
        <!-- IL NUMERO DELLA POPOLAZIONE VA CAMBIATOOOOO NON TI SCORDARE. -->
        <div class="country">
          <p>{{ c }} <span>{{ countriesLinecharts[c].population }}</span></p>
        </div>
        <svg ref="population_chart" class="population">
          <g v-for="(access, a) in country" :key="a">
            <circle
              :cx="access.x"
              cy="32"
              :r="access.size"
              fill-opacity="0.5"
              stroke="gray"
              fill="lightblue"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { groupBy, uniq } from 'lodash'
import { scaleLinear } from 'd3-scale'
import { extent, min, max } from 'd3-array'
import { area } from 'd3-shape'
import { rgb } from 'd3-color'
import { interpolateRgb } from 'd3-interpolate'

export default {
  name: 'WaterTracker',
  async asyncData ({ $content, params }) {
    const WaterAccess = await $content(params.slug || 'data', 'noHICs_reduced').fetch()
    return { WaterAccess }
  },
  data () {
    return {
      margins: { left: 40, right: 40, top: 20, bottom: 20 },
      PopulationChartSizes: { width: 100, height: 50 }
    }
  },
  computed: {
    sizeScale () {
      const scaleDomain = extent(
        this.WaterAccess.body.map(
          d => d['People not using safely managed drinking water services (% of population)']
        ))
      const maxRange = this.PopulationChartSizes.height / 3
      return scaleLinear().domain(scaleDomain).range([maxRange, 2])
    },
    colorScale () {
      return scaleLinear().domain([0, 100])
        .interpolate(interpolateRgb)
        .range([rgb('red'), rgb('lightblue')])
    },
    xScale () {
      const minYear = min(this.WaterAccess.body.map(d => d.Year))
      const maxYear = max(this.WaterAccess.body.map(d => d.Year))
      const rangeExtent = [this.margins.left, this.PopulationChartSizes.width - this.margins.right]
      return scaleLinear().domain([minYear, maxYear]).range(rangeExtent)
    },
    yScale () {
      const domainExtent = extent(
        this.WaterAccess.body.map(
          d => +d['People using at least basic drinking water services (% of population)']
        ))
      const rangeExtent = [this.PopulationChartSizes.height - this.margins.top / 2, this.margins.bottom]
      return scaleLinear().domain(domainExtent).range(rangeExtent)
    },
    lineGenerator () {
      return area().x(d => d.x).y0(this.PopulationChartSizes.height).y1(d => d.y)
    },
    countriesKeys () {
      return uniq(this.WaterAccess.body.map((key, i) => { return key.Country }))
    },
    groupedByCountry () {
      const parsedData = this.WaterAccess.body.map((d, i, len) => {
        return {
          Country: d.Country,
          x: this.xScale(+d.Year), // year
          yearLabel: d.Year,
          population: +d['Population, total'],
          y: this.yScale(+d['People using at least basic drinking water services (% of population)']),
          size: this.sizeScale(+d['People not using safely managed drinking water services (% of population)']) // no safe access
        }
      })
      return groupBy(parsedData, 'Country')
    },
    countriesLinecharts () {
      const DataObj = {}
      this.countriesKeys.forEach((d) => {
        const currentCountry = {}
        currentCountry[d] = {
          country: d,
          population: max(this.groupedByCountry[d].map(p => p.population))
        }
        Object.assign(DataObj, currentCountry)
      })
      return DataObj
    }
  },
  mounted () {
    this.checkSizes()
    // console.log(this.countriesLinecharts)
  },
  methods: {
    checkSizes () {
      const currentChart = this.$refs.population_chart
      this.PopulationChartSizes.width = currentChart[0].clientWidth
      this.PopulationChartSizes.height = currentChart[0].clientHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.visualization-outer {
  min-height: 100vh;
  .visualization-container {
    width: 100vw;
    height: 100vh;
    // background-color: pink;

    .labels {
      position:fixed;
      display: inline-flex;
      width: 100%;
      background-color: rgba(255,255,255,1);
      font-size: 12px;

      .column-1 {
        width: 25%;
      }

      .column-2 {
        width: 38%;
      }

      .column-3 {
        width: 33%
      }
    }

    .inner-container {
      border-bottom: 1px dotted black;
      display: inline-flex;
      max-height: 70px;
      // background-color: teal;
      margin: 0 auto;
      margin-top: 15px;
      width: 100%;
        svg {
          width: 25%;
        }

        svg.population {
          width: 33%;
        }

        div.country {
          // background-color: lightblue;
          width: 38%;
          display: flex;
          justify-content: center;
          align-content: center;
          flex-direction: column;

          p {
            // border-left: 1px solid lightblue;
            width: 90%;
            text-align: left;
            margin: auto;
            text-align: left;
            font-size: 1.2rem;

            span {
              border: 1px solid gray;
              border-radius: 5px;
              padding: 3px;
              font-size: 0.8rem;
            }
          }
        }
     }
  }
}
</style>
