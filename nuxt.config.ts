// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: process.env.ssr,
  experimental: {
    componentIslands: true,
    cookieStore: true,
  },
  nitro: {
    experimental: {
      websocket: true,
    },
    preset: process.env.deploy_preset,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
  ],
  supabase: {
    redirect: false,
  },
  app: {
    head: {
      htmlAttrs: {
        "data-theme": "halloween",
      },
    },
  },
  image: {
    domains: ["picsum.photos", "th.bing.com", "api.dicebear.com"],
    presets: {
      avatar: {
        modifiers: {
          format: "webp",
          width: 250,
          height: 250,
        },
      },
    },
  },
  css: ["~/assets/css/main.css"],
});
