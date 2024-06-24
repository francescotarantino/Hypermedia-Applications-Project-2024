<script setup lang="ts">
// Fetch people
const { data: people }  = await useFetch<IPerson[]>('/api/people');
</script>

<template>
  <section>
    <div class="container mx-auto px-4 w-3/4">
      <h1 class="text-3xl font-semibold text-center text-orange">People</h1>
      <p class="text-justify text-lg text-gray-600 mt-8 mb-12">
        Welcome to our team page at SHE-Centre. We are a diverse group of dedicated individuals who work tirelessly to
        make our anti-violence center a safe, supportive, and empowering environment for all who seek our services.
        Our team is composed of professionals from various fields, including counselors, social workers, legal advisors,
        and more. Each member brings their unique skills and experiences to the table, united by a common goal: to combat
        violence and provide resources for those affected by it. At SHE-Centre, we believe in the power of community and
        the strength that comes from unity. We are here to listen, to support, and to guide you towards a safer future.
        We understand that every person's journey is unique, and we are committed to providing personalized support to
        meet your individual needs. Our team members are not just employees, they are passionate advocates for change.
        We are proud of the work we do at SHE-Centre, and we are grateful for the opportunity to serve our community.
        Thank you for taking the time to get to know us. We look forward to getting to know you, too.
      </p>
      <div class="grid justify-items-center">
        <div class="max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PersonCard v-for="person in people" :key="person.id" :person="person" />
        </div>
      </div>
    </div>
  </section>
</template>
