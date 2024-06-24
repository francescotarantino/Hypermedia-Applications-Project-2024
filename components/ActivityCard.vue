<script setup lang="ts">
defineProps<{
  activity: IActivity;
  type?: "project" | "service";
}>();
</script>

<template>
  <NuxtLink :to="`/activities/${type || activity.type}/${activity.id}`" class="card backdrop bg-cream rounded-2xl drop-shadow hover:bg-peach">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <img class="m-4 hidden lg:block aspect-auto rounded-xl" :src="activity.main_image.path" :alt="activity.main_image.label">
      <div class="flex flex-col text-center">
        <h2 class="text-xl m-4 font-bold text-orange">{{ activity.name }}</h2>
        <div class="flex-grow"></div>
        <p class="m-4">{{ activity.abstract }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>

</style>