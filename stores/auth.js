import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    isCheckingAuth: false,
    isInitialized: false,
    user: null,
    token: null,
    sessionExpiry: null,
    lastActivity: null,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && !!state.token,
    isSessionExpired: (state) => {
      if (!state.sessionExpiry) return false
      return new Date() > new Date(state.sessionExpiry)
    },
    userInfo: (state) => state.user,
    authToken: (state) => state.token,
    checkingAuth: (state) => state.isCheckingAuth,
    isAdmin: (state) => state.isAuthenticated && state.user?.email
  },

  actions: {
    async initAuth() {
      // Éviter les multiples initialisations simultanées
      if (this.isCheckingAuth) {
        console.log('🔑 Auth déjà en cours - Attente...')
        // Attendre que l'initialisation en cours se termine
        let attempts = 0
        const maxAttempts = 50 // 5 secondes max
        
        while (this.isCheckingAuth && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 100))
          attempts++
        }
        
        console.log('🔑 Auth - Attente terminée, retour état:', this.isAuthenticated)
        return this.isAuthenticated
      }

      if (this.isInitialized) {
        console.log('🔑 Auth déjà initialisé:', this.isAuthenticated)
        return this.isAuthenticated
      }

      try {
        this.isCheckingAuth = true
        console.log('🔑 Début initialisation auth...')
        
        if (import.meta.client) {
          const storedToken = localStorage.getItem('yaal_auth_token')
          const storedUser = localStorage.getItem('yaal_user')
          const storedExpiry = localStorage.getItem('yaal_session_expiry')
          
          console.log('🔑 Données stockées:', {
            hasToken: !!storedToken,
            hasUser: !!storedUser,
            hasExpiry: !!storedExpiry,
            expiry: storedExpiry
          })
          
          if (storedToken && storedUser && storedExpiry) {
            const expiryDate = new Date(storedExpiry)
            const now = new Date()
            
            if (now < expiryDate) {
              try {
                this.token = storedToken
                this.user = JSON.parse(storedUser)
                this.sessionExpiry = storedExpiry
                this.isAuthenticated = true
                this.lastActivity = new Date().toISOString()
                
                console.log('🔑 Session locale restaurée, vérification token...')
                
                // Vérifier le token côté serveur de manière non bloquante
                try {
                  const isValid = await this.verifyToken()
                  if (!isValid) {
                    console.log('❌ Token invalide côté serveur')
                    await this.clearAuthData()
                    return false
                  }
                  console.log('✅ Token valide côté serveur')
                } catch (error) {
                  console.warn('⚠️ Impossible de vérifier le token, mode dégradé:', error.message)
                  // En mode dégradé, on garde la session locale mais on logge l'erreur
                  this.error = `Connexion limitée: ${error.message}`
                }
                
                console.log('✅ Authentification restaurée avec succès')
                return true
              } catch (parseError) {
                console.error('❌ Erreur parsing données utilisateur:', parseError)
                await this.clearAuthData()
                return false
              }
            } else {
              console.log('⚠️ Session expirée localement')
              await this.clearAuthData()
              return false
            }
          } else {
            console.log('ℹ️ Aucune session stockée')
          }
        }
        
        console.log('ℹ️ Aucune authentification disponible')
        return false
      } catch (error) {
        console.error('❌ Erreur critique lors de l\'initialisation auth:', error)
        this.error = error.message
        await this.clearAuthData()
        return false
      } finally {
        this.isCheckingAuth = false
        this.isInitialized = true
        console.log('🔑 Initialisation auth terminée, état final:', this.isAuthenticated)
      }
    },

    async clearAuthData() {
      console.log('🧹 Nettoyage données auth...')
      this.isAuthenticated = false
      this.user = null
      this.token = null
      this.sessionExpiry = null
      this.lastActivity = null
      this.error = null
      
      if (import.meta.client) {
        localStorage.removeItem('yaal_auth_token')
        localStorage.removeItem('yaal_user')
        localStorage.removeItem('yaal_session_expiry')
      }
    },

    async login(credentials) {
      try {
        this.loading = true
        this.error = null
        
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            email: credentials.email,
            password: credentials.password
          }
        })
        
        if (response.success && response.data) {
          this.isAuthenticated = true
          this.user = response.data.user
          this.token = response.data.token
          this.sessionExpiry = response.data.expiry
          this.lastActivity = new Date().toISOString()
          
          if (import.meta.client) {
            localStorage.setItem('yaal_auth_token', response.data.token)
            localStorage.setItem('yaal_user', JSON.stringify(response.data.user))
            localStorage.setItem('yaal_session_expiry', response.data.expiry)
          }
          
          console.log('✅ Connexion réussie')
          return { success: true, user: response.data.user }
        } else {
          throw new Error(response.message || 'Erreur de connexion')
        }
        
      } catch (error) {
        console.error('❌ Erreur de connexion:', error)
        this.error = error.data?.message || error.message || 'Erreur de connexion'
        this.isAuthenticated = false
        this.user = null
        this.token = null
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async logout(skipNavigation = false) {
      console.log('🚪 Début déconnexion...')
      
      try {
        // Tenter de notifier le serveur
        if (this.token) {
          try {
            await $fetch('/api/auth/logout', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${this.token}`
              }
            })
            console.log('✅ Serveur notifié de la déconnexion')
          } catch (error) {
            console.warn('⚠️ Erreur déconnexion serveur (continuons quand même):', error.message)
          }
        }
        
        // Nettoyer les données locales
        await this.clearAuthData()
        
        console.log('✅ Déconnexion réussie')
        
        // Navigation seulement si demandée
        if (!skipNavigation) {
          await navigateTo('/login')
        }
        
      } catch (error) {
        console.error('❌ Erreur critique lors de la déconnexion:', error)
        // En cas d'erreur critique, forcer le nettoyage
        await this.clearAuthData()
        
        if (!skipNavigation) {
          await navigateTo('/login')
        }
      }
    },

    async verifyToken() {
      try {
        if (!this.token) return false
        
        const response = await $fetch('/api/auth/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        
        if (response.success) {
          if (response.data.user) {
            this.user = response.data.user
            if (import.meta.client) {
              localStorage.setItem('yaal_user', JSON.stringify(response.data.user))
            }
          }
          
          this.lastActivity = new Date().toISOString()
          return true
        } else {
          this.logout()
          return false
        }
        
      } catch (error) {
        console.error('❌ Erreur vérification token:', error)
        this.logout()
        return false
      }
    },

    updateActivity() {
      this.lastActivity = new Date().toISOString()
      if (this.isSessionExpired) {
        this.logout()
      }
    },

    clearError() {
      this.error = null
    },

    setError(message) {
      this.error = message
    }
  }
}) 