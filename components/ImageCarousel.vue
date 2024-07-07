<script setup lang="ts">
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/24/outline";

const SLIDE_TIMEOUT = 5000;

// Props of the component: images to display
const props = defineProps<{
  images: IPicture[];
}>();

// Preload images
useHead({
  link: props.images.map((image) => ({
    rel: "preload",
    href: image.path,
    as: "image",
  }))
});

// State of the component: current index of the image being displayed and interval for automatic sliding
const currentIndex = ref(0);
let interval: NodeJS.Timeout;

const nextSlide = () => {
  stopSlider();
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const prevSlide = () => {
  stopSlider();
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
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
  <div class="flex h-[100%]">
    <div class="flex mx-auto justify-center relative w-screen md:w-[400px] h-[500px] m-auto group">
      <!-- Images -->
      <template v-for="(image, index) in images" :key="index">
        <!-- Fade transition -->
        <transition name="carousel">
          <img :src="image.path" :alt="image.label" class="absolute w-full h-full rounded-xl object-cover"
               v-if="index === currentIndex" />
        </transition>
      </template>

      <!-- Next button -->
      <button class="absolute right-0 top-1/2 mr-3 cursor-pointer text-white z-50 opacity-100 md:opacity-0 group-hover:opacity-100 bg-primary bg-opacity-15 hover:bg-opacity-40 rounded-md transition-all ease-in-out duration-500 transform-gpu"
              @click="nextSlide" aria-label="Next image">
        <ChevronRightIcon class="size-9" />
      </button>

      <!-- Previous button -->
      <button class="absolute left-0 top-1/2 ms-3 cursor-pointer text-white z-50 opacity-100 md:opacity-0 group-hover:opacity-100 bg-primary bg-opacity-15 hover:bg-opacity-40 rounded-md transition-all ease-in-out duration-500 transform-gpu"
              @click="prevSlide" aria-label="Previous image">
        <ChevronLeftIcon class="size-9" />
      </button>
    </div>
  </div>
</template>
