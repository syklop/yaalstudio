// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-29', // Correction de la date - format valide
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: [
    '@nuxtjs/sitemap',
    '@pinia/nuxt',
    '@nuxt/ui'
  ],
  
  css: ['~/assets/css/main.css'],

  // Configuration PostCSS CORRIGÉE pour Tailwind v4
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
  
  // Configuration du site pour éviter les warnings
  site: {
    url: process.env.NODE_ENV === 'production' ? 'https://votre-domaine.vercel.app' : 'http://localhost:3000'
  },
  
  app: {
    head: {
      link: [
        {
          rel: 'manifest',
          href: '/site.webmanifest'
        }
        // Polices supprimées temporairement pour optimiser le build
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

  // Configuration optimisée pour résoudre l'erreur Prisma
  nitro: {
    experimental: {
      wasm: true
    },
    // Correction pour Vercel + Prisma
    preset: process.env.NODE_ENV === 'production' ? 'vercel' : undefined,
    // Exclusion de Prisma des optimisations Rollup
    rollupConfig: {
      external: ['@prisma/client', '.prisma/client']
    },
    externals: {
      external: ['@prisma/client', '.prisma/client']
    }
  },

  // Optimisations de build AMÉLIORÉES
  build: {
    transpile: ['@nuxt/ui', '@prisma/client']
  },

  // Correction COMPLÈTE des sourcemaps et CSS warnings
  vite: {
    css: {
      devSourcemap: false
    },
    build: {
      // Désactiver les sourcemaps pour la production
      sourcemap: false,
      rollupOptions: {
        external: ['.prisma/client']
      }
    },
    optimizeDeps: {
      exclude: ['@prisma/client', '.prisma/client']
    }
  }
})