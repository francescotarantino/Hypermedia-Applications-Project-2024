<script setup lang="ts">
// Inject the active state from the dropdown component
const dropdownActive = inject('dropdownActive');
</script>

<template>
  <transition name="fade">
    <!-- Wrapping div with conditional rendering based on 'active' state -->
    <div v-if="dropdownActive">
      <!-- Dropdown menu container -->
      <div class="origin-top-right bg-cream text-primary absolute right-0 mt-2 w-full rounded-md drop-shadow-xl">
        <!-- Dropdown menu items -->
        <div class="m-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <!-- Dropdown content -->
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>
