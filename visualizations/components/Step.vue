<template>
  <div ref="intersect" class="step intersection-observer">
    <div class="inner-step" :class="optionalClass">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Step',
  props: {
    optionalClass: {
      type: String,
      default: ''
    },
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
  // border-right: 1px dashed black;
  width: 100vw;
  height: 100%;
  display: inline-table;
  flex-direction: row;
  padding: 0 30vw 0 0;
  position: relative;

  .inner-step {
    pointer-events: all;
    max-width: 82%;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid black;
    padding: 10px;
    margin-top: 70%;
    margin-left: 40px;

    &.bottom {
      margin-top: 75%;
    }

    &.top {
      margin-top: 15%;
    }
    font-size: 14px;

    span {
      padding: 2px 4px;
      border-radius: 2px;
    }
  }
}

@media only screen and (max-width: 375px) {
  .step {
    .inner-step {
      position: absolute;
      top: 10%;
      width: 80%;
      margin-top: 50%;
      font-size: 12px;

      &.top {
        top: 0%;
        margin-top: 0%;
      }

      &.bottom {
        top: 30%;
        margin-top: 10%;
      }
    }
  }
}

@media only screen and (min-width: 900px) {
  .step {
    .inner-step {
      margin-top: 30%;
      max-width: 50%;

      &.bottom {
      margin-top: 50%;
    }
    }
  }}
</style>
