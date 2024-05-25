// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  experimental: {
    componentIslands: true
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@nuxt/eslint"],
  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'halloween',
      }
    }
  },
  image: {
    domains: ['picsum.photos'],
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 250,
          height: 250
        }
      }
    }
  },
  css: [
    "~/assets/css/main.css"
  ]
})