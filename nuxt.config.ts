// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Signal for Help Empowerment centre',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
      ],
      meta: [
        {
          name: 'description',
          content:
            'The SHE-Centre is a pioneering organization dedicated to combating violence against women and promoting gender equality.'
        },
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@nuxt/fonts",
    "@nuxtjs/leaflet"
  ],
  supabase: {
    redirect: false
  },
  ssr: true,
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    openaiAssistantId: process.env.OPENAI_ASSISTANT_ID,
  }
})