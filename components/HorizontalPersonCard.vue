<script setup lang="ts">
defineProps<{
  person: IPerson;
  showBio: boolean;
}>();
</script>

<template>
  <div class="bg-cream rounded-2xl drop-shadow hover:drop-shadow-xl transform-gpu transition ease-in-out duration-500 flex items-center justify-center">
    <NuxtLink :to="`/team/${person.id}`">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 m-4 text-center justify-items-center">
        <div class="col-span-2 justify-self-center">
          <img class="bg-white aspect-auto rounded-xl w-48" :src="person.picture.path" :alt="person.picture.label">
        </div>

        <div class="flex flex-col text-center col-span-3">
          <h2 class="text-2xl font-bold text-orange">{{ person.name + ' ' + person.surname }}</h2>

          <p class="text-md font-semibold text-orange">{{ person.main_role }}</p>

          <div class="flex-grow" />

          <p v-if="showBio" class="text-center line-clamp-4">
            {{ person.bio.split('.')[0] }}.
          </p>

          <div class="flex-grow" />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
