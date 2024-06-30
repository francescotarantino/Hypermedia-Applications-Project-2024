<script setup lang="ts">
defineProps<{
  to: string;
}>();

const closeMenu = inject<() => void>('closeMenu');
</script>

<template>
  <NuxtLink class="p-2 text-xl text-primary rounded-lg hover:bg-peach transition ease-in-out duration-200"
            :to="to" @click="closeMenu" active-class="bg-peach bg-opacity-50">
    <slot />
  </NuxtLink>
</template>
