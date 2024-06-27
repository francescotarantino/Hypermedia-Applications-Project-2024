<script setup lang="ts">
defineProps<{
  to: string;
}>();

const toggleMenu = inject<() => void>('toggleMenu');
</script>

<template>
  <NuxtLink class="block p-2 bg-cream rounded-lg hover:bg-peach transition ease-in-out duration-200" role="menuitem"
            :to="to" @click="toggleMenu" active-class="bg-peach bg-opacity-50">
    <p class="text-primary text-lg">
      <slot />
    </p>
  </NuxtLink>
</template>
