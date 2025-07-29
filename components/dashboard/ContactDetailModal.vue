<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Détails du contact</h3>
        <button @click="$emit('close')" class="close-button">
          <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <!-- Informations principales -->
        <div class="info-section">
          <div class="info-item">
            <label class="info-label">Nom</label>
            <p class="info-value">{{ contact.firstName }}</p>
          </div>

          <div class="info-item">
            <label class="info-label">Email</label>
            <p class="info-value">{{ contact.email }}</p>
          </div>

          <div v-if="contact.phone" class="info-item">
            <label class="info-label">Téléphone</label>
            <p class="info-value">{{ contact.phone }}</p>
          </div>

          <div class="info-item">
            <label class="info-label">Source</label>
            <span class="source-badge">{{ contact.source }}</span>
          </div>

          <div class="info-item">
            <label class="info-label">Statut</label>
            <select
              :value="contact.status"
              @change="$emit('update-status', $event.target.value)"
              :class="['status-select', getStatusClass(contact.status)]"
            >
              <option value="Non traité">Non traité</option>
              <option value="Traité">Traité</option>
              <option value="Relancé">Relancé</option>
            </select>
          </div>
        </div>

        <!-- Métadonnées -->
        <div class="metadata-section">
          <div class="info-item">
            <label class="info-label">Date d'inscription</label>
            <p class="info-value">{{ formatDate(contact.createdAt) }}</p>
          </div>

          <div v-if="contact.updatedAt !== contact.createdAt" class="info-item">
            <label class="info-label">Dernière modification</label>
            <p class="info-value">{{ formatDate(contact.updatedAt) }}</p>
          </div>

          <div v-if="contact.countryCode" class="info-item">
            <label class="info-label">Pays</label>
            <p class="info-value">{{ contact.countryCode }}</p>
          </div>

          <div v-if="contact.ipAddress && contact.ipAddress !== 'unknown'" class="info-item">
            <label class="info-label">Adresse IP</label>
            <p class="info-value mono">{{ contact.ipAddress }}</p>
          </div>

          <div v-if="contact.userAgent" class="info-item">
            <label class="info-label">Navigateur</label>
            <p class="info-value truncated" :title="contact.userAgent">
              {{ getBrowserInfo(contact.userAgent) }}
            </p>
          </div>

          <div v-if="contact.referrer" class="info-item">
            <label class="info-label">Référent</label>
            <p class="info-value truncated" :title="contact.referrer">
              {{ contact.referrer }}
            </p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="modal-footer">
        <button @click="$emit('close')" class="btn btn-secondary">
          Fermer
        </button>
        <button @click="sendEmail" class="btn btn-primary">
          Envoyer un email
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactDetailModal',
  props: {
    contact: {
      type: Object,
      required: true
    }
  },

  emits: ['close', 'update-status'],

  methods: {
    getStatusClass(status) {
      const classes = {
        'Non traité': 'status-pending',
        'Traité': 'status-completed',
        'Relancé': 'status-follow-up'
      }
      return classes[status] || 'status-default'
    },

    formatDate(dateString) {
      try {
        return new Intl.DateTimeFormat('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }).format(new Date(dateString))
      } catch {
        return dateString
      }
    },

    getBrowserInfo(userAgent) {
      if (!userAgent) return 'Inconnu'
      
      if (userAgent.includes('Chrome')) return 'Chrome'
      if (userAgent.includes('Firefox')) return 'Firefox'
      if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari'
      if (userAgent.includes('Edge')) return 'Edge'
      if (userAgent.includes('Opera')) return 'Opera'
      
      return 'Autre'
    },

    sendEmail() {
      console.log('Envoyer email à:', this.contact.email)
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  overflow-y: auto;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-content {
  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  width: 100%;
  max-width: 56rem;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2.5rem;
  position: relative;
  margin: 2rem auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: 0.025em;
}

.close-button {
  background: none;
  border: none;
  color: var(--color-gray-400);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: var(--transition);
}

.close-button:hover {
  color: var(--color-gray-600);
  background: var(--color-gray-100);
}

.close-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2.5rem;
}

.info-section,
.metadata-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: 0.25rem;
}

.info-value {
  font-size: 0.875rem;
  color: var(--text-primary);
  margin: 0;
}

.info-value.mono {
  font-family: 'Courier New', monospace;
}

.info-value.truncated {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.source-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--color-gray-100);
  color: var(--color-gray-800);
}

.status-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition);
}

.status-select:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.status-select.status-pending {
  background: #fef2f2;
  border-color: #fecaca;
  color: #dc2626;
}

.status-select.status-completed {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #166534;
}

.status-select.status-follow-up {
  background: #fffbeb;
  border-color: #fde68a;
  color: #92400e;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  border: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.btn-secondary {
  background: var(--background-primary);
  color: var(--color-gray-700);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--color-gray-50);
}

.btn-primary {
  background: var(--text-primary);
  color: var(--background-primary);
}

.btn-primary:hover {
  background: var(--color-gray-700);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
    margin: 1rem;
  }

  .modal-body {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .modal-footer {
    flex-direction: column;
  }
}
</style> 