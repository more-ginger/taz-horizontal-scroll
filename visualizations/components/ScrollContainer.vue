<template>
  <div class="visualization-outer scroll-container layout">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'ScrollContainer'
}
</script>
<style lang="scss" scoped>
.scroll-container {
  position: relative;
  height: 100%;
  left: 0;

  div.content {
    color: red;
  }
}
</style>
