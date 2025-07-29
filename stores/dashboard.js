import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    // Données des contacts
    contacts: [],
    contactsLoading: false,
    contactsError: null,
    contactsPagination: {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0
    },
    contactsFilters: {
      search: '',
      status: 'all',
      source: 'all',
      dateFrom: null,
      dateTo: null
    },

    // Statistiques générales
    stats: {
      totalContacts: 0,
      contactsToday: 0,
      contactsThisWeek: 0,
      contactsThisMonth: 0,
      uniqueVisitorsToday: 0,
      uniqueVisitors7Days: 0,
      uniqueVisitors30Days: 0,
      conversionRate: 0,
      averageSessionDuration: 0,
      contactsByStatus: [],
      contactsByDay: {},
      topSources: []
    },
    statsLoading: false,
    statsError: null,

    // Données analytics
    analytics: {
      visitorsChart: [],
      contactsChart: [],
      topPages: [],
      topReferrers: [],
      topCountries: [],
      deviceStats: [],
      browserStats: []
    },
    analyticsLoading: false,
    analyticsError: null,

    // État général
    lastUpdated: null
  }),

  getters: {
    // Getters pour les contacts
    filteredContacts: (state) => {
      let filtered = [...state.contacts]
      
      if (state.contactsFilters.search) {
        const search = state.contactsFilters.search.toLowerCase()
        filtered = filtered.filter(contact => 
          contact.firstName.toLowerCase().includes(search) ||
          contact.email.toLowerCase().includes(search) ||
          contact.phone?.includes(search)
        )
      }
      
      if (state.contactsFilters.status !== 'all') {
        filtered = filtered.filter(contact => contact.status === state.contactsFilters.status)
      }
      
      if (state.contactsFilters.source !== 'all') {
        filtered = filtered.filter(contact => contact.source === state.contactsFilters.source)
      }
      
      return filtered
    },

    // Getters pour les statistiques
    conversionRateFormatted: (state) => {
      return state.stats.conversionRate ? `${state.stats.conversionRate.toFixed(1)}%` : '0%'
    },

    averageDurationFormatted: (state) => {
      if (!state.stats.averageSessionDuration) return '0s'
      const minutes = Math.floor(state.stats.averageSessionDuration / 60)
      const seconds = Math.floor(state.stats.averageSessionDuration % 60)
      return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
    },

    // Getters pour les analytics
    hasAnalyticsData: (state) => {
      return state.analytics.visitorsChart.length > 0 || 
             state.analytics.topPages.length > 0
    },

    // Getter pour vérifier si les données sont récentes
    isDataFresh: (state) => {
      if (!state.lastUpdated) return false
      const now = new Date()
      const lastUpdate = new Date(state.lastUpdated)
      const diffMinutes = (now - lastUpdate) / (1000 * 60)
      return diffMinutes < 5 // Données fraîches si moins de 5 minutes
    }
  },

  actions: {
    // Actions pour les statistiques
    async fetchStats() {
      try {
        this.statsLoading = true
        this.statsError = null

        // Obtenir le store d'authentification
        const { useAuthStore } = await import('./auth.js')
        const authStore = useAuthStore()

        if (!authStore.token) {
          throw new Error('Token d\'authentification manquant')
        }

        const response = await $fetch('/api/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (response.success && response.data) {
          this.stats = { ...this.stats, ...response.data }
          this.lastUpdated = new Date().toISOString()
          console.log('✅ Statistiques chargées')
          return true
        } else {
          throw new Error(response.message || 'Erreur lors du chargement des statistiques')
        }
      } catch (error) {
        console.error('❌ Erreur stats:', error)
        this.statsError = error.message || 'Erreur lors du chargement des statistiques'
        return false
      } finally {
        this.statsLoading = false
      }
    },

    // Actions pour les contacts
    async fetchContacts(options = {}) {
      try {
        this.contactsLoading = true
        this.contactsError = null

        // Obtenir le store d'authentification
        const { useAuthStore } = await import('./auth.js')
        const authStore = useAuthStore()

        if (!authStore.token) {
          throw new Error('Token d\'authentification manquant')
        }

        const params = new URLSearchParams({
          page: options.page || this.contactsPagination.page,
          limit: options.limit || this.contactsPagination.limit,
          ...this.contactsFilters,
          ...(options.filters || {})
        })

        const response = await $fetch(`/api/dashboard/contacts?${params}`, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (response.success && response.data) {
          this.contacts = response.data.contacts || []
          this.contactsPagination = {
            page: response.data.pagination?.page || 1,
            limit: response.data.pagination?.limit || 20,
            total: response.data.pagination?.total || 0,
            totalPages: response.data.pagination?.totalPages || 0
          }
          console.log('✅ Contacts chargés')
          return true
        } else {
          throw new Error(response.message || 'Erreur lors du chargement des contacts')
        }
      } catch (error) {
        console.error('❌ Erreur contacts:', error)
        this.contactsError = error.message || 'Erreur lors du chargement des contacts'
        return false
      } finally {
        this.contactsLoading = false
      }
    },

    // Mettre à jour le statut d'un contact
    async updateContactStatus(contactId, newStatus) {
      try {
        // Obtenir le store d'authentification
        const { useAuthStore } = await import('./auth.js')
        const authStore = useAuthStore()

        if (!authStore.token) {
          throw new Error('Token d\'authentification manquant')
        }

        const response = await $fetch(`/api/dashboard/contacts/${contactId}`, {
          method: 'PATCH',
          body: { status: newStatus },
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (response.success) {
          // Mettre à jour le contact dans le store
          const contactIndex = this.contacts.findIndex(c => c.id === contactId)
          if (contactIndex !== -1) {
            this.contacts[contactIndex].status = newStatus
            this.contacts[contactIndex].updatedAt = new Date().toISOString()
          }
          
          console.log('✅ Statut contact mis à jour')
          return true
        } else {
          throw new Error(response.message || 'Erreur lors de la mise à jour')
        }
      } catch (error) {
        console.error('❌ Erreur mise à jour contact:', error)
        return false
      }
    },

    // Actions pour les analytics
    async fetchAnalytics(period = '30d') {
      try {
        this.analyticsLoading = true
        this.analyticsError = null

        // Obtenir le store d'authentification
        const { useAuthStore } = await import('./auth.js')
        const authStore = useAuthStore()

        if (!authStore.token) {
          throw new Error('Token d\'authentification manquant')
        }

        const response = await $fetch(`/api/dashboard/analytics?period=${period}`, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (response.success && response.data) {
          this.analytics = { ...this.analytics, ...response.data }
          console.log('✅ Analytics chargées')
          return true
        } else {
          throw new Error(response.message || 'Erreur lors du chargement des analytics')
        }
      } catch (error) {
        console.error('❌ Erreur analytics:', error)
        this.analyticsError = error.message || 'Erreur lors du chargement des analytics'
        return false
      } finally {
        this.analyticsLoading = false
      }
    },

    // Export des contacts (côté client uniquement)
    async exportContacts(format = 'csv') {
      try {
        // Vérifier qu'on est côté client
        if (!import.meta.client) {
          console.warn('⚠️ Export disponible côté client uniquement')
          return false
        }

        // Obtenir le store d'authentification
        const { useAuthStore } = await import('./auth.js')
        const authStore = useAuthStore()

        if (!authStore.token) {
          throw new Error('Token d\'authentification manquant')
        }

        const params = new URLSearchParams({
          format,
          ...this.contactsFilters
        })

        const response = await $fetch(`/api/dashboard/export?${params}`, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (response.success && response.data) {
          // Créer et télécharger le fichier
          const blob = new Blob([response.data], { 
            type: format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
          })
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `contacts-${new Date().toISOString().split('T')[0]}.${format}`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          window.URL.revokeObjectURL(url)
          
          console.log('✅ Export réussi')
          return true
        } else {
          throw new Error(response.message || 'Erreur lors de l\'export')
        }
      } catch (error) {
        console.error('❌ Erreur export:', error)
        return false
      }
    },

    // Mise à jour des filtres
    updateFilters(newFilters) {
      if (newFilters && typeof newFilters === 'object') {
        this.contactsFilters = { ...this.contactsFilters, ...newFilters }
        this.contactsPagination.page = 1 // Reset à la première page
      }
    },

    // Reset des filtres
    resetFilters() {
      this.contactsFilters = {
        search: '',
        status: 'all',
        source: 'all',
        dateFrom: null,
        dateTo: null
      }
      this.contactsPagination.page = 1
    },

    // Refresh complet des données
    async refreshAll() {
      const results = await Promise.allSettled([
        this.fetchStats(),
        this.fetchContacts(),
        this.fetchAnalytics()
      ])
      
      const failures = results.filter(result => result.status === 'rejected')
      if (failures.length > 0) {
        console.warn('⚠️ Certaines données n\'ont pas pu être rechargées:', failures)
      }
      
      return failures.length === 0
    },

    // Nettoyer les erreurs
    clearErrors() {
      this.contactsError = null
      this.statsError = null
      this.analyticsError = null
    }
  }
}) 