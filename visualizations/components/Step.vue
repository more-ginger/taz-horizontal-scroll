<template>
  <div ref="intersect" class="step intersection-observer">
    <!-- <div class="inner-step"> -->
    <slot />
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  name: 'Step',
  props: {
    step: {
      type: Number,
      default: 0
    },
    observerOptions: {
      type: Object,
      default () {
        return {
          rootMargin: `-${0.5 * 100}% 0% -${100 - 0.5 * 100}% 0%`
        }
      }
    }
  },
  mounted () {
    const { $refs, step, observerOptions } = this
    const observer = new window.IntersectionObserver((entries) => {
      if (entries.filter(entry => entry.isIntersecting).length < 1) { return }
      // console.log(this.$parent.$emit('step', step))
      this.$store.commit('updateGlobalStep', step)
      this.$parent.$emit('step', step)
    }, observerOptions)

    observer.observe($refs.intersect)
  }
}
</script>
<style lang="scss" scoped>
.step {
  border-right: 1px dashed black;
  // height: 90vh;
  width: 1000px;
  display: flex;
  flex-direction: row;

  .inner-step {

    max-width: 460px;
    background: transparentize(white, 0.02);
    border: 1px solid black;
    padding: 10px;
    margin-left: 5%;

    &.center {
      align-self: center;
    }
    p {
      font-size: 16px;
      // vertical-align: center;
    }
  }
}
</style>
