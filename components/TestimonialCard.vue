<script setup lang="ts">
defineProps<{
  testimonial: ITestimonial;
}>();
</script>

<template>
  <div class="flex flex-col bg-cream rounded-2xl drop-shadow p-8 items-center">
    <h2 class="text-2xl font-bold text-orange">{{ testimonial.name }}</h2>

    <h5 class="text-md font-semibold text-orange">
      {{ new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date(testimonial.date)) }}
    </h5>

    <div class="flex-grow" />

    <p class="text-lg text-center text-gray-600">
      ‟{{testimonial.comment}}”
    </p>

    <div class="flex-grow" />
  </div>
</template>
