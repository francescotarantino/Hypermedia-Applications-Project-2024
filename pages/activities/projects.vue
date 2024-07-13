<script setup lang="ts">
// Fetch projects
const { data: projects }  = await useFetch<IProject[]>('/api/projects');

useSeoMeta({
  title: 'Projects',
});
</script>

<template>
  <section>
    <div class="container mx-auto px-8 md:w-3/4">
      <h1 class="text-3xl font-semibold text-center text-orange">Projects</h1>
      <p class="text-justify text-lg text-gray-600 mt-8 mb-12">
        At SHE Centre we highlight <b>innovative initiatives</b> aimed at empowering women and children affected by domestic violence.
        Our projects go beyond immediate support to offer <b>long-term solutions and opportunities</b> for healing and growth.
        From <b>transitional housing</b> and <b>child support services</b> to <b>financial empowerment</b> and <b>art therapy</b>, each project is designed
        to address <b>specific aspects</b> of recovery and empowerment. Explore our transformative projects and learn how the
        SHE Centre is creating pathways to healing and empowerment. Whether you are interested in supporting children
        affected by violence, gaining financial literacy, or exploring the healing power of art, our projects offer
        <b>opportunities</b> for growth, healing, and a brighter future. Join us in building a community where every woman and
        child can <b>thrive</b> free from violence.
      </p>
      <div class="grid justify-items-center">
        <div class="max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActivityCard v-for="project in projects" :key="project.id" :activity="project" type="project" />
        </div>
      </div>
    </div>
  </section>
</template>
