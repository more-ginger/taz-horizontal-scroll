<template>
  <g :transform="`translate(${currentLabel.x - backgroundWidth / 2}, ${currentLabel.y - 10})`">
    <rect :width="backgroundWidth" height="20" x="9.5" y="-22.5" rx="5" />
    <text :id="currentLabel.iso_a3" x="12" y="-8.5">
      {{ decoder(currentLabel.name) }} / {{ renderedLabel }}
    </text>
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
  },
  data () {
    return {
      backgroundWidth: 0
    }
  },
  computed: {
    renderedLabel () {
      return this.currentLabel.score === -9999
        ? 'No Data'
        : this.currentLabel.score
    }
  },
  mounted () {
    const textNode = document.getElementById(this.currentLabel.iso_a3)
    const bb = textNode.getBBox()
    this.backgroundWidth = bb.width + 5
  },
  methods: {
    decoder (str) {
      const textArea = document.createElement('textarea')
      textArea.innerHTML = str
      return textArea.value
    }
  }
}
</script>

<style lang="scss" scoped>
g { pointer-events: none; }
text { font-size: 12px; }

rect {
  // stroke-width: 0.5;
  // stroke: black;
  fill: white;
  fill-opacity: 0.9;
}

</style>
