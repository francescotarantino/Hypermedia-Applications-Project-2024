<script setup lang="ts">
defineProps<{
  coordinates: [number, number];
}>();

const zoom = ref(16);
</script>

<template>
  <LMap ref="map" :zoom="zoom" :center="coordinates" :use-global-leaflet="false">
    <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
    />
    <LMarker :lat-lng="coordinates" />
  </LMap>
</template>