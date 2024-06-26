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
    <div class="container mx-auto px-4 w-3/4">
      <h5 class="text-3xl text-center text-orange font-bold mt-4 mb-8">Contact Us</h5>
      <div class="flex flex-auto gap-8 self-center items-center justify-center">
        <div class="w-1/3 flex justify-center items-center">
          <img class="aspect-auto rounded-2xl" src="/contact-us-image-1.jpg" alt="Telephone Image"/>
        </div>
        <div class="w-1/3 flex items-center justify-center text-primary hover:underline">
          <PhoneIcon class="size-7" />
          <a href="tel:800022399" class="text-4xl ml-2">800 02 2399</a>
        </div>
        <div class="w-1/3 flex items-center justify-center text-primary hover:underline">
          <EnvelopeIcon class="size-7" />
          <a href="mailto:info@she.org" class="text-4xl ml-2">info@she.org</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>