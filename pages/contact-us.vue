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
</script>

<template>
  <section>
    <div class="h-64 flex items-center justify-center bg-gradient-to-l from-primary via-[#6C2377] to-primary drop-shadow mt-[-48px]">
      <p class="text-cream text-4xl sm:text-6xl text-center mx-4">
        We're available 24/7.
        Call us.
      </p>
    </div>

    <div class="container mx-auto px-8 sm:w-7/8 xl:w-3/4">
      <div class="my-12 flex flex-auto gap-8 self-center items-center justify-center">
        <div class="hidden w-1/3 md:flex justify-center items-center">
          <img class="aspect-auto rounded-2xl" src="/contact-us-image-1.jpg" alt="Telephone image"/>
        </div>

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

      <div class="flex gap-8 self-center justify-center items-stretch">
        <div class="flex-1 bg-cream rounded-xl p-6 sm:p-8">
          <h2 class="text-3xl font-semibold text-orange pb-6">Drop us an email!</h2>

          <form @submit="submitForm">
            <div class="grid lg:grid-cols-2 gap-4">
              <div>
                <label for="name" class="block pb-2 text-gray-700 text-lg font-semibold">Your Name:</label>
                <input class="appearance-none border-2 w-full border-orange rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                       type="text" id="name" name="name" placeholder="Anne Smith" required>
              </div>

              <div>
                <label for="email" class="block pb-2 text-gray-700 text-lg font-semibold">Your Email Address:</label>
                <input class="appearance-none border-2 w-full border-orange rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                       type="email" id="email" name="email" placeholder="anne.smith@email.com" required>
              </div>
            </div>

            <div class="w-full h-full">
              <label for="message" class="block pt-4 pb-2 text-gray-700 text-lg font-semibold">Your Message:</label>
              <textarea class="appearance-none resize-none border-2 w-full border-orange rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        id="message" name="message" placeholder="Your message here..." rows="4" required />

              <transition name="fade" mode="out-in">
                <div v-if="formStatus === 'success'" class="flex items-center justify-center mt-4 text-orange gap-2">
                  <CheckCircleIcon class="size-6" />
                  <p class="font-semibold">
                    Your message has been sent successfully!
                  </p>
                </div>

                <div v-else class="pt-4 flex items-center justify-center">
                  <button class="w-20 inline-flex items-center justify-center bg-orange text-white font-bold py-2 px-4 rounded-lg cursor-pointer transition-all ease-in-out duration-500 hover:bg-opacity-70 disabled:cursor-not-allowed disabled:w-28 disabled:bg-opacity-70"
                          type="submit" :disabled="formStatus === 'submitting'">
                    Send
                    <!-- Sending animation -->
                    <svg v-if="formStatus === 'submitting'" class="animate-spin ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </button>
                </div>
              </transition>
            </div>
          </form>
        </div>

        <div class="hidden xl:flex lg:max-w-[430px] justify-center items-center">
          <img src="/contact-us-image-2.jpg" alt="Reach out for support" class="aspect-auto object-cover rounded-2xl"/>
        </div>
      </div>
    </div>
  </section>
</template>
