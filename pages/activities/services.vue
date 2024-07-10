<script setup lang="ts">
// Fetch services
const { data: services } = await useFetch<IService[]>('/api/services');

useSeoMeta({
  title: 'Services',
});
</script>

<template>
  <section>
    <div class="container mx-auto px-8 md:w-3/4">
      <h1 class="text-3xl font-semibold text-center text-orange">Services</h1>
      <p class="text-justify text-lg text-gray-600 mt-8 mb-12">
        At SHE Centre we provide a range of essential resources and support tailored to empower women facing domestic violence. 
        Our services have <b>evolved over the years</b> to encompass a comprehensive approach to healing and empowerment.
        From <b>crisis intervention</b> and <b>safe shelter</b> to <b>legal advocacy</b>, <b>skills training</b>, and <b>community outreach</b>, each service
        is designed to meet the unique needs of survivors on their journey towards safety and independence.
        Explore our diverse range of services and discover how the SHE Centre can <b>support you</b> or someone you know in navigating
        the challenges of domestic violence. Whether you are seeking shelter, legal guidance, skills development, or community 
        engagement, <b>we are here</b> to provide compassionate care and practical assistance every step of the way.
      </p>
      <div class="grid justify-items-center">
        <div class="max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActivityCard v-for="service in services" :key="service.id" :activity="service" type="service" />
        </div>
      </div>
    </div>
  </section>
</template>
