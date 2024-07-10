<script setup lang="ts">
import { PhoneIcon } from '@heroicons/vue/24/solid';
import { CheckCircleIcon } from '@heroicons/vue/24/outline';

const formStatus = ref<"idle" | "submitting" | "success">("idle");

// Function to submit the form
function submitForm(event: Event) {
  event.preventDefault();

  formStatus.value = "submitting";

  // Simulate sending the form
  setTimeout(() => {
    formStatus.value = "success";

    // Reset the form
    (event.target as HTMLFormElement).reset();
  }, 3000);
}

useSeoMeta({
  title: 'Contact Us',
  description: 'We are available 24/7. Call us at 800 02 2399 or drop us an email. We are here to help you.',
  ogImage: '/contact-us-image-2.jpg'
});
</script>

<template>
  <section>
    <div class="h-64 flex items-center justify-center bg-orange drop-shadow mt-[-48px]">
      <h1 class="text-white text-4xl sm:text-6xl text-center mx-4">
        We're available 24/7.
        Call us.
      </h1>
    </div>

    <div class="container mx-auto px-8 sm:w-7/8 xl:w-3/4">
      <div class="my-12 flex flex-auto flex-col md:flex-row gap-8 self-center items-center justify-center">
        <img src="/contact-us-image-2.jpg" alt="Reach out for support" class="flex-none w-full sm:w-1/2 md:w-1/3 aspect-auto drop-shadow-xl rounded-2xl" />

        <div class="md:w-2/3 flex flex-col items-center justify-center gap-8">
          <div class="flex-grow" />

          <p class="hover-underline-animation">
            <PhoneIcon class="size-8 sm:size-10 inline-block align-middle" />
            <a href="tel:800022399" class="text-4xl sm:text-6xl ml-2 align-middle">800 02 2399</a>
          </p>

          <div class="flex-grow">
            <p class="text-2xl text-center">There's always someone on the other end of the line ready to help.</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <h2 class="text-3xl text-orange text-center font-bold">Come visit us...</h2>

        <h2 class="text-3xl text-orange text-center font-bold">...or drop us an email!</h2>


        <div class="w-full h-64 lg:h-full">
          <Map :coordinates="[33.763590, -84.372281]" tooltip="Our location" />
        </div>

        <div class="flex flex-col gap-4">
          <div class="bg-cream rounded-xl p-4 sm:p-8 drop-shadow transform-gpu">
            <form @submit="submitForm" class="flex flex-col gap-2 pt-3">
              <div class="grid grid-cols-8 items-center gap-2">
                <div class="col-span-3">
                  <label for="name" class="text-lg">Name</label>
                  <input class="border-2 border-orange rounded-xl py-2 px-3 focus:outline-none w-full"
                         type="text" id="name" name="name" placeholder="Anne Smith" required>
                </div>

                <div class="col-span-5">
                  <label for="email" class="text-lg">Email address</label>
                  <input class="border-2 border-orange rounded-xl py-2 px-3 focus:outline-none w-full"
                         type="email" id="email" name="email" placeholder="anne.smith@email.com" required>
                </div>
              </div>

              <label for="message" class="text-lg">Message</label>
              <textarea class="border-2 border-orange resize-none w-full rounded-xl py-2 px-3 focus:outline-none"
                        id="message" name="message" placeholder="Insert your message here..." rows="6" required />

              <div class="flex items-center justify-center h-16">
                <transition name="fade" mode="out-in">
                  <div v-if="formStatus === 'success'" class="flex items-center justify-center mt-4 text-orange gap-2">
                    <CheckCircleIcon class="size-6" />
                    <p class="font-semibold text-center">
                      Your message has been sent successfully.
                    </p>
                  </div>

                  <div v-else class="pt-4 flex items-center justify-center">
                    <button class="w-24 inline-flex items-center justify-center bg-orange text-white font-bold text-lg py-2.5 rounded-lg cursor-pointer hover:scale-105 disabled:cursor-not-allowed disabled:bg-opacity-70 disabled:w-28 transition-all ease-in-out duration-500 transform-gpu"
                            type="submit" :disabled="formStatus === 'submitting'">
                      Send
                      <!-- Sending animation -->
                      <transition name="fade">
                        <svg v-if="formStatus === 'submitting'" class="animate-spin ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      </transition>
                    </button>
                  </div>
                </transition>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
