<template>
  <ScrollContainer>
    <ScrollContent>
      <!-- {{ slotProps }} -->
      <Cartogram />
    </ScrollContent>
  </ScrollContainer>
</template>
<script>
// import Scrollama from 'scrollama'
import ScrollContainer from '../components/ScrollContainer.vue'
import ScrollContent from '../components/ScrollContent.vue'
import Cartogram from '../components/Cartogram.vue'

export default {
  name: 'MicroArticle',
  components: {
    ScrollContainer,
    ScrollContent,
    Cartogram
  },
  data () {
    return {
      step: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.visualization-outer {
  min-height: 100vh;
//   height: 624px;
  width: 100%;
//   background-color: lightblue;
}
</style>
