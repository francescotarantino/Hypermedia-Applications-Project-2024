<script setup lang="ts">
const route = useRoute();
const { data: project, error } = await useFetch<IProject>(`/api/projects/${route.params.id}`);

if (error.value) {
  throw createError({statusCode: 404});
}

useSeoMeta({
  title: project?.value?.name,
  description: project?.value?.abstract,
  ogTitle: project?.value?.name + ' at SHE Centre',
  ogImage: project?.value?.main_image.path,
  ogDescription: project?.value?.abstract,
});
</script>

<template>
  <section>
    <p class="text-md text-center text-orange font-bold">Project</p>

    <div class="container mx-auto max-w-7xl">
      <h1 class="text-3xl text-center text-orange font-bold mt-4 mb-8">{{project?.name}}</h1>

      <div class="flex flex-col gap-8">
        <ActivityHeader :activity="project as IActivity" />

        <ActivityDescription :activity="project as IActivity" />

        <ActivityPeople :activity="project as IActivity" />
      </div>
    </div>
  </section>
</template>