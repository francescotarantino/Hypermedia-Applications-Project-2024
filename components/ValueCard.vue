<script setup lang="ts">
const isFlipped = ref(false);

defineProps<{
  value: {
    name: string;
    description: string;
  };
}>();

</script>

<template>
  <div class="w-64 h-64 bg-transparent perspective-1000 cursor-pointer m-2">
    <div
        :class="{ 'rotate-y-180': isFlipped }"
        class="w-full h-full relative duration-700 ease-in-out transform-gpu hover:drop-shadow-2xl transition"
        @click="isFlipped = !isFlipped"
    >
      <div class="flex w-full h-full absolute bg-peach items-center justify-center rounded-xl backface-hidden ">
        <p class="flex-col p-4 text-primary text-center text-lg rotate-y-180">{{value.description}}</p>
      </div>
      <div class="flex w-full h-full absolute bg-cream border border-orange items-center justify-center rounded-xl transform backface-hidden ">
        <p class="flex-col p-4 text-orange font-bold text-center text-3xl">{{ value.name }}</p>
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
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>