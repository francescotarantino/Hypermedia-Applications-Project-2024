<script setup lang="ts">
const isFlipped = ref(false);

/**
 * @property {string} front - The text to display on the front of the card.
 * @property {Component} icon - The icon to display on the front of the card.
 * @property {string} back - The text to display on the back of the card.
 */
defineProps<{
  front: string;
  icon: Component;
  back: string;
}>();
</script>

<template>
  <div class="w-64 h-64 bg-transparent cursor-pointer">
    <div
        class="w-full h-full relative transform-gpu hover:drop-shadow-2xl transition duration-500 ease-in-out perspective-1000"
        @click="isFlipped = !isFlipped"
        :aria-label="`${front}: ${back}`" tabindex="0" @keydown.enter="isFlipped = !isFlipped"
    >
      <!-- Back -->
      <div class="flex w-full h-full absolute bg-peach items-center justify-center rounded-xl duration-700 ease-in-out transform-gpu"
           :class="isFlipped ? 'rotate-y-180-back' : 'rotate-y-0-back'"
           aria-hidden="true"
      >
        <p class="flex-col p-4 text-center text-lg rotate-y-180-back">{{ back }}</p>
      </div>

      <!-- Front -->
      <div class="flex w-full h-full absolute bg-cream border border-orange items-center justify-center rounded-xl backface-hidden duration-700 ease-in-out transform-gpu"
           :class="isFlipped ? 'rotate-y-180-front' : 'rotate-y-0-front'"
           aria-hidden="true"
      >
        <div class="flex flex-col items-center justify-center gap-4">
          <p class="text-orange font-bold te xt-center text-3xl">{{ front }}</p>
          <component :is="icon" class="text-orange flex-row w-10 h-10" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.rotate-y-0-back {
  transform: rotateY(0deg) translateZ(1px);
}

.rotate-y-180-back {
  transform: rotateY(180deg) translateZ(1px);
}

.rotate-y-0-front {
  transform: rotateY(0deg) translateZ(1px);
}

.rotate-y-180-front {
  transform: rotateY(180deg) translateZ(1px);
}

</style>