<script setup lang="ts">
const route = useRoute();
const { data: project } = await useFetch<IProject>(`/api/projects/${route.params.id}`);

useSeoMeta({
  ogTitle: project?.value?.name,
  description: project?.value?.abstract,
  ogImageUrl: project?.value?.main_image.path,
});
</script>

<template>
  <ActivityInfoSection :activity="project as IActivity" />
</template>