export default {
  siteUrl: 'https://yaalstudio.com',
  gzip: true,
  trailingSlash: false,
  exclude: [
    '/admin',
  ],
  routes: async () => [
    '/',
    '/merci',
    // Ajouter ici d'autres routes statiques ou dynamiques si besoin
  ]
} 