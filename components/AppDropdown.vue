<template>
  <div class="relative inline-block text-center">
    <div class="flex flex-row items-center gap-1 justify-center w-full" id="options-menu" aria-haspopup="true">
      <NuxtLink :to="hyperlink">{{title}}</NuxtLink>
      <button @click="toggle">
        <ChevronDownIcon class="size-4" />
      </button>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import {ChevronDownIcon} from "@heroicons/vue/24/solid";
defineProps({
  title: String,
  hyperlink: String
})
</script>

<script lang="ts">
export default {
  provide () {
    return {
      sharedState: this.sharedState
    }
  },
  data () {
    return {
      sharedState: {
        active: false
      }
    }
  },
  methods: {
    toggle () {
      this.sharedState.active = !this.sharedState.active
    }
  }
}
</script>
