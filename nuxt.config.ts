// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/sitemap',
    '@pinia/nuxt',
    '@nuxt/ui'
  ],
  
  css: ['~/assets/css/main.css'],
  
  app: {
    head: {
      link: [
        {
          rel: 'manifest',
          href: '/site.webmanifest'
        },
        {
          rel: 'preload',
          href: '/assets/Blinka Serif.ttf',
          as: 'font',
          type: 'font/ttf',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload', 
          href: '/assets/DelightSunset-8Mvpz.otf',
          as: 'font',
          type: 'font/otf',
          crossorigin: 'anonymous'
        }
      ]
    }
  },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    brevoApiKey: process.env.BREVO_API_KEY,
    adminEmail: process.env.ADMIN_EMAIL,
    public: {
      // Variables publiques ici si nécessaire
    }
  },

  nitro: {
    experimental: {
      wasm: true
    }
  }
})