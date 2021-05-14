<template>
  <div class="scroll-content">
    <div class="debug" @click="debug = !debug">
      Debug: {{ debug }}
    </div>
    <div class="inner">
      <div class="scroll-inner-container">
        <article ref="scrolling" class="scrollable-div" @scroll="handleScroll()">
          <div class="step">
            <div class="inner-step">
              step 0
            </div>
          </div>
          <div class="step">
            <div class="inner-step">
              step 1
            </div>
          </div>
          <div class="step">
            <div class="inner-step">
              step 2
            </div>
          </div>
          <div class="step">
            <div class="inner-step">
              step 3
            </div>
          </div>
          <div class="step">
            <div class="inner-step">
              step 4
            </div>
          </div>
          <div class="step">
            <div class="inner-step">
              step 5
            </div>
          </div>
        </article>
      </div>
      <div class="visualization-container">
        <div v-if="debug === true">
          Scroller is at {{ scrollPosition }} px
        </div>
        <slot/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScrollContent',
  data () {
    return {
      debug: true,
      scrollPosition: 0,
      initialThreshold: 0,
      stepThreshold: 0
    }
  },
  created () {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted () {
    // const firstDiv = this.$refs.scrolling.getElementsByClassName('step')
    // console.log(Element.getBoundingClientRect())
    this.stepThreshold = this.$refs.scrolling.getElementsByClassName('step')[0].clientWidth
    this.initialThreshold = this.stepThreshold
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll (event) {
      // this.stepThreshold = event.target.scrollingElement.clientWidth
      this.$store.commit('updateGlobalScroll', window.scrollX)
      this.scrollPosition = window.scrollX

      // step logic to update store
      if (window.scrollX > this.stepThreshold) {
        this.$store.commit('updateGlobalStep', 1)
        this.stepThreshold = this.stepThreshold + this.initialThreshold
      } else if (window.scrollX < this.stepThreshold - this.initialThreshold) {
        this.$store.commit('updateGlobalStep', -1)
        this.stepThreshold = this.stepThreshold - this.initialThreshold
      }
    }
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
  background-color: peachpuff;

  .inner {
    background-color: pink;
    position: sticky;
    top: 0px;
    height: 100vh;

    .visualization-container {
      position: fixed;
      top: 0%;
      width: 100%;
      height: 100%;
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

        .step {
          // margin-left: 10px;
          margin-left:5%;
          border-right: 3px solid violet;
          height: 90vh;
          width: 1000px;

          .inner-step {

            border:3px solid bisque;
          }
        }
      }
    }
  }
}

</style>
