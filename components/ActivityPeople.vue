<script setup lang="ts">
defineProps<{
  activity: IActivity;
}>();
</script>

<template>
  <div class="flex flex-col gap-8">
    <h2 class="text-2xl text-center text-orange font-bold">People involved</h2>

    <div class="flex sm:justify-center overflow-x-scroll overflow-y-hidden scrollbar-hidden pt-4">
      <div class="flex flex-nowrap sm:flex-wrap px-10 pb-14 sm:ms-0 sm:px-0 lg:px-0 self-center justify-center gap-4 md:w-3/4">
        <VerticalPersonCard :person="activity.main_responsible!" :isMainResponsible="true" />

        <VerticalPersonCard v-for="person in activity.people_involved!" :person="person" />
      </div>
    </div>
  </div>
</template>
