<script setup lang="ts">
import {EnvelopeIcon, UserCircleIcon} from "@heroicons/vue/24/outline";

defineProps<{
  activity: IActivity;
}>();
</script>

<template>
  <section>
    <div class="container mx-auto max-w-7xl">
      <h1 class="text-3xl text-center text-orange font-bold mt-4 mb-8">{{activity?.name}}</h1>

      <div class="flex flex-col gap-8">
        <div class="flex justify-center">
          <div class="flex flex-col lg:flex-row gap-8 md:w-3/4">
            <div class="self-center drop-shadow">
              <img class="object-cover rounded-xl w-48" :src="activity?.main_image.path" :alt="activity?.main_image.label">
            </div>

            <div class="flex flex-col p-8 md:p-0 gap-8 flex-1 self-stretch">
              <p class="text-xl text-gray-600 text-center lg:text-left">
                <UserCircleIcon class="w-6 h-6 inline-block mr-2" />
                <NuxtLink :to="`/person/${activity?.main_responsible?.id}`" class="hover:underline">
                  {{activity?.main_responsible?.name + " " + activity?.main_responsible?.surname}}
                </NuxtLink>

                <br />

                <EnvelopeIcon class="w-6 h-6 inline-block mr-2" />
                <a :href="`mailto:${activity?.main_responsible?.email}`" class="hover:underline">
                  {{activity?.main_responsible?.email}}
                </a>
              </p>

              <div class="bg-cream rounded-2xl drop-shadow p-8">
                <p class="text-lg text-gray-600">
                  {{activity?.abstract}}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <div class="flex flex-col lg:flex-row justify-center mb-8 pt-4 gap-8 md:w-3/4">
            <p class="text-lg text-justify w-3/4 self-center lg:self-start">
              {{activity?.description}}
            </p>

            <Carousel :images="activity?.other_images || []" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
