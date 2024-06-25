<script setup lang="ts">
// Inject the active state from the dropdown component
const dropdownActive = inject('dropdownActive');
</script>

<template>
  <transition name="fade">
    <!-- Wrapping div with conditional rendering based on 'active' state -->
    <div v-if="dropdownActive">
      <!-- Dropdown menu container -->
      <div class="origin-top-right bg-cream text-primary absolute right-0 mt-2 w-full rounded-md ring-1 ring-primary ring-opacity-10">
        <!-- Dropdown menu items -->
        <div class="p-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <!-- Inserting slot content here -->
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
