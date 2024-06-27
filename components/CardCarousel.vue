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
    <div class="flex mx-auto justify-center h-[300px] w-[600px] relative overflow-hidden">
      <!-- Items -->
      <transition-group :name="animation">
        <template v-for="(item, index) in items" :key="index">
          <div v-if="index === currentIndex" class="absolute w-full h-full p-2 px-12">
            <slot :item="item" :active="index === currentIndex" />
          </div>
        </template>
      </transition-group>

      <!-- Navigation buttons -->
      <ChevronRightIcon class="absolute size-9 right-0 top-1/2 cursor-pointer text-primary z-50 drop-shadow hover:opacity-70"
                        @click="nextSlide" />
      <ChevronLeftIcon class="absolute size-9 left-0 top-1/2 cursor-pointer text-primary z-50 drop-shadow hover:opacity-70"
                       @click="prevSlide" />
    </div>
  </div>
</template>
