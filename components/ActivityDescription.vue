<script setup lang="ts">
defineProps<{
  activity: IActivity;
}>();
</script>

<template>
  <div class="flex flex-col gap-8">
    <h2 class="text-2xl text-center text-orange font-bold">Description</h2>

    <div class="flex justify-center">
      <div class="flex flex-col lg:flex-row justify-center gap-8 md:w-3/4">
        <p class="text-lg text-justify w-3/4 self-center lg:self-start">
          {{activity?.description}}
        </p>

        <ImageCarousel :images="activity.other_images!" />
      </div>
    </div>
  </div>
</template>
