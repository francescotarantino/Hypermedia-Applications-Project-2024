<template>
  <!-- Header Section -->
  <header class="bg-none bg-center bg-contain bg-no-repeat xl:bg-[url('/mani.svg')] text-primary" style="z-index: 999999">
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center gap-8">
        <div class="flex  items-center gap-2 sm:gap-8">
          <!-- Logo and Centre Name -->
          <NuxtLink to="/" class="w-16 h-16 md:w-32 md:h-32">
            <img src="/logo.png" alt="Centre logo" class="w-fit" />
          </NuxtLink>
          <NuxtLink to="/">
            <h1 class="text-3xl lg:text-5xl">SHE-centre</h1>
            <h4 class="hidden md:block md:text-xl">Signal for Help Empowerment centre</h4>
          </NuxtLink>
        </div>
        <!-- Phone Number Section -->
        <div class="hidden lg:flex items-center hover:text-apricot">
          <a href="tel:800022399" class="flex flex-row gap-2 items-center">
            <PhoneIcon class="size-7" />
            <p class="text-4xl">800 02 2399</p>
          </a>
        </div>
        <!-- Hamburger Icon for Mobile View -->
        <div class="sm:hidden pt-2 pr-4">
          <button @click="toggle">
            <Bars3Icon class="size-7" />
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Navigation Bar -->
  <div class="sticky top-0 bg-cream drop-shadow" style="z-index: 999999">
    <!-- Division Line Bar -->
    <div class="h-2 bg-gradient-to-r from-orange via-apricot to-orange"/>

    <nav class="container mx-auto hidden flex-col sm:flex-row sm:flex items-center justify-center text-lg">
      <div class="p-2 lg:p-4 flex gap-8 lg:gap-14 flex-col sm:flex-row text-center items-center">
        <!-- Home Link -->
        <AppHeaderLink to="/" @click="toggle">
          <HomeIcon class="p-2 size-9 text-primary rounded-lg hover:bg-peach" />
        </AppHeaderLink>
        <!-- Activities Link -->
        <AppHeaderLink to="/about-us" @click="toggle">
          About Us
        </AppHeaderLink>
        <!-- Activities Dropdown -->
        <AppDropdown title="Activities" to="/activities" class="p-2 text-xl text-primary rounded-lg hover:bg-peach">
          <AppDropdownContent>
            <!-- Services Link -->
            <AppDropdownLink to="/activities/services" @click="toggle">
              Services
            </AppDropdownLink>
            <!-- Projects Link -->
            <AppDropdownLink to="/activities/projects" @click="toggle">
              Projects
            </AppDropdownLink>
          </AppDropdownContent>
        </AppDropdown>
        <!-- People Link -->
        <AppHeaderLink to="/people" @click="toggle">
          People
        </AppHeaderLink>
        <!-- Contact Us Link -->
        <AppHeaderLink to="/contact-us" @click="toggle">
          Contact Us
        </AppHeaderLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { PhoneIcon, HomeIcon, Bars3Icon } from '@heroicons/vue/24/solid'

// Reactive variable to track if page is scrolled
const isScrolled = ref(false);

// Function to handle scroll event
const handleScroll = () => {
  // Update isScrolled value based on scroll position
  isScrolled.value = window.scrollY > 180;
};

// Add scroll event listener when component is mounted
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// Remove scroll event listener when component is unmounted
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

function toggle() {
  // Toggle mobile menu visibility
  const nav = document.querySelector('nav');
  if (nav?.classList.contains('hidden')) {
    nav.classList.remove('hidden');
    nav.classList.add('flex');
  } else {
    nav?.classList.remove('flex');
    nav?.classList.add('hidden');
  }
}

</script>
