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
    <div class="container mx-auto px-8 md:w-3/4">
      <h1 class="text-3xl font-semibold text-center text-orange">Activities</h1>
      <p class="text-justify text-lg mt-8 mb-12">
        At SHE Centre our commitment to empowering women facing domestic violence has evolved over the years to offer a 
        comprehensive array of supportive services. From our humble beginnings providing safe shelter and crisis counseling, 
        we have grown to encompass legal assistance, skills training, and community outreach initiatives. 
        Each of these programs has been carefully developed to address the multifaceted needs of survivors, offering a 
        holistic approach to recovery and empowerment.<br>
        Explore our activities and discover how the SHE Centre is making a difference in the lives of women and children
        in our community. Whether you are seeking immediate shelter, legal guidance, skills training, or simply a supportive 
        community, we are here to help you every step of the way. Join us in our journey towards empowerment, resilience, and 
        a future free from violence.  
      </p>
      <div class="grid justify-items-center">
        <div class="max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActivityCard v-for="(activity, index) in activities" :key="index" :activity="activity" />
        </div>
      </div>
    </div>
  </section>
</template>
