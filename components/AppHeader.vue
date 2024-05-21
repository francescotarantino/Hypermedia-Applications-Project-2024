<template>
  <header class="bg-primary-light">
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center gap-8">
        <div>
          <NuxtLink to="/">
            <h1 class="text-primary text-5xl">SHE-centre</h1>
            <h4 class="text-primary text-xl">Signal for Help Empowerment centre</h4>
          </NuxtLink>
        </div>
        <NuxtLink to="/">
          <img src="/logo.png" alt="Centre logo" class="w-32 h-32" />
        </NuxtLink>
        <div class="flex items-center">
          <a href="tel:800022399" class="flex flex-row gap-2 items-center">
            <PhoneIcon class="size-7 text-primary" />
            <p class="text-primary text-4xl">800 02 2399</p>
          </a>
        </div>
      </div>
    </div>
  </header>
  <div class="sticky top-0 bg-primary-light drop-shadow">
    <div class="h-2 bg-gradient-to-r from-secondary to-tertiary"></div>
    <div class="text-lg">
      <nav class="container mx-auto flex items-center justify-center">
        <div class="flex items-center">
          <div class="pr-16">
            <NuxtLink to="/">
              <HomeIcon v-if="!isScrolled" class="size-6 text-primary"/>
              <img v-else src="/logo.png" alt="Centre logo" class="w-16 h-16"/>
            </NuxtLink>
          </div>
          <div class="p-6 flex gap-20">
            <NuxtLink to="/about-us">About Us</NuxtLink>
            <AppDropdown title="Activities" hyperlink="/activities">
              <AppDropdownContent>
                <NuxtLink to="/activities/services" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                  <p class="text-base">Services</p>
                </NuxtLink>

                <NuxtLink to="/activities/projects" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                  <p class="text-base">Projects</p>
                </NuxtLink>
              </AppDropdownContent>
            </AppDropdown>
            <NuxtLink to="/people">People</NuxtLink>
            <NuxtLink to="/contact-us">Contact Us</NuxtLink>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { PhoneIcon, HomeIcon } from '@heroicons/vue/24/solid'
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 180;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>
