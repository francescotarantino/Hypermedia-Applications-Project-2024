<template>
  <section class="home pt-16">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold mb-4">Welcome to our website!</h1>
      <p class="text-lg mb-8">We provide a variety of services and activities. Explore our site to learn more.</p>

      <div class="grid grid-cols-3 gap-4">
        <div class="card">
          <h2 class="text-2xl font-bold mb-2">About Us</h2>
          <p class="text-base">Learn more about our mission, vision, and team.</p>
          <NuxtLink to="/about-us" class="text-primary mt-4 inline-block">Read More</NuxtLink>
        </div>

        <div class="card">
          <h2 class="text-2xl font-bold mb-2">Our Services</h2>
          <p class="text-base">Discover the services we offer to our community.</p>
          <NuxtLink to="/activities/services" class="text-primary mt-4 inline-block">Read More</NuxtLink>
        </div>

        <div class="card">
          <h2 class="text-2xl font-bold mb-2">Contact Us</h2>
          <p class="text-base">Have questions? Get in touch with us.</p>
          <NuxtLink to="/contact-us" class="text-primary mt-4 inline-block">Read More</NuxtLink>
        </div>
      </div>
      <div class="card">
        <h2 class="text-2xl font-bold mb-2">Our Team</h2>
        <p class="text-base">Meet the dedicated individuals behind our organization.</p>
        <NuxtLink to="/team" class="text-primary mt-4 inline-block">Meet the Team</NuxtLink>
      </div>

      <div class="card">
        <h2 class="text-2xl font-bold mb-2">Our Projects</h2>
        <p class="text-base">Check out some of the projects we've worked on.</p>
        <NuxtLink to="/projects" class="text-primary mt-4 inline-block">View Projects</NuxtLink>
      </div>
    </div>

    <h2 class="text-3xl font-bold mt-8 mb-4">Our Services</h2>
    <table class="table-auto w-full mb-8">
      <thead>
      <tr>
        <th class="px-4 py-2">Service</th>
        <th class="px-4 py-2">Description</th>
        <th class="px-4 py-2">Price</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="border px-4 py-2">Service 1</td>
        <td class="border px-4 py-2">Description of Service 1</td>
        <td class="border px-4 py-2">$100</td>
      </tr>
      <tr>
        <td class="border px-4 py-2">Service 1</td>
        <td class="border px-4 py-2">Description of Service 1</td>
        <td class="border px-4 py-2">$100</td>
      </tr>
      <tr>
        <td class="border px-4 py-2">Service 1</td>
        <td class="border px-4 py-2">Description of Service 1</td>
        <td class="border px-4 py-2">$100</td>
      </tr>
      <tr>
        <td class="border px-4 py-2">Service 1</td>
        <td class="border px-4 py-2">Description of Service 1</td>
        <td class="border px-4 py-2">$100</td>
      </tr>
      <tr>
        <td class="border px-4 py-2">Service 1</td>
        <td class="border px-4 py-2">Description of Service 1</td>
        <td class="border px-4 py-2">$100</td>
      </tr>
      <tr>
        <td class="border px-4 py-2">Service 1</td>
        <td class="border px-4 py-2">Description of Service 1</td>
        <td class="border px-4 py-2">$100</td>
      </tr>
      <tr>
        <td class="border px-4 py-2">Service 1</td>
        <td class="border px-4 py-2">Description of Service 1</td>
        <td class="border px-4 py-2">$100</td>
      </tr>
      <tr>
        <td class="border px-4 py-2">Service 1</td>
        <td class="border px-4 py-2">Description of Service 1</td>
        <td class="border px-4 py-2">$100</td>
      </tr>

      <!-- Add more rows as needed -->
      </tbody>
    </table>

    <p class="text-lg mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
  </section>
</template>
<script setup lang="ts">
</script>