<script setup lang="ts">
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/24/outline";

const SLIDE_TIMEOUT = 10000;

/**
 * @property {Array<any>} items - The items to display in the carousel
 * @property {boolean} largeOnSmallScreen - Whether to display the carousel in a larger size on small screens
 */
const props = defineProps<{
  items: Array<any> | undefined;
  largeOnSmallScreen?: boolean;
}>();

// State of the component: current index of the image being displayed and interval for automatic sliding
const currentIndex = ref(0);
const animation = ref<'slide' | 'slideback'>('slide');
let interval: NodeJS.Timeout;

function nextSlide() {
  stopSlider();
  animation.value = 'slide';
  currentIndex.value = (currentIndex.value + 1) % props.items!.length;
}

function prevSlide() {
  stopSlider();
  animation.value = 'slideback';
  currentIndex.value = (currentIndex.value - 1 + props.items!.length) % props.items!.length;
}

function startSlider() {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.items!.length;
  }, SLIDE_TIMEOUT);
}

function stopSlider() {
  clearInterval(interval);
}

// On mount, start automatic sliding
onMounted(startSlider);

// On unmount, stop automatic sliding
onUnmounted(stopSlider);
</script>

<template>
  <div class="flex justify-center w-screen sm:w-full -mx-8 sm:mx-0 relative overflow-hidden"
       :class="largeOnSmallScreen ? 'h-[470px] sm:h-[320px]' : 'h-[350px]'">
    <!-- Items -->
    <transition-group :name="animation">
      <template v-for="(item, index) in items" :key="index">
        <div v-if="index === currentIndex" class="absolute w-full h-full px-10 pb-8">
          <slot :item="item" />
        </div>

        <div v-else />
      </template>
    </transition-group>

    <!-- Next button -->
    <button class="absolute right-0 top-[calc(50%-2rem)] cursor-pointer z-50 hover:bg-cream hover:bg-opacity-60 rounded-md transition ease-in-out duration-500 transform-gpu"
            @click="nextSlide" aria-label="Next">
      <ChevronRightIcon class="size-9" />
    </button>

    <!-- Previous button -->
    <button class="absolute left-0 top-[calc(50%-2rem)] cursor-pointer z-50 hover:bg-cream hover:bg-opacity-60 rounded-md transition ease-in-out duration-500 transform-gpu"
            @click="prevSlide" aria-label="Previous">
      <ChevronLeftIcon class="size-9"/>
    </button>
  </div>
</template>
