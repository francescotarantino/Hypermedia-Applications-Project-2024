<script setup lang="ts">
const { activities, setSearchQuery } = useActivities();

useSeoMeta({
  title: 'Activities',
  description: 'Explore our activities and discover how the SHE Centre is making a difference in the lives of women and children in our community.'
});
</script>

<template>
  <section>
    <div class="container mx-auto px-8 md:w-3/4">
      <h1 class="text-3xl font-semibold text-center text-orange">Activities</h1>
      <p class="text-justify text-lg mt-8 mb-4">
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

      <div class="grid justify-items-center gap-4">
        <div class="w-full max-w-screen-lg">
          <SearchBar class="md:max-w-72 float-right" @search-query="setSearchQuery" />
        </div>

        <div class="max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <transition-group name="fade">
            <ActivityCard v-for="(activity, index) in activities" :key="index" :activity="activity" show-type-label />
          </transition-group>
        </div>
      </div>
    </div>
  </section>
</template>
