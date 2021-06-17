<template>
  <div class="list-container" :class="[{'mobile-view': isMobile }]">
    <div class="first-row single-list" :class="{'mobile-view': isMobile }">
      <div class="inner-list">
        <div v-for="(region, r) in MostAffectedRegions" :key="r" class="outer-container">
          <p>{{ region.d }}</p>
          <div class="region-container">
            <div v-for="(country, c) in countriesOrderedByImpact[region.d]" :key="c" class="single-country">
              <img :src="country.path" class="country-glyph">
            </div>
          </div>
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
  data () {
    return {
      sort: 'rank',
      detail: false
    }
  },
  computed: {
    ...mapState({ step: 'globalStep', scrollyTelling: 'scrollyTellingStatus' }),
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
          score: d.score,
          path: d.score !== null
            ? require('../assets/img/' + Math.floor(d.score) + '.png')
            : require('../assets/img/-9999.png')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .list-container {
    &.mobile-view {
      padding-top: 22.5%;
    }

    .single-list {

      .inner-list {
        .outer-container {
          margin: 0 auto;
          p {
            margin: 2px 0px 0px 5px;
            font-size: 12px;
          }
          .region-container {
            margin-left: 5px;
            display: inline-flex;
            flex-wrap: wrap;
            justify-content: left;

            .single-country {
              margin: 2px 2px 0px 2px;
              width: 15px;

              img {
                width: 100%;
                height: auto;
              }
            }
          }
        }
      }
    }
  }

</style>
