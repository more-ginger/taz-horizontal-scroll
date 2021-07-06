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
@font-face {
  font-family: AktivGrotesk_bold;
  src: url('../assets/fonts/AktivGrotesk_Md.ttf');
}

@font-face {
  font-family: AktivGrotesk;
  src: url('../assets/fonts/AktivGrotesk_Rg.ttf');
}

html {
  h4, p {
    font-family: 'AktivGrotesk_bold' !important;
  }

  text, svg {
    font-family: 'AktivGrotesk' !important;
  }

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
