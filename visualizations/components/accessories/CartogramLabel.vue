<template>
  <g :transform="`translate(${currentLabel.x}, ${currentLabel.y})`">
    <text x="10" y="10">
      {{ currentLabel.name }}, {{ currentLabel.score }}
    </text>
    <rect width="10" height="10" x="9.5" />
  </g>
</template>
<script>
export default {
  name: 'CartogramLabel',
  props: {
    currentLabel: {
      type: Object,
      default () { return { } }
    }
  }
}
</script>

<style lang="scss" scoped>
text { font-size: 12px; }

rect { stroke-width: 0.2; }

g {
    .country > rect { fill: rgb(0, 111, 139); stroke: black }
    .no-data > rect { fill: white; stroke: black }
}
</style>
