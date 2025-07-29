<template>
  <div class="stats-section">
    <!-- Cartes de statistiques principales -->
    <div class="stats-grid">
      <StatCard
        title="Total Contacts"
        :value="stats.totalContacts || 0"
        icon="users"
        color="blue"
        :loading="loading"
      />
      <StatCard
        title="Aujourd'hui"
        :value="stats.todayContacts || 0"
        icon="calendar"
        color="green"
        :loading="loading"
      />
      <StatCard
        title="Cette semaine"
        :value="stats.weekContacts || 0"
        icon="trending-up"
        color="purple"
        :loading="loading"
      />
      <StatCard
        title="Ce mois"
        :value="stats.monthContacts || 0"
        icon="chart-bar"
        color="yellow"
        :loading="loading"
      />
    </div>

    <!-- Message si pas de données -->
    <div v-if="!loading && (!stats.totalContacts || stats.totalContacts === 0)" class="empty-state">
      <div class="empty-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <h3 class="empty-title">Aucune donnée disponible</h3>
      <p class="empty-description">
        Les statistiques apparaîtront ici dès que vous aurez des contacts.
      </p>
    </div>

    <!-- Statistiques détaillées - seulement si on a des données -->
    <div v-if="!loading && stats.totalContacts > 0" class="stats-details">
      <!-- Répartition par statut -->
      <div class="stats-card">
        <h3 class="stats-card-title">Répartition par statut</h3>
        <div class="stats-list">
          <div
            v-for="status in stats.byStatus || []"
            :key="status.status"
            class="stats-item"
          >
            <span class="status-label">{{ status.status }}</span>
            <div class="progress-container">
              <div class="progress-bar">
                <div
                  class="progress-fill blue"
                  :style="{ width: `${(status.count / stats.totalContacts) * 100}%` }"
                ></div>
              </div>
              <span class="status-count">{{ status.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Top sources -->
      <div class="stats-card">
        <h3 class="stats-card-title">Sources principales</h3>
        <div class="stats-list">
          <div
            v-for="source in stats.topSources || []"
            :key="source.source"
            class="stats-item"
          >
            <span class="status-label">{{ source.source }}</span>
            <div class="progress-container">
              <div class="progress-bar">
                <div
                  class="progress-fill green"
                  :style="{ width: `${(source.count / stats.totalContacts) * 100}%` }"
                ></div>
              </div>
              <span class="status-count">{{ source.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Métriques avancées - seulement si on a des données -->
    <div v-if="!loading && stats.totalContacts > 0" class="metrics-grid">
      <div class="metric-card">
        <div class="metric-content">
          <div class="metric-info">
            <p class="metric-label">Taux de conversion</p>
            <p class="metric-value">
              {{ stats.conversionRate || '0' }}%
            </p>
          </div>
          <div class="metric-icon blue">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-content">
          <div class="metric-info">
            <p class="metric-label">Visiteurs uniques</p>
            <p class="metric-value">
              {{ stats.uniqueVisitors || '0' }}
            </p>
          </div>
          <div class="metric-icon green">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-content">
          <div class="metric-info">
            <p class="metric-label">Durée moy. session</p>
            <p class="metric-value">
              {{ stats.avgSessionDuration || '0' }}min
            </p>
          </div>
          <div class="metric-icon purple">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatCard from './StatCard.vue'

export default {
  name: 'StatsSection',
  components: {
    StatCard
  },
  props: {
    stats: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.stats-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  justify-items: center;
}

.stats-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  width: 100%;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  justify-items: center;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  color: var(--color-gray-400);
  margin: 0 auto 1.5rem auto;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
  word-wrap: break-word;
  hyphens: auto;
}

.empty-description {
  font-size: 1rem;
  color: var(--color-gray-600);
  margin: 0;
  line-height: 1.6;
  word-wrap: break-word;
  hyphens: auto;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Cards */
.stats-card {
  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  transition: var(--transition);
  width: 100%;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.stats-card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  letter-spacing: 0.025em;
}

/* Listes */
.stats-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stats-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-label {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  font-weight: 500;
}

.status-count {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* Progress bars */
.progress-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.progress-bar {
  width: 6rem;
  height: 0.5rem;
  background: var(--color-gray-200);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.3s ease;
}

.progress-fill.blue {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-gray-600) 100%);
}

.progress-fill.green {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

/* Metric cards */
.metric-card {
  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  transition: var(--transition);
  width: 100%;
  max-width: 400px;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.metric-content {
  display: flex;
  align-items: center;
}

.metric-info {
  flex: 1;
}

.metric-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-600);
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.metric-icon {
  padding: 0.75rem;
  border-radius: 50%;
  transition: var(--transition);
}

.metric-icon.blue {
  background: var(--color-gray-100);
  color: var(--color-accent);
}

.metric-icon.green {
  background: var(--color-gray-100);
  color: #10b981;
}

.metric-icon.purple {
  background: var(--color-gray-100);
  color: var(--color-gray-600);
}

.metric-icon .icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .stats-details {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }

  .empty-state {
    padding: 3rem 1.5rem;
    max-width: none;
  }

  .empty-title {
    font-size: 1.25rem;
  }

  .empty-description {
    font-size: 0.875rem;
    max-width: none;
  }
}

@media (max-width: 480px) {
  .empty-state {
    padding: 2rem 1rem;
  }

  .empty-title {
    font-size: 1.125rem;
  }

  .empty-description {
    font-size: 0.8rem;
  }
}
</style> 