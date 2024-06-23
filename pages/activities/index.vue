
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ActivityCard from "~/components/ActivityCard.vue";

const projects = ref([]);
const services = ref([]);

const fetchData = async () => {
  const projectsResponse = await fetch('/api/projects');
  const servicesResponse = await fetch('/api/services');

  if (projectsResponse.ok && servicesResponse.ok) {
    projects.value = await projectsResponse.json();
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
      <h1 class="text-3xl font-semibold text-center text-orange">Activities</h1>
      <p class="text-center text-lg text-gray-600 mt-8 mb-12">
        The SHE-Centre, established in 2010, supports women facing violence with comprehensive services and projects.
        Our Safe Shelter provides security for 1,500 women and children annually. Legal Assistance helps navigate the
        legal system, while Skills Training empowers 3,000 women yearly. Crisis Counseling offers emotional support, and
        Community Outreach raises awareness. Projects include the Legal Advocacy Program, Transitional Housing, Child
        Support Services, the Financial Empowerment Initiative, and Empowerment Through Art.
      </p>
      <div class="grid justify-items-center">
        <div class="max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActivityCard v-for="project in projects" :key="project.id" :activity="project" />
          <ActivityCard v-for="service in services" :key="service.id" :activity="service" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>