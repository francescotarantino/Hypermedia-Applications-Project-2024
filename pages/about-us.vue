<script setup lang="ts">
const { data: people } = await useFetch<IPerson[]>('/api/people');

// Filter only the directors
const boardDirectors = people?.value?.filter((p) => p.main_role === 'Director');
</script>

<template>
  <section>
    <div class="container mx-auto px-4 w-3/4">
      <!-- About Us -->
      <h2 class="text-3xl text-center text-orange font-bold mt-4 mb-8">About Us</h2>
      <p class="text-lg text-justify mb-8">
        The SHE-Centre, founded in 2001 and located at Piazza Leonardo da Vinci 32, Milan, is a pioneering organization
        dedicated to combating violence against women and promoting gender equality. Over the years, it has become a
        cornerstone of support and advocacy for survivors of violence, offering a comprehensive range of services
        including emergency shelter, counseling, legal assistance, and educational workshops.
      </p>
      <p class="text-lg text-justify mb-8">In 2003, the centre launched the "Safe Haven" program, providing emergency
        housing for women and children escaping domestic violence. By 2007, it had established a legal aid clinic in
        collaboration with local law firms, offering free legal advice and representation to over 500 women annually.
        The "Voices of Courage" campaign, initiated in 2012, raised awareness about violence against women through
        community events, media partnerships, and public speaking engagements. Recognizing the unique challenges faced
        by immigrant and refugee women, the centre expanded its services in 2015 to support these communities.
      </p>
      <p class="text-lg text-justify mb-8">In 2018, the SHE-Centre opened a dedicated children's center to support the
        psychological and educational needs of young victims of domestic violence. By 2021, the centre had celebrated
        20 years of service, having assisted over 10,000 women and their families and trained more than 1,500 volunteers
        and professionals in violence prevention and intervention strategies.
      </p>
      <p class="text-lg text-justify mb-8">Annually, the SHE-Centre assists approximately 1,200 women, providing crucial
        services such as crisis intervention, long-term counseling, and advocacy. It conducts over 100 educational
        workshops each year, engaging more than 3,000 participants. Its 24/7 helpline fields an average of 5,000 calls
        per year, offering immediate support and resources. The centre partners with over 50 local organizations and
        governmental bodies, contributing to significant policy changes and community safety initiatives. The SHE-Centre
        remains committed to empowering women, fostering safe communities, and creating lasting change in the fight
        against violence.
      </p>
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <!-- Opening Hours -->
        <div>
          <h2 class="text-3xl text-orange text-center font-bold mt-8 mb-4">Opening Hours</h2>
          <table class="ml-auto mr-auto bg-cream border-2 border-primary text-center w-fit h-fit ">
            <thead>
            <tr>
              <th class="px-4 py-2">Day</th>
              <th class="px-4 py-2">Opening Hours</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="border px-4 py-2">Monday</td>
              <td class="border px-4 py-2">9:00 AM - 6:00 PM</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Tuesday</td>
              <td class="border px-4 py-2">9:00 AM - 6:00 PM</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Wednesday</td>
              <td class="border px-4 py-2">9:00 AM - 6:00 PM</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Thursday</td>
              <td class="border px-4 py-2">9:00 AM - 6:00 PM</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Friday</td>
              <td class="border px-4 py-2">9:00 AM - 6:00 PM</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Saturday</td>
              <td class="border px-4 py-2">10:00 AM - 4:00 PM</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Sunday</td>
              <td class="border px-4 py-2">Closed</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- Map -->
        <div>
          <h2 class="text-3xl text-orange text-center font-bold mt-8 mb-4">Our Location</h2>
          <div class="w-full h-64 lg:h-full pb-4 lg:pb-24 pt-3">
            <Map />
          </div>
        </div>
      </div>
      <br><br>
      <!-- Directive Board -->
      <div class="flex flex-col lg:flex-row items-center bg-cream rounded-2xl drop-shadow mt-4">
        <h2 class="flex-none p-4 w-full md:w-1/3 text-3xl text-orange font-bold text-center">The directive board</h2>
        <div class="flex-grow m-8 grid grid-cols-1 md:grid-cols-3">
          <div v-for="(person, index) in boardDirectors" :key="index">
            <div class="flex flex-col items-center">
              <NuxtLink :to="`/people/${person.id}`" class="flex flex-col items-center hover:opacity-70">
                <img class="border-2 border-orange bg-white aspect-auto rounded-2xl w-3/4" :src="person.picture.path" :alt="person.picture.label"/>
                <p class="font-semibold text-xl">{{person.name + ' ' + person.surname}}</p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <br><br>
      <!-- Our Headquarter -->
      <h2 class="text-3xl text-center text-orange font-bold mb-4">Our Headquarter</h2>
      <div class="flex flex-col md:flex-row items-center mt-4">
        <img class="flex-none w-full md:w-1/4 border-2 border-orange aspect-auto rounded-2xl" src="/headquarter.jpg" alt="Headquarter Image"/>
        <p class="flex-auto text-lg pt-4 pl-0 md:pt-0 md:pl-16 text-justify">
          Nestled in the heart of Milan, the SHE-centre finds its home in a beautifully restored 19th-century palazzo.
          Ornate stuccowork frames the grand windows, hinting at the rich history within. A vibrant crimson awning
          stretches above the entrance, emblazoned with the SHE-centre logo, symbolizing both strength and grace.
          Climbing the elegant marble steps, you're greeted by a warm, modern interior bathed in natural light. The buzz
          of conversation and clinking coffee cups fill the air, a testament to the center's dynamic atmosphere. Here,
          women from all walks of life gather to connect, learn, and empower each other.
        </p>
      </div>
      <br><br>
      <!-- Our History -->
      <h2 class="text-3xl text-center text-orange font-bold mt-8 mb-4">
        Our History: a journey in the fight against violence
      </h2>
      <h2 class="text-2xl text-center text-orange font-bold mt-8 mb-4">Founding and Vision</h2>
      <p class="text-lg  mb-8 text-justify">
        The SHE-Centre was founded in 2001 by a group of passionate activists and professionals who recognized the
        urgent need for a dedicated space to support women facing violence in Milan. Among the founders were Dr. Jane
        Doberman, a renowned psychologist specializing in trauma recovery; Carly Collier, a legal expert in women's
        rights; and Susan Shihman, a social worker with extensive experience in crisis intervention. Their combined
        expertise and unwavering commitment laid a strong foundation for what would become a beacon of hope for thousands
        of women.
      </p>
      <p class="text-lg  mb-8 text-justify">
        Located at Piazza Leonardo da Vinci 32, Milan, the SHE-Centre occupies a historic building that has been
        carefully renovated to provide a safe and welcoming environment. The building features private counseling rooms,
        a communal kitchen, a children's play area, and a serene garden where clients can find peace and solace.
      </p>
      <h2 class="text-2xl text-center text-orange font-bold mt-8 mb-4">Milestones and Achievements</h2>
      <p class="text-lg  mb-8 text-justify">In 2003, the centre launched its flagship "Safe Haven" program,
        which has since provided emergency housing to over 2,000 women and children. This program was one of the first
        of its kind in Milan and set a standard for comprehensive care and support.
      </p>
      <p class="text-lg  mb-8 text-justify">
        By 2007, the SHE-Centre had established a legal aid clinic in collaboration with several prestigious law firms
        in Milan. This clinic has offered free legal services to over 500 women annually, helping them secure protective
        orders, navigate custody battles, and access their rights.
      </p>
      <p class="text-lg  mb-8 text-justify">
        The "Voices of Courage" campaign, initiated in 2012, marked a significant milestone in the centre's history.
        This campaign aimed to raise awareness about violence against women through community events, media
        partnerships, and public speaking engagements. It reached thousands of people and helped shift public perception
        and policy regarding gender-based violence.
      </p>
      <p class="text-lg  mb-8 text-justify">
        Recognizing the unique challenges faced by immigrant and refugee women, the SHE-Centre expanded its services in
        2015 to provide targeted support for these communities. This expansion included language classes, cultural
        integration workshops, and specialized counseling services.
      </p>
      <p class="text-lg  mb-8 text-justify">
        In 2018, the centre opened a dedicated children's center to support the psychological and educational needs of
        young victims of domestic violence. This center offers therapeutic play sessions, educational tutoring, and a
        safe space for children to express themselves and heal.
      </p>
      <h2 class="text-2xl text-center text-orange font-bold mt-8 mb-4">Community and Donors</h2>
      <p class="text-lg  mb-8 text-justify">
        The success of the SHE-Centre would not be possible without the generous support of its donors and community
        partners. Major donors include the Milan Community Foundation, which has provided substantial financial support
        for the centre's programs and initiatives. Corporate sponsors, such as Enel and UniCredit, have also contributed
        significantly through both funding and volunteer support.
      </p>
      <p class="text-lg  mb-8 text-justify">
        The centre's community outreach programs have established strong partnerships with over 50 local organizations
        and governmental bodies. These partnerships have been instrumental in creating a robust network of support for
        survivors of violence and advocating for policy changes at the local and national levels.
      </p>
      <h2 class="text-2xl text-center text-orange font-bold mt-8 mb-4">Minor Milestones and Continuous Growth</h2>
      <p class="text-lg  mb-8 text-justify">
        Over the years, the SHE-Centre has achieved numerous smaller milestones that collectively contribute to its
        overarching mission. In 2005, the centre hosted its first annual fundraising gala, which has since become a key
        event in Milan's social calendar, raising vital funds and awareness for the cause. In 2010, the centre
        introduced an innovative volunteer training program, which has trained over 1,500 volunteers and professionals
        in violence prevention and intervention strategies.
      </p>
      <p class="text-lg  mb-8 text-justify">
        The centre's educational workshops have also evolved and expanded. In 2013, a financial literacy program was
        introduced to empower women with the knowledge and skills to achieve financial independence. In 2016, the centre
        began offering digital literacy classes, recognizing the growing importance of technology in accessing
        information and resources.
      </p>
      <p class="text-lg  mb-8 text-justify">
        In 2019, the SHE-Centre launched a mobile outreach unit to reach women in remote or underserved areas. This unit
        provides on-the-spot counseling, legal advice, and referrals to other services, ensuring that support is
        accessible to all women, regardless of their location.
      </p>
      <h2 class="text-2xl text-center text-orange font-bold mt-8 mb-4">Impact and Future Vision</h2>
      <p class="text-lg  mb-8 text-justify">
        Annually, the SHE-Centre assists approximately 1,200 women, providing crucial services such as crisis
        intervention, long-term counseling, and advocacy. Its 24/7 helpline fields an average of 5,000 calls per year,
        offering immediate support and resources. Through its educational workshops, the centre engages more than 3,000
        participants each year, fostering awareness and empowering women with knowledge and skills.
      </p>
      <p class="text-lg  mb-8 text-justify">
        The SHE-Centre remains committed to its mission of empowering women, fostering safe communities, and creating
        lasting change in the fight against violence. Looking to the future, the centre aims to expand its services
        further, develop new programs to address emerging needs, and continue advocating for systemic changes that
        protect and uplift women.
      </p>
      <p class="text-lg  mb-8 text-justify">
        The SHE-Centre’s journey from a small group of dedicated founders to a leading organization in Milan is a
        testament to the power of community, resilience, and unwavering commitment to justice and equality. With
        continued support and innovation, the SHE-Centre will undoubtedly remain a vital resource and advocate for women
        for many years to come.
      </p>
    </div>
  </section>
</template>
