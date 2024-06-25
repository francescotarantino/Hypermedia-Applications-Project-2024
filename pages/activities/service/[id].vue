<script setup lang="ts">
const route = useRoute();
const { data: service } = await useFetch<IProject>(`/api/services/${route.params.id}`);

useSeoMeta({
  ogTitle: service?.value?.name,
  description: service?.value?.abstract,
  ogImageUrl: service?.value?.main_image.path,
});
</script>

<template>
  <ActivityInfoSection :activity="service as IActivity" />
</template>