<template>
  <div class="scroll-content">
    <div class="inner">
      <div class="scroll-inner-container">
        <article ref="scrolling" class="scrollable-div">
          <Step :step="0">
            <!-- I am number 0 -->
          </Step>
          <Step :step="1">
            <!-- I am number 1 -->
            <div class="inner-step center">
              <p>
                Amami ancora Fallo dolcemente Un anno, un mese, un'ora Perdutamente /
                Amarti mi consola Le notti bianche / Qualcosa che riempie Vecchie storie fumanti /
                Amarti mi consola Mi dà allegria Che vuoi farci, è la vita È la vita la mia Amami
                ancora Fallo dolcemente Un anno, un mese, un'ora Perdutamente Amami ancora Fallo
                dolcemente Solo per un'ora Perdutamente
              </p>
            </div>
          </Step>
          <Step :step="2">
            <!-- I am number 2 -->
            <div class="inner-step center">
              <p>
                Hello again.
              </p>
            </div>
          </Step>
          <Step :step="3">
            <!-- I am number 3 -->
          </Step>
          <Step :step="4">
            <!-- I am number 4 -->
          </Step>
        </article>
      </div>
      <div class="visualization-container">
        <div class="title-container">
          <h3>Visualization title that sticks</h3>
          <h5>Subtitle that sticks</h5>
          <!-- Scroller is at {{ step }} -->
        </div>
        <slot :step="step">
          <div>
            <h1>{{ step }}</h1>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import Step from './Step.vue'
export default {
  name: 'ScrollContent',
  components: {
    Step
  },
  data () {
    return {
      step: 0
    }
  },
  mounted () {
    this.$on('step', (step) => { this.step = step })
  }
}

</script>
<style lang="scss" scoped>
.scroll-content {
  .debug {
    position: absolute;
    z-index: 3;
    bottom: 0;
    margin: 10px;
    cursor: pointer;
  }

  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  // background-color: peachpuff;

  .inner {
    // border-bottom: 1px solid black;
    // background-color: pink;
    position: sticky;
    top: 0px;
    height: 100vh;

    .visualization-container {
      position: fixed;
      top: 0%;
      width: 100%;
      height: 100%;

      .title-container {
        margin: 10px;
      }
    }

    .scroll-inner-container {
      z-index: 1;
      // background-color: royalblue;
      position: sticky;
      width: 100%;
      height: 100%;
      // overflow-y: scroll;

      padding: 1.5rem 1rem 1.5rem 1rem;

      .scrollable-div {
        width: 4000px;
        height: 100%;
        font-size: 100px;
        display: inline-flex;
        // padding-left: 10%;
       }
    }
  }
}

</style>
