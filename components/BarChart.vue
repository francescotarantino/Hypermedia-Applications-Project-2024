<!-- components/ImpactChart.vue -->
<template>
  <div class="bg-cream shadow-md rounded-lg overflow-hidden">
    <div class="p-6">
      <h2 class="text-lg font-semibold mb-4">Our all-time impact statistics</h2>

      <div v-for="(data, label) in statistics" :key="label" class="mb-4">
        <div class="flex items-center">
          <div class="w-1/3">{{ label }}</div>
          <div class="w-2/3 bg-peach rounded-full">
            <div :style="{ width: getPercentage(data) + '%' }" class="bg-apricot text-xs leading-none py-1 text-center text-primary rounded-full">{{ data }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const statistics = {
  'Number of Clients Served': 5000,
  'Crisis Interventions': 10000,
  'Legal Advocacy': 1500,
  'Counseling Services': 3000,
  'Workshops': 500,
  'Vocational Training Placements': 300
};

const getPercentage = (value: number) => {
  const max = Math.max(...Object.values(statistics));
  return (value / max) * 100;
};
</script>