<script setup lang="ts">
import { StarIcon } from "@heroicons/vue/24/solid";

/**
 * @property {IActivity} activity - The activity to display in the card
 * @property {("project" | "service")} [type] - The type of activity (project or service). If not provided, it will be obtained from the activity
 * @property {boolean} [showTypeLabel] - Whether to show or not the type label of the activity on the top right hand corner
 * @property {string} [starLabel] - The label to show in the star on the top left hand corner when hovering the card. If not provided, the star will not be shown.
 */
defineProps<{
  activity: IActivity;
  type?: "project" | "service";
  showTypeLabel?: boolean;
  starLabel?: string;
}>();
</script>

<template>
  <NuxtLink :to="`/activities/${type || activity.type}/${activity.id}`" class="relative bg-cream rounded-2xl drop-shadow hover:drop-shadow-2xl transform-gpu transition ease-in-out duration-500 group">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4">
      <img class="w-full h-48 aspect-auto rounded-xl md:w-full md:h-full object-cover"
               :src="activity.main_image.path" :alt="activity.main_image.label" />

      <div class="flex flex-col text-center pt-2">
        <h2 class="text-2xl font-bold text-orange">
          {{ activity.name }}
        </h2>

        <div class="flex-grow" />

        <p class="line-clamp-[8]">
          {{ activity.abstract }}
        </p>
      </div>
    </div>

    <div v-if="starLabel" class="absolute top-2 left-2">
      <div class="grid grid-cols-5 items-center bg-apricot rounded-full p-1.5 gap-6 transition-all duration-500 ease-in-out w-9 group-hover:w-[7rem]">
        <StarIcon class="w-6 h-6 text-cream rotate-0 group-hover:rotate-[70deg] transition duration-1000 ease-in-out" />

        <p class="col-span-4 text-white text-sm invisible opacity-0 group-hover:visible group-hover:opacity-100 transition delay-150 duration-500 ease-in-out">
          {{ starLabel }}
        </p>
      </div>
    </div>

    <div v-if="showTypeLabel" class="absolute top-0 right-0">
      <div class="bg-apricot text-white text-center text-sm rounded-tr-xl rounded-bl-xl px-3 first-letter:uppercase">
        {{ type || activity.type }}
      </div>
    </div>
  </NuxtLink>
</template>
