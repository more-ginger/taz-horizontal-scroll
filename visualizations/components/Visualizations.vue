<template>
  <div class="visualization">
    <Cartogram v-if="scrollActive === true" :water-stress="waterStress" :is-mobile="isMobile" />
    <List v-if="scrollActive === false" :water-stress="waterStress" :is-mobile="isMobile" />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Cartogram from './Cartogram.vue'
import List from './List.vue'
export default {
  name: 'Visualizations',
  components: {
    Cartogram,
    List
  },
  props: {
    waterStress: {
      type: Array,
      default () { return [] }
    }
  },
  data () {
    return {
      isMobile: false
    }
  },
  computed: {
    ...mapState({ step: 'globalStep', scrollActive: 'scrollyTellingStatus' })
  },
  mounted () {
    this.checkContainerSizes()
  },
  methods: {
    checkContainerSizes () {
      const iFrameWidth = this.$el.children[0].clientWidth

      if (iFrameWidth <= 450) {
        this.isMobile = true
        this.$store.commit('UpdatescrollyTellingStatus', false)
        this.$store.commit('updateViewportStatus', true)
      }
    },
    ...mapMutations(['UpdatescrollyTellingStatus', 'updateViewportStatus'])
  }
}
</script>
