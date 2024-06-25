<template>
  <AppLayout>
    <NuxtPage />
  </AppLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 150ms;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>