<script setup lang="ts">
/**
 * @property {string} to - The path to navigate to
 * @property {boolean} [exactMatch] - Whether the link should be active (changes background) only when the path matches exactly
 */
defineProps<{
  to: string;
  exactMatch?: boolean;
}>();

const closeMenu = inject<() => void>('closeMenu');

const route = useRoute();
</script>

<template>
  <NuxtLink class="p-2 text-xl rounded-lg hover:bg-peach transition ease-in-out duration-200"
            :class="((exactMatch && route.fullPath === to) || (!exactMatch && route.fullPath.startsWith(to))) && 'bg-peach bg-opacity-50'"
            :to="to" @click="closeMenu">
    <slot />
  </NuxtLink>
</template>
