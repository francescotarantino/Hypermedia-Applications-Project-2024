<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

/**
 * @property {string} title - The title of the dropdown
 * @property {string} to - The path to navigate to when the title is clicked
 */
defineProps<{
  title: string;
  to: string;
}>();

// Ref for the dropdown active state
const dropdownActive = ref<boolean>(false);

function closeDropdown() {
  dropdownActive.value = false;
}

function openDropdown() {
  dropdownActive.value = true;
}

// Providing the active state to the dropdown content
provide<Ref<boolean>>('dropdownActive', dropdownActive);

const closeMenu = inject<() => void>('closeMenu');

const route = useRoute();
</script>

<template>
  <!-- Container for the dropdown menu -->
  <div class="relative inline-block text-center p-2 text-xl rounded-lg hover:bg-peach transition ease-in-out duration-200 transform-gpu"
       @mouseenter="openDropdown" @mouseleave="closeDropdown" :class="{'bg-peach bg-opacity-50' : route.fullPath.startsWith(to)}">
    <!-- Dropdown menu content -->
    <div class="flex flex-row items-center gap-1 justify-center w-full" id="options-menu" aria-haspopup="true">
      <!-- Link with title -->
      <NuxtLink :to="to" @click="closeMenu">{{title}}</NuxtLink>

      <!-- Dropdown icon -->
      <ChevronDownIcon class="size-4" />
    </div>
    <!-- Dropdown content -->
    <slot />
  </div>
</template>
