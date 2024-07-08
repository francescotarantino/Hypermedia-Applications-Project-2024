// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s %separator SHE-Centre',
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'en',
      },
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
        {
          name: 'keywords',
          content: 'signal for help, empowerment, women, anti-violence, gender equality, women\'s rights, support, help, safety, assistance, aid, shelter, refuge'
        },
        {
          name: 'author',
          content: 'SHE-Centre Team'
        },
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },

  css: [
    '~/assets/css/transitions.css',
  ],

  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@nuxt/fonts",
    "@nuxtjs/leaflet",
    "@nuxt/image"
  ],

  supabase: {
    redirect: false,
  },

  image: {
    domains: ['hkxldzwisdxifuxuhvel.supabase.co']
  },

  ssr: true,

  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    openaiAssistantId: process.env.OPENAI_ASSISTANT_ID,
  },

  compatibilityDate: '2024-07-07'
});