<script setup lang="ts">
defineProps<{
  person: IPerson;
}>();
</script>

<template>
  <NuxtLink :to="`/person/${person.id}`" class="card backdrop bg-cream rounded-2xl drop-shadow hover:bg-peach transition ease-in-out duration-200">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4">
      <img class="aspect-auto rounded-xl" :src="person.picture.path" :alt="person.picture.label">

      <div class="flex flex-col text-center">
        <h2 class="text-2xl font-bold text-orange">{{ person.name + ' ' + person.surname }}</h2>
        <h5 class="text-md font-semibold text-orange">{{ person.main_role }}</h5>

        <div class="flex-grow" />

        <p class="text-left line-clamp-9">
          {{ person.bio }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
