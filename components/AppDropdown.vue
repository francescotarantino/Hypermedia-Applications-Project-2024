<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

// Props for title and link
defineProps<{
  title: string;
  to: string;
}>();

// Ref for the dropdown active state
const dropdownActive = ref(false);

// Method for toggling the dropdown
const toggle = () => {
  dropdownActive.value = !dropdownActive.value;
};

// Providing the active state to the dropdown content
provide('dropdownActive', dropdownActive);
</script>

<template>
  <!-- Container for the dropdown menu -->
  <div class="relative inline-block text-center" @mouseenter="toggle" @mouseleave="toggle">
    <!-- Dropdown menu content -->
    <div class="flex flex-row items-center gap-1 justify-center w-full" id="options-menu" aria-haspopup="true">
      <!-- Link with title -->
      <NuxtLink :to="to">{{title}}</NuxtLink>
      <!-- Button to toggle dropdown -->
      <button @click="toggle">
        <ChevronDownIcon class="size-4" />
      </button>
    </div>
    <!-- Slot for additional content -->
    <slot />
  </div>
</template>
