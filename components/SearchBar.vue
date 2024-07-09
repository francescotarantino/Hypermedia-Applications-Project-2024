<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

// The component emits a 'search-query' event with the search query string
defineEmits<{
  (e: 'search-query' , query: string): void;
}>();

const isFocused = ref<boolean>(false);
const query = ref<string>('');
const isOpened = computed(() => isFocused.value || query.value.length > 0);
</script>

<template>
  <div class="relative">
    <!-- Hidden label for accessibility -->
    <label for="search" class="sr-only">Search</label>

    <input id="search" type="search" placeholder="Search..."
           v-model="query"
           @input="$emit('search-query', query)"
           @focus="isFocused = true" @blur="isFocused = false"
           :class="isOpened ? 'w-72' : 'w-0'"
           class="border-2 border-orange rounded-xl py-2.5 pl-11 outline-none transition-all duration-500 ease-in-out cursor-pointer focus:cursor-text" />

    <MagnifyingGlassIcon class="pointer-events-none absolute top-1/2 transform -translate-y-1/2 w-6 h-6 left-3" />
  </div>
</template>
