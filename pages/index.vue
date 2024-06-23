<script setup lang="ts">
const { data: twentyone} = await useFetch('/api/people/21')
const { data: twentytwo} = await useFetch('/api/people/22')
const { data: twentythree} = await useFetch('/api/people/23')

const directiveBoard = [
  twentyone, twentytwo, twentythree,
];

</script>

<template>
  <section>
    <br>
    <div class="container mx-auto px-4 w-3/4">
      <!-- About Us -->
      <h2 class="text-3xl text-center text-orange font-bold mt-4 mb-8">Home</h2>
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
    </div>
  </section>
</template>

<style scoped>

</style>