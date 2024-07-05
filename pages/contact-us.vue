<script lang="ts">
import {defineComponent} from "vue";
import {PhoneIcon} from "@heroicons/vue/24/solid";
import {EnvelopeIcon} from "@heroicons/vue/24/outline";

export default defineComponent({
  components: {EnvelopeIcon, PhoneIcon}
})
</script>
<template>
  <section>
    <div class="h-64 flex items-center justify-center bg-gradient-to-l from-primary via-[#6C2377] to-primary text-cream text-6xl text bold drop-shadow mt-[-48px]">We're available 24/7. Call us.</div>
    <div class="container mx-auto px-4 w-3/4">
      <div class="my-12 flex flex-auto gap-8 self-center items-center justify-center">
        <div class="w-1/3 flex justify-center items-center">
          <img class="aspect-auto rounded-2xl" src="/contact-us-image-1.jpg" alt="Telephone Image"/>
        </div>
        <div class="w-2/3 flex flex-col items-center justify-center gap-8">
          <div class="flex-grow" />
          <p class=" hover-underline-animation">
            <PhoneIcon class="size-10 inline-block align-middle" />
            <a href="tel:800022399" class="text-6xl ml-2 align-middle">800 02 2399</a>
          </p>
          <div class="flex-grow">
            <p class="text-2xl">There's always someone on the other end of the line ready to help.</p>
          </div>
        </div>
      </div>
      <div class="flex flex-auto gap-8 self-center justify-center items-stretch">
      <div class="bg-cream rounded-xl p-8 w-2/3">
        <h2 class="text-3xl font-semibold text-orange pb-6">Drop us an email!</h2>
        <form action="/received-form" method="post" enctype="text/plain" class="">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="name" class="block pb-2 text-gray-700 text-lg font-semibold">Your Name:</label>
              <input type="text" id="name" name="name" class="appearance-none border-2 w-full border-orange rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" placeholder="Anne Smith">
            </div>
            <div>
              <label for="email" class="block pb-2 text-gray-700 text-lg font-semibold">Your Email Address:</label>
              <input type="email" id="email" name="email" class="appearance-none border-2 w-full border-orange rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" placeholder="anne.smith@email.com">
            </div>
          </div>
          <div class="w-full h-full">
            <label for="message" class="block pt-4 pb-2 text-gray-700 text-lg font-semibold">Your Message:</label>
            <textarea id="message" name="message" class="appearance-none resize-none border-2 w-full border-orange rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" placeholder="Your message here..."></textarea>
            <div class="pt-4 flex items-center justify-center">
              <input type="submit" value="Send" class=" bg-orange text-cream font-bold py-2 px-4 rounded hover:bg-opacity-80 transition ease-in-out duration-200">
            </div>
          </div>
        </form>
      </div>
      <img src="/contact-us-image-2.jpg" alt="Contact Us Image" class="w-1/3 aspect-auto rounded-xl"/>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>