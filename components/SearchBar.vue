<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

// The component emits a 'search-query' event with the search query string
defineEmits<{
  (e: 'search-query' , query: string): void;
}>();
</script>

<template>
  <div class="relative w-full">
    <!-- Hidden label for accessibility -->
    <label for="search" class="sr-only">Search</label>

    <input id="search" type="search" placeholder="Search..."
           @input="$emit('search-query', ($event.target as HTMLInputElement).value)"
           class="border-2 border-orange rounded-xl py-2 pl-10 pr-3 focus:outline-none w-full" />

    <MagnifyingGlassIcon class="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6" />
  </div>
</template>
