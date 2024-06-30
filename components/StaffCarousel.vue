<script setup lang="ts">
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/24/outline";

const SLIDE_TIMEOUT = 10000;

// Define props with types
const props = defineProps<{
  items: Array<any> | undefined;
}>(); // Ensure items is an array of any type or undefined

// State variables
const currentIndex = ref<number>(0); // Current index of the displayed image
const animation = ref<'carousel' | 'carouselback'>('carousel'); // Animation state
let interval: NodeJS.Timeout; // Interval for automatic sliding

// Navigate to next slide
const nextSlide = () => {
  animation.value = 'carousel';
  stopSlider();
  currentIndex.value = (currentIndex.value + 1) % (props.items ? props.items.length : 0);
  startSlider();
};

// Navigate to previous slide
const prevSlide = () => {
  animation.value = 'carouselback';
  stopSlider();
  currentIndex.value = (currentIndex.value - 1 + (props.items ? props.items.length : 0)) % (props.items ? props.items.length : 0);
  startSlider();
};

// Start automatic sliding
const startSlider = () => {
  interval = setInterval(() => {
    nextSlide();
  }, SLIDE_TIMEOUT);
};

// Stop automatic sliding
const stopSlider = () => {
  clearInterval(interval);
};

// On component mount, start automatic sliding
onMounted(() => {
  startSlider();
});

// On component unmount, stop automatic sliding
onUnmounted(() => {
  stopSlider();
});

// Helper function to get visible items
const getVisibleItems = (startIndex: number) => {
  const visible = [];
  for (let i = 0; i < 3; i++) {
    if (props.items) {
      visible.push(props.items[(startIndex + i) % props.items.length]);
    }
  }
  return visible;
};

// Computed property for visible items
const visibleItems = computed(() => getVisibleItems(currentIndex.value));
</script>

<template>
  <div class="relative">
    <!-- Navigation buttons -->
    <ChevronRightIcon class="absolute size-9 right-0 top-1/2 m-2 cursor-pointer text-primary z-50 drop-shadow hover:opacity-80"
                      @click="nextSlide" />
    <ChevronLeftIcon class="absolute size-9 left-0 top-1/2 m-2 cursor-pointer text-primary z-50 drop-shadow hover:opacity-80"
                     @click="prevSlide" />
    
    <!-- Items -->
    <div class="max-w-screen-lg mx-auto">
      <transition-group name="carousel" tag="div" class="grid justify-items-center grid-cols-1 sm:grid-cols-3 gap-4">
        <template v-for="(item, index) in visibleItems" :key="index">
          <div class="grid p-2">
            <slot :item="item" :active="index === 0" />
          </div>
        </template>
      </transition-group>
    </div>
  </div>
</template>