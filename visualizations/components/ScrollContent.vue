<template>
  <div class="scroll-content">
    <div class="inner">
      <div class="scroll-inner-container">
        <article ref="scrolling" class="scrollable-div">
          <Step :step="0" class="first">
            Wasserstress ensteht, wenn Verfügbarkeit und Verbrauch im Missverhältnis stehen.
            Wie knapp Wasser ist, ist sehr unterschiedlich, wie diese stilisierte Weltkarte zeigt.
            Das Projekt <i>taz folgt dem Wasser</i> erzählt Beispiele von Konflikten und Lösungsansätzen
            aus Entwicklungsprojekten.
          </Step>
          <Step :step="1">
            Der <span style="background-color: rgb(179, 139, 100);">Nahe Osten</span> und
            <span style="background-color: rgb(196, 158, 123);">Nordafrika</span> ist die wasserärmste Region der Welt –
            und ein weltweiter Brennpunkt für nicht-nachhaltigen Wasserverbrauch. Die Länder erproben neue Technologien,
            um mit dem Mangel umzugehen.
            taz-Artikel:
            <a target="_blank" rel="noopener noreferrer" href="https://taz.de/Abwasser-in-Jordanien/!5760381/">
              Abwasser in Jordanien
            </a>
          </Step>
          <Step :step="2">
            600 Millionen der 1,38-Milliarden-Einwohner*innen in <span style="background-color: rgb(168, 124, 83);">Indien</span>
            leiden bereits unter akuter Wasserknappheit. In trockenen Gegenden zapfen Landwirt*innen das Grundwasser
            zur Bewässerung an. Gewässer sind oft stark verschmutzt, wie etwa der Fluss Ganges.
            taz-Artikel:
            <a target="_blank" rel="noopener noreferrer" href="https://taz.de/Wasserschutz-in-Indien/!5761850/">
              Wasserschutz in Indien
            </a>
          </Step>
          <Step :step="3" :optional-class="isMobile ? 'bottom' : 'top'">
            Wem gehört das Wasser? In der <span style="background-color: rgb(179, 196, 213);">Nil-Region</span>
            entflammen Konflikte darüber, welcher Staat das Recht hat,
            den Fluss für seine Zwecke zu nutzen und damit anderen womöglich das Wasser abzugraben.
            taz-Artikel:
            <a target="_blank" rel="noopener noreferrer" href="https://taz.de/Konflikt-um-Staudamm-in-Uganda/!5747732/">
              Konflikt um Staudamm in Uganda
            </a> /
            <a target="_blank" rel="noopener noreferrer" href="https://taz.de/Blauer-Nil-in-Sudan/!5762230/">
              Blauer Nil in Sudan
            </a>
          </Step>
          <Step :step="4" :optional-class="isMobile ? 'top' : 'left'">
            <span style="background-color: rgb(114, 167, 218);">Kolumbien</span>
            und <span style="background-color: rgb(152, 184, 215);">Bolivien</span>
            haben vergleichweise wenig Wasserstress – die Situation ist dort
            besser als zum Beispiel in Deutschland. Doch Schutzgebiete fallen Landraub zum Opfer,
            Gewässer drohen zu verschmutzen – und Naturschützer*innen leben gefährlich.
            taz-Artikel:
            <a target="_blank" rel="noopener noreferrer" href="https://taz.de/Zerstoerte-Schutzgebiete-in-Kolumbien/!5723085/">
              Zerstörte Schutzgebiete in Kolumbien
            </a>
          </Step>
          <Step :step="5" class="last">
            <!-- Everything is visible (again) -->
          </Step>
        </article>
      </div>
      <div class="visualization-container">
        <div class="title-container" :class="{'mobile-view': isMobile }">
          <h4>Wo das Wasser fehlt</h4>
          <div class="details-container">
            <div class="arrows-container">
              <div class="arrows-inner">
                <p>
                  Wasserstress im weltweiten Vergleich
                  [{{ step + 1 }} / {{ stepsList.length }}]
                </p>
              </div>
            </div>
          </div>
        </div>
        <slot>
          <div>
            <h1>{{ step }}</h1>
          </div>
        </slot>
        <img
          id="left"
          :class="{'active-arrow': step !== 0}"
          src="../assets/img/left.png"
          @click="changeStep('left')"
        >
        <img
          id="right"
          :class="{'active-arrow': step !== 5}"
          src="../assets/img/right.png"
          @click="changeStep('right')"
        >
        <div class="source-container">
          <p>
            [<a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.wri.org/data/water-stress-country"
            >Quelle: WRI Aqueduct 2019</a>]
          </p>
        </div>
        <img class="logo" src="../assets/img/taz_logo.svg">
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
            h4 { font-size: 1rem; font-family: taz_xbold, logo-small; }
            h5 { font-size: 12px; font-family: DroidSerif, logo; }
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
            font-size: 14px;
            margin-bottom: 0;
          }
        }

         &.mobile-view {
          width: 100%;
          margin: 0 auto;
          margin-top: 15px;
          h4 {
          text-align: left;
          font-size: 1rem;
          }
          p {
            font-size: 0.7rem;
            // text-align: center;
          }
          .details-container {
              .arrows-container {
                .arrows-inner {
                  text-align: left;
                  margin: 0 auto;
                  width: 100%;
                  // padding-left: 5%;
                  font-size: 10px;
                }
            }
          }
        }
      }

      img#left, img#right {
        width: 5% !important; max-width: 38px;
        height: auto;
        position: absolute;
        z-index: 999;
        opacity: 0.2;
        pointer-events: all;

       &.active-arrow {
          opacity: 1;
          cursor: pointer;
        }
      }

      img#right {
        top: 40%;
        right: 0;
      }

      img#left {
        top: 40%;
        left: 0;
      }

      .source-container {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 12px;
        display: inline-flex;
        // width: 50%;
        text-align: right;

        p {
          margin: 0;
          margin-bottom: 25px;
        }
      }

      .logo {
        position: absolute;
        right: 0;
        top: 0;
        width: 50px;
        margin-right: 5px;
        margin-top: 2.5%;
      }
    }

    .scroll-inner-container {
      z-index: 1;
      position: sticky;
      width: 100%; height: 100%;
      pointer-events: none;
      padding: 1.5rem 1rem 1.5rem 1rem;

      article.scrollable-div {
        height: 99%;
        display: inline-flex;
        padding: 0 40% 0 0%;
        box-sizing: content-box;
        /* Prevent vertical scroll if container is too tall*/
        overflow-y: hidden;

        .last {
          margin-right: 100vw;
          opacity: 0;
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
          article.scrollable-div {
            height: 80%;
            padding: 40% 0 0;
          }
      }

      .visualization-container {
      padding: 0 10%;

      img#left {
        left: 2.5%;
      }

      img#right {
        right: 4%;
      }

      .source-container {
        right: 5%;
      }

      .logo {
          width: 40px;
          margin-top: 4.5%;
        }

      }
    }
  }
}
</style>
