export default defineNuxtPlugin(() => {
  // Générer un ID de session unique ou le récupérer du localStorage
  const getSessionId = () => {
    let sessionId = localStorage.getItem('yaal_session_id')
    if (!sessionId) {
      sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('yaal_session_id', sessionId)
    }
    return sessionId
  }

  // Tracker la visite
  const trackVisit = async (page, duration = null) => {
    try {
      const sessionId = getSessionId()
      const referrer = document.referrer || null
      
      await $fetch('/api/track-visitor', {
        method: 'POST',
        body: {
          sessionId,
          page,
          referrer,
          duration
        }
      })
    } catch (error) {
      console.log('Tracking error:', error)
      // Ne pas bloquer l'application si le tracking échoue
    }
  }

  // Tracker la page actuelle au chargement
  if (import.meta.client) {
    const router = useRouter()
    
    // Variables pour calculer le temps passé sur la page
    let pageStartTime = Date.now()
    
    // Tracker la page initiale
    nextTick(() => {
      trackVisit(router.currentRoute.value.path)
    })
    
    // Tracker les changements de route
    router.afterEach((to, from) => {
      // Calculer le temps passé sur la page précédente
      if (from.path !== to.path) {
        const duration = Math.floor((Date.now() - pageStartTime) / 1000) // en secondes
        if (duration > 5) { // Seulement si plus de 5 secondes
          trackVisit(from.path, duration)
        }
      }
      
      // Tracker la nouvelle page
      pageStartTime = Date.now()
      trackVisit(to.path)
    })
    
    // Tracker le temps passé quand l'utilisateur quitte la page
    window.addEventListener('beforeunload', () => {
      const duration = Math.floor((Date.now() - pageStartTime) / 1000)
      if (duration > 5) {
        // Utiliser sendBeacon pour envoyer la dernière requête
        const sessionId = getSessionId()
        const data = JSON.stringify({
          sessionId,
          page: router.currentRoute.value.path,
          duration
        })
        
        navigator.sendBeacon('/api/track-visitor', data)
      }
    })
  }
}) 