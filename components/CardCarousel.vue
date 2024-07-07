<script setup lang="ts">
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/24/outline";

const SLIDE_TIMEOUT = 10000;

// Items of the carousel
const props = defineProps<{
  items: Array<any> | undefined;
}>();

// State of the component: current index of the image being displayed and interval for automatic sliding
const currentIndex = ref(0);
const animation = ref<'slide' | 'slideback'>('slide');
let interval: NodeJS.Timeout;

const nextSlide = () => {
  animation.value = 'slide';
  stopSlider();
  currentIndex.value = (currentIndex.value + 1) % props.items!.length;
};

const prevSlide = () => {
  animation.value = 'slideback';
  stopSlider();
  currentIndex.value = (currentIndex.value - 1 + props.items!.length) % props.items!.length;
};

const startSlider = () => {
  interval = setInterval(() => {
    nextSlide();
  }, SLIDE_TIMEOUT);
};

const stopSlider = () => {
  clearInterval(interval);
}

// On mount, start automatic sliding
onMounted(() => {
  startSlider();
});

// On unmount, stop automatic sliding
onUnmounted(() => {
  stopSlider();
});
</script>

<template>
  <div class="flex">
    <div class="flex mx-auto justify-center w-screen md:w-[600px] h-[400px] md:h-[300px] relative overflow-hidden">
      <!-- Items -->
      <transition-group :name="animation">
        <template v-for="(item, index) in items" :key="index">
          <div v-if="index === currentIndex" class="absolute w-full h-full p-2 px-12">
            <slot :item="item" :active="index === currentIndex" />
          </div>
        </template>
      </transition-group>

      <!-- Next button -->
      <button class="absolute right-0 top-1/2 ms-3 cursor-pointer z-50 hover:bg-cream hover:bg-opacity-60 rounded-md transition ease-in-out duration-500 transform-gpu"
              @click="nextSlide" aria-label="Next">
        <ChevronRightIcon class="size-9" />
      </button>

      <!-- Previous button -->
      <button class="absolute left-0 top-1/2 mr-3 cursor-pointer z-50 hover:bg-cream hover:bg-opacity-60 rounded-md transition ease-in-out duration-500 transform-gpu"
              @click="prevSlide" aria-label="Previous">
        <ChevronLeftIcon class="size-9"/>
      </button>
    </div>
  </div>
</template>
