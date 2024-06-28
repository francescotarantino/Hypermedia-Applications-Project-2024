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

    <div class="container mx-auto max-w-7xl">
      <h1 class="text-3xl text-center text-orange font-bold mt-4 mb-8">{{service?.name}}</h1>

      <div class="flex flex-col gap-8">
        <ActivityHeader :activity="service as IActivity" />

        <ActivityDescription :activity="service as IActivity" />

        <!-- Service hours and testimonials -->
        <div class="flex items-center flex-col lg:flex-row lg:items-start gap-4 lg:gap-12 justify-center">
          <div class="max-w-md">
            <h2 class="text-2xl text-center text-orange font-bold my-8">Service hours</h2>

            <div class="flex flex-col items-center gap-4">
              <HoursTable v-if="service?.service_hours" :hours="service?.service_hours || []" />

              <p v-if="service?.service_hours_description" class="text-center px-4">
                {{service?.service_hours_description}}
              </p>
            </div>
          </div>

          <div>
            <h2 class="text-2xl text-center text-orange font-bold my-8">Testimonials</h2>

            <CardCarousel :items="service?.service_testimonials">
              <template #default="{ item, active }">
                <TestimonialCard :testimonial="item" :active="active" class="h-full" />
              </template>
            </CardCarousel>
          </div>
        </div>

        <ActivityPeople :activity="service as IActivity" />
      </div>
    </div>
  </section>
</template>