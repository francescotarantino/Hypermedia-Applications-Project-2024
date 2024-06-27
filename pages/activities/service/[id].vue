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

    <CardCarousel :items="service?.service_testimonials">
      <template #default="{ item, active }">
        <TestimonialCard :testimonial="item" :active="active" class="h-full" />
      </template>
    </CardCarousel>
  </section>
</template>