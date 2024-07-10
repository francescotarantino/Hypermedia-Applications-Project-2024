<script setup lang="ts">
/**
 * @property {[number, number]} coordinates - The coordinates to display on the map.
 * @property {string} tooltip - The tooltip to display on the map marker.
 */
defineProps<{
  coordinates: [number, number];
  tooltip: string;
}>();

const zoom = ref(16);
</script>

<template>
  <LMap class="rounded-xl" :zoom="zoom" :center="coordinates" :use-global-leaflet="false" :options="{ scrollWheelZoom: false }">
    <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
    />

    <LMarker :lat-lng="coordinates">
      <LTooltip>{{tooltip}}</LTooltip>
    </LMarker>
  </LMap>
</template>