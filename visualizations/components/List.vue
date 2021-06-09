<template>
  <div class="list-container" :class="[{'notHorizontal': scrollyTelling === false}, {'mobile-view': isMobile }]">
    <div class="first-row single-list" :class="{'mobile-view': isMobile }">
      <div class="inner-list">
        <p class="rank" :class="{'selected': sort === 'rank'}" @click="sort = 'rank'">
          # Rank
        </p>
        <p class="name" :class="{'selected': sort === 'population'}" @click="sort = 'population'">
          Country (Pop/Mln)
        </p>
        <p class="color" :class="{'selected': detail}" @click="detail = !detail">
          BWS score
        </p>
        <div class="subscores" :class="{'visible': detail}">
          <p class="color">
            Ind
          </p>
          <p class="color">
            Dom
          </p>
          <p class="color">
            Irr
          </p>
          <p class="color">
            Liv
          </p>
        </div>
      </div>
    </div>
    <div v-for="(element, e) in listData" :key="e" class="single-list" :class="{'mobile-view': isMobile }">
      <div class="inner-list" :style="`background-color:${element.color}`">
        <p class="rank">
          # {{ element.rank }}
        </p>
        <p class="name" :class="element.iso">
          <span>{{ element.name }} ({{ element.population }} Mln)</span>
        </p>
        <p class="color" :style="`background-color:${element.color}`">
          {{ element.score }}
        </p>
        <div class="subscores" :class="{'visible': detail}">
          <p class="color" :style="`background-color:${element.INDcolor}`">
            {{ element.INDscore }}
          </p>
          <p class="color" :style="`background-color:${element.DGWcolor}`">
            {{ element.DGWscore }}
          </p>
          <p class="color" :style="`background-color:${element.IRRcolor}`">
            {{ element.IRRscore }}
          </p>
          <p class="color" :style="`background-color:${element.LIVcolor}`">
            {{ element.LIVscore }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { scaleDiverging } from 'd3-scale'
import { rgb } from 'd3-color'
import { interpolateRgb } from 'd3-interpolate'

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
    colorScale () {
      return scaleDiverging().domain([5, 2.5, 1])
        .interpolator(interpolateRgb)
        .range([rgb('#ad7559'), rgb('#ffe7cf'), rgb('#0089b3')])
    },
    filteredData () {
      return this.waterStress.filter(function (element) {
        return element.score !== null
      })
    },
    listData () {
      return this.filteredData.map((d, i) => {
        return {
          name: this.isMobile ? d.iso_a3 : d.name,
          color: d.score === -9999 ? '#d1d1d1' : this.colorScale(d.score),
          score: d.score === -9999 ? d.label : d.score,
          INDcolor: d.INDGWscore === -9999 ? '#d1d1d1' : this.colorScale(d.INDGWscore),
          INDscore: d.INDGWscore === -9999 ? d.label : Math.round(d.INDGWscore),
          DGWcolor: d.DGWscore === -9999 ? '#d1d1d1' : this.colorScale(d.DGWscore),
          DGWscore: d.DGWscore === -9999 ? d.label : Math.round(d.DGWscore),
          LIVcolor: d.LIVGWscore === -9999 ? '#d1d1d1' : this.colorScale(d.LIVGWscore),
          LIVscore: d.LIVGWscore === -9999 ? d.label : Math.round(d.LIVGWscore),
          IRRcolor: d.IRRGWscore === -9999 ? '#d1d1d1' : this.colorScale(d.IRRGWscore),
          IRRscore: d.IRRGWscore === -9999 ? d.label : Math.round(d.IRRGWscore),
          rank: d.rank,
          iso: d.iso_a3,
          population: Math.round(d.population_2019_million * 10) / 10
        }
      // eslint-disable-next-line array-callback-return
      }).sort((a, b) => {
        if (this.sort === 'rank') {
          return a.rank - b.rank
        } else if (this.sort === 'population') {
          return b.population - a.population
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
      &.first-row {
        border-top: 1px solid black;
        .inner-list {
          cursor: pointer;
          p.selected {
            font-weight: bold;
          }
          p.rank, p.name {
            border-right: 1px dashed black;
          }
        }
      }
      &.mobile-view {
        .inner-list {
          .name {
            width: 50%;
          }

          .rank {
            width: 20%;
          }

          .color {
            width: 30%;
          }
        }
      }
      border-bottom: 0.5px solid white;
      .inner-list {
      display: inline-flex;
      width: 100%;

      .name, .rank {
        width: 45%;
        font-size: 12px;
        margin-left: 10px;
        margin-bottom: 0;
        margin-top: 0;
        padding: 0;
        line-height: 30px;
        span {
        background-color: rgba(255, 255, 255, 0.9);
        // box-shadow: 0.5px 0px 5px rgba(0, 0, 0, 0.6);
        padding: 0 5px;
        border-radius: 2.5px;
      }
      }

      .rank {
        border-right: 0.5px dashed white;
        width: 10%;
      }

      .color {
        border-left:  0.5px dashed white;
        margin: 0;
        padding-left:10px;
        width: 20%;
        line-height: 30px;
        font-size: 12px;
        // mix-blend-mode: difference;
      }

        .subscores {

          &.visible {
            width: 25%;
            opacity: 1;
            transition: width 2s, opacity 2s;
            display: inline-flex;

            .color {
              text-align: center;
              width: 25%;
              padding-left: 0;
              // border-right: 1px dashed black;
            }
          }

          transition: width 2s, opacity 2s;
          opacity: 0;
          width: 0%;
          display: none;

          .color {
            padding-left: 0;
          }
        }
      }
      }
  }

</style>
