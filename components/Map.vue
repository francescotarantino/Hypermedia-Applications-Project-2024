<script setup lang="ts">
defineProps<{
  coordinates: [number, number];
}>();

const zoom = ref(16);
</script>

<template>
  <LMap class="rounded-xl" :zoom="zoom" :center="coordinates" :use-global-leaflet="false" :options="{ scrollWheelZoom: false }">
    <LTileLayer
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        attribution="&copy; <a href=&quot;https://www.stadiamaps.com/&quot;>Stadia Maps</a> &copy; <a href=&quot;https://openmaptiles.org/&quot;>OpenMapTiles</a> &copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
        :max-zoom="20"
    />
    <LMarker :lat-lng="coordinates" />
  </LMap>
</template>