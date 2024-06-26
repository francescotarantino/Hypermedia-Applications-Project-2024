<template>
  <div>
    <div class="min-h-screen">
      <AppHeader />

      <div class="py-12">
        <slot />
      </div>

      <AppFooter class="sticky top-[100vh]" />
    </div>

    <AppChatbot />
  </div>
</template>
