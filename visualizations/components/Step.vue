<template>
  <div ref="intersect" class="step intersection-observer">
    <div class="inner-step">
      <slot />
    </div>
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
  width: 100vw;
  display: inline-table;
  flex-direction: row;
  padding: 0 25vw 0 5vw;

  .inner-step {

    width: 50%;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid black;
    padding: 10px;
    margin-top: 50%;

    &.center {
      align-self: center;
    }
    p {
      font-size: 16px;
    }
  }
}
</style>
