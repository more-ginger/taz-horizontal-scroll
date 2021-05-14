<template #visualization>
  <div class="visualization">
    <svg width="100%" height="100%" class="cartogram">
      <circle cx="50%" cy="50%" :r="10 + step * 10" :fill="colors[step]" />
      <text x="50%" y="50%">{{ step }}</text>
    </svg>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Cartogram',
  data () {
    return {
      colors: ['blue', 'green', 'black', 'red']
    }
  },
  computed: {
    ...mapState({ scrollPosition: 'globalScroll', step: 'globalStep' })
  }
}
</script>
<style lang="scss" scoped>
.visualization {
  height: 100%;
  background-color: paleturquoise;
}

</style>
