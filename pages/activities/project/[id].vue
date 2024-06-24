<script setup lang="ts">
import { EnvelopeIcon, UserCircleIcon } from "@heroicons/vue/24/outline";

const route = useRoute();
const { data: project } = await useFetch<IProject>(`/api/projects/${route.params.id}`);
</script>

<template>
  <section>
    <div class="container mx-auto py-8 w-3/4">
      <h1 class="text-3xl text-center text-orange font-bold mt-4 mb-8">{{project?.name}}</h1>

      <div class="flex flex-col lg:flex-row gap-8 drop-shadow">
        <div class="self-center">
          <img class="object-cover rounded-xl w-48" :src="project?.main_image.path" :alt="project?.main_image.label">
        </div>

        <div class="flex flex-col bg-cream rounded-2xl drop-shadow p-8 gap-8 flex-1 self-stretch">
          <p class="text-xl text-gray-600">
            <UserCircleIcon class="w-6 h-6 inline-block mr-2" /><NuxtLink :to="`/person/${project?.main_responsible?.id}`">{{project?.main_responsible?.name + " " + project?.main_responsible?.surname}}</NuxtLink>
            <br />
            <EnvelopeIcon class="w-6 h-6 inline-block mr-2" /><a :href="`mailto:${project?.main_responsible?.email}`">{{project?.main_responsible?.email}}</a>
          </p>

          <p class="text-lg text-gray-600">
            {{project?.abstract}}
          </p>
        </div>
      </div>

      <p class="text-lg text-justify mb-8 pt-4">
        {{project?.description}}
      </p>
    </div>
  </section>
</template>