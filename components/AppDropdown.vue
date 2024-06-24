<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

// Props for title and link
defineProps<{
  title: string;
  to: string;
}>();
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

<script lang="ts">
export default {
  // Providing shared state
  provide() {
    return {
      sharedState: this.sharedState
    }
  },
  // Data for shared state
  data() {
    return {
      sharedState: {
        active: false
      }
    }
  },
  // Methods for toggling and showing dropdown
  methods: {
    toggle() {
      this.sharedState.active = !this.sharedState.active;
    }
  }
}
</script>
