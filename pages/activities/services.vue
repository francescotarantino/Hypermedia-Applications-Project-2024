
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ActivityCard from "~/components/ActivityCard.vue";

const services = ref([]);

const fetchData = async () => {
  const servicesResponse = await fetch('/api/services');

  if (servicesResponse.ok) {
    services.value = await servicesResponse.json();
  } else {
    console.error('Failed to fetch data from the API');
  }
};

onMounted(fetchData);
</script>

<template>
  <section>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-semibold text-center text-orange">Services</h1>
      <p class="text-center text-lg text-gray-600 mt-8 mb-12">
        The SHE-Centre, established in 2010, offers comprehensive services to support women facing violence. Our Safe
        Shelter, launched in January 2010, provides a secure environment for over 1,500 women and children annually,
        offering safety and emotional support. Legal Assistance, available since March 2011, helps women navigate the
        legal system. Skills Training, initiated in June 2012, empowers 3,000 women yearly with vocational skills.
        Crisis Counseling, available since November 2010, provides immediate and long-term emotional support. Community
        Outreach, begun in May 2013, raises awareness and educates the public, fostering a supportive community to
        prevent violence and support survivors. These services collectively address the immediate and long-term needs of
        women affected by violence, promoting their safety, well-being, and empowerment.
      </p>
      <div class="grid justify-items-center">
        <div class="max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActivityCard v-for="service in services" :key="service.id" :activity="service" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>