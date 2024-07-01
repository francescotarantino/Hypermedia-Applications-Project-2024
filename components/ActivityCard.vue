<script setup lang="ts">
import {StarIcon} from "@heroicons/vue/24/solid";

defineProps<{
  activity: IActivity;
  type?: "project" | "service";
  star?: boolean;
}>();
</script>

<template>
  <NuxtLink :to="`/activities/${type || activity.type}/${activity.id}`" class="relative bg-cream rounded-2xl drop-shadow hover:bg-peach transition ease-in-out duration-200">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4">
      <img class="hidden lg:block aspect-auto rounded-xl" :src="activity.main_image.path" :alt="activity.main_image.label">

      <div class="flex flex-col text-center pt-2">
        <h2 class="text-2xl font-bold text-orange">
          {{ activity.name }}
        </h2>

        <div class="flex-grow" />

        <p>
          {{ activity.abstract }}
        </p>
      </div>
    </div>

    <div v-if="star" class="absolute top-2 left-2">
      <div class="bg-apricot text-white text-center text-sm rounded-full p-1.5">
        <StarIcon class="w-6 h-6 inline-block text-cream" />
      </div>
    </div>

    <div v-if="activity.type" class="absolute top-0 right-0">
      <div class="bg-apricot text-white text-center text-sm rounded-tr-xl rounded-bl-xl px-3 first-letter:uppercase">
        {{ activity.type }}
      </div>
    </div>
  </NuxtLink>
</template>
