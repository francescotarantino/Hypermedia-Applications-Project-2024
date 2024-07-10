<script setup lang="ts">
const { people, setSearchQuery } = usePeople();

useSeoMeta({
  title: 'Our Team',
  description: 'We are a diverse group of dedicated individuals who work tirelessly to make our anti-violence center a safe, supportive, and empowering environment for all who seek our services.'
});
</script>

<template>
  <section>
    <div class="container mx-auto px-8 md:w-3/4">
      <h1 class="text-3xl font-semibold text-center text-orange">Our Team</h1>

      <p class="text-justify text-lg text-gray-600 mt-8 mb-4">
        Welcome to the SHE Centre's <b>team page</b>. We are a <b>diverse</b> group of dedicated individuals who work tirelessly to
        make our anti-violence center a <b>safe</b>, <b>supportive</b>, and <b>empowering</b> environment for all who seek our services.
        Each team member brings their <b>unique</b> skills and experiences to the table, united by a common goal: to combat
        violence and provide resources for those affected by it. We are here to <b>listen</b>, to <b>support</b>, and to <b>guide</b> you
        towards a safer future. We are proud of the work we do at SHE-Centre, and we are <b>grateful</b> for the opportunity to
        serve our community. <b>Thank you for taking the time to get to know us. We look forward to getting to know you, too.</b>
      </p>

      <div class="grid justify-items-center gap-4">
        <div class="w-full max-w-screen-lg">
          <SearchBar class="md:max-w-72 float-right" @search-query="setSearchQuery" />
        </div>

        <div class="max-w-screen-lg grid grid-cols-1 lg:grid-cols-2 gap-6">
          <transition-group name="fade">
            <PersonCard v-for="person in people" :key="person.id" :person="person" show-bio />
          </transition-group>
        </div>
      </div>
    </div>
  </section>
</template>
