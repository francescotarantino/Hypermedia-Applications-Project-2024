<script setup lang="ts">

import {  ArrowTrendingUpIcon,
          ChatBubbleLeftRightIcon,
          GlobeEuropeAfricaIcon,
          CubeIcon,
          LightBulbIcon,
          BookOpenIcon,
          ArrowRightIcon
        } from '@heroicons/vue/24/outline';

import { EnvelopeIcon,
         PhoneIcon
       } from '@heroicons/vue/24/solid';

const MOST_POPULAR_SERVICE_ID = 4;
const MOST_POPULAR_PROJECT_ID = 1;

const { data: people }  = await useFetch<IPerson[]>('/api/people');
const { data: mostPopularService } = await useFetch<IService>(`/api/services/${MOST_POPULAR_SERVICE_ID}`);
const { data: mostPopularProject } = await useFetch<IProject>(`/api/projects/${MOST_POPULAR_PROJECT_ID}`);

// Statistics for the Our Impact section
const STATISTICS = {
  'Number of Clients Served': 5000,
  'Crisis Interventions': 8000,
  'Legal Advocacy': 1500,
  'Counseling Services': 3000,
  'Workshops': 500,
  'Vocational Training Placements': 400
};

const VALUES = [
  { name: 'Empowerment',
    description: 'We believe in equipping women with the tools and resources they need to build independent, fulfilling lives.',
    icon: ArrowTrendingUpIcon
  },
  { name: 'Respect',
    description: 'We honor the dignity and worth of every person, fostering an environment of trust and mutual respect.',
    icon: ChatBubbleLeftRightIcon
  },
  { name: 'Community',
    description: 'We are committed to building strong community ties and engaging with local partners to enhance our support network.',
    icon: GlobeEuropeAfricaIcon
  },
  { name: 'Resilience',
    description: 'We strive to overcome challenges with determination and adaptability, continually evolving to meet the needs of those we serve.',
    icon: CubeIcon
  },
  { name: 'Collaboration',
    description: 'We work together with clients, staff, and partners to create a supportive and inclusive environment that fosters growth and healing.',
    icon: LightBulbIcon
  },
  { name: 'Education',
    description: 'We believe in the power of knowledge and strive to provide educational opportunities that empower woman to make informed choices.',
    icon: BookOpenIcon
  }
];

</script>

<template>
  <section>
    <div class="container mx-auto px-8 sm:w-7/8 xl:w-3/4">
      <h1 class="text-3xl text-center text-orange font-bold mb-8">Home</h1>
      <!-- About Us section -->
      <p class="text-lg text-justify mb-8">
        Welcome to the Signal for Help Empowerment (SHE) Centre, a sanctuary of <b>hope</b> and <b>support</b> for women facing
        domestic violence. Located at 340 Boulevard NE in Atlanta, Georgia, we are dedicated to <b>empowering women</b>
        to reclaim their lives through a <b>comprehensive range of services and projects</b> tailored to support them
        on their journey to <b>safety</b> and <b>independence</b>.
        <NuxtLink class="font-semibold text-orange hover-underline-animation-orange float-right" to="/about-us">
          <ArrowRightIcon class="h-5 w-5 inline-block align-sub" />
          Learn more about our centre
        </NuxtLink>
      </p>
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <!--First column-->
        <div>
          <!-- The most popular activities -->
          <div class="text-center my-8">
            <NuxtLink to="/activities" class="text-2xl text-orange font-bold hover-underline-animation-orange">Our activities</NuxtLink>
          </div>
          <p class="text-lg text-justify mb-8">
            At SHE Centre our <b>commitment</b> to assist women facing domestic violence has evolved over the years to offer a
            <b>vast array of activities</b>. Here are some of the most popular.
            <NuxtLink to="/activities" class="font-semibold text-orange hover-underline-animation-orange float-right">
              <ArrowRightIcon class="h-5 w-5 inline-block align-sub" />
              View all activities
            </NuxtLink>
          </p>
          <div class="grid justify-items-center">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6 xl:max-w-[500px]">
              <ActivityCard :activity="mostPopularService as IActivity" type="service" star-label="Most liked!" show-type-label />
              <ActivityCard :activity="mostPopularProject as IActivity" type="project" star-label="So popular!" show-type-label />
            </div>
          </div>
        </div>

        <!--Second column-->
        <div class="flex flex-col gap-4">
          <!-- Our Team -->
          <div>
            <div class="text-center my-8">
              <NuxtLink to="/team" class="text-2xl text-orange font-bold hover-underline-animation-orange">Our Team</NuxtLink>
            </div>

            <p class="text-lg text-justify mb-8">
              Each team member brings their <i>unique</i> skills and experiences to the table, united by a common goal: to <b>combat
              violence</b> and <b>provide support</b> to those affected by it.
              <NuxtLink to="/team" class="font-semibold text-orange hover-underline-animation-orange float-right">
                <ArrowRightIcon class="h-5 w-5 inline-block align-sub" />
                Meet the whole team
              </NuxtLink>
            </p>

            <CardCarousel :items="people || []" large-on-small-screen>
              <template #default="{ item }">
                <HorizontalPersonCard :person="item" show-bio class="h-full" />
              </template>
            </CardCarousel>
          </div>

          <!-- Contact Us -->
          <div class="flex flex-col gap-4">
            <div class="text-center">
              <NuxtLink to="/contact-us" class="text-2xl text-orange font-bold hover-underline-animation-orange">Contact Us</NuxtLink>
            </div>
              <div class="flex flex-col gap-4 self-center items-center bg-cream rounded-2xl p-16 mt-4 drop-shadow-md">
                <div class="flex flex-row gap-4 items-center">
                  <PhoneIcon class="h-8 w-8" />
                  <a href="tel:800 02 2399" class="text-4xl text-center hover-underline-animation">800 02 2399</a>
                </div>
                <div class="flex flex-row gap-4 items-center">
                  <EnvelopeIcon class="h-8 w-8" />
                  <a href="mailto:info@she.org" class="text-4xl text-center  hover-underline-animation">info@she.org</a>
                </div>
              </div>
          </div>
        </div>
      </div>

      <!-- Our Values -->
      <h2 class="text-2xl text-center text-orange font-bold mt-16 mb-4">Our Values</h2>
      <p class="text-lg text-justify mb-8">
        We envision a world where every woman can live <b>free from the threat of domestic violence.</b>
        The SHE Centre aspires to be a beacon of hope and empowerment, offering holistic, multi-faceted support
        that addresses the complex needs of survivors and promotes <b>long-term healing and independence.</b>
      </p>
      <div class="flex justify-center">
        <div class="flex flex-wrap justify-center items-center gap-4 max-w-[800px]">
          <FlipCard v-for="(value, index) in VALUES" :key="index" :name="value.name" :description="value.description" :icon="value.icon" />
        </div>
      </div>

      <!-- Our Impact -->
      <h2 class="text-2xl text-orange font-bold text-center mt-8 mb-4">Our Impact</h2>
      <p class="text-lg text-justify mb-8">
        Since its inception, the SHE Centre has made a <b>significant impact</b> on the lives of many woman in need. Here are
        some of the <b>key statistics</b> from our work over the years that we are proud to share with you.
      </p>
      <div class="w-full">
        <BarChart :statistics="STATISTICS"/>
      </div>
    </div>
  </section>
</template>
