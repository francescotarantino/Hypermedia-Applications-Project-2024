<script setup lang="ts">
defineProps<{
  person: IPerson;
  isMainResponsible?: boolean;
}>();
</script>

<template>
  <NuxtLink :to="`/team/${person.id}`" class="relative bg-cream rounded-2xl drop-shadow hover:bg-peach transition ease-in-out duration-200">
    <div class="flex flex-col items-center w-48 gap-2 m-4">
      <img class="aspect-auto rounded-xl w-36" :src="person.picture.path" :alt="person.picture.label">

      <div class="flex flex-col text-center">
        <h2 class="text-xl font-bold text-orange">{{ person.name + ' ' + person.surname }}</h2>

        <h5 class="text-md text-orange">{{ person.email }}</h5>
      </div>
    </div>

    <div v-if="isMainResponsible" class="absolute top-0 left-0">
      <div class="bg-apricot text-white text-sm rounded-br-xl rounded-tl-xl px-3">
        Responsible
      </div>
    </div>
  </NuxtLink>
</template>
