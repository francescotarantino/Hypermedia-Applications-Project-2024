<script setup lang="ts">
const route = useRoute();
const { data: service } = await useFetch<IService>(`/api/services/${route.params.id}`);

useSeoMeta({
  ogTitle: service?.value?.name,
  description: service?.value?.abstract,
  ogImageUrl: service?.value?.main_image.path,
});
</script>

<template>
  <section>
    <h5 class="text-md text-center text-orange font-bold">Service</h5>

    <ActivityInfoSection :activity="service as IActivity" />

    <h2 class="text-2xl text-center text-orange font-bold my-8">Testimonials</h2>

    <div class="flex justify-center">
      <div class="flex flex-col gap-4 mx-auto md:w-3/4">
        <TestimonialCard v-for="(testimonial, index) in service?.service_testimonials" :key="index" :testimonial="testimonial" />
      </div>
    </div>
  </section>
</template>