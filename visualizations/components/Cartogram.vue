<template v-slot="{step}">
  <div class="visualization">
    <svg width="100%" height="100%" class="cartogram">
      <circle cx="50%" cy="40%" :r="10 + step * 10" :fill="colors[step]" />
      <text x="50%" y="50%" text-anchor="middle">{{ step }}</text>
    </svg>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Cartogram',
  // props: {
  //   outerStep: {
  //     type: Number,
  //     default: 0
  //   },
  //   step: {
  //     type: Number,
  //     default: 0
  //   }
  // },
  data () {
    return {
      colors: ['blue', 'green', 'aqua', 'red', 'teal']
    }
  },
  computed: {
    ...mapState({ step: 'globalStep' })
  },
  mounted () {
    // console.log(this.outerStep)
  }
}
</script>
<style lang="scss" scoped>
.visualization {
  height: 100%;
  // background-color: paleturquoise;
  svg {
    circle {
      transition: fill 0.5s;
    }
  }
}

</style>
