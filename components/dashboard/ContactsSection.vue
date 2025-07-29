<template>
  <div class="contacts-section">
    <!-- Barre d'outils -->
    <div class="toolbar-card">
      <div class="toolbar-content">
        <!-- Recherche et filtres -->
        <div class="toolbar-filters">
          <div class="search-container">
            <input
              v-model="localFilters.search"
              @input="debounceSearch"
              type="text"
              placeholder="Rechercher..."
              class="search-input"
            >
            <div class="search-icon">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <select
            v-model="localFilters.status"
            @change="updateFilters"
            class="filter-select"
          >
            <option value="">Tous les statuts</option>
            <option value="Non traité">Non traité</option>
            <option value="Traité">Traité</option>
            <option value="Relancé">Relancé</option>
          </select>

          <select
            v-model="localFilters.source"
            @change="updateFilters"
            class="filter-select"
          >
            <option value="">Toutes les sources</option>
            <option value="Landing Page">Landing Page</option>
            <option value="Facebook">Facebook</option>
            <option value="Google">Google</option>
          </select>
        </div>

        <!-- Actions sur la sélection -->
        <div v-if="selectedContacts.length > 0" class="selection-actions">
          <span class="selection-count">
            {{ selectedContacts.length }} sélectionné(s)
          </span>
          
          <select
            @change="bulkUpdateStatus"
            class="bulk-select"
          >
            <option value="">Changer le statut</option>
            <option value="Non traité">Non traité</option>
            <option value="Traité">Traité</option>
            <option value="Relancé">Relancé</option>
          </select>

          <button
            @click="$emit('send-email')"
            class="send-email-btn"
          >
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Envoyer email
          </button>

          <button
            @click="clearSelection"
            class="clear-btn"
          >
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Tableau des contacts -->
    <div class="contacts-table-card">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner">
          <svg class="spinner" fill="none" viewBox="0 0 24 24">
            <circle class="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="loading-text">Chargement des contacts...</p>
        </div>
      </div>

      <div v-else-if="contacts.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </div>
        <h3 class="empty-title">Aucun contact trouvé</h3>
        <p class="empty-description">
          Les contacts de votre formulaire apparaîtront ici.
        </p>
      </div>

      <table v-else class="contacts-table">
        <thead class="table-header">
          <tr>
            <th class="checkbox-column">
              <input
                type="checkbox"
                :checked="isAllSelected"
                :indeterminate="isPartialSelected"
                @change="$emit('select-all')"
                class="table-checkbox"
              >
            </th>
            <th class="table-th">Contact</th>
            <th class="table-th">Source</th>
            <th class="table-th">Statut</th>
            <th class="table-th">Date</th>
            <th class="table-th text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr
            v-for="contact in contacts"
            :key="contact.id"
            :class="[
              'table-row',
              { 'selected': isSelected(contact) }
            ]"
          >
            <td class="table-td">
              <input
                type="checkbox"
                :checked="isSelected(contact)"
                @change="$emit('select-contact', contact)"
                class="table-checkbox"
              >
            </td>
            <td class="table-td">
              <div class="contact-info">
                <div class="contact-name">{{ contact.firstName }}</div>
                <div class="contact-email">{{ contact.email }}</div>
                <div v-if="contact.phone" class="contact-phone">{{ contact.phone }}</div>
              </div>
            </td>
            <td class="table-td">
              <span class="source-badge">{{ contact.source }}</span>
            </td>
            <td class="table-td">
              <select
                :value="contact.status"
                @change="$emit('update-status', contact.id, $event.target.value)"
                :class="['status-select', getStatusClass(contact.status)]"
              >
                <option value="Non traité">Non traité</option>
                <option value="Traité">Traité</option>
                <option value="Relancé">Relancé</option>
              </select>
            </td>
            <td class="table-td">
              <span class="date-text">{{ formatDate(contact.createdAt) }}</span>
            </td>
            <td class="table-td text-right">
              <button
                @click="showContactDetail(contact)"
                class="action-btn"
              >
                Voir détails
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.pages > 1" class="pagination-card">
      <div class="pagination-content">
        <div class="pagination-info">
          Affichage de {{ ((pagination.page - 1) * pagination.limit) + 1 }} à 
          {{ Math.min(pagination.page * pagination.limit, pagination.total) }} 
          sur {{ pagination.total }} résultats
        </div>
        
        <div class="pagination-controls">
          <button
            @click="changePage(pagination.page - 1)"
            :disabled="pagination.page <= 1"
            class="pagination-btn"
          >
            Précédent
          </button>
          
          <span class="pagination-current">
            Page {{ pagination.page }} sur {{ pagination.pages }}
          </span>
          
          <button
            @click="changePage(pagination.page + 1)"
            :disabled="pagination.page >= pagination.pages"
            class="pagination-btn"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>

    <!-- Modal détails contact -->
    <ContactDetailModal
      v-if="selectedContactDetail"
      :contact="selectedContactDetail"
      @close="selectedContactDetail = null"
      @update-status="(status) => $emit('update-status', selectedContactDetail.id, status)"
    />
  </div>
</template>

<script>
import ContactDetailModal from './ContactDetailModal.vue'

export default {
  name: 'ContactsSection',
  components: {
    ContactDetailModal
  },
  
  props: {
    contacts: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    pagination: { type: Object, default: () => ({}) },
    filters: { type: Object, default: () => ({}) },
    selectedContacts: { type: Array, default: () => [] }
  },

  emits: [
    'update-filters',
    'load-contacts', 
    'select-contact',
    'select-all',
    'update-status',
    'send-email'
  ],

  data() {
    return {
      localFilters: { ...this.filters },
      searchTimeout: null,
      selectedContactDetail: null
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

  watch: {
    filters: {
      handler(newFilters) {
        this.localFilters = { ...newFilters }
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    debounceSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.updateFilters()
      }, 300)
    },

    updateFilters() {
      this.$emit('update-filters', this.localFilters)
    },

    changePage(page) {
      if (page >= 1 && page <= this.pagination.pages) {
        this.$emit('load-contacts', { page })
      }
    },

    isSelected(contact) {
      return this.selectedContacts.some(c => c.id === contact.id)
    },

    clearSelection() {
      this.selectedContacts.forEach(contact => {
        this.$emit('select-contact', contact)
      })
    },

    async bulkUpdateStatus(event) {
      const newStatus = event.target.value
      if (!newStatus || this.selectedContacts.length === 0) return

      for (const contact of this.selectedContacts) {
        this.$emit('update-status', contact.id, newStatus)
      }
      
      event.target.value = ''
    },

    showContactDetail(contact) {
      this.selectedContactDetail = contact
    },

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
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }).format(new Date(dateString))
      } catch {
        return dateString
      }
    }
  }
}
</script>

<style scoped>
.contacts-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

/* Toolbar */
.toolbar-card {
  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  transition: var(--transition);
  width: 100%;
}

.toolbar-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.toolbar-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toolbar-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.search-container {
  position: relative;
  flex: 1;
  max-width: 400px;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: var(--transition);
  font-family: var(--font-family);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.search-input::placeholder {
  color: var(--color-gray-500);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gray-400);
  pointer-events: none;
}

.search-icon .icon {
  width: 1.25rem;
  height: 1.25rem;
}

.filter-select, .bulk-select {
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-family);
}

.filter-select:focus, .bulk-select:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

/* Selection actions */
.selection-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.selection-count {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  font-weight: 600;
}

.send-email-btn {
  background: var(--text-primary);
  color: var(--background-primary);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.send-email-btn:hover {
  background: var(--color-gray-700);
  transform: translateY(-2px);
}

.send-email-btn .icon {
  width: 1rem;
  height: 1rem;
}

.clear-btn {
  background: var(--color-gray-100);
  color: var(--color-gray-600);
  border: none;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-btn:hover {
  background: var(--color-gray-200);
  color: var(--color-gray-800);
}

.clear-btn .icon {
  width: 1rem;
  height: 1rem;
}

/* Table Container */
.contacts-table-card {
  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: var(--transition);
  width: 100%;
}

.contacts-table-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Loading */
.loading-container {
  padding: 3rem 1.5rem;
  text-align: center;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 3rem;
  height: 3rem;
  animation: spin 1s linear infinite;
}

.spinner-circle {
  opacity: 0.25;
}

.spinner-path {
  opacity: 0.75;
}

.loading-text {
  color: var(--color-gray-600);
  font-size: 0.875rem;
  margin: 0;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Empty state */
.empty-state {
  padding: 3rem 1.5rem;
  text-align: center;
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

/* Table */
.contacts-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.table-header {
  background: var(--color-gray-50);
}

.table-th {
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--border-color);
}

.checkbox-column {
  width: 2rem;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.text-right {
  text-align: right;
}

.table-body {
  background: var(--background-primary);
}

.table-row {
  transition: var(--transition);
  border-bottom: 1px solid var(--border-color);
}

.table-row:hover {
  background: var(--color-gray-50);
}

.table-row.selected {
  background: #f0f9ff;
}

.table-td {
  padding: 1rem 1.5rem;
  vertical-align: top;
}

.table-checkbox {
  width: 1rem;
  height: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.25rem;
  cursor: pointer;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.contact-email,
.contact-phone {
  font-size: 0.875rem;
  color: var(--color-gray-500);
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
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: var(--transition);
}

.status-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.status-select.status-pending {
  background: #fef2f2;
  color: #dc2626;
}

.status-select.status-completed {
  background: #f0fdf4;
  color: #166534;
}

.status-select.status-follow-up {
  background: #fffbeb;
  color: #92400e;
}

.status-select.status-default {
  background: var(--color-gray-100);
  color: var(--color-gray-800);
}

.date-text {
  font-size: 0.875rem;
  color: var(--color-gray-500);
}

.action-btn {
  background: none;
  border: none;
  color: var(--color-accent);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: var(--transition);
}

.action-btn:hover {
  color: var(--color-gray-700);
  text-decoration: underline;
}

/* Pagination */
.pagination-card {
  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  transition: var(--transition);
  width: 100%;
}

.pagination-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.pagination-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  margin: 0 auto;
}

.pagination-info {
  font-size: 0.875rem;
  color: var(--color-gray-700);
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition);
}

.pagination-btn:hover:not(:disabled) {
  background: var(--color-gray-50);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-current {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: var(--color-gray-700);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .toolbar-content {
    gap: 1.5rem;
  }

  .toolbar-filters {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .search-container {
    max-width: none;
    min-width: auto;
  }

  .selection-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .send-email-btn {
    justify-content: center;
  }

  .pagination-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .table-th,
  .table-td {
    padding: 0.75rem 1rem;
  }

  .empty-state {
    padding: 2rem 1rem;
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

@media (max-width: 640px) {
  .contacts-table-card {
    overflow-x: auto;
  }

  .contacts-table {
    min-width: 600px;
  }
  
  .empty-state {
    padding: 1.5rem 0.75rem;
  }

  .empty-title {
    font-size: 1.125rem;
  }

  .empty-description {
    font-size: 0.8rem;
  }
}
</style> 