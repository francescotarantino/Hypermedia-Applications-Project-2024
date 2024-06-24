<script setup lang="ts">
// Fetch projects
const { data: projects }  = await useFetch<IProject[]>('/api/projects');
</script>

<template>
  <section>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-semibold text-center text-orange">Projects</h1>
      <p class="text-center text-lg text-gray-600 mt-8 mb-12">
        The SHE-Centre, established in 2010, is dedicated to supporting women facing violence and abuse through a range
        of comprehensive services and innovative projects. Our Safe Shelter, launched in January 2010, provides a secure
        environment for over 1,500 women and children annually. Legal Assistance, started in March 2011, helps women
        navigate the legal system, while Skills Training, initiated in June 2012, empowers over 3,000 women yearly with
        vocational skills. Crisis Counseling, available since November 2010, offers immediate and long-term emotional
        support. Community Outreach, begun in May 2013, raises awareness and educates the public. Our projects include
        the Legal Advocacy Program, aiding 500 women since September 2015; the Transitional Housing Program, supporting
        300 women annually since February 2014; Child Support Services, helping 400 children annually since August 2016;
        the Financial Empowerment Initiative, guiding 1,200 women towards financial independence since January 2017;
        and Empowerment Through Art, offering creative healing for 600 women since April 2018.
      </p>
      <div class="grid justify-items-center">
        <div class="max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActivityCard v-for="project in projects" :key="project.id" :activity="project" type="project" />
        </div>
      </div>
    </div>
  </section>
</template>
