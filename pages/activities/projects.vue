<script setup lang="ts">
// Fetch projects
const { data: projects }  = await useFetch<IProject[]>('/api/projects');
</script>

<template>
  <section>
    <div class="container mx-auto px-8 md:w-3/4">
      <h1 class="text-3xl font-semibold text-center text-orange">Projects</h1>
      <p class="text-justify text-lg text-gray-600 mt-8 mb-12">
        At SHE Centre we highlight innovative initiatives aimed at empowering women and children affected by domestic violence. 
        Our projects go beyond immediate support to offer long-term solutions and opportunities for healing and growth. 
        From transitional housing and child support services to financial empowerment and art therapy, each project is designed 
        to address specific aspects of recovery and empowerment.
        <br><br>
        Since our inception, the SHE Centre has been committed to expanding our impact through strategic projects that meet 
        the evolving needs of survivors. These initiatives are driven by our dedication to fostering resilience, independence, 
        and community support. Through partnerships with experts and stakeholders, we continue to develop and implement projects 
        that make a lasting difference in the lives of those we serve.
        <br><br>
        Explore our transformative projects and learn how the SHE Centre is creating pathways to healing and empowerment. 
        Whether you are interested in supporting children affected by violence, gaining financial literacy, or exploring 
        the healing power of art, our projects offer opportunities for growth, healing, and a brighter future. 
        Join us in building a community where every woman and child can thrive free from violence.
      </p>
      <div class="grid justify-items-center">
        <div class="max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActivityCard v-for="project in projects" :key="project.id" :activity="project" type="project" />
        </div>
      </div>
    </div>
  </section>
</template>
