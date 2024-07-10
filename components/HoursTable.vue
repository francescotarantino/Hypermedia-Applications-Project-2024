<script setup lang="ts">
/**
 * @property {Array<{day: string, hours: string}>} hours - The hours to display in the table.
 */
defineProps<{
  hours: {
    day: string;
    hours: string;
  }[];
}>();
</script>

<template>
  <table class="ml-auto mr-auto bg-cream rounded-xl text-center w-fit h-fit">
    <thead>
    <tr>
      <th class="border-r-2 border-r-apricot border-b-2 border-b-apricot px-4 py-2">Day</th>
      <th class="border-b-2 border-b-apricot px-4 py-2">Hours</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(hour, index) in hours" :key="index">
      <td class="border-r-2 border-r-apricot px-4 py-2">{{hour.day}}</td>
      <td class="px-4 py-2">{{hour.hours}}</td>
    </tr>
    </tbody>
  </table>
</template>
