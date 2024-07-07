<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline';
import { PhoneIcon } from '@heroicons/vue/24/solid';


const { data: people }  = await useFetch<IPerson[]>('/api/people');
const {data: mostPopularService} = await useFetch<IService>('/api/services/4');
const {data: mostPopularProject} = await useFetch<IProject>('/api/projects/1');
mostPopularProject.value.type = 'project';
mostPopularService.value.type = 'service';

// Statistics for the Our Impact section
const STATISTICS = {
  'Number of Clients Served': 5000,
  'Crisis Interventions': 8000,
  'Legal Advocacy': 1500,
  'Counseling Services': 3000,
  'Workshops': 500,
  'Vocational Training Placements': 400
};

</script>

<template>
  <section>
    <div class="container mx-auto px-8 md:w-3/4">
      <h1 class="text-3xl text-center text-orange font-bold mb-8">Home</h1>
      <!-- About Us -->
      <p class="text-lg text-justify mb-8">
        The SHE-Centre, founded in 2001 and located at Piazza Leonardo da Vinci 32, Milan, is a pioneering organization
        dedicated to combating violence against women and promoting gender equality. Over the years, it has become a
        cornerstone of support and advocacy for survivors of violence, offering a comprehensive range of services
        including emergency shelter, counseling, legal assistance, and educational workshops.
        <NuxtLink class="font-semibold text-orange hover-underline-animation" to="/about-us">
          <ArrowRightIcon class="h-4 w-4 inline-block" />
          Learn more about SHE-centre
        </NuxtLink>
      </p>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div> <!--First column-->
          <!-- The most popular activities -->
          <div class="text-center my-8">
            <NuxtLink to="/activities" class="text-2xl text-orange font-bold hover-underline-animation">Our activities</NuxtLink>
          </div>
          <p class="text-lg text-justify mb-8">
            At SHE Centre our commitment to empowering women facing domestic violence has evolved over the years to offer a
            comprehensive array of services. Here are some of our most popular activities.
          </p>
          <div class="grid justify-items-center">
            <div class="grid grid-cols-1 gap-6 max-w-[500px]">
              <ActivityCard :activity="mostPopularService as IActivity" star-label="Most liked!"/>
              <ActivityCard :activity="mostPopularProject as IActivity" star-label="So popular!"/>
            </div>
          </div>
        </div>
        <div> <!--Second column-->
          <!-- Our Team -->
          <div>
            <h2 class="text-2xl text-center text-orange font-bold my-8">Our Team</h2>
            <p class="text-lg text-justify mb-8">
              Each team member brings their unique skills and experiences to the table, united by a common goal: to combat
              violence and provide resources for those affected by it.
            </p>
            <CardCarousel :items="people || []">
              <template #default="{ item, active }">
                <HorizontalPersonCard :person="item" :active="active" show-bio />
              </template>
            </CardCarousel>
          </div>
          <!-- Contact Us -->
          <div class="text-center my-8">
            <NuxtLink to="/contact" class="text-2xl text-orange font-bold hover-underline-animation">Contact Us</NuxtLink>
          </div>
          <div class="flex self-center justify-center">
            <FlipCard :content="{ name: '800 02 2399', description: 'There\'s always someone on the other end of the line ready to help.', icon: PhoneIcon }" />
          </div>
        </div>
      </div>
      <!-- Our Impact -->
      <h2 class="text-3xl text-center text-orange font-bold mt-8 mb-4">Our Impact</h2>
      <p class="text-lg text-justify mb-8">
        Since its inception, the SHE Centre has made a significant impact on the lives of many woman in need. Here are
        some of the key statistics from our work over the years that we are proud to share with you.
      </p>
      <div class="w-full">
        <BarChart :statistics="STATISTICS"/>
      </div>
    </div>
  </section>
</template>
