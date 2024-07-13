<script setup lang="ts">
/**
 * This component displays a bar chart with statistics.
 * @property {Record<string, number>} statistics - The statistics to display in the chart (key is the label, value is the data)
 */
const props = defineProps<{
  statistics: Record<string, number>;
}>();

function getPercentage (value: number) {
  const max = Math.max(...Object.values(props.statistics));
  return (value / max) * 100;
}

// Using Intersection Observer API to show the bars when the chart is in the viewport
const showBars = ref(false);
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showBars.value = true;
      }
    });
  }, {
    root: null, // observing with respect to the viewport
    threshold: 0.5 // callback will be executed when 50% of the element is visible
  });

  const element = document.getElementById('bar-chart');
  if (element) observer.observe(element);

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <div class="bg-cream shadow-md rounded-lg overflow-hidden" id="bar-chart">
    <div class="p-6">
      <h2 class="text-lg font-semibold mb-4 text-center sm:text-left">Our all-time impact statistics</h2>

      <div v-for="(data, label) in statistics" :key="label" class="mb-4">
        <div class="flex items-center flex-col md:flex-row gap-2">
          <div class="flex-1">{{ label }}</div>

          <div class="flex-[2_2_0%] w-full bg-peach rounded-full">
            <div class="min-w-8 bg-apricot text-xs leading-none py-1 text-center rounded-full transition-all ease-in-out duration-[2s]"
                 :style="{ width: showBars ? `${getPercentage(data)}%` : '0px' }"
            >
              {{ data }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
