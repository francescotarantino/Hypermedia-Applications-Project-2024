<script setup lang="ts">
// Fetch people
import HorizontalPersonCard from "~/components/HorizontalPersonCard.vue";

const { data: people }  = await useFetch<IPerson[]>('/api/people');

useSeoMeta({
  title: 'Our Team',
});
</script>

<template>
  <section>
    <div class="container mx-auto px-8 md:w-3/4">
      <h1 class="text-3xl font-semibold text-center text-orange">Our Team</h1>

      <p class="text-justify text-lg text-gray-600 mt-8 mb-12">
        Welcome to the SHE-Centre's team page. We are a diverse group of dedicated individuals who work tirelessly to
        make our anti-violence center a safe, supportive, and empowering environment for all who seek our services.
        Each team member brings their unique skills and experiences to the table, united by a common goal: to combat
        violence and provide resources for those affected by it. We are here to listen, to support, and to guide you
        towards a safer future. We are proud of the work we do at SHE-Centre, and we are grateful for the opportunity to
        serve our community. Thank you for taking the time to get to know us. We look forward to getting to know you, too.
      </p>
      <div class="grid justify-items-center">
        <div class="max-w-screen-lg grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HorizontalPersonCard v-for="person in people" :key="person.id" :person="person" show-bio />
        </div>
      </div>
    </div>
  </section>
</template>
