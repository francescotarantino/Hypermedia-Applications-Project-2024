<script setup lang="ts">
const route = useRoute();
const { data: service, error } = await useFetch<IService>(`/api/services/${route.params.id}`);

if (error.value) {
  throw createError({statusCode: 404});
}

useSeoMeta({
  title: service?.value?.name,
  description: service?.value?.abstract,
  ogTitle: service?.value?.name + ' at SHE Centre',
  ogImageUrl: service?.value?.main_image.path,
  ogDescription: service?.value?.abstract,
});
</script>

<template>
  <section>
    <p class="text-md text-center text-orange font-bold">Service</p>

    <div class="container mx-auto max-w-7xl">
      <h1 class="text-3xl text-center text-orange font-bold mt-4 mb-8">{{service?.name}}</h1>

      <div class="flex flex-col gap-8">
        <ActivityHeader :activity="service as IActivity" />

        <ActivityDescription :activity="service as IActivity" />

        <!-- Service hours and testimonials -->
        <div class="flex items-center flex-col lg:flex-row lg:items-start gap-4 lg:gap-12 justify-center px-8">
          <div class="max-w-md">
            <h2 class="text-2xl text-center text-orange font-bold my-8">Service hours</h2>

            <div class="flex flex-col items-center gap-4">
              <HoursTable v-if="service?.service_hours" :hours="service?.service_hours || []" />

              <p v-if="service?.service_hours_description" class="text-center">
                {{service?.service_hours_description}}
              </p>
            </div>
          </div>

          <div class="w-full max-w-2xl">
            <h2 class="text-2xl text-center text-orange font-bold my-8">Testimonials</h2>

            <CardCarousel :items="service?.service_testimonials">
              <template #default="{ item }">
                <TestimonialCard :testimonial="item" class="h-full" />
              </template>
            </CardCarousel>
          </div>
        </div>

        <ActivityPeople :activity="service as IActivity" />
      </div>
    </div>
  </section>
</template>