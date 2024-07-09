<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <NuxtLayout>
    <div class="container mx-auto px-4 w-3/4">
      <div v-if="error.statusCode === 404">
        <h1 class="text-3xl text-center text-orange font-bold mt-4 mb-8">
          Page Not Found
        </h1>
        <p class="text-lg text-center mb-8">
          The page you are looking for does not exist. Please check the URL or return to the
          <NuxtLink to="/" class="underline">home page</NuxtLink>.
        </p>
      </div>

      <div v-else>
        <h1 class="text-3xl text-center text-orange font-bold mt-4 mb-8">
          Error {{ error.statusCode }}
        </h1>
        <p class="text-lg text-center mb-8">
          {{ error.message }}
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
