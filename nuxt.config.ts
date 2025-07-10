// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  
  // Modules installés dans package.json
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],

  // Configuration SEO optimisée pour landing page
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'YaalStudio – Studio créatif, branding & stratégie',
      htmlAttrs: { lang: 'fr', dir: 'ltr' },
      meta: [
        { name: 'description', content: 'YaalStudio – Studio créatif à impact, branding, stratégie, identité visuelle, site web, accompagnement pour entrepreneures ambitieuses. Créez une marque lisible, stratégique et durable.' },
        { name: 'keywords', content: 'branding, stratégie, identité visuelle, site web, entrepreneure, marque, yaalstudio, design, digital, accompagnement, créatif, durable, lisible' },
        { name: 'author', content: 'YaalStudio' },
        { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:site_name', content: 'YaalStudio' },
        { property: 'og:title', content: 'YaalStudio – Studio créatif, branding & stratégie' },
        { property: 'og:description', content: 'Studio créatif à impact, branding, stratégie, identité visuelle, site web, accompagnement pour entrepreneures ambitieuses.' },
        { property: 'og:url', content: 'https://yaalstudio.com' },
        { property: 'og:image', content: 'https://yaalstudio.com/yaalwoman.webp' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'YaalStudio – Studio créatif, branding & stratégie' },
        { name: 'twitter:description', content: 'Studio créatif à impact, branding, stratégie, identité visuelle, site web, accompagnement pour entrepreneures ambitieuses.' },
        { name: 'twitter:image', content: 'https://yaalstudio.com/yaalwoman.webp' },
        { name: 'theme-color', content: '#000000' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        { rel: 'canonical', href: 'https://yaalstudio.com' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon.ico' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preload', as: 'image', href: '/yaalwoman.webp' },
        { rel: 'preload', as: 'font', href: '/assets/Blinka Serif.ttf', type: 'font/ttf' },
        { rel: 'preload', as: 'font', href: '/assets/DelightSunset-8Mvpz.otf', type: 'font/otf' },
      ]
    }
  },

  // Configuration des images pour la performance
  image: {
    quality: 90,
    format: ['webp', 'avif', 'jpg', 'png'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  // Configuration des fonts Google optimisée
  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [300, 400, 500, 600, 700]
      }
    ]
  },

  // Optimisations Nitro pour la performance
  nitro: {
    compressPublicAssets: true,
    minify: true
  },

  // Configuration runtime publique
  runtimeConfig: {
    // Variables privées côté serveur
    googleSheetsId: process.env.GOOGLE_SHEETS_ID,
    googleSheetsApiKey: process.env.GOOGLE_SHEETS_API_KEY,
    googleServiceAccountPath: process.env.GOOGLE_SERVICE_ACCOUNT_PATH,
    brevoApiKey: process.env.BREVO_API_KEY,
    fromEmail: process.env.FROM_EMAIL,
    fromName: process.env.FROM_NAME,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    jwtSecret: process.env.JWT_SECRET,
    
    // Variables publiques côté client
    public: {
      siteUrl: 'https://yaalstudio.com',
      siteName: 'YaalStudio',
      siteDescription: 'YaalStudio – Studio créatif à impact, branding, stratégie, identité visuelle, site web, accompagnement pour entrepreneures ambitieuses.'
    }
  },

  // Configuration du serveur de développement
  devServer: {
    port: 3000,
    host: 'localhost'
  },

  // Optimisations CSS
  css: ['~/assets/css/main.css'],
  plugins: [],
  // Configuration Vite pour le build
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router']
          }
        }
      }
    }
  },

  // Configuration d'optimisation expérimentale
  experimental: {
    payloadExtraction: false,
    viewTransition: true
  }
})