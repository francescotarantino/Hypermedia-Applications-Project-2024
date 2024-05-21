<template>
  <!-- Header Section -->
  <header class="bg-primary-light text-primary">
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center gap-8">
        <div class="flex items-center gap-8">
          <!-- Logo and Centre Name -->
          <NuxtLink to="/">
            <img src="/logo.png" alt="Centre logo" class="w-32 h-32" />
          </NuxtLink>
          <NuxtLink to="/">
            <h1 class="text-5xl">SHE-centre</h1>
            <h4 class="text-xl">Signal for Help Empowerment centre</h4>
          </NuxtLink>
        </div>
        <!-- Phone Number Section -->
        <div class="flex items-center rounded-lg hover:shadow-lg hover:bg-primary-light-highlight">
          <a href="tel:800022399" class="flex flex-row gap-2 items-center">
            <PhoneIcon class="size-7" />
            <p class="text-4xl">800 02 2399</p>
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- Navigation Bar -->
  <div class="sticky top-0 bg-primary-light drop-shadow">
    <div class="h-2 bg-gradient-to-r from-secondary to-tertiary"></div>
    <nav class="container mx-auto flex items-center justify-center text-lg">
      <div class="pr-16">
        <!-- Home Link -->
        <NuxtLink to="/">
          <HomeIcon v-if="!isScrolled" class="size-6 text-primary rounded-lg hover:shadow-lg hover:bg-primary-light-highlight"/>
          <img v-else src="/logo.png" alt="Centre logo" class="w-16 h-16"/>
        </NuxtLink>
      </div>
      <div class="p-4 flex gap-20">
        <!-- Activities Link -->
        <NuxtLink to="/about-us" class="rounded-lg hover:shadow-lg hover:bg-primary-light-highlight">About Us</NuxtLink>
        <AppDropdown title="Activities" hyperlink="/activities" class="rounded-lg hover:shadow-lg hover:bg-primary-light-highlight">
          <AppDropdownContent>
            <!-- Services Link -->
            <NuxtLink to="/activities/services" class="block px-4 py-2 text-sm bg-primary-light hover:bg-primary-light-highlight rounded-lg hover:shadow-lg" role="menuitem">
              <p class="text-base">Services</p>
            </NuxtLink>
            <!-- Projects Link -->
            <NuxtLink to="/activities/projects" class="block px-4 py-2 text-sm bg-primary-light hover:bg-primary-light-highlight rounded-lg hover:shadow-lg" role="menuitem">
              <p class="text-base">Projects</p>
            </NuxtLink>
          </AppDropdownContent>
        </AppDropdown>
        <!-- People Link -->
        <NuxtLink to="/people" class="rounded-lg hover:shadow-lg hover:bg-primary-light-highlight">People</NuxtLink>
        <!-- Contact Us Link -->
        <NuxtLink to="/contact-us" class="rounded-lg hover:shadow-lg hover:bg-primary-light-highlight">Contact Us</NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { PhoneIcon, HomeIcon } from '@heroicons/vue/24/solid'

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

</script>
