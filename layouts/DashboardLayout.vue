<template>
  <div class="dashboard-layout">
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
      <!-- Header -->
      <header class="dashboard-header">
        <div class="container">
          <div class="header-content">
            <!-- Section principale du header -->
            <div class="header-main">
              <div class="header-branding">
                <NuxtLink to="/dashboard" class="brand-link">
                  <h1 class="dashboard-title blinka-serif">YaalStudio</h1>
                  <span class="dashboard-subtitle">Dashboard</span>
                </NuxtLink>
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
                    <span class="stat-number">{{ selectedContactsCount }}</span>
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
            <NuxtLink
              to="/dashboard/overview"
              :class="[
                'nav-tab',
                { 'active': isActiveRoute('/dashboard/overview') || isActiveRoute('/dashboard') }
              ]"
            >
              <span class="tab-content">
                <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span class="tab-label">Vue d'ensemble</span>
              </span>
            </NuxtLink>
            
            <NuxtLink
              to="/dashboard/contacts"
              :class="[
                'nav-tab',
                { 'active': isActiveRoute('/dashboard/contacts') }
              ]"
            >
              <span class="tab-content">
                <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="tab-label">Contacts & Emails</span>
                <span v-if="contactsCount > 0" class="tab-badge">
                  {{ contactsCount }}
                </span>
              </span>
            </NuxtLink>
            
            <NuxtLink
              to="/dashboard/analytics"
              :class="[
                'nav-tab',
                { 'active': isActiveRoute('/dashboard/analytics') }
              ]"
            >
              <span class="tab-content">
                <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <span class="tab-label">Analytics</span>
              </span>
            </NuxtLink>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <main class="dashboard-main">
        <div class="container">
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          
          <!-- Slot pour le contenu des pages -->
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardLayout',

  data() {
    return {
      stats: {
        totalContacts: 0,
        todayContacts: 0
      },
      loading: false,
      error: null
    }
  },

  computed: {
    selectedContactsCount() {
      // Cette valeur sera mise à jour par les pages enfants si nécessaire
      return 0
    },
    
    contactsCount() {
      return this.stats.totalContacts || 0
    }
  },

  async mounted() {
    // Vérification d'authentification
    try {
      const authStore = useAuthStore()
      
      if (!authStore.isInitialized) {
        const isAuthenticated = await authStore.initAuth()
        if (!isAuthenticated) {
          await navigateTo('/login')
          return
        }
      } else if (!authStore.isLoggedIn) {
        await navigateTo('/login')
        return
      }
      
      await this.loadStats()
      
    } catch (error) {
      console.error('❌ Erreur authentification dashboard:', error)
      await navigateTo('/login')
    }
  },

  methods: {
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
          await navigateTo('/login')
        }
      }
    },

    async refreshAll() {
      this.loading = true
      try {
        await this.loadStats()
        // Émettre un événement pour que les pages enfants puissent se rafraîchir
        this.$emit('refresh')
      } finally {
        this.loading = false
      }
    },

    async handleLogout() {
      try {
        this.loading = true
        const authStore = useAuthStore()
        await authStore.logout()
        await navigateTo('/login', { replace: true })
        
        setTimeout(() => {
          window.location.href = '/login'
        }, 100)
        
      } catch (error) {
        console.error('❌ Erreur lors de la déconnexion:', error)
        window.location.href = '/login'
      } finally {
        this.loading = false
      }
    },

    isActiveRoute(path) {
      const route = useRoute()
      if (path === '/dashboard' || path === '/dashboard/overview') {
        return route.path === '/dashboard' || route.path === '/dashboard/overview'
      }
      return route.path.startsWith(path)
    }
  }
}
</script>

<style scoped>
/* Dashboard Layout - Cohérent avec la landing page */
.dashboard-layout {
  min-height: 100vh;
  background: var(--background-primary);
  position: relative;
  font-family: var(--font-family);
}

/* Éléments décoratifs comme la landing page */
.twinkling-dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
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
  z-index: 10;
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

.brand-link {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  transition: var(--transition);
}

.brand-link:hover {
  transform: translateY(-1px);
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

/* Navigation */
.dashboard-nav {
  background: var(--background-primary);
  border-bottom: 1px solid var(--border-color);
  position: relative;
  z-index: 9;
  padding: 0.5rem 0;
}

.nav-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  overflow-x: visible;
  padding: 1.5rem;
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
  text-decoration: none;
  color: inherit;
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
  background: var(--color-gray-200);
}

.nav-tab.active .tab-content {
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
  z-index: 2;
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

/* Responsive */
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
    width: 100%;
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
}
</style> 