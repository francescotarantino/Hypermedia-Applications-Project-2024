<script setup lang="ts">
defineProps<{
  to: string;
}>();

const toggleMenu = inject<() => void>('toggleMenu');
</script>

<template>
  <NuxtLink :to="to" @click="toggleMenu" class="p-2 text-xl text-primary rounded-lg hover:bg-peach transition ease-in-out duration-200">
    <slot />
  </NuxtLink>
</template>
