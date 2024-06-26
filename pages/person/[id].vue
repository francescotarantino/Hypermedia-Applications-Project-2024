<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline';

const route = useRoute();
const { data: person } = await useFetch<IPerson>(`/api/people/${route.params.id}`);

const selectedTab = ref<string>('personal_data');
const tabs = [
  { label: 'Personal data', id: 'personal_data' },
  { label: 'Career', id: 'career' },
  { label: 'Activities', id: 'activities' },
];

useSeoMeta({
  ogTitle: person?.value?.name,
  description: person?.value?.bio,
  ogImageUrl: person?.value?.picture.path,
});
</script>

<template>
  <section>
    <h5 class="text-md text-center text-orange font-bold">Person</h5>

    <div class="container mx-auto max-w-7xl">
      <h1 class="text-3xl text-center text-orange font-bold mt-4 mb-8">
        {{person?.name + ' ' + person?.surname}}
      </h1>

      <div class="flex flex-row">
        <div class="flex flex-row gap-8">
          <!-- Selector for personal data, career, and other -->
          <div class="flex flex-col gap-4">
            <div
                v-for="tab in tabs" :key="tab.id" @click="selectedTab = tab.id"
                class="flex flex-row items-center w-48 text-lg text-bold text-left p-4 rounded-xl cursor-pointer hover:bg-cream transition ease-in-out duration-200"
                :class="{ 'bg-peach': selectedTab === tab.id }">
              <p>{{ tab.label }}</p>

              <div class="flex-grow" />

              <ChevronRightIcon class="w-6 h-6 text-primary" />
            </div>
          </div>

          <transition name="fade">
            <!-- Personal data -->
            <div v-if="selectedTab === 'personal_data'">
              {{person?.bio}}
            </div>
          </transition>

          <transition name="fade">
            <!-- Career -->
            <div v-if="selectedTab === 'career'">

            </div>
          </transition>

          <transition name="fade">
            <!-- Activities -->
            <div v-if="selectedTab === 'activities'">

            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>
