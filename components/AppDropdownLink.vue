<script setup lang="ts">
defineProps<{
  to: string;
}>();

const toggleMenu = inject<() => void>('toggleMenu');
</script>

<template>
  <NuxtLink :to="to" @click="toggleMenu" class="block px-4 py-2 bg-cream rounded-lg hover:bg-peach transition ease-in-out duration-200" role="menuitem">
    <p class="text-primary text-lg">
      <slot />
    </p>
  </NuxtLink>
</template>
