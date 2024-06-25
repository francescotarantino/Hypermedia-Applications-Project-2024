<script setup lang="ts">
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/24/outline";

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
  }, 10000);
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
    <div class="flex mx-auto justify-center relative w-[400px] h-[500px] m-auto">
      <!-- Images -->
      <template v-for="(image, index) in images" :key="index">
        <!-- Fade transition -->
        <transition name="fade">
          <img :src="image.path" :alt="image.label" class="absolute w-full h-full rounded-xl object-cover"
               v-if="index === currentIndex" />
        </transition>
      </template>

      <!-- Navigation buttons -->
      <ChevronRightIcon class="absolute size-9 right-0 top-1/2 m-2 cursor-pointer text-white z-50 drop-shadow hover:opacity-80"
                        @click="nextSlide" />
      <ChevronLeftIcon class="absolute size-9 left-0 top-1/2 m-2 cursor-pointer text-white z-50 drop-shadow hover:opacity-80"
                        @click="prevSlide" />
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s, transform 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(0);
}
</style>
