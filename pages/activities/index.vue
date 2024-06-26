<script setup lang="ts">
// Fetch both projects and services
const {data: projects} = await useFetch<IProject[]>('/api/projects');
const {data: services} = await useFetch<IService[]>('/api/services');

// Combine projects and services into a single array
const activities = ref<IActivity[]>([]);
activities.value = activities.value.concat(
    projects?.value?.map((p) => ({...p, type: "project"})) ?? [],
    services?.value?.map((p) => ({...p, type: "service"})) ?? []
);

// Sort the activities by name
activities.value.sort((a, b) => a.name.localeCompare(b.name));
</script>

<template>
  <section>
    <div class="container mx-auto px-4 w-3/4">
      <h1 class="text-3xl font-semibold text-center text-orange">Activities</h1>
      <p class="text-justify text-lg text-gray-600 mt-8 mb-12">
        The SHE-Centre, established in 2010, supports women facing violence with comprehensive services and projects.
        Our Safe Shelter provides security for 1,500 women and children annually. Legal Assistance helps navigate the
        legal system, while Skills Training empowers 3,000 women yearly. Crisis Counseling offers emotional support, and
        Community Outreach raises awareness. Projects include the Legal Advocacy Program, Transitional Housing, Child
        Support Services, the Financial Empowerment Initiative, and Empowerment Through Art.
      </p>
      <div class="grid justify-items-center">
        <div class="max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActivityCard v-for="(activity, index) in activities" :key="index" :activity="activity" />
        </div>
      </div>
    </div>
  </section>
</template>
