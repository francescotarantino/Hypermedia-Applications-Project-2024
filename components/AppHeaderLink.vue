<script setup lang="ts">
defineProps<{
  to: string;
}>();

const closeMenu = inject<() => void>('closeMenu');

const route = useRoute();
</script>

<template>
  <NuxtLink class="p-2 text-xl text-primary rounded-lg hover:bg-peach transition ease-in-out duration-200"
            :class="((route.fullPath === '/' && to === '/') || (to !== '/' && route.fullPath.startsWith(to))) && 'bg-peach bg-opacity-50'"
            :to="to" @click="closeMenu">
    <slot />
  </NuxtLink>
</template>
