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
        holistic approach to recovery and empowerment.
      </p>
      <p class="text-justify text-lg mt-8 mb-12">
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
      <br><br>
      <h1 class="text-2xl font-semibold text-center text-orange">More in Detail</h1>
      <p class="text-justify text-lg mt-8 mb-12">
        Since our inception, we have continuously expanded our services in response to the changing needs of our community. 
        What started as a small team providing essential shelter and crisis support has blossomed into a robust organization 
        offering a continuum of care. Today, the SHE Centre stands as a beacon of hope and practical assistance, providing 
        women with the tools they need to reclaim their lives and achieve independence.
      </p>
      <p class="text-justify text-lg mt-8 mb-12">
        Our commitment to innovation and collaboration has led us to forge partnerships with local businesses, educational 
        institutions, and healthcare providers. These collaborations enable us to offer a diverse range of programs, from 
        vocational training and legal advocacy to specialized counseling and community education. Together, these initiatives 
        form a network of support that empowers women at every stage of their journey towards healing and self-sufficiency.
      </p>
      <p class="text-justify text-lg mt-8">
        At the SHE Centre, we believe in the power of community and the resilience of the human spirit. Through our ongoing 
        efforts in outreach and awareness, we aim to break the silence surrounding domestic violence and foster a culture of 
        solidarity and support. Our annual events, workshops, and advocacy campaigns engage the broader community in meaningful 
        dialogue and action, raising awareness and promoting lasting change.
      </p>
    </div>
  </section>
</template>
