<template>
  <div class="list-container" :class="[{'notHorizontal': scrollyTelling === false}, {'mobile-view': isMobile }]">
    <div class="first-row single-list" :class="{'mobile-view': isMobile }">
      <div class="inner-list">
        <div v-for="(region, r) in MostAffectedRegions" :key="r" class="region-container">
          <div v-for="(country, c) in countriesOrderedByImpact[region.d]" :key="c" class="single-country">
            <img :src="country.path"/>
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
// import { scaleLinear } from 'd3-scale'

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
        // console.log('../assets/img/' + Math.ceil(d.score) + '.png')
        return {
          name: d.name,
          score: d.score,
          path: d.score !== -9999 || d.score !== null ? require('../assets/img/' + Math.ceil(d.score) + '.png') : ''
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  // background-color: paleturquoise;
  .list-container {
    &.notHorizontal {
      padding-top: 17.5%;

    }

    &.mobile-view {
      padding-top: 27.5%;
    }

    .single-list {
      background-color: aquamarine;

      .inner-list {
        .region-container {
          margin-top: 10%;
          background-color: burlywood;
          display: inline-flex;

          .single-country {
            width: 50px;

            img {
              width: 100%;
              height: auto;
            }
          }
        }
      }
    }
  }

</style>
