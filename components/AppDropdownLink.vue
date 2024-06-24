<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>

<template>
  <NuxtLink :to="to" class="block px-4 py-2 bg-cream hover:bg-peach rounded-lg" role="menuitem">
    <p class="text-primary text-lg">
      <slot />
    </p>
  </NuxtLink>
</template>
