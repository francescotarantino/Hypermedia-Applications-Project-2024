<script setup lang="ts">
/**
 * This component displays a link in a dropdown menu.
 * @property {string} to - The path to navigate to when the link is clicked.
 */
defineProps<{
  to: string;
}>();

const closeMenu = inject<() => void>('closeMenu');
</script>

<template>
  <NuxtLink class="block p-2 bg-cream rounded-lg hover:bg-peach transition ease-in-out duration-200" role="menuitem"
            :to="to" @click="closeMenu" active-class="bg-peach bg-opacity-50">
    <p class="text-lg">
      <!-- Slot for the link text -->
      <slot />
    </p>
  </NuxtLink>
</template>
