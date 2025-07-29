<template>
  <div class="analytics-section">
    <!-- Header section -->
    <div class="analytics-header">
      <h2 class="section-title">Analytics & Performance</h2>
      <p class="section-description">
        Analysez votre trafic et les performances de votre site
      </p>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="overview-card loading-card">
      <div class="loading-spinner">
        <svg class="spinner" fill="none" viewBox="0 0 24 24">
          <circle class="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="loading-text">Chargement des analytics...</p>
      </div>
    </div>

    <!-- Message si pas de données -->
    <div v-else-if="!hasAnyData" class="overview-card empty-state">
      <div class="empty-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      </div>
      <h3 class="empty-title">Aucune donnée analytique</h3>
      <p class="empty-description">
        Les données analytiques apparaîtront ici une fois que votre site recevra du trafic. 
        Actuellement, aucune activité n'a été détectée dans vos statistiques.
      </p>
    </div>

    <!-- Contenu si on a des données -->
    <div v-else class="analytics-content">
      <!-- Métriques rapides -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-header">
            <h3 class="metric-label">VUES AUJOURD'HUI</h3>
            <div class="metric-icon today">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div class="metric-value">{{ formatNumber(analytics.pageViews?.today || 0) }}</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <h3 class="metric-label">CETTE SEMAINE</h3>
            <div class="metric-icon week">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div class="metric-value">{{ formatNumber(analytics.pageViews?.week || 0) }}</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <h3 class="metric-label">CE MOIS</h3>
            <div class="metric-icon month">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div class="metric-value">{{ formatNumber(analytics.pageViews?.month || 0) }}</div>
        </div>
      </div>

      <!-- Graphiques -->
      <div class="analytics-charts-grid">
        <!-- Sources de trafic -->
        <div class="chart-card">
          <h3 class="chart-title">SOURCES DE TRAFIC</h3>
          <div class="chart-content">
            <div v-if="!analytics.sources || analytics.sources.every(s => s.count === 0)" class="chart-empty">
              <p class="chart-empty-text">Aucune donnée de source disponible</p>
            </div>
            <div class="chart-list" v-else>
              <div
                v-for="(source, index) in (analytics.sources || []).filter(s => s.count > 0)"
                :key="source.name"
                class="chart-item"
              >
                <div class="chart-item-content">
                  <div class="chart-item-info">
                    <span class="chart-item-label">{{ source.name.toUpperCase() }}</span>
                    <span class="chart-item-value">{{ source.count }}</span>
                  </div>
                  <div class="chart-progress-bar">
                    <div
                      :class="`chart-progress-fill ${getSourceColorClass(index)}`"
                      :style="{ width: `${source.percentage}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Appareils -->
        <div class="chart-card">
          <h3 class="chart-title">APPAREILS UTILISÉS</h3>
          <div class="chart-content">
            <div v-if="!analytics.devices || analytics.devices.every(d => d.count === 0)" class="chart-empty">
              <p class="chart-empty-text">Aucune donnée d'appareil disponible</p>
            </div>
            <div class="chart-list" v-else>
              <div
                v-for="(device, index) in (analytics.devices || []).filter(d => d.count > 0)"
                :key="device.name"
                class="chart-item"
              >
                <div class="chart-item-content">
                  <div class="chart-item-info">
                    <span class="chart-item-label">{{ device.name.toUpperCase() }}</span>
                    <span class="chart-item-value">{{ device.count }}</span>
                  </div>
                  <div class="chart-progress-bar">
                    <div
                      :class="`chart-progress-fill ${getDeviceColorClass(index)}`"
                      :style="{ width: `${device.percentage}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnalyticsSection',

  props: {
    analytics: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    hasAnyData() {
      // Debug: Loguer les données reçues
      console.log('📊 Analytics data received:', this.analytics)
      
      // Vérifier s'il y a des données de page views
      const hasPageViews = this.analytics.pageViews && 
        (this.analytics.pageViews.today > 0 || 
         this.analytics.pageViews.week > 0 || 
         this.analytics.pageViews.month > 0)
      
      // Vérifier s'il y a des sources avec des données
      const hasSources = this.analytics.sources && 
        this.analytics.sources.length > 0 && 
        this.analytics.sources.some(source => source.count > 0)
      
      // Vérifier s'il y a des appareils avec des données
      const hasDevices = this.analytics.devices && 
        this.analytics.devices.length > 0 && 
        this.analytics.devices.some(device => device.count > 0)
      
      const result = hasPageViews || hasSources || hasDevices
      console.log('📊 Has any data:', result, { hasPageViews, hasSources, hasDevices })
      
      return result
    }
  },

  methods: {
    formatNumber(value) {
      if (value === null || value === undefined) return '0'
      return value.toLocaleString('fr-FR')
    },

    getSourceColorClass(index) {
      const colors = ['blue', 'green', 'purple', 'yellow', 'red', 'indigo']
      return colors[index % colors.length]
    },

    getDeviceColorClass(index) {
      const colors = ['emerald', 'cyan', 'pink']
      return colors[index % colors.length]
    }
  }
}
</script>

<style scoped>
.analytics-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

/* Header styles - cohérent avec la vue d'ensemble */
.analytics-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.025em;
}

.section-description {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
}

/* Layout cohérent avec la vue d'ensemble */
.analytics-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.analytics-charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

/* Classe overview-card de base */
.overview-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  padding: 1.5rem;
}

.overview-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}



/* Metrics grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

/* Metric cards - style identique aux cartes de la vue d'ensemble */
.metric-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  padding: 2rem;
  transition: all 0.2s ease;
  position: relative;
}

.metric-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.metric-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1.2;
}

.metric-value {
  font-size: 3rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1;
}

.metric-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.metric-icon.today {
  background: #10b981;
}

.metric-icon.week {
  background: #3b82f6;
}

.metric-icon.month {
  background: #f59e0b;
}

/* Chart cards - style identique aux cartes de la vue d'ensemble */
.chart-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  padding: 2rem;
  transition: all 0.2s ease;
}

.chart-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.chart-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 2rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.chart-content {
  display: flex;
  flex-direction: column;
}

.chart-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.chart-item {
  position: relative;
}

.chart-item-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.chart-item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-item-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.chart-item-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.chart-progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.chart-progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.chart-progress-fill.blue { background: #3b82f6; }
.chart-progress-fill.green { background: #10b981; }
.chart-progress-fill.purple { background: #8b5cf6; }
.chart-progress-fill.yellow { background: #f59e0b; }
.chart-progress-fill.red { background: #ef4444; }
.chart-progress-fill.indigo { background: #6366f1; }
.chart-progress-fill.emerald { background: #10b981; }
.chart-progress-fill.cyan { background: #06b6d4; }
.chart-progress-fill.pink { background: #ec4899; }

/* Loading et empty states */
.loading-card,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  color: #6366f1;
}

.spinner-circle {
  opacity: 0.25;
}

.spinner-path {
  opacity: 0.75;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  color: #9ca3af;
  margin: 0 auto 1.5rem auto;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.75rem 0;
}

.empty-description {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Chart empty state */
.chart-empty {
  text-align: center;
  padding: 2rem 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 2px dashed #d1d5db;
}

.chart-empty-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  font-style: italic;
}

/* Responsive */
@media (max-width: 1024px) {
  .metrics-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .analytics-charts-grid {
    grid-template-columns: 1fr;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .section-description {
    font-size: 1rem;
  }
}

@media (max-width: 640px) {
  .metric-card,
  .chart-card {
    padding: 1.5rem;
  }
  
  .metric-value {
    font-size: 2.5rem;
  }
  
  .chart-item-value {
    font-size: 1.125rem;
  }
  
  .analytics-header {
    margin-bottom: 1.5rem;
  }
}
</style> 