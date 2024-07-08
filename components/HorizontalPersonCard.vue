<script setup lang="ts">
/**
 * This component displays a card with a person's information in a horizontal layout (on smaller screens it will be vertical).
 * @property {IPerson} person - The person to display in the card
 * @property {boolean} showBio - Whether to show the bio of the person
 */
defineProps<{
  person: IPerson;
  showBio: boolean;
}>();
</script>

<template>
  <div class="bg-cream rounded-2xl drop-shadow hover:drop-shadow-xl transform-gpu transition ease-in-out duration-500 flex items-center justify-center">
    <NuxtLink :to="`/team/${person.id}`">
      <div class="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 m-4 text-center justify-items-center">
        <div class="justify-self-center">
          <img class="bg-white aspect-auto rounded-xl w-48" :src="person.picture.path" alt="" />
        </div>

        <div class="flex flex-col text-center flex-1">
          <h2 class="text-2xl font-bold text-orange">{{ person.name + ' ' + person.surname }}</h2>

          <p class="text-md font-semibold text-orange">{{ person.main_role }}</p>

          <div class="flex-grow" />

          <p v-if="showBio" class="text-center line-clamp-5">
            {{ person.bio.split('.')[0] }}.
          </p>

          <div class="flex-grow" />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
