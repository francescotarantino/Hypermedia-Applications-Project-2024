<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

/**
 * @property {string} title - The title of the dropdown
 * @property {string} activeWhenPathStartsWith - The path that should highlight the dropdown
 */
defineProps<{
  title: string;
  activeWhenPathStartsWith: string;
}>();

// Ref for the dropdown active state
const dropdownActive = ref<boolean>(false);

function closeDropdown() {
  dropdownActive.value = false;
}

function openDropdown() {
  dropdownActive.value = true;
}

function toggleDropdown() {
  dropdownActive.value = !dropdownActive.value;
}

// Providing the active state to the dropdown content
provide<Ref<boolean>>('dropdownActive', dropdownActive);

const route = useRoute();
</script>

<template>
  <!-- Container for the dropdown menu -->
  <div class="relative inline-block text-center p-2 text-xl rounded-lg hover:bg-peach transition ease-in-out duration-200 transform-gpu cursor-pointer"
       @mouseenter="openDropdown" @mouseleave="closeDropdown" @click="toggleDropdown"
       :class="{'bg-peach bg-opacity-50' : route.fullPath.startsWith(activeWhenPathStartsWith)}">
    <!-- Dropdown menu content -->
    <div class="flex flex-row items-center gap-1 justify-center w-full" id="options-menu" aria-haspopup="true">
      <!-- Link with title -->
      {{title}}

      <!-- Dropdown icon -->
      <ChevronDownIcon class="size-4" />
    </div>
    <!-- Dropdown content -->
    <slot />
  </div>
</template>
