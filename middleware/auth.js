export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('🛡️ Middleware auth - Route:', to.path, 'depuis:', from?.path)
  
  // Éviter les redirections en boucle
  if (to.path === '/login' && from?.path === '/login') {
    console.log('🔄 Évitement boucle de redirection login')
    return
  }

  // Protection stricte du dashboard
  if (to.path.startsWith('/dashboard')) {
    console.log('🔍 Accès dashboard - Vérification stricte...')
    
    try {
      const { useAuthStore } = await import('~/stores/auth.js')
      const authStore = useAuthStore()

      // Initialiser l'auth si nécessaire
      if (!authStore.isInitialized) {
        console.log('⚡ Initialisation auth en cours...')
        const isAuthenticated = await authStore.initAuth()
        
        if (!isAuthenticated) {
          console.log('❌ Échec authentification - Redirection login')
          return navigateTo('/login?redirect=' + encodeURIComponent(to.fullPath))
        }
      }

      // Vérification stricte de l'authentification
      if (!authStore.isLoggedIn || authStore.isSessionExpired) {
        console.log('❌ Non authentifié ou session expirée - Redirection login')
        
        // Nettoyer les données au cas où
        try {
          await authStore.clearAuthData()
        } catch (clearError) {
          console.warn('⚠️ Erreur nettoyage données auth:', clearError)
        }
        
        return navigateTo('/login?redirect=' + encodeURIComponent(to.fullPath))
      }

      console.log('✅ Authentification validée - Accès dashboard autorisé')
      
    } catch (error) {
      console.error('❌ Erreur critique middleware:', error)
      return navigateTo('/login?error=auth_error')
    }
  }

  // Protection contre l'accès à login si déjà connecté
  if (to.path === '/login') {
    try {
      const { useAuthStore } = await import('~/stores/auth.js')
      const authStore = useAuthStore()
      
      // Vérifier si l'utilisateur est déjà connecté
      if (authStore.isInitialized && authStore.isLoggedIn && !authStore.isSessionExpired) {
        console.log('🔄 Déjà connecté - Redirection vers dashboard')
        
        // Rediriger vers la page demandée ou dashboard
        const redirectTo = to.query.redirect || '/dashboard'
        return navigateTo(redirectTo)
      }
    } catch (error) {
      console.error('❌ Erreur vérification login:', error)
      // Continuer vers login en cas d'erreur
    }
  }
}) 