<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>

<template>
  <NuxtLink :to="to" class="p-2 text-xl text-primary rounded-lg hover:bg-peach transition ease-in-out duration-200">
    <slot />
  </NuxtLink>
</template>
