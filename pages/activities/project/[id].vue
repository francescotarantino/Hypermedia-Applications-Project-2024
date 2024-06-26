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
  <section>
    <h5 class="text-md text-center text-orange font-bold">Project</h5>

    <ActivityInfoSection :activity="project as IActivity" />
  </section>
</template>