<template>
  <div v-if="active">
    <div class="origin-top-right bg-secondary-light text-primary absolute right-0 mt-2 w-24 rounded-md shadow-lg ring-1 ring-primary ring-opacity-50">
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['sharedState'],
  computed: {
    active () {
      return this.sharedState.active
    }
  }
}
</script>