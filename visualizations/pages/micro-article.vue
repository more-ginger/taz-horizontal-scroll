<template>
  <ScrollContainer>
    <ScrollContent>
      <Visualizations :water-stress="waterStress" />
    </ScrollContent>
  </ScrollContainer>
</template>
<script>
import ScrollContainer from '../components/ScrollContainer.vue'
import ScrollContent from '../components/ScrollContent.vue'
import Visualizations from '../components/Visualizations.vue'

export default {
  name: 'MicroArticle',
  components: {
    ScrollContainer,
    ScrollContent,
    Visualizations
  },
  async asyncData ({ $content, params }) {
    const waterStress = await $content(params.slug || 'data').fetch()
    return { waterStress }
  }
}
</script>

<style lang="scss">
html {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
}
.visualization-outer { max-width: 1240px; width: 100%; }
a { color: rgba(201,6,43,1); text-decoration: underline; }
</style>
