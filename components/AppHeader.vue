<template>
  <header class="bg-primary-light">
    <div class="container mx-auto p-4">
        <div class="flex flex-row items-center gap-8">
          <NuxtLink to="/">
            <img src="/logo.png" alt="Centre logo" class="w-32 h-32" />
          </NuxtLink>
          <div>
            <NuxtLink to="/">
              <h1 class="text-primary text-5xl">SHE-centre</h1>
              <h4 class="text-primary text-xl">Signal for Help Empowerment</h4>
            </NuxtLink>
          </div>
        </div>
    </div>

    <div class="bg-gradient-to-r from-secondary to-tertiary text-lg">
      <nav class="container mx-auto flex items-center justify-between p-6">
        <div class="flex items-center">
          <a href="tel:+39800022399" class="flex flex-row gap-2 items-center">
            <PhoneIcon class="size-6 text-primary-light" />
            <p class="text-primary-light text-2xl">800 02 2399</p>
          </a>
        </div>
        <div class="flex gap-5">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/about-us">About Us</NuxtLink>
          <AppDropdown>
            <template v-slot:title>
              Activities
            </template>
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
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { PhoneIcon } from '@heroicons/vue/24/solid'
</script>
