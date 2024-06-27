<script setup lang="ts">
defineProps<{
  to: string;
}>();

const toggleMenu = inject<() => void>('toggleMenu');
const route = useRoute();
</script>

<template>
  <NuxtLink class="p-2 text-xl text-primary rounded-lg hover:bg-peach transition ease-in-out duration-200"
            :to="to" @click="toggleMenu" active-class="bg-peach bg-opacity-50">
    <slot />
  </NuxtLink>
</template>
