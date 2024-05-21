<template>
  <div class="relative inline-block text-left">
    <div>
      <button @click="toggle" class="flex flex-row items-center gap-1 justify-center w-full" id="options-menu" aria-haspopup="true">
        <slot name="title" />
        <ChevronDownIcon class="size-4" />
      </button>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import {ChevronDownIcon} from "@heroicons/vue/24/solid";
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
