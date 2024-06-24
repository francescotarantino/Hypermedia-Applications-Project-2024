<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>

<template>
  <NuxtLink :to="to" class="p-2 text-xl text-primary rounded-lg hover:bg-peach">
    <slot />
  </NuxtLink>
</template>
