<template>
  <div class="scroll-content">
    <div class="inner">
      <div v-if="scrollyTelling" class="scroll-inner-container">
        <article ref="scrolling" class="scrollable-div">
          <Step :step="0">
            I am number 0
          </Step>
          <Step :step="1">
            I am number 1
          </Step>
          <Step :step="2">
            I am number 2
          </Step>
          <Step :step="3">
            I am number 3
          </Step>
        </article>
      </div>
      <div
        class="visualization-container"
        :class="[
          {'notHorizontal': scrollyTelling === false},
        ]"
      >
        <div
          class="title-container"
        >
          <h3>Countries’ basic stress level score</h3>
          <p>Click or scroll right and left to read ({{ step }})</p>
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
import { mapState } from 'vuex'
import Step from './Step.vue'
export default {
  name: 'ScrollContent',
  components: {
    Step
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({ step: 'globalStep', scrollyTelling: 'scrollyTellingStatus' })
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
      }
    }

    .scroll-inner-container {
      z-index: 1;
      position: sticky;
      width: 100%; height: 100%;
      overflow-x: scroll;
      // this conflict with scrolling. Need a fix for later.
      // pointer-events: none;

      padding: 1.5rem 1rem 1.5rem 1rem;

      .scrollable-div {
        height: 50%;
        display: inline-flex;
       }
    }
  }
}

</style>
