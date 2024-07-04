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
      <div class="flex items-center justify-center bg-cream">
        <form action="/received-form" method="post" enctype="text/plain">
          <label for="name">Your Name:</label><br>
          <input type="text" id="name" name="name"><br>
          <label for="email">Your Email:</label><br>
          <input type="email" id="email" name="email"><br>
          <label for="message">Your Message:</label><br>
          <textarea id="message" name="message"></textarea><br>
          <input type="submit" value="Send">
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>