<template>
  <g>
    <defs>
      <linearGradient id="linear-gradient">
        <stop offset="0.04" stop-color="#8db3d8" />
        <stop offset="0.47" stop-color="#fee6ce" />
        <stop offset="0.93" stop-color="#845121" />
        <stop offset="1" stop-color="#784210" />
      </linearGradient>
    </defs>
    <g class="gradient-bar">
      <text x="0px" y="0px">
        Water stress score
      </text>
      <rect width="230px" height="19px" y="5px" fill="url(#linear-gradient)" rx="10"/>
      <text x="0" y="40px">
        Very low (0)
      </text>
      <text x="230px" y="40px" text-anchor="end">
        Very high (5)
      </text>
    </g>
    <g class="no-data" transform="translate(250, 5)">
      <text x="25px" y="14.5px">
        No data
      </text>
      <rect width="19px" height="19px" x="0" y="0" rx="10"/>
    </g>
    <g class="country" transform="translate(380, 5)">
      <text x="25px" y="14.5px">
        = 1 country
      </text>
      <rect width="19px" height="19px" x="0" y="0" />
    </g>
  </g>
</template>
<script>
</script>

<style lang="scss" scoped>
text { font-size: 12px; }

rect { stroke-width: 0.2; }

g {
    .country > rect { fill: #8db3d8; stroke: black }
    .no-data > rect { fill: #eee; stroke: black }
}
</style>
