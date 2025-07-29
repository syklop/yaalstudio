<template>
  <div class="dashboard-page">
    <!-- Éléments décoratifs cohérents avec la landing page -->
    <div class="twinkling-dots">
      <div class="dot dot-1"></div>
      <div class="dot dot-2"></div>
      <div class="dot dot-3"></div>
      <div class="dot dot-4"></div>
      <div class="dot dot-5"></div>
    </div>

    <!-- Dashboard content -->
    <div class="dashboard-content">
      <!-- Header amélioré -->
      <header class="dashboard-header">
        <div class="container">
          <div class="header-content">
            <!-- Section principale du header -->
            <div class="header-main">
              <div class="header-branding">
                <h1 class="dashboard-title blinka-serif">YaalStudio</h1>
                <span class="dashboard-subtitle">Dashboard</span>
              </div>
              
              <div class="header-stats">
                <div class="stat-card">
                  <div class="stat-content">
                    <span class="stat-number">{{ stats.totalContacts || 0 }}</span>
                    <span class="stat-label">Contacts Total</span>
                  </div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-card">
                  <div class="stat-content">
                    <span class="stat-number">{{ stats.todayContacts || 0 }}</span>
                    <span class="stat-label">Aujourd'hui</span>
                  </div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-card">
                  <div class="stat-content">
                    <span class="stat-number">{{ selectedContacts.length }}</span>
                    <span class="stat-label">Sélectionnés</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Actions du header -->
            <div class="header-actions">
              <div class="actions-group">
                <button 
                  @click="refreshAll"
                  class="action-button refresh-btn"
                  :disabled="loading"
                  :class="{ 'loading': loading }"
                  title="Actualiser les données"
                >
                  <svg v-if="!loading" class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <svg v-else class="action-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                
                <!-- Indicateur de sélection dans le header -->
                <div v-if="selectedContacts.length > 0" class="selection-indicator">
                  <div class="selection-badge">
                    <svg class="selection-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ selectedContacts.length }}
                  </div>
                  <button
                    @click="quickComposeEmail"
                    class="quick-compose-btn"
                    title="Composition rapide"
                  >
                    <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </button>
                </div>
                
                <div class="user-profile">
                  <div class="user-avatar">
                    <div class="avatar-indicator"></div>
                    <span class="avatar-text">YS</span>
                  </div>
                  <div class="user-details">
                    <span class="user-name">Admin</span>
                    <span class="user-role">YaalStudio</span>
                  </div>
                </div>
                
                <button 
                  @click="handleLogout"
                  class="logout-btn"
                  :disabled="loading"
                  :class="{ 'loading': loading }"
                  title="Se déconnecter"
                >
                  <svg v-if="!loading" class="logout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <svg v-else class="logout-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="logout-text">{{ loading ? 'Déconnexion...' : 'Déconnexion' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Navigation Tabs simplifiée et intuitive -->
      <div class="dashboard-nav">
        <div class="container">
          <nav class="nav-tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="changeTab(tab.id)"
              :class="[
                'nav-tab',
                { 'active': activeTab === tab.id }
              ]"
            >
              <span class="tab-content">
                <!-- Icônes en SVG inline -->
                <svg v-if="tab.icon === 'HomeIcon'" class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <svg v-else-if="tab.icon === 'UsersMailIcon'" class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <svg v-else-if="tab.icon === 'ChartPieIcon'" class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <span class="tab-label">{{ tab.name }}</span>
                <span v-if="tab.badge" class="tab-badge">
                  {{ tab.badge }}
                </span>
              </span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <main class="dashboard-main">
        <div class="container">
          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <!-- Vue d'ensemble Tab -->
          <div v-if="activeTab === 'overview'" class="tab-content">
            <div class="overview-section">
              <div class="overview-header">
                <h2 class="section-title">VUE D'ENSEMBLE</h2>
                <p class="section-description">
                  Aperçu complet de vos performances et activités récentes
                </p>
              </div>
              
              <!-- Statistiques principales (pleine largeur) -->
              <div class="overview-main-stats">
                <StatsSection :stats="stats" :loading="loading" />
              </div>
              
              <!-- Grille principale du contenu -->
              <div class="overview-content-grid">
                <!-- Actions rapides et guides -->
                <div class="overview-column left-column">
                  <!-- Actions rapides -->
                  <div class="overview-card quick-actions-card">
                    <h3 class="card-title">ACTIONS RAPIDES</h3>
                    <div class="quick-actions-grid">
                      <div class="quick-action-card contacts">
                        <div class="metric-header">
                          <h4 class="metric-label">CONTACTS</h4>
                          <div class="metric-icon contacts">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                          </div>
                        </div>
                        <div class="metric-value">{{ stats.totalContacts || 0 }}</div>
                        <button @click="changeTab('contacts')" class="metric-action">Voir les contacts</button>
                      </div>
                      
                      <div class="quick-action-card emails" :class="{ 'disabled': contacts.length === 0 }">
                        <div class="metric-header">
                          <h4 class="metric-label">EMAILS</h4>
                          <div class="metric-icon emails">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <div class="metric-value">{{ selectedContacts.length }}</div>
                        <button 
                          @click="goToContactsWithEmail" 
                          class="metric-action"
                          :disabled="contacts.length === 0"
                        >
                          Envoyer emails
                        </button>
                      </div>
                      
                      <div class="quick-action-card analytics">
                        <div class="metric-header">
                          <h4 class="metric-label">ANALYTICS</h4>
                          <div class="metric-icon analytics">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                        </div>
                        <div class="metric-value">{{ stats.conversionRate || 0 }}%</div>
                        <button @click="changeTab('analytics')" class="metric-action">Voir analytics</button>
                      </div>
                      
                      <div class="quick-action-card refresh" :class="{ 'loading': loading }">
                        <div class="metric-header">
                          <h4 class="metric-label">ACTUALISER</h4>
                          <div class="metric-icon refresh">
                            <svg :class="{ 'spinning': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </div>
                        </div>
                        <div class="metric-value">{{ loading ? '...' : 'OK' }}</div>
                        <button @click="refreshAll" class="metric-action" :disabled="loading">Actualiser</button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Raccourcis avancés -->
                  <div class="overview-card shortcuts-card">
                    <h3 class="card-title">RACCOURCIS AVANCÉS</h3>
                    <div class="shortcuts-list">
                      
                      
                      <div 
                        v-if="contacts.length > 0"
                        class="shortcut-item"
                        :class="{ 'disabled': contacts.length === 0 }"
                      >
                        <div class="shortcut-icon">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="shortcut-content">
                          <div class="shortcut-label">SÉLECTIONNER TOUS</div>
                          <div class="shortcut-description">Sélectionner tous les contacts pour envoi</div>
                        </div>
                        <button @click="selectAllContacts" :disabled="contacts.length === 0" class="shortcut-action">
                          Sélectionner
                        </button>
                      </div>
                      
                      <div class="shortcut-item export-item">
                        <div class="shortcut-icon">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div class="shortcut-content">
                          <div class="shortcut-label">EXPORTER DONNÉES</div>
                          <div class="shortcut-description">Télécharger en CSV ou Excel</div>
                        </div>
                        <div class="export-controls">
                          <select v-model="exportFormat" class="export-format-select">
                            <option value="csv">CSV</option>
                            <option value="xlsx">Excel</option>
                          </select>
                          <button @click="downloadData" class="shortcut-action" :disabled="contacts.length === 0">
                            Exporter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Activité et informations -->
                <div class="overview-column right-column">
                  <!-- Activité récente -->
                  <div class="overview-card activity-card">
                    <h3 class="card-title">ACTIVITÉ RÉCENTE</h3>
                    <div class="activity-list">
                      <div class="activity-item">
                        <div class="activity-item-info">
                          <div class="activity-label">NOUVEAUX CONTACTS AUJOURD'HUI</div>
                          <div class="activity-value">{{ stats.todayContacts || 0 }}</div>
                        </div>
                        <div class="activity-progress-bar">
                          <div class="activity-progress-fill new" :style="{ width: stats.todayContacts > 0 ? '100%' : '10%' }"></div>
                        </div>
                      </div>
                      
                      <div class="activity-item">
                        <div class="activity-item-info">
                          <div class="activity-label">CONTACTS CETTE SEMAINE</div>
                          <div class="activity-value">{{ stats.weekContacts || 0 }}</div>
                        </div>
                        <div class="activity-progress-bar">
                          <div class="activity-progress-fill week" :style="{ width: `${Math.min((stats.weekContacts / Math.max(stats.totalContacts, 1)) * 100, 100)}%` }"></div>
                        </div>
                      </div>
                      
                      <div class="activity-item" v-if="selectedContacts.length > 0">
                        <div class="activity-item-info">
                          <div class="activity-label">CONTACTS SÉLECTIONNÉS</div>
                          <div class="activity-value">{{ selectedContacts.length }}</div>
                        </div>
                        <div class="activity-progress-bar">
                          <div class="activity-progress-fill selection" :style="{ width: `${Math.min((selectedContacts.length / Math.max(stats.totalContacts, 1)) * 100, 100)}%` }"></div>
                        </div>
                      </div>
                      
                      <div class="activity-item" v-if="stats.emailCampaigns > 0">
                        <div class="activity-item-info">
                          <div class="activity-label">CAMPAGNES EMAIL</div>
                          <div class="activity-value">{{ stats.emailCampaigns }}</div>
                        </div>
                        <div class="activity-progress-bar">
                          <div class="activity-progress-fill email" style="width: 85%"></div>
                        </div>
                      </div>
                      
                      <div class="activity-item">
                        <div class="activity-item-info">
                          <div class="activity-label">TAUX DE CONVERSION</div>
                          <div class="activity-value">{{ stats.conversionRate || 0 }}%</div>
                        </div>
                        <div class="activity-progress-bar">
                          <div class="activity-progress-fill conversion" :style="{ width: `${Math.min(stats.conversionRate || 0, 100)}%` }"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Conseils et astuces -->
                  <div class="overview-card tips-card">
                    <h3 class="card-title">CONSEILS & ASTUCES</h3>
                    <div class="tips-list">
                      <div class="tip-item">
                        <div class="tip-item-info">
                          <div class="tip-label">PERSONNALISATION</div>
                          <div class="tip-description">Utilisez {{ '{firstName}' }} dans vos messages</div>
                        </div>
                        <div class="tip-progress-bar">
                          <div class="tip-progress-fill" style="width: 90%"></div>
                        </div>
                      </div>
                      
                      <div class="tip-item">
                        <div class="tip-item-info">
                          <div class="tip-label">ENVOI RAPIDE</div>
                          <div class="tip-description">Cliquez sur l'icône email pour envoi instantané</div>
                        </div>
                        <div class="tip-progress-bar">
                          <div class="tip-progress-fill" style="width: 80%"></div>
                        </div>
                      </div>
                      
                      <div class="tip-item">
                        <div class="tip-item-info">
                          <div class="tip-label">ANALYTICS</div>
                          <div class="tip-description">Consultez l'onglet pour insights détaillés</div>
                        </div>
                        <div class="tip-progress-bar">
                          <div class="tip-progress-fill" style="width: 95%"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contacts & Emails Tab (unifié) -->
          <div v-if="activeTab === 'contacts'" class="tab-content">
            <!-- Bouton de seeding si aucun contact -->
            <div v-if="contacts.length === 0 && !loading" class="seed-section">
              <div class="seed-card">
                <div class="seed-content">
                  <div class="seed-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h3 class="seed-title">Aucun contact trouvé</h3>
                  <p class="seed-description">
                    Votre base de données est vide. Vous pouvez créer des contacts de test pour explorer les fonctionnalités.
                  </p>
                  <button 
                    @click="seedContacts"
                    :disabled="seeding"
                    class="seed-btn"
                  >
                    <svg v-if="seeding" class="seed-spinner" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <svg v-else class="seed-icon-btn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {{ seeding ? 'Création en cours...' : 'Créer des contacts de test' }}
                  </button>
                </div>
              </div>
            </div>

            <ContactsEmailsSection 
              :contacts="contacts" 
              :loading="loading"
              :pagination="pagination"
              :filters="filters"
              :selectedContacts="selectedContacts"
              @update-filters="updateFilters"
              @load-contacts="loadContacts"
              @select-contact="toggleContactSelection"
              @select-all="toggleSelectAll"
              @update-status="updateContactStatus"
              @send-email="sendMassEmail"
              @clear-selection="clearAllSelection"
            />
          </div>

          <!-- Analytics Tab -->
          <div v-if="activeTab === 'analytics'" class="tab-content">
            <AnalyticsSection :analytics="analytics" :loading="loading" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import StatsSection from '~/components/dashboard/StatsSection.vue'
import ContactsEmailsSection from '~/components/dashboard/ContactsEmailsSection.vue'
import AnalyticsSection from '~/components/dashboard/AnalyticsSection.vue'

export default {
  name: 'Dashboard',
  components: {
    StatsSection,
    ContactsEmailsSection,
    AnalyticsSection
  },

  data() {
    return {
      activeTab: 'overview', // Commencer par la vue d'ensemble
      loading: false,
      error: null,
      
      // Données nettoyées
      stats: {
        totalContacts: 0,
        todayContacts: 0,
        weekContacts: 0,
        monthContacts: 0,
        conversionRate: 0,
        uniqueVisitors: 0,
        avgSessionDuration: 0,
        byStatus: [],
        topSources: [],
        emailCampaigns: 0
      },
      contacts: [], // Sera rempli par les vraies données
      analytics: {
        pageViews: { today: 0, week: 0, month: 0 },
        sources: [],
        devices: []
      },
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        pages: 1,
        hasNext: false,
        hasPrev: false
      },
      filters: {
        search: '',
        status: '',
        source: ''
      },
      
      // Selection
      selectedContacts: [],
      
      // Tabs reorganisés et simplifiés
      tabs: [
        { id: 'overview', name: 'Vue d\'ensemble', icon: 'HomeIcon', badge: null },
        { id: 'contacts', name: 'Contacts & Emails', icon: 'UsersMailIcon', badge: 0 },
        { id: 'analytics', name: 'Analytics', icon: 'ChartPieIcon', badge: null }
      ],
      seeding: false,
      exportFormat: 'csv'
    }
  },

  computed: {
    isAllSelected() {
      return this.contacts.length > 0 && this.selectedContacts.length === this.contacts.length
    },
    
    isPartialSelected() {
      return this.selectedContacts.length > 0 && this.selectedContacts.length < this.contacts.length
    }
  },

  async mounted() {
    console.log('✅ Dashboard monté')
    
    // Vérification d'authentification immédiate
    try {
      const authStore = useAuthStore()
      
      // Initialiser l'auth si pas encore fait
      if (!authStore.isInitialized) {
        console.log('🔐 Initialisation de l\'authentification...')
        const isAuthenticated = await authStore.initAuth()
        
        if (!isAuthenticated) {
          console.log('❌ Non authentifié - Redirection vers login')
          await navigateTo('/login')
          return
        }
      } else if (!authStore.isLoggedIn) {
        console.log('❌ Session expirée - Redirection vers login')
        await navigateTo('/login')
        return
      }
      
      console.log('✅ Authentification validée, chargement des données...')
      await this.loadDashboardData()
      
    } catch (error) {
      console.error('❌ Erreur authentification dashboard:', error)
      await navigateTo('/login')
    }
  },

  methods: {
    async loadDashboardData() {
      try {
        this.loading = true
        this.error = null
        
        // Charger les vraies données depuis l'API
        await Promise.all([
          this.loadStats(),
          this.loadContacts(),
          this.loadAnalytics()
        ])
        
      } catch (error) {
        console.error('❌ Erreur chargement dashboard:', error)
        this.error = 'Erreur lors du chargement des données'
      } finally {
        this.loading = false
      }
    },

    async loadStats() {
      try {
        const authStore = useAuthStore()
        const response = await $fetch('/api/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })
        if (response.success) {
          this.stats = response.data
        }
      } catch (error) {
        console.error('❌ Erreur chargement stats:', error)
        if (error.statusCode === 401) {
          console.log('🔒 Token expiré, redirection vers login')
          await navigateTo('/login')
        }
      }
    },

    async loadContacts(options = {}) {
      try {
        const authStore = useAuthStore()
        
        // Si une page est spécifiée, l'utiliser, sinon garder la page actuelle
        if (options.page) {
          this.pagination.page = options.page
        }
        
        const requestQuery = {
          ...this.filters,
          page: this.pagination.page,
          limit: this.pagination.limit
        }
        
        const response = await $fetch('/api/dashboard/contacts', {
          query: requestQuery,
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })
        
        if (response.success) {
          this.contacts = response.data.contacts
          this.pagination = {
            ...response.data.pagination,
            pages: response.data.pagination.totalPages // Mapper totalPages vers pages pour le composant
          }
          this.tabs.find(t => t.id === 'contacts').badge = this.contacts.length
        }
      } catch (error) {
        console.error('❌ Erreur chargement contacts:', error)
        if (error.statusCode === 401) {
          await navigateTo('/login')
        }
      }
    },

    async loadAnalytics() {
      try {
        const authStore = useAuthStore()
        const response = await $fetch('/api/dashboard/analytics', {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })
        if (response.success) {
          this.analytics = response.data
        }
      } catch (error) {
        console.error('❌ Erreur chargement analytics:', error)
        if (error.statusCode === 401) {
          console.log('🔒 Token expiré, redirection vers login')
          await navigateTo('/login')
        }
        // Pour analytics, on peut continuer même si l'API n'existe pas encore
        if (error.statusCode === 404) {
          console.log('📊 API Analytics pas encore implémentée')
        }
      }
    },

    changeTab(tabId) {
      this.activeTab = tabId
    },

    async refreshAll() {
      await this.loadDashboardData()
    },

    updateFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters }
      // Réinitialiser la page à 1 lors d'un changement de filtre
      this.pagination.page = 1
      this.loadContacts()
    },

    toggleContactSelection(contact) {
      const index = this.selectedContacts.findIndex(c => c.id === contact.id)
      if (index > -1) {
        this.selectedContacts.splice(index, 1)
      } else {
        this.selectedContacts.push(contact)
      }
    },

    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selectedContacts = []
      } else {
        this.selectedContacts = [...this.contacts]
      }
    },

    async updateContactStatus(contactId, newStatus) {
      try {
        const authStore = useAuthStore()
        const response = await $fetch(`/api/dashboard/contacts/${contactId}`, {
          method: 'PATCH',
          body: { status: newStatus },
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })
        if (response.success) {
          const contact = this.contacts.find(c => c.id === contactId)
          if (contact) {
            contact.status = newStatus
          }
        }
      } catch (error) {
        console.error('❌ Erreur mise à jour statut:', error)
        if (error.statusCode === 401) {
          console.log('🔒 Token expiré, redirection vers login')
          await navigateTo('/login')
        }
      }
    },

    clearAllSelection() {
      this.selectedContacts = []
    },

    // Actions rapides depuis la vue d'ensemble
    goToContactsWithEmail() {
      this.changeTab('contacts')
      // Auto-sélectionner tous les contacts pour faciliter l'envoi d'emails
      setTimeout(() => {
        if (this.contacts.length > 0) {
          this.selectedContacts = [...this.contacts]
        }
      }, 100)
    },

    quickComposeEmail() {
      // Aller directement dans l'onglet contacts avec l'email ouvert
      this.changeTab('contacts')
    },

    selectAllContacts() {
      this.selectedContacts = [...this.contacts]
      this.changeTab('contacts')
    },

    async downloadData() {
      // Vérifier qu'il y a des données à exporter
      if (this.contacts.length === 0) {
        alert('Aucune donnée à exporter')
        return
      }

      // Import dynamique de xlsx pour éviter les problèmes SSR
      const XLSX = await import('xlsx')
      
      // Préparer les données avec en-têtes (basé sur la vraie structure des données)
      const headers = ['Prénom', 'Email', 'Téléphone', 'Statut', 'Source', 'Date de création']
      const data = [
        headers,
        ...this.contacts.map(contact => [
          contact.firstName || '',
          contact.email || '',
          contact.phone || '',
          contact.status || '',
          contact.source || '',
          contact.createdAt ? new Date(contact.createdAt).toLocaleDateString('fr-FR') : ''
        ])
      ]

      const today = new Date().toISOString().split('T')[0]
      const baseFilename = `yaalstudio-contacts-${today}`

      if (this.exportFormat === 'xlsx') {
        // Exportation Excel
        const ws = XLSX.utils.aoa_to_sheet(data)
        
        // Améliorer le style des en-têtes
        const range = XLSX.utils.decode_range(ws['!ref'])
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col })
          if (!ws[cellAddress]) continue
          ws[cellAddress].s = {
            font: { bold: true },
            fill: { fgColor: { rgb: "CCCCCC" } }
          }
        }
        
        // Ajuster la largeur des colonnes
        ws['!cols'] = [
          { wch: 20 }, // Prénom
          { wch: 25 }, // Email
          { wch: 15 }, // Téléphone
          { wch: 12 }, // Statut
          { wch: 15 }, // Source
          { wch: 18 }  // Date de création
        ]

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Contacts')
        
        // Ajouter des métadonnées
        wb.Props = {
          Title: 'Contacts YaalStudio',
          Subject: 'Liste des contacts',
          Author: 'YaalStudio Dashboard',
          CreatedDate: new Date()
        }

        XLSX.writeFile(wb, `${baseFilename}.xlsx`)
        
      } else {
        // Exportation CSV (méthode améliorée)
        const csvContent = data.map(row => 
          row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
        ).join('\n')
        
        const bom = '\uFEFF' // BOM pour UTF-8
        const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
          link.setAttribute('download', `${baseFilename}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
      }

      // Notification de succès
      
    },

    formatTimeAgo(date) {
      const now = new Date()
      const diffInSeconds = Math.floor((now - date) / 1000)
      
      if (diffInSeconds < 60) return 'Il y a quelques secondes'
      if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} minutes`
      if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)} heures`
      return `Il y a ${Math.floor(diffInSeconds / 86400)} jours`
    },

    async sendMassEmail(emailData) {
      try {
        this.loading = true
        const authStore = useAuthStore()
        const response = await $fetch('/api/dashboard/emails/send-mass', {
          method: 'POST',
          body: emailData,
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })
        if (response.success) {
          alert('Emails envoyés avec succès !')
          this.selectedContacts = []
        }
      } catch (error) {
        console.error('❌ Erreur envoi emails:', error)
        if (error.statusCode === 401) {
          console.log('🔒 Token expiré, redirection vers login')
          await navigateTo('/login')
        } else {
          alert('Erreur lors de l\'envoi des emails')
        }
      } finally {
        this.loading = false
      }
    },

    async handleLogout() {
      try {
        // Afficher un état de chargement
        this.loading = true
        
        // Utiliser le store d'authentification pour la déconnexion
        const authStore = useAuthStore()
        await authStore.logout()
        
        // Redirection vers la page de login
        await navigateTo('/login', { replace: true })
        
        // Fallback au cas où navigateTo ne fonctionne pas
        setTimeout(() => {
          window.location.href = '/login'
        }, 100)
        
      } catch (error) {
        console.error('❌ Erreur lors de la déconnexion:', error)
        // En cas d'erreur, forcer la redirection
        window.location.href = '/login'
      } finally {
        this.loading = false
      }
    },

    async seedContacts() {
      try {
        this.seeding = true
        const authStore = useAuthStore()
        const response = await $fetch('/api/seed-contacts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })
        if (response.success) {
          alert(`✅ ${response.message}`)
          await this.loadContacts() // Recharger les contacts après le seeding
        } else {
          alert('Erreur lors de la création des contacts de test.')
        }
      } catch (error) {
        console.error('❌ Erreur seeding contacts:', error)
        if (error.statusCode === 401) {
          console.log('🔒 Token expiré, redirection vers login')
          await navigateTo('/login')
        } else {
          alert('Erreur lors de la création des contacts de test.')
        }
      } finally {
        this.seeding = false
      }
    }
  }
}
</script>

<style scoped>
/* Dashboard Page - Cohérent avec la landing page */
.dashboard-page {
  min-height: 100vh;
  background: var(--background-primary);
  position: relative;
  font-family: var(--font-family);
  /* Z-index hierarchy for the dashboard */
  --z-base: 1;
  --z-dots: 2;
  --z-content: 3; 
  --z-header: 1;
  --z-nav: 2;
  --z-modal-backdrop: 9998;
  --z-modal: 9999;
}

/* Éléments décoratifs comme la landing page */
.twinkling-dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: var(--z-dots);
}

.dot {
  position: absolute;
  width: 3px;
  height: 3px;
  background: var(--color-gray-400);
  border-radius: 50%;
  opacity: 0.6;
  animation: twinkle 4s ease-in-out infinite;
}

.dot-1 { top: 10%; left: 15%; animation-delay: 0s; }
.dot-2 { top: 20%; right: 20%; animation-delay: 1s; }
.dot-3 { top: 60%; left: 10%; animation-delay: 2s; }
.dot-4 { top: 80%; right: 15%; animation-delay: 3s; }
.dot-5 { top: 40%; left: 80%; animation-delay: 1.5s; }

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Header */
.dashboard-header {
  background: var(--background-primary);
  border-bottom: 1px solid var(--border-color);
  position: relative;
  z-index: var(--z-header);
  padding: 2rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.header-main {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-branding {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.dashboard-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: 0.05em;
}

.dashboard-subtitle {
  font-size: 1.25rem;
  color: var(--color-gray-600);
  font-weight: 500;
  letter-spacing: 0.025em;
}

.header-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: var(--color-gray-100);
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  transition: var(--transition);
}

.header-stats:hover {
  background: var(--color-gray-200);
  transform: translateY(-1px);
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  transition: var(--transition);
}

.stat-content {
  text-align: center;
}

.stat-number {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--color-gray-600);
  font-weight: 500;
  letter-spacing: 0.025em;
}

.stat-divider {
  width: 1px;
  height: 24px;
  background: var(--color-gray-300);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.actions-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.action-button {
  width: 48px;
  height: 48px;
  border: none;
  background: var(--color-gray-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  color: var(--color-gray-600);
}

.action-button:hover:not(:disabled) {
  background: var(--color-gray-200);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.action-button.loading .action-icon {
  animation: spin 1s linear infinite;
}

.action-icon {
  width: 24px;
  height: 24px;
}

.action-icon.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-gray-100);
  border-radius: 2rem;
  transition: var(--transition);
}

.user-profile:hover {
  background: var(--color-gray-200);
  transform: translateY(-1px);
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--text-primary);
  border-radius: 50%;
  position: relative;
}

.avatar-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: #10b981;
  border-radius: 50%;
  border: 2px solid var(--background-primary);
}

.avatar-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--background-primary);
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-700);
}

.user-role {
  font-size: 0.75rem;
  color: var(--color-gray-500);
  font-weight: 400;
}

.logout-btn {
  background: var(--text-primary);
  color: var(--background-primary);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 0.025em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logout-btn:hover {
  background: var(--color-gray-700);
  transform: translateY(-2px);
}

.logout-btn.loading {
  opacity: 0.7;
  cursor: not-allowed;
  pointer-events: none;
}

.logout-icon {
  width: 20px;
  height: 20px;
  stroke-width: 2;
  color: var(--background-primary);
}

.logout-icon.spinning {
  animation: spin 1s linear infinite;
}

.logout-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--background-primary);
}

/* Indicateur de sélection dans le header */
.selection-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--color-gray-100);
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  transition: var(--transition);
}

.selection-indicator:hover {
  background: var(--color-gray-200);
  transform: translateY(-1px);
}

.selection-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--text-primary);
  color: var(--background-primary);
  padding: 0.375rem 0.875rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  min-width: 20px;
  text-align: center;
}

.selection-icon {
  width: 18px;
  height: 18px;
  stroke-width: 2;
  color: var(--background-primary);
}

.quick-compose-btn {
  width: 48px;
  height: 48px;
  border: none;
  background: var(--color-gray-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  color: var(--color-gray-600);
}

.quick-compose-btn:hover:not(:disabled) {
  background: var(--color-gray-200);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.quick-compose-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.quick-compose-btn .action-icon {
  width: 24px;
  height: 24px;
}

/* Navigation */
.dashboard-nav {
  background: var(--background-primary);
  border-bottom: 1px solid var(--border-color);
  position: relative;
  z-index: var(--z-nav);
  padding: 0.5rem 0;
}

.nav-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  overflow-x: visible;
  padding: 0 1.5rem;
  background: var(--color-gray-50);
  border-radius: 3rem;
  max-width: 600px;
  margin: 0 auto;
}

.nav-tab {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;
  border-radius: 2rem;
  transition: var(--transition);
}

.tab-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  color: var(--color-gray-600);
  font-weight: 600;
  font-size: 0.875rem;
  transition: var(--transition);
  border-radius: 2rem;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.nav-tab:hover .tab-content {
  color: var(--text-primary);
  padding: 1rem 1.5rem;
  background: var(--color-gray-200);
  
}

.nav-tab.active .tab-content {
  padding: 1rem 1.5rem;
  color: var(--background-primary);
  background: var(--text-primary);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.tab-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  stroke-width: 2;
  color: inherit;
}

.tab-badge {
  background: rgba(255, 255, 255, 0.3);
  color: inherit;
  padding: 0.25rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 20px;
  text-align: center;
}

.nav-tab.active .tab-badge {
  background: rgba(255, 255, 255, 0.2);
  color: var(--background-primary);
}

/* Main Content */
.dashboard-main {
  position: relative;
  z-index: var(--z-content);
  padding: 3rem 0;
  min-height: calc(100vh - 200px);
  width: 100%;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}

.tab-content {
  width: 100%;
  margin: 0;
  padding: 0;
}

.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
  font-weight: 500;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Overview Section - Style cohérent avec AnalyticsSection */
.overview-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  background: #f8fafc;
  padding: 2rem;
  border-radius: 12px;
}

.overview-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #374151;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.025em;
  text-transform: uppercase;
}

.section-description {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

/* Statistiques principales - pleine largeur */
.overview-main-stats {
  width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 2rem;
  margin-bottom: 2rem;
}

/* Grille de contenu principale */
.overview-content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
}

.overview-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.overview-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  width: 100%;
}

.overview-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.card-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

/* Actions rapides - Style cohérent avec AnalyticsSection */
.quick-actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.quick-action-card {
  background: white;
  border-radius: 6px;
  padding: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  position: relative;
}

.quick-action-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.quick-action-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quick-action-card.loading {
  opacity: 0.7;
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.metric-label {
  font-size: 0.6rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  margin: 0;
}

.metric-icon {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-icon.contacts {
  background: #10b981;
  color: white;
}

.metric-icon.emails {
  background: #3b82f6;
  color: white;
}

.metric-icon.analytics {
  background: #f59e0b;
  color: white;
}

.metric-icon.refresh {
  background: #8b5cf6;
  color: white;
}

.metric-icon svg {
  width: 12px;
  height: 12px;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0.5rem 0;
}

.metric-action {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.metric-action:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.metric-action:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Raccourcis avancés - Style cohérent avec AnalyticsSection */
.shortcuts-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.shortcut-item:hover {
  background: white;
  border-color: #e5e7eb;
}

.shortcut-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.shortcut-item.loading {
  opacity: 0.7;
}

.shortcut-icon {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: #6b7280;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 0.75rem;
}

.shortcut-icon svg {
  width: 12px;
  height: 12px;
}

.shortcut-content {
  flex: 1;
}

.shortcut-label {
  font-size: 0.6rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  margin: 0 0 0.25rem 0;
}

.shortcut-description {
  font-size: 0.75rem;
  color: #9ca3af;
  line-height: 1.4;
}

.shortcut-action {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 0.375rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s ease;
}

.shortcut-action:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.shortcut-action:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Styles pour l'exportation avancée */
.export-item {
  position: relative;
}

.export-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: column;
}

.export-format-select {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 70px;
  text-align: center;
}

.export-format-select:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.export-format-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.export-format-select option {
  padding: 0.25rem;
  background: white;
  color: #4b5563;
}

.quick-action-item:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  pointer-events: none;
}

.action-icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--text-primary);
  border-radius: 50%;
  flex-shrink: 0;
}

.action-icon {
  width: 24px;
  height: 24px;
  color: var(--background-primary);
}

.action-content {
  display: flex;
  flex-direction: column;
}

.action-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.action-description {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  line-height: 1.4;
}

.action-arrow {
  margin-left: auto;
  width: 24px;
  height: 24px;
  color: var(--color-gray-400);
}

/* Activité récente - Style cohérent avec AnalyticsSection */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 6px;
  padding: 0.75rem;
  transition: all 0.2s ease;
}

.activity-item:hover {
  background: white;
  border-color: #e5e7eb;
}

.activity-item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.activity-label {
  font-size: 0.6rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.activity-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
}

.activity-progress-bar {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.activity-progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.activity-progress-fill.new {
  background: #10b981;
}

.activity-progress-fill.selection {
  background: #3b82f6;
}

.activity-progress-fill.email {
  background: #f59e0b;
}

.activity-progress-fill.sync {
  background: #10b981;
}

.activity-progress-fill.week {
  background: #8b5cf6;
}

.activity-progress-fill.conversion {
  background: #f59e0b;
}

/* Seed Section - Style cohérent avec AnalyticsSection */
.seed-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background: #f8fafc;
  border-radius: 12px;
  margin-bottom: 2rem;
  padding: 2rem;
  text-align: center;
}

.seed-card {
  background: white;
  border-radius: 8px;
  padding: 2.5rem 3rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  max-width: 500px;
  width: 100%;
}

.seed-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.seed-icon {
  width: 60px;
  height: 60px;
  color: var(--text-primary);
}

.seed-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.seed-description {
  font-size: 1rem;
  color: var(--color-gray-600);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.seed-btn {
  background: var(--text-primary);
  color: var(--background-primary);
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 0.025em;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  justify-content: center;
}

.seed-btn:hover:not(:disabled) {
  background: var(--color-gray-700);
  transform: translateY(-2px);
}

.seed-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  pointer-events: none;
}

.seed-spinner {
  animation: spin 1s linear infinite;
  width: 24px;
  height: 24px;
}

.seed-icon-btn {
  width: 24px;
  height: 24px;
  stroke-width: 2;
  color: var(--background-primary);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Sélection dans le header */
.selection-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: var(--text-primary);
  border-radius: 2rem;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.selection-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--background-primary);
  font-weight: 600;
  font-size: 0.875rem;
}

.selection-icon {
  width: 18px;
  height: 18px;
  color: var(--background-primary);
}

.quick-compose-btn {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  color: var(--background-primary);
}

.quick-compose-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

/* Vue d'ensemble */
.overview-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.overview-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-family: var(--font-family);
}

.section-description {
  font-size: 1.125rem;
  color: var(--color-gray-600);
  max-width: 600px;
  margin: 0 auto;
}

.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.overview-card {
  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 2rem;
  transition: var(--transition);
}

.overview-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.stats-card {
  grid-column: 1 / -1;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-gray-100);
  padding-bottom: 0.75rem;
}

/* Actions rapides */
.quick-actions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quick-action-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--background-primary);
  cursor: pointer;
  transition: var(--transition);
  text-align: left;
  width: 100%;
}

.quick-action-item:hover:not(:disabled) {
  border-color: var(--text-primary);
  background: var(--color-gray-50);
  transform: translateY(-1px);
}

.quick-action-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: var(--transition);
}

.action-icon-wrapper.email {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.action-icon-wrapper.analytics {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.quick-action-item:hover .action-icon-wrapper {
  background: var(--text-primary);
}

.quick-action-item:hover .action-icon-wrapper.email,
.quick-action-item:hover .action-icon-wrapper.analytics {
  background: var(--text-primary);
}

.action-icon {
  width: 24px;
  height: 24px;
  color: var(--color-gray-600);
}

.action-icon-wrapper.email .action-icon,
.action-icon-wrapper.analytics .action-icon {
  color: var(--background-primary);
}

.quick-action-item:hover .action-icon {
  color: var(--background-primary);
}

.action-content {
  flex: 1;
}

.action-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.action-description {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  line-height: 1.4;
}

.action-arrow {
  width: 20px;
  height: 20px;
  color: var(--color-gray-400);
  transition: var(--transition);
}

.quick-action-item:hover .action-arrow {
  color: var(--text-primary);
  transform: translateX(4px);
}

/* Activité récente */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: var(--border-radius);
  background: var(--color-gray-50);
  border: 1px solid transparent;
  transition: var(--transition);
  position: relative;
}

.activity-item:hover {
  background: var(--background-primary);
  border-color: var(--color-gray-200);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}

.activity-icon.new {
  background: #d1fae5;
  color: #065f46;
}

.activity-icon.email {
  background: #dbeafe;
  color: #1e40af;
}

.activity-icon.update {
  background: #fef3c7;
  color: #92400e;
}

.activity-icon.selection {
  background: #e0e7ff;
  color: #3730a3;
}

.activity-icon svg {
  width: 20px;
  height: 20px;
}

.activity-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.activity-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.3;
}

.activity-time {
  font-size: 0.75rem;
  color: var(--color-gray-500);
  font-weight: 400;
}

.activity-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.activity-badge.new-badge {
  background: #dcfce7;
  color: #166534;
}

.activity-badge.selection-badge {
  background: #e0e7ff;
  color: #3730a3;
}

.activity-badge.email-badge {
  background: #dbeafe;
  color: #1e40af;
}

.activity-badge.sync-badge {
  background: #fef3c7;
  color: #92400e;
}

/* Conseils et astuces - Style cohérent avec AnalyticsSection */
.tips-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tip-item {
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 6px;
  padding: 0.75rem;
  transition: all 0.2s ease;
}

.tip-item:hover {
  background: white;
  border-color: #e5e7eb;
}

.tip-item-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.tip-label {
  font-size: 0.6rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  margin: 0 0 0.25rem 0;
}

.tip-description {
  font-size: 0.75rem;
  color: #9ca3af;
  line-height: 1.4;
}

.tip-progress-bar {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.tip-progress-fill {
  height: 100%;
  background: #6b7280;
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* Responsive */
/* Responsive Design pour Vue d'ensemble */
@media (max-width: 1200px) {
  .overview-content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .quick-actions-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1024px) {
  .overview-main-stats {
    padding: 1.5rem;
  }
  
  .overview-card {
    padding: 1.25rem;
  }
  
  .quick-actions-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .metric-value {
    font-size: 1.75rem;
  }
}

@media (max-width: 768px) {
  .dashboard-main {
    padding: 2rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .header-content {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-description {
    font-size: 1rem;
    padding: 0 1rem;
  }
  
  .overview-main-stats {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .overview-card {
    padding: 1rem;
  }
  
  .card-title {
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }
  
  .card-icon {
    width: 18px;
    height: 18px;
  }
  
  .quick-actions-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  
  .quick-action-card {
    padding: 1rem;
    gap: 0.75rem;
  }
  
  .action-icon-wrapper {
    width: 40px;
    height: 40px;
  }
  
  .action-icon {
    width: 20px;
    height: 20px;
  }
  
  .action-title {
    font-size: 0.75rem;
  }
  
  .action-count {
    font-size: 1rem;
  }
  
  .shortcut-item {
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .shortcut-icon {
    width: 28px;
    height: 28px;
  }
  
  .shortcut-icon svg {
    width: 16px;
    height: 16px;
  }
  
  .shortcut-label {
    font-size: 0.8rem;
  }
  
  .shortcut-description {
    font-size: 0.7rem;
  }
  
  .activity-item {
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .activity-icon {
    width: 32px;
    height: 32px;
  }
  
  .activity-icon svg {
    width: 16px;
    height: 16px;
  }
  
  .activity-title {
    font-size: 0.8rem;
  }
  
  .activity-time {
    font-size: 0.7rem;
  }
  
  .activity-badge {
    font-size: 0.6rem;
    padding: 0.125rem 0.375rem;
  }
  
  .tip-item {
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .tip-icon {
    width: 28px;
    height: 28px;
    font-size: 1.25rem;
  }
  
  .tip-title {
    font-size: 0.8rem;
  }
  
  .tip-description {
    font-size: 0.7rem;
  }
  
  .selection-indicator {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
    text-align: center;
  }
  
  .header-stats {
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    max-width: 400px;
  }
  
  .stat-card {
    flex-direction: row;
    justify-content: space-between;
    background: var(--background-primary);
    border-radius: 0.5rem;
    padding: 0.75rem;
  }

  .header-main {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }

  .header-branding {
    flex-direction: column;
    align-items: center;
  }

  .dashboard-title {
    font-size: 2rem;
  }

  .dashboard-subtitle {
    font-size: 1rem;
  }

  .header-stats {
    flex-direction: row;
    gap: 1rem;
    padding: 0.5rem 1rem;
    width: 100%;
    max-width: 400px;
    justify-content: space-around;
  }

  .stat-card {
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    flex: 1;
  }

  .stat-number {
    font-size: 1rem;
  }

  .stat-label {
    font-size: 0.625rem;
  }

  .stat-divider {
    display: none;
  }

  .header-actions {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .actions-group {
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .user-profile {
    padding: 0.5rem 1rem;
    order: -1;
  }

  .logout-btn {
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
  }

  .logout-text {
    display: none;
  }

  .action-button {
    width: 44px;
    height: 44px;
  }

  .nav-tabs {
    padding: 0.5rem;
    margin: 0 1rem;
    max-width: none;
    gap: 0.5rem;
  }

  .tab-content {
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
    gap: 0.5rem;
  }

  .tab-icon {
    width: 16px;
    height: 16px;
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .overview-card {
    grid-column: span 1;
  }

  .quick-actions-card {
    grid-column: span 1;
  }

  .activity-card {
    grid-column: span 1;
  }
}

@media (max-width: 480px) {
  .dashboard-main {
    padding: 1.5rem 0;
  }

  .container {
    padding: 0 0.5rem;
  }

  .header-stats {
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    max-width: 300px;
  }

  .stat-card {
    flex-direction: row;
    gap: 0.5rem;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem;
    background: var(--background-primary);
    border-radius: 0.5rem;
  }

  .dashboard-title {
    font-size: 1.75rem;
  }

  .actions-group {
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }

  .user-profile {
    width: 100%;
    justify-content: center;
  }

  .logout-btn {
    width: 100%;
    justify-content: center;
    padding: 0.75rem;
  }

  .logout-text {
    display: inline;
    font-size: 0.75rem;
  }

  .nav-tabs {
    padding: 0.25rem;
    margin: 0 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .tab-content {
    padding: 0.5rem 0.75rem;
    font-size: 0.7rem;
  }

  .tab-icon {
    width: 14px;
    height: 14px;
  }
  
  /* Vue d'ensemble responsive 480px */
  .section-title {
    font-size: 1.75rem;
  }
  
  .section-description {
    font-size: 0.875rem;
    padding: 0 0.5rem;
  }
  
  .overview-main-stats {
    padding: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .overview-content-grid {
    gap: 1rem;
  }
  
  .overview-card {
    padding: 0.75rem;
  }
  
  .card-title {
    font-size: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .card-icon {
    width: 16px;
    height: 16px;
  }
  
  .quick-actions-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .quick-action-card {
    padding: 0.875rem;
  }
  
  .metric-value {
    font-size: 1.5rem;
  }
  
  .metric-label {
    font-size: 0.55rem;
  }
  
  .metric-action {
    font-size: 0.7rem;
    padding: 0.375rem 0.5rem;
  }
  
  .shortcuts-list {
    gap: 0.5rem;
  }
  
  .shortcut-item {
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  .shortcut-icon {
    width: 24px;
    height: 24px;
  }
  
  .shortcut-icon svg {
    width: 14px;
    height: 14px;
  }
  
  .shortcut-label {
    font-size: 0.75rem;
  }
  
  .shortcut-description {
    font-size: 0.65rem;
  }
  
  .activity-list {
    gap: 0.5rem;
  }
  
  .activity-item {
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  .activity-icon {
    width: 28px;
    height: 28px;
  }
  
  .activity-icon svg {
    width: 14px;
    height: 14px;
  }
  
  .activity-title {
    font-size: 0.75rem;
  }
  
  .activity-time {
    font-size: 0.65rem;
  }
  
  .activity-badge {
    position: static;
    margin-left: auto;
    font-size: 0.55rem;
    padding: 0.125rem 0.25rem;
  }
  
  .tips-list {
    gap: 0.5rem;
  }
  
  .tip-item {
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  .tip-icon {
    width: 24px;
    height: 24px;
    font-size: 1rem;
  }
  
  .tip-title {
    font-size: 0.75rem;
  }
  
  .tip-description {
    font-size: 0.65rem;
  }
}
</style> 