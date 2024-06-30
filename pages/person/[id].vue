<script setup lang="ts">
import {ChevronRightIcon, EnvelopeIcon, CakeIcon, MapPinIcon, UserIcon, HeartIcon} from '@heroicons/vue/24/outline';

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
    <div class="container mx-auto max-w-7xl flex flex-col gap-8">
      <div>
        <h5 class="text-lg text-center text-orange font-bold mb-2">Person</h5>

        <h1 class="text-3xl text-orange font-bold text-center">
          {{person?.name + ' ' + person?.surname}}
        </h1>


      </div>

      <div class="flex justify-center">
        <div class="flex flex-col lg:flex-row gap-8 md:w-5/6">
          <div class="flex flex-col md:flex-row gap-8">
            <!-- Selector for personal data, career, and other -->
            <div class="flex self-center flex-col md:justify-start md:self-start gap-4 w-screen md:w-auto px-4">
              <div
                  v-for="tab in tabs" :key="tab.id" @click="selectedTab = tab.id"
                  class="flex flex-row items-center w-full md:w-48 text-lg text-bold text-left p-4 rounded-xl cursor-pointer hover:bg-cream transition ease-in-out duration-200"
                  :class="{ 'bg-peach': selectedTab === tab.id }"
              >
                <p>{{ tab.label }}</p>

                <div class="flex-grow" />

                <ChevronRightIcon class="w-6 h-6 text-primary rotate-90 md:rotate-0" />
              </div>
            </div>

            <div>
              <transition name="fade" mode="out-in">
                <!-- Personal data -->
                <div v-if="selectedTab === 'personal_data'" class="bg-cream rounded-2xl drop-shadow p-8 flex flex-col gap-2 m-4 md:m-0">
                  <div class="flex flex-col lg:flex-row gap-8 items-center lg:items-start xl:items-stretch">
                    <img class="bg-white object-cover rounded-xl w-64 drop-shadow-xl" :src="person?.picture.path" :alt="person?.picture.label">

                    <div class="flex flex-col gap-4">
                      <div class="flex flex-row gap-4 flex-wrap">
                        <p>
                          <EnvelopeIcon class="w-6 h-6 inline-block mr-2" /><span class="font-bold">Email: </span>
                          <a :href="`mailto:${person?.email}`" class="hover:underline">
                            {{person?.email}}
                          </a>
                        </p>

                        <p>
                          <CakeIcon class="w-6 h-6 inline-block mr-2" />
                          <span class="font-bold">Age: </span>
                          {{ new Date().getFullYear() - new Date(person?.birthdate!).getFullYear() }}
                        </p>

                        <p>
                          <UserIcon class="w-6 h-6 inline-block mr-2" />
                          <span class="font-bold">Role: </span>
                          {{ person?.main_role }}
                        </p>

                        <p>
                          <MapPinIcon class="w-6 h-6 inline-block mr-2" />
                          <span class="font-bold">City: </span>
                          {{ person?.city }}
                        </p>
                      </div>

                      <p class="text-justify">
                        {{person?.bio}}
                      </p>

                      <div>
                        <p>
                          <HeartIcon class="w-6 h-6 inline-block mr-2" />
                          <span class="font-bold">Interests: </span>
                          {{ person?.hobbies!.join(' • ')}}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Career -->
                <div v-else-if="selectedTab === 'career'">

                </div>

                <!-- Activities -->
                <div v-else-if="selectedTab === 'activities'">

                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
