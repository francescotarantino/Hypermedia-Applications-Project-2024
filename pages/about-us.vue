<script setup lang="ts">
import {ChevronRightIcon} from '@heroicons/vue/24/outline';

const { data: people } = await useFetch<IPerson[]>('/api/people');

// Filter only the directors
const boardDirectors = people?.value?.filter((p) => p.main_role === 'Director');

// Filter only the staff members
const staffMembers = people?.value?.filter((p) => p.main_role !== 'Director');

const HOURS = [
  { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

const selectedTab = ref<string>('Chapter_1');
const tabs = [
  { label: 'Roots', id: 'Chapter_1' },
  { label: 'Founding Years', id: 'Chapter_2' },
  { label: 'Expanding Services', id: 'Chapter_3' },
  { label: 'Community', id: 'Chapter_4' },
  { label: 'Challenges', id: 'Chapter_5' },
  { label: 'Innovations', id: 'Chapter_6' },
  { label: 'Pandemic', id: 'Chapter_7' },
  { label: 'Hope&Empowerment', id: 'Chapter_8' },
  { label: 'Future Goals', id: 'Chapter_9' },
  { label: 'Legacy', id: 'Chapter_10' },
];
function scrollTo(id: string) {
  selectedTab.value = id;

  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, 250);
}
</script>

<template>
  <section>
    <div class="container mx-auto px-8 md:w-3/4">
      <!-- About Us -->
      <h2 class="text-3xl text-center text-orange font-bold mb-8">About Us</h2>

      <p class="text-lg text-justify mb-8">
        Welcome to the Signal for Help Empowerment (SHE) Centre, a sanctuary of hope and support for women facing 
        domestic violence. Located at 340 Boulevard NE in Atlanta, Georgia, we are dedicated to empowering women 
        to reclaim their lives through a comprehensive range of services and projects tailored to support them 
        on their journey to safety and independence.
      </p>
      <p class="text-lg text-justify mb-8">
        
      </p>
      <h2 class="text-2xl text-center text-orange font-bold mb-4">Our Mission</h2>
      <p class="text-lg text-justify mb-8">At SHE, our mission is to empower women by providing them with the tools, 
        resources, and support necessary to break free from the cycle of domestic violence. 
        We strive to create a world where every woman has the opportunity to live a life free from fear, 
        filled with confidence, and enriched with possibilities.
        We believe in the strength and resilience of women. 
        Together, we can create a future where every woman has the opportunity to live a life of safety, 
        independence, and dignity.
      </p>
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <!-- Opening Hours -->
        <div>
          <h2 class="text-3xl text-orange text-center font-bold mt-8 mb-4">Opening Hours</h2>
          <HoursTable :hours="HOURS" />
        </div>
        <!-- Map -->
        <div>
          <h2 class="text-3xl text-orange text-center font-bold mt-8 mb-4">Our Location</h2>
          <div class="w-full h-64 lg:h-full pb-4 lg:pb-24 pt-3">
            <Map :coordinates="[33.763590, -84.372281]"/>
          </div>
        </div>
      </div>
      <br><br>
      
      <!-- Our Headquarter -->
      <h2 class="text-3xl text-center text-orange font-bold mb-4">Our Headquarter</h2>
      <div class="flex flex-col md:flex-row items-center mt-4">
        <img class="flex-none w-full md:w-1/4 aspect-auto border-2 border-apricot bg-white rounded-2xl" src="/Headquarter.png" alt="Headquarter Image"/>
        <p class="flex-auto text-lg pt-4 pl-0 md:pt-0 md:pl-16 text-justify">
          The headquarters of the SHE Centre is located at 340 Boulevard NE, Atlanta, GA. Situated in a spacious and welcoming 
          facility, our headquarters serves as a safe haven and hub of support for women and children fleeing domestic violence. 
          It provides a secure environment equipped with essential amenities, including counseling rooms, administrative offices, 
          and communal spaces designed to promote healing and empowerment. The location not only facilitates our core services but 
          also hosts community events, workshops, and educational programs aimed at raising awareness and fostering solidarity in 
          the fight against domestic violence. 
          The buzz of conversation and clinking coffee cups fill the air, a testament to the center's dynamic atmosphere. 
          Here, women from all walks of life gather to connect, learn, and empower each other.
        </p>
      </div>
      <br><br>

      <!-- Directive Board -->
      <h2 class="text-3xl text-center text-orange font-bold mb-4">The directive board</h2>
      <div class="grid justify-items-center">
        <div class="max-w-screen-lg grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PersonCard v-for="person in boardDirectors" :key="person.id" :person="person" :show-bio="false" />
        </div>
      </div>
      <br><br>
      
      <!-- Our History -->
      <h2 class="text-3xl text-center text-orange font-bold mb-4">Our History</h2>
      <p class="text-lg text-justify mb-8">
        The Signal for Help Empowerment (SHE) Centre, founded in 2005 by Dr. Jane Anderson and a dedicated team, 
        began as a small but vital resource for women facing domestic violence in Atlanta, Georgia. 
        Over the years, it expanded from a modest shelter to a comprehensive support center offering crisis intervention,
        legal advocacy, counseling, educational programs, and vocational training. 
        Despite challenges, including financial strains and a facility fire, the SHE Centre grew through 
        community support and innovative approaches. 
        Today, it stands as a beacon of hope, empowering women to reclaim their lives and achieve independence.
      </p>
      <div class="flex flex-row">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Selector for chapter -->
          <div class="flex flex-col gap-4 w-full md:w-auto">
            <div
                v-for="(tab) in tabs" :key="tab.id" @click="scrollTo(tab.id)"
                class="flex flex-row items-center w-full md:w-56 text-lg text-bold text-left p-2 rounded-xl cursor-pointer hover:bg-cream transition ease-in-out duration-200"
                :class="{ 'bg-peach': selectedTab === tab.id }">
              <p>{{ tab.label }}</p>

              <div class="flex-grow" />

              <ChevronRightIcon class="w-6 h-6 text-primary rotate-90 md:rotate-0" />
            </div>
          </div>

          <div>
            <transition name="fade" mode="out-in">
              <!-- Chapter 1 -->
              <div v-if="selectedTab === 'Chapter_1'" id="Chapter_1" class="scroll-mt-8 sm:scroll-mt-24">
                <h2 class="text-2xl text-center text-orange font-bold mb-4">Chapter 1 - The Vision Takes Root</h2>
                <p class="text-lg  mb-8 text-justify">
                  The genesis of the Signal for Help Empowerment (SHE) Centre traces back to the early 2000s when
                  a group of passionate individuals in Atlanta, Georgia, recognized a glaring gap in services for
                  women experiencing domestic violence. Despite numerous efforts by various organizations,
                  many women were falling through the cracks, unable to access the comprehensive support
                  they needed to escape abusive situations and rebuild their lives.
                </p>
                <p class="text-lg  mb-8 text-justify">
                  Among these visionaries was Dr. Jane Anderson, a prominent nonprofit executive director for women's rights.
                  Dr. Anderson had spent years working with survivors of domestic violence and was acutely aware of
                  the systemic barriers they faced. She envisioned a center that would not only provide immediate refuge
                  but also long-term support to help women achieve true independence.
                </p>
                <p class="text-lg  mb-8 text-justify">
                  In 2003, Dr. Anderson, along with a small group of like-minded professionals,
                  began laying the groundwork for what would become the SHE Centre.
                  They spent countless hours researching best practices, consulting with experts,
                  and reaching out to potential supporters. Their goal was to create a holistic,
                  multi-faceted approach to addressing domestic violence—one that combined emergency shelter with legal advocacy,
                  counseling, vocational training, and more.
                </p>
              </div>

              <!-- Chapter 2 -->
              <div v-else-if="selectedTab === 'Chapter_2'" id="Chapter_2" class="scroll-mt-8 sm:scroll-mt-24">
                <h2 class="text-2xl text-center text-orange font-bold mb-4">Chapter 2 - The Founding Years</h2>
                <p class="text-lg  mb-8 text-justify">
                  The SHE Centre officially opened its doors on June 15, 2005, at a modest location in downtown Atlanta.
                  The founding team consisted of Dr. Anderson, two board directors: Linda Rodriguez,
                  a social worker now retired, and Michael Bernard, a lawyer and a small staff of five dedicated individuals.
                </p>
                <p class="text-lg  mb-8 text-justify">
                  The early years were challenging but rewarding. The team worked tirelessly to establish the center as a safe
                  haven for women in need. They launched a 24/7 crisis hotline, offering immediate support and guidance to
                  those in danger. The center's first shelter, a small but welcoming space, could accommodate up to 10 women
                  and their children. Despite limited resources, the SHE Centre quickly became known for its compassionate
                  and comprehensive approach to supporting survivors of domestic violence.
                </p>
                <p class="text-lg  mb-8 text-justify">
                  Word of the SHE Centre's work spread, and community support began to grow. Local businesses,
                  religious organizations, and individual donors rallied around the cause, providing much-needed financial
                  assistance and in-kind donations. By 2007, the SHE Centre had expanded its staff to 15 members and moved
                  to a larger facility at 340 Boulevard NE, Atlanta, GA, which offered more space for both emergency shelter
                  and program activities.
                </p>
              </div>

              <!-- Chapter 3 -->
              <div v-else-if="selectedTab === 'Chapter_3'" id="Chapter_3" class="scroll-mt-8 sm:scroll-mt-24">
                <h2 class="text-2xl text-center text-orange font-bold mb-4">Chapter 3 - Expanding Services and Outreach</h2>
                <p class="text-lg  mb-8 text-justify">
                  With a more substantial facility and a growing team, the SHE Centre was able to broaden its range
                  of services. Recognizing that legal issues were a significant barrier for many women, the center
                  hired additional legal advocates to help clients navigate the complexities of the legal system.
                  This included assistance with obtaining restraining orders, custody arrangements, and understanding
                  their legal rights.
                </p>
                <p class="text-lg  mb-8 text-justify">
                  The counseling services also expanded, with more individual and group therapy sessions available.
                  The SHE Centre began offering specialized counseling for children and adolescents who had witnessed
                  or experienced domestic violence, recognizing the importance of addressing trauma at a young age.
                </p>
                <p class="text-lg  mb-8 text-justify">
                  In 2010, the SHE Centre launched its first educational and empowerment programs.
                  Workshops on financial literacy, job readiness, and art were introduced, designed to equip women
                  with the skills they needed to achieve independence. The center also started vocational training programs,
                  partnering with local businesses to provide job placements for women ready to enter or re-enter the workforce.
                </p>
              </div>

              <!-- Chapter 4 -->
              <div v-else-if="selectedTab === 'Chapter_4'" id="Chapter_4" class="scroll-mt-8 sm:scroll-mt-24">
                <h2 class="text-2xl text-center text-orange font-bold mb-4">Chapter 4 - Building a Strong Community Presence</h2>
                <p class="text-lg  mb-8 text-justify">
                  By 2012, the SHE Centre had firmly established itself as a vital resource in the Atlanta community.
                  The center's outreach efforts included public awareness campaigns aimed at educating the community
                  about domestic violence and the resources available to survivors. These campaigns included partnerships
                  with local media, schools, and community organizations.
                </p>
                <p class="text-lg  mb-8 text-justify">
                  The SHE Centre also began participating in local events and hosting its own fundraising activities.
                  Annual events such as the "Walk for Hope" and the "Gala of Empowerment" not only raised funds but
                  also increased visibility and support for the center's mission. These events became crucial for
                  building a strong community presence and fostering a network of supporters and advocates.
                </p>
              </div>

              <!-- Chapter 5 -->
              <div v-else-if="selectedTab === 'Chapter_5'" id="Chapter_5" class="scroll-mt-8 sm:scroll-mt-24">
                <h2 class="text-2xl text-center text-orange font-bold mb-4">Chapter 5 - Facing Challenges and Overcoming Obstacles</h2>
                <p class="text-lg  mb-8 text-justify">
                  As with any growing organization, the SHE Centre faced its share of challenges.
                  Funding was a constant concern, and the economic downturn of 2008 had a significant impact on
                  charitable donations. Despite these financial strains, the team remained committed to their mission,
                  often working long hours and seeking innovative ways to stretch their resources.
                </p>
                <p class="text-lg  mb-8 text-justify">
                  In 2013, the center faced another significant challenge when a fire damaged a portion of the facility.
                  The community's response was immediate and heartening. Volunteers and donors came forward to help with
                  the cleanup and rebuilding efforts, and within six months, the SHE Centre was back in full operation,
                  stronger and more resilient than ever.
                </p>
              </div>

              <!-- Chapter 6 -->
              <div v-else-if="selectedTab === 'Chapter_6'" id="Chapter_6" class="scroll-mt-8 sm:scroll-mt-24">
                <h2 class="text-2xl text-center text-orange font-bold mb-4">Chapter 6 - Innovating for the Future</h2>
                <p class="text-lg  mb-8 text-justify">
                  By 2015, the SHE Centre had become a model for domestic violence support services.
                  The team continued to innovate, looking for new ways to meet the evolving needs of their clients.
                  One of the most significant advancements was the introduction of a comprehensive digital platform
                  that allowed women to access resources, counseling, and legal advice remotely. This was particularly
                  beneficial for those who could not come to the center in person due to safety concerns or logistical barriers.
                </p>
                <p class="text-lg  mb-8 text-justify">
                  The center also expanded its partnerships, collaborating with other organizations to provide a broader
                  range of services. These partnerships included local healthcare providers, educational institutions,
                  and housing organizations, creating a more robust support network for clients.
                </p>
              </div>

              <!-- Chapter 7 -->
              <div v-else-if="selectedTab === 'Chapter_7'" id="Chapter_7" class="scroll-mt-8 sm:scroll-mt-24">
                <h2 class="text-2xl text-center text-orange font-bold mb-4">Chapter 7 - The COVID-19 Pandemic and Its Impact</h2>
                <p class="text-lg  mb-8 text-justify">
                  The outbreak of the COVID-19 pandemic in 2020 brought unprecedented challenges to the SHE Centre.
                  The lockdown measures and economic uncertainty led to an increase in domestic violence cases,
                  placing additional strain on the center's resources. However, the team quickly adapted,
                  implementing virtual counseling sessions and a conversational interface to continue providing essential services.
                </p>
                <p class="text-lg  mb-8 text-justify">
                  The SHE Centre also launched emergency fundraising campaigns and applied for grants to address the surge
                  in demand. The community once again rallied to support the center, demonstrating the deep-rooted commitment
                  to the cause. Despite the difficulties, the SHE Centre emerged from the pandemic more resilient and better
                  equipped to handle future crises.
                </p>
              </div>

              <!-- Chapter 8 -->
              <div v-else-if="selectedTab === 'Chapter_8'" id="Chapter_8" class="scroll-mt-8 sm:scroll-mt-24">
                <h2 class="text-2xl text-center text-orange font-bold mb-4">Chapter 8 - A Beacon of Hope and Empowerment</h2>
                <p class="text-lg  mb-8 text-justify">
                  Today, the Signal for Help Empowerment (SHE) Centre stands as a beacon of hope and empowerment for women
                  facing domestic violence. The center's team has grown to 20 staff members, all dedicated to providing
                  compassionate and comprehensive support. Three board directors continue to guide the organization with
                  wisdom and vision, ensuring that the SHE Centre remains true to its mission.
                </p>
                <p class="text-lg  mb-8 text-justify">
                  The services offered have expanded to include a wide range of programs designed to support women at
                  every stage of their journey. From crisis intervention and counseling to legal advocacy, educational
                  workshops, and vocational training, the SHE Centre is committed to empowering women to reclaim their
                  lives and achieve independence.
                </p>
              </div>

              <!-- Chapter 9 -->
              <div v-else-if="selectedTab === 'Chapter_9'" id="Chapter_9" class="scroll-mt-8 sm:scroll-mt-24">
                <h2 class="text-2xl text-center text-orange font-bold mb-4">Chapter 9 - Community Engagement and Future Goals</h2>
                <p class="text-lg mb-8 text-justify">
                  The SHE Centre's engagement with the local community remains a cornerstone of its success.
                  The center actively participates in outreach programs, awareness campaigns, and partnerships with other
                  organizations. The annual events continue to grow, attracting more participants and raising greater
                  awareness about domestic violence.
                </p>
                <p class="text-lg mb-8 text-justify">
                  Looking to the future, the SHE Centre has ambitious plans for further expansion and innovation.
                  These include the development of a new, state-of-the-art facility that will offer more space for shelter,
                  counseling, and educational programs. The center also aims to expand its digital platform,
                  providing even more resources and support for women who cannot access the center in person.
                </p>
              </div>

              <!-- Chapter 10 -->
              <div v-else-if="selectedTab === 'Chapter_10'" id="Chapter_10" class="scroll-mt-8 sm:scroll-mt-24">
                <h2 class="text-2xl text-center text-orange font-bold mb-4">Chapter 10 - The Legacy of Empowerment</h2>
                <p class="text-lg  mb-8 text-justify">
                  The story of the Signal for Help Empowerment (SHE) Centre is a testament to the power of vision,
                  dedication, and community support. What began as a dream shared by a small group of passionate
                  individuals has grown into a vital resource for thousands of women and children in Atlanta.
                  The center's impact is felt not only by those who receive direct support but also by the broader
                  community, as it raises awareness and fosters a culture of empowerment and respect.
                </p>
                <p class="text-lg  mb-8 text-justify">
                  As the SHE Centre continues to grow and evolve, its core mission remains unchanged: to provide a safe
                  haven and comprehensive support for women facing domestic violence, empowering them to reclaim their
                  lives and achieve independence. The legacy of the SHE Centre is one of hope, resilience, and unwavering
                  commitment to making the world a safer, more equitable place for all women.
                </p>
              </div>
            </transition>
          </div>
        </div>
	    </div>

      <!-- Our Team -->
      <div>
        <h2 class="text-2xl text-center text-orange font-bold my-8">Our Team</h2>
        <StaffCarousel :items=staffMembers>
          <template #default="{ item, active }">
            <PersonCard :person="item" :active="active" class="h-full" :show-bio="false" />
          </template>
        </StaffCarousel>
      </div>
      <br><br>

      <!-- Our Values -->
      <h2 class="text-2xl text-center text-orange font-bold mb-4">Our Values</h2>
      <p class="text-lg text-justify mb-8">
        We envision a world where every woman can live free from the threat of domestic violence. 
        The SHE Centre aspires to be a beacon of hope and empowerment, offering holistic, multi-faceted support 
        that addresses the complex needs of survivors and promotes long-term healing and independence.
      </p>
      <ul class="text-lg text-justify mb-8 list-disc list-inside marker:text-orange">
        <li><span class="text-orange">Empowerment:</span> We believe in equipping women with the tools and resources they need to build independent, fulfilling lives.</li>
        <li><span class="text-orange">Respect:</span> We honor the dignity and worth of every person, fostering an environment of trust and mutual respect.</li>
        <li><span class="text-orange">Community:</span> We are committed to building strong community ties and engaging with local partners to enhance our support network.</li>
        <li><span class="text-orange">Resilience:</span> We strive to overcome challenges with determination and adaptability, continually evolving to meet the needs of those we serve.</li>
        <li><span class="text-orange">Innovation:</span> We seek out new and effective ways to provide support, leveraging technology and partnerships to enhance our services.</li>
      </ul>

      <!-- Our Impact -->
      <h2 class="text-2xl text-center text-orange font-bold mb-4">Our Impact</h2>
      <div id="app">
        <BarChart />
      </div>

    </div>
  </section>
</template>
