<template>
  <div class="scroll-content">
    <div class="inner">
      <div class="scroll-inner-container">
        <article ref="scrolling" class="scrollable-div">
          <Step :step="0">
            Everything is visible. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Step>
          <Step :step="1">
            Focus on Middle East and North Africa and
            <a href="https://taz.de/Wassermangel-in-Suedindien/!5337607/">
              this is a link
            </a>
          </Step>
          <Step :step="2">
            Focus on Central Africa
          </Step>
          <Step :step="3">
            Focus on Nile area
          </Step>
          <Step :step="4">
            Focus on Bolivia and Colombia
          </Step>
          <Step :step="5" class="last">
            Everything is visible (again)
          </Step>
        </article>
      </div>
      <div class="visualization-container">
        <div class="title-container" :class="{'mobile-view': isMobile }">
          <h3>Countries’ basic stress level score</h3>
          <div class="details-container">
            <div class="arrows-container">
              <div class="arrows-inner">
                <img id="left" :class="{'active-arrow': step !== 0}" src="../assets/img/left.png" @click="changeStep('left')">
                <p>
                  Click / scroll to the side
                  ({{ step }} / {{ stepsList.length - 1 }})
                </p>
                <img id="right" :class="{'active-arrow': step !== 5}" src="../assets/img/right.png" @click="changeStep('right')">
                <div class="source-container">
                  <p>
                    [<a href="https://www.wri.org/data/water-stress-country">data source</a>]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <slot>
          <div>
            <h1>{{ step }}</h1>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Step from './Step.vue'
export default {
  name: 'ScrollContent',
  components: {
    Step
  },
  data () {
    return {
      stepsList: []
    }
  },
  computed: {
    ...mapState({
      step: 'globalStep',
      scrollyTelling: 'scrollyTellingStatus',
      isMobile: 'isMobile'
    })
  },
  mounted () {
    this.getStepsPosition()
  },
  methods: {
    getStepsPosition () {
      const { scrolling } = this.$refs
      const stepsList = []
      let scrollDifference = 0

      scrolling.children.forEach((step, s) => {
        if (s !== 0) {
          scrollDifference = scrollDifference + step.offsetLeft - scrolling.children[s - 1].offsetLeft
        } else {
          scrollDifference = 0
        }
        stepsList.push({ number: s, offset: scrollDifference })
      })
      this.stepsList = stepsList
    },
    // Control step through arrows instead of scroll
    changeStep (direction) {
      const { stepsList } = this
      let globalStep = this.step
      const withinMaxLength = globalStep <= stepsList.length - 2
      const withinMinLength = globalStep > 0

      if (direction === 'right' && withinMaxLength) {
        globalStep = globalStep + 1
        window.scrollTo(stepsList[globalStep].offset, 0)
      } else if (direction === 'left' && withinMinLength) {
        globalStep = globalStep - 1
        // Harcode additional offset to avoid steps glitching back and forth
        window.scrollTo(stepsList[globalStep].offset + 50, 0)
      }

      this.$store.commit('updateGlobalStep', globalStep)
    },
    ...mapMutations(['updateGlobalStep'])
  }
}

</script>
<style lang="scss" scoped>
.scroll-content {
  position: absolute;
  top: 0;
  width: 100%; height: 100%;

  .inner {
    position: sticky;
    top: 0px;
    height: 100vh;

    .visualization-container {

      &.mobile-view {
        .title-container {
            h3 { font-size: 20px; }
            h5 { font-size: 12px; }
          }
        }

      &.notHorizontal {
        position: relative;

        .title-container {
          position:fixed;
          background-color: rgba(255, 255, 255, 1);
          border-radius: 2.5px;
          width: 95%;
          padding: 10px;

        }
      }
      position: fixed;
      top: 0%;
      width: 100%; height: 100%;

      .title-container {
        position: absolute;
        margin: 2.5%;

        .details-container {
          width: 100%;

          p {
            font-size: 12px;
            margin-bottom: 0;
          }

          .arrows-container {

            .arrows-inner {
              display: inline-flex;
             img {
                width: 4%;
                height: auto;
                margin: 10px;
                cursor: pointer;
                opacity: 0.2;
                margin-top: 3px;

                &.active-arrow {
                  opacity: 1;
                }
            }

            }
          }
        }

        .source-container {
          position: absolute;
          right: 0;
        }

         &.mobile-view {
          width: 100%;
          margin: 0 auto;
          margin-top: 15px;
          h3 {
          text-align: center;
          font-size: 1rem;
          }
          p {
            font-size: 0.80rem;
            text-align: center;
          }
          .details-container {
              .arrows-container {
                .arrows-inner {
                  margin: 0 auto;
                  width: 90%;
                  padding-left: 5%;

                  img {
                    width: 5% !important;
                    height: auto;
                    position: relative;
                  }
                }
            }
          }
        }
      }
    }

    .scroll-inner-container {
      z-index: 1;
      position: sticky;
      width: 100%; height: 100%;
      pointer-events: none;
      padding: 1.5rem 1rem 1.5rem 1rem;

      .scrollable-div {
        height: 99%;
        display: inline-flex;
        padding: 0 40% 0 5%;
        box-sizing: content-box;
        /* Prevent vertical scroll if container is too tall*/
        overflow-y: hidden;

        .last {
          margin-right: 100vw;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge add Firefox */
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none; /* Firefox */
        }
       }
    }
  }
}

@media only screen and (max-width: 375px) {
  .scroll-content {
    .inner {
      .scroll-inner-container {
          article {
            padding: 40% 0 5%;
          }
      }
    }
  }
}

</style>
