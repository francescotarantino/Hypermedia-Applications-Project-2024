<script setup lang="ts">
import {
  ChevronRightIcon,
  EnvelopeIcon,
  CakeIcon,
  MapPinIcon,
  UserIcon,
  HeartIcon,
  LanguageIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  LightBulbIcon
} from '@heroicons/vue/24/outline';

const route = useRoute();
const { data: person } = await useFetch<IPerson>(`/api/people/${route.params.id}`);

const selectedTab = ref<number>(0);
const tabs = [
  'Personal data',
  'Career',
  'Activities',
];

function getAge(birthdate: string) {
  return new Date().getFullYear() - new Date(birthdate).getFullYear();
}

function getFlagUrl(language: string) {
  const LANGUAGES = [
    { cc: 'US', name: 'English' },
    { cc: 'ES', name: 'Spanish' },
    { cc: 'FR', name: 'French' },
    { cc: 'DE', name: 'German' },
    { cc: 'IT', name: 'Italian' },
    { cc: 'PT', name: 'Portuguese' },
    { cc: 'RU', name: 'Russian' },
    { cc: 'CN', name: 'Chinese' },
    { cc: 'JP', name: 'Japanese' },
    { cc: 'KR', name: 'Korean' },
    { cc: 'SE', name: 'Swedish'}
  ];

  const countryCode = LANGUAGES.find(l => l.name === language)?.cc;
  if (!countryCode) return '';

  // SVG flags from https://gitlab.com/catamphetamine/country-flag-icons
  return `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', {dateStyle: 'medium'}).format(new Date(date));
}

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
        <div class="flex flex-col lg:flex-row gap-8 md:w-11/12">
          <div class="flex flex-col md:flex-row gap-8">
            <!-- Selector for personal data, career, and other -->
            <div class="flex self-center flex-col md:justify-start md:self-start gap-4 w-screen md:w-auto px-4">
              <div
                  v-for="(tab, index) in tabs" :key="index" @click="selectedTab = index"
                  class="flex flex-row items-center w-full md:w-48 text-lg text-bold text-left p-4 rounded-xl cursor-pointer hover:bg-cream transition ease-in-out duration-200"
                  :class="{ 'bg-peach': selectedTab === index }"
              >
                <p>{{ tab }}</p>

                <div class="flex-grow" />

                <ChevronRightIcon class="w-6 h-6 text-primary rotate-90 md:rotate-0" />
              </div>
            </div>

            <div>
              <transition name="fade" mode="out-in">
                <!-- Personal data -->
                <div v-if="selectedTab === 0" class="bg-cream rounded-2xl drop-shadow p-8 flex flex-col gap-2 m-4 md:m-0">
                  <div class="flex flex-col lg:flex-row gap-8 items-center lg:items-start xl:items-stretch">
                    <img class="bg-white object-cover rounded-xl w-64 drop-shadow-xl" :src="person?.picture.path" :alt="person?.picture.label">

                    <div class="flex flex-col gap-6">
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
                          {{ getAge(person?.birthdate!) }}
                        </p>

                        <p>
                          <MapPinIcon class="w-6 h-6 inline-block mr-2" />
                          <span class="font-bold">City: </span>
                          {{ person?.city }}
                        </p>

                        <p>
                          <UserIcon class="w-6 h-6 inline-block mr-2" />
                          <span class="font-bold">Role: </span>
                          {{ person?.main_role }}
                        </p>

                        <p>
                          <LightBulbIcon class="w-6 h-6 inline-block mr-2" />
                          <span class="font-bold">Expertise: </span>
                          {{ person?.main_expertise }}
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
                <div v-else-if="selectedTab === 1">
                  <div class="bg-cream rounded-2xl drop-shadow p-8 flex flex-col gap-6 m-4 md:m-0">
                    <div class="flex flex-row gap-4 flex-wrap">
                      <div class="flex">
                        <LanguageIcon class="w-6 h-6 inline-block mr-2" />
                        <span class="font-bold mr-2">Languages:</span>

                        <div class="flex-1 flex flex-wrap gap-3">
                          <div v-for="(language, index) in person?.languages" :key="index">
                            <img :src="getFlagUrl(language)" class="w-8 inline-block rounded-sm mr-0.5" :alt="`Country flag (${language})`" />
                            {{ language }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-for="(education, index) in person?.educations" :key="index">
                      <div class="flex flex-row gap-2">
                        <AcademicCapIcon class="w-6 h-6" />

                        <div class="flex-1 flex flex-col lg:flex-row">
                          <p>
                            <span class="font-bold">{{education.course}}</span> at <span class="italic">{{education.school_name}}</span>
                          </p>

                          <div class="flex-grow" />

                          <p class="text-sm">
                            {{formatDate(education.start_date)}} - {{formatDate(education.end_date)}}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div v-for="(job, index) in person?.job_experiences" :key="index">
                      <div class="flex flex-row gap-2">
                        <BriefcaseIcon class="w-6 h-6" />

                        <div class="flex-1">
                          <div class="flex flex-col lg:flex-row">
                            <p>
                              <span class="font-bold">{{job.role}}</span> at <span class="italic">{{job.name}}</span>
                            </p>

                            <div class="flex-grow" />

                            <p class="text-sm">
                              {{formatDate(job.start_date)}} - {{formatDate(job.end_date)}}
                            </p>
                          </div>

                          <p class="text-justify mt-2">
                            {{job.description}}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Activities -->
                <div v-else-if="selectedTab === 2">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ActivityCard
                        v-for="(activity, index) in person?.responsible_for_services.map((s) => ({...s, type: 'service'}))" :key="index"
                        :activity="activity"
                        star
                    />

                    <ActivityCard
                        v-for="(activity, index) in person?.responsible_for_projects.map((s) => ({...s, type: 'project'}))" :key="index"
                        :activity="activity"
                        star
                    />

                    <ActivityCard
                        v-for="(activity, index) in person?.involved_in_services.map((s) => ({...s, type: 'service'}))" :key="index"
                        :activity="activity"
                    />

                    <ActivityCard
                        v-for="(activity, index) in person?.involved_in_projects.map((s) => ({...s, type: 'project'}))" :key="index"
                        :activity="activity"
                    />
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
