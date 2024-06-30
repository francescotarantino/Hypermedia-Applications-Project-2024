<script setup lang="ts">
defineProps<{
  activity: IActivity;
}>();
</script>

<template>
  <div class="flex flex-col gap-8">
    <h2 class="text-2xl text-center text-orange font-bold">People involved</h2>

    <div class="flex flex-wrap self-center justify-center gap-4 md:w-3/4">
      <VerticalPersonCard :person="activity.main_responsible!" :isMainResponsible="true" />

      <VerticalPersonCard v-for="person in activity.people_involved!" :person="person" />
    </div>
  </div>
</template>
