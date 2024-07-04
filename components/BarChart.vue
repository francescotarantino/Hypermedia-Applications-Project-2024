<script setup lang="ts">
const props = defineProps<{
  statistics: Record<string, number>;
}>();

function getPercentage (value: number) {
  const max = Math.max(...Object.values(props.statistics));
  return (value / max) * 100;
}
</script>

<template>
  <div class="bg-cream shadow-md rounded-lg overflow-hidden">
    <div class="p-6">
      <h2 class="text-lg font-semibold mb-4 text-center sm:text-left">Our all-time impact statistics</h2>

      <div v-for="(data, label) in statistics" :key="label" class="mb-4">
        <div class="flex items-center flex-col md:flex-row gap-2">
          <div class="flex-1">{{ label }}</div>
          <div class="flex-[2_2_0%] w-full bg-peach rounded-full">
            <div :style="{ width: getPercentage(data) + '%' }" class="bg-apricot text-xs leading-none py-1 text-center  rounded-full">{{ data }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
