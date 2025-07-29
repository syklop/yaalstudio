<template>
  <div class="stat-card">
    <div class="stat-card-content">
      <div class="stat-info">
        <p class="stat-label">{{ title }}</p>
        <div v-if="loading" class="stat-loading">
          <div class="loading-bar"></div>
        </div>
        <p v-else class="stat-value">
          {{ formattedValue }}
        </p>
      </div>
      <div :class="`stat-icon ${color}`">
        <!-- Icônes en SVG inline -->
        <svg v-if="icon === 'users'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
        <svg v-else-if="icon === 'calendar'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <svg v-else-if="icon === 'trending-up'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <svg v-else-if="icon === 'chart-bar'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <!-- Icône par défaut si aucune ne correspond -->
        <svg v-else class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'blue',
      validator: value => ['blue', 'green', 'purple', 'yellow', 'red'].includes(value)
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    formattedValue() {
      if (typeof this.value === 'number') {
        return this.value.toLocaleString('fr-FR')
      }
      return this.value
    }
  }
}
</script>

<style scoped>
.stat-card {
  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.stat-card-content {
  display: flex;
  align-items: center;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-600);
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  word-wrap: break-word;
  hyphens: auto;
  line-height: 1.4;
}

.stat-loading {
  margin: 0.5rem 0;
}

.loading-bar {
  height: 2rem;
  background: var(--color-gray-200);
  border-radius: 0.25rem;
  width: 4rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
  font-family: var(--font-family);
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.stat-icon {
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.stat-icon.blue {
  background: var(--color-gray-100);
  color: var(--text-primary);
}

.stat-icon.green {
  background: var(--color-gray-100);
  color: #10b981;
}

.stat-icon.purple {
  background: var(--color-gray-100);
  color: var(--color-gray-600);
}

.stat-icon.yellow {
  background: var(--color-gray-100);
  color: #f59e0b;
}

.stat-icon.red {
  background: var(--color-gray-100);
  color: #ef4444;
}

.stat-icon .icon {
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  stroke-width: 2;
  color: inherit;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Responsive */
@media (max-width: 768px) {
  .stat-card {
    padding: 1.5rem;
    max-width: none;
  }

  .stat-value {
    font-size: 2rem;
  }

  .stat-icon .icon {
    width: 2rem;
    height: 2rem;
  }
}

@media (max-width: 480px) {
  .stat-card {
    padding: 1.25rem;
  }

  .stat-value {
    font-size: 1.75rem;
  }

  .stat-icon {
    padding: 0.75rem;
  }

  .stat-icon .icon {
    width: 1.75rem;
    height: 1.75rem;
  }
}
</style> 