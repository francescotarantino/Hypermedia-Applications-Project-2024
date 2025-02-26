<script setup lang="ts">
import { PhoneIcon, Bars3Icon } from '@heroicons/vue/24/solid'

const isMenuOpen = ref<boolean>(false);

// Toggle mobile menu visibility
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  if (isMenuOpen.value) {
    toggleMenu();
  }
}

provide<() => void>('closeMenu', closeMenu);

onMounted(() => {
  window.addEventListener('resize', closeMenu);
});

onUnmounted(() => {
  window.removeEventListener('resize', closeMenu);
});
</script>

<template>
  <!-- Header Section -->
  <header class="bg-none bg-center bg-contain bg-no-repeat z-header">
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center gap-8">
        <!-- Logo and Centre Name -->
        <NuxtLink to="/">
          <div class="flex items-center gap-2 sm:gap-8">
            <img src="/logo.png" alt="" class="w-16 h-16 md:w-32 md:h-32" />
            <div>
              <h1 class="text-3xl lg:text-5xl">SHE Centre</h1>
              <p class="hidden md:block md:text-xl">Signal for Help Empowerment Centre</p>
            </div>
          </div>
        </NuxtLink>
        <!-- Phone Number Section -->
        <div class="hidden lg:flex items-center hover:text-orange transition ease-in-out duration-200" aria-hidden="true">
          <a href="tel:800022399" class="flex flex-row gap-2 items-center">
            <PhoneIcon class="size-7" />
            <p class="text-4xl">800 02 2399</p>
          </a>
        </div>
        <!-- Hamburger Icon for Mobile View -->
        <div class="sm:hidden pr-4">
          <button @click="toggleMenu" class="p-2 rounded-md hover:bg-cream transition ease-in-out duration-200"
                  aria-label="Toggle navigation bar" :aria-expanded="isMenuOpen ? 'true' : 'false'">
            <Bars3Icon class="size-7" />
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Navigation Bar -->
  <div class="sticky top-0 drop-shadow z-header">
    <!-- Division Line Bar -->
    <div class="h-2 bg-gradient-to-r from-orange via-apricot to-orange"/>

    <nav class="hidden sm:flex flex-col items-center justify-center text-lg bg-cream h-full">
      <div class="p-2 lg:p-4 flex gap-8 lg:gap-14 flex-col sm:flex-row text-center items-center">
        <AppNavbar />
      </div>
    </nav>

    <div class="overflow-hidden w-full absolute">
      <transition name="navbar">
        <nav v-if="isMenuOpen">
          <div class="p-2 flex gap-4 flex-col text-center items-center bg-cream">
            <AppNavbar />
          </div>
        </nav>
      </transition>
    </div>
  </div>
</template>

