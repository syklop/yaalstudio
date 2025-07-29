export default defineNuxtPlugin(async () => {
  console.log('🔑 Plugin auth - Démarrage...')
  
  const { useAuthStore } = await import('~/stores/auth.js')
  const authStore = useAuthStore()

  // Si le processus d'initialisation n'a pas encore commencé
  if (!authStore.isCheckingAuth && !authStore.isInitialized) {
    console.log('🔑 Plugin auth - Initialisation en cours...')
    
    try {
      await authStore.initAuth()
      console.log('🔑 Plugin auth - Initialisation terminée avec succès')
    } catch (error) {
      console.error('🔑 Plugin auth - Erreur initialisation:', error)
      // Ne pas bloquer l'application, laisser le middleware gérer
    }
  } else if (authStore.isCheckingAuth) {
    console.log('🔑 Plugin auth - Initialisation déjà en cours, attente...')
    
    // Attendre que l'initialisation se termine (max 3 secondes)
    let attempts = 0
    const maxAttempts = 30
    
    while (authStore.isCheckingAuth && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100))
      attempts++
    }
    
    console.log('🔑 Plugin auth - Attente terminée')
  } else {
    console.log('🔑 Plugin auth - Déjà initialisé')
  }
  
  console.log('🔑 Plugin auth - État final:', {
    isLoggedIn: authStore.isLoggedIn,
    isInitialized: authStore.isInitialized,
    hasToken: !!authStore.token
  })
}) 