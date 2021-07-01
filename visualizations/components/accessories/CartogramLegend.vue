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
    <g class="gradient-bar" transform="translate(0, -50)">
      <text x="0px" y="10px">
        Wasserstress
      </text>
      <rect width="190px" height="9px" y="15px" fill="url(#linear-gradient)" rx="0" />
      <text x="0" y="40px">
        Niedrig (0)
      </text>
      <text x="190px" y="40px" text-anchor="end">
        Hohe (5)
      </text>
    </g>
    <g class="no-data" transform="translate(0, 5)">
      <text x="25px" y="11px">
        Keine Daten
      </text>
      <rect width="14px" height="14px" x="0" y="0" />
    </g>
    <g class="country" transform="translate(100, 5)">
      <text x="25px" y="11px">
        = Land
      </text>
      <rect width="14px" height="14px" x="0" y="0" />
    </g>
  </g>
</template>
<script>
</script>

<style lang="scss" scoped>
text { font-size: 12px; }

rect { stroke-width: 0.2; }

g {
    .country > rect { fill: white; stroke: black }
    .no-data > rect { fill: #eee; stroke: black }
}
</style>
