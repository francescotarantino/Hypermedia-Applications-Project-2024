<template>
  <!-- Wrapping div with conditional rendering based on 'active' state -->
  <div v-if="active">
    <!-- Dropdown menu container -->
    <div class="origin-top-right bg-primary-light text-primary absolute right-0 mt-2 w-24 rounded-md shadow-lg ring-1 ring-primary ring-opacity-50">
      <!-- Dropdown menu items -->
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <!-- Inserting slot content here -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Injecting sharedState dependency
  inject: ['sharedState'],
  computed: {
    // Computed property to determine dropdown visibility
    active() {
      return this.sharedState.active;
    }
  }
};
</script>
