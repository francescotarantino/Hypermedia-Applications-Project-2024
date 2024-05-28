// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", "@nuxt/fonts"],
  supabase: {
    redirect: false
  },
  ssr: true,
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    openaiAssistantId: process.env.OPENAI_ASSISTANT_ID,
  }
})
