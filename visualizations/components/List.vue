<template>
  <div class="list-container" :class="[{'mobile-view': isMobile }]">
    <div class="first-row single-list" :class="{'mobile-view': isMobile }">
      <div class="inner-list">
        <div v-for="(region, r) in MostAffectedRegions" :key="r" class="outer-container">
          <p>{{ region.d }}</p>
          <div class="region-container">
            <div
              v-for="(country, c) in countriesOrderedByImpact[region.d]"
              :key="c"
              class="single-country"
              :data-tooltip="`${decoder(country.name)} / ${country.score}`"
            >
              <img :src="country.path" class="country-glyph">
            </div>
          </div>
        </div>
      </div>
      <div class="legend-container">
        <p>Wasserstress Index (0 = Sehr niedrig / 5 = Sehr hoch)</p>
        <div class="legend-inner-container">
          <span>0</span>
          <div v-for="el in 5" :key="el">
            <img :src="require(`../assets/img/${el - 1}.svg`)">
          </div>
          <span>5</span>
          <div>
            <img src="../assets/img/-9999.svg">
          </div>
          <span>No Data</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { uniq, groupBy } from 'lodash'
import { mean } from 'd3-array'

export default {
  name: 'List',
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
  computed: {
    ...mapState(
      {
        step: 'globalStep',
        scrollyTelling: 'scrollyTellingStatus',
        activeSubRegions: 'activeSubRegions'
      }),
    regionsList () {
      return uniq(this.waterStress.map((d) => {
        return d.region
      })).filter((d) => {
        return d !== undefined
      })
    },
    MostAffectedRegions () {
      const { regionsList, waterStress } = this
      const totalScores = regionsList.map((d, i) => {
        const meanScore = mean(waterStress.map((country) => {
          if (country.region === d && country.score !== -9999) {
            return country.score
          } else { return 0 }
        }))
        return { d, meanScore }
      })

      return totalScores.sort((a, b) => {
        return b.meanScore - a.meanScore
      })
    },
    countriesOrderedByImpact () {
      const groupedData = groupBy(this.waterStress, 'region')
      const obj = {}

      this.MostAffectedRegions.forEach((region) => {
        const data = groupedData[region.d].sort((a, b) => {
          return b.score - a.score
        })
        obj[region.d] = this.filterData(data)
      })

      return obj
    }
  },
  methods: {
    filterData (data) {
      return data.map((d, i) => {
        return {
          name: d.name,
          score: d.score !== -9999 ? d.score : 'No data',
          path: this.changeImgSrc(this.step, d)
        }
      })
    },
    changeImgSrc (step, d) {
      const { activeSubRegions } = this

      const invalid = d.score === -9999 || d.score === null
      const statusArrayLength = activeSubRegions.length
      const currentArrayInMatrix = activeSubRegions[step - 1]

      if (step === 0 && !invalid) {
        return require('../assets/img/' + Math.floor(d.score) + '.svg')
      } else if (step > 0 && step <= statusArrayLength) {
        const isSubRegion = currentArrayInMatrix.includes(d.subRegion)
        const isCountry = currentArrayInMatrix.includes(d.name)
        return (isSubRegion || isCountry) && !invalid
          ? require('../assets/img/' + Math.floor(d.score) + '.svg')
          : require('../assets/img/-9999.svg')
      } else if (step > statusArrayLength && !invalid) {
        return require('../assets/img/' + Math.floor(d.score) + '.svg')
      } else {
        return require('../assets/img/-9999.svg')
      }
    },
    decoder (str) {
      const textArea = document.createElement('textarea')
      textArea.innerHTML = str
      return textArea.value
    }
  }
}
</script>
<style lang="scss" scoped>
  [data-tooltip]:before {
    position: absolute;
    content: attr(data-tooltip);
    opacity: 0;

    background-color: rgba(255, 255, 255, 0.8);
    padding: 1% 2%;
    border-radius: 5px;
    pointer-events: none;

    font-size: 12px;
  }
  [data-tooltip]:hover:before {
    opacity: 1;
    margin-top: -32px;
    transform: translateX(-25%);
  }

  .list-container {
    &.mobile-view {
      padding-top: 20%;
    }

    .single-list {

      .inner-list {
        .outer-container {
          margin: 0 0%;
          p {
            margin: 2px 0px 0px 5px;
            font-size: 12px;
          }
          .region-container {
            // margin-left: 5px;
            display: inline-flex;
            flex-wrap: wrap;
            justify-content: left;

            .single-country {
              margin: 2px 2px 0px 2px;
              width: 12px;

              img {
                width: 100%;
                height: auto;
              }
            }
          }
        }
      }

      .legend-container {
        margin-top: 10px;
        border-top: 1px solid black;
        p {
          font-size: 10px;
          margin-bottom: 2px;
        }
        .legend-inner-container {
          font-size: 10px;
          display: inline-flex;
          span {
            margin:0 5px;
          }
          img {
            width: 12px;
            margin:0 5px;
          }
        }
      }
    }
  }

@media(hover: none) and (pointer: coarse) {
  [data-tooltip]:hover:before {
    opacity: 1;
    margin-top: -32px;
    transform: translateX(-25%);
  }
}
</style>
