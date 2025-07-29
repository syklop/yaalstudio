<template>
  <div class="contacts-emails-section">
    <!-- Barre d'outils principale -->
    <div class="main-toolbar">
      <div class="toolbar-content">
        <!-- Section de recherche et filtres -->
        <div class="search-filters">
          <div class="search-container">
            <input
              v-model="localFilters.search"
              @input="debounceSearch"
              type="text"
              placeholder="Rechercher des contacts..."
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

        <!-- Actions principales -->
        <div class="main-actions">
          <button
            @click="openEmailComposer"
            :disabled="selectedContacts.length === 0"
            class="compose-btn primary"
            :class="{ 'has-selection': selectedContacts.length > 0 }"
          >
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z" />
            </svg>
            {{ selectedContacts.length > 0 ? `Envoyer à ${selectedContacts.length} contact(s)` : 'Sélectionnez des contacts' }}
          </button>
          
          <div v-if="selectedContacts.length > 0" class="selection-actions">
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
              @click="clearSelection"
              class="clear-btn"
              title="Désélectionner tout"
            >
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Barre de sélection (affichée quand des contacts sont sélectionnés) -->
      <div v-if="selectedContacts.length > 0" class="selection-bar">
        <div class="selection-info">
          <span class="selection-count">{{ selectedContacts.length }} contact(s) sélectionné(s)</span>
          <div class="selected-contacts-preview">
            <div class="preview-avatars">
              <div 
                v-for="(contact, index) in selectedContacts.slice(0, 3)" 
                :key="contact.id"
                class="contact-avatar"
                :style="{ zIndex: 3 - index }"
              >
                {{ contact.firstName.charAt(0).toUpperCase() }}
              </div>
              <div v-if="selectedContacts.length > 3" class="more-count">
                +{{ selectedContacts.length - 3 }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="quick-actions">
          <button
            @click="quickEmail"
            class="quick-action-btn primary"
          >
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Envoi rapide
          </button>
          
          <button
            @click="openEmailComposer"
            class="quick-action-btn"
          >
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Composer
          </button>
        </div>
      </div>
    </div>

    <!-- Table des contacts -->
    <div class="contacts-table-container">
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
        <p class="empty-description">Aucun contact ne correspond à vos critères de recherche.</p>
      </div>

      <div v-else class="contacts-table">
        <div class="table-header">
          <div class="header-cell select-cell">
            <input
              type="checkbox"
              :checked="isAllSelected"
              :indeterminate="isPartialSelected"
              @change="toggleSelectAll"
              class="checkbox"
            >
          </div>
          <div class="header-cell name-cell">Contact</div>
          <div class="header-cell email-cell">Email</div>
          <div class="header-cell phone-cell">Téléphone</div>
          <div class="header-cell status-cell">Statut</div>
          <div class="header-cell source-cell">Source</div>
          <div class="header-cell date-cell">Date</div>
          <div class="header-cell actions-cell">Actions</div>
        </div>

        <div class="table-body">
          <div
            v-for="contact in contacts"
            :key="contact.id"
            class="contact-row"
            :class="{ 
              'selected': isContactSelected(contact),
              'hover': hoveredContact === contact.id 
            }"
            @mouseenter="hoveredContact = contact.id"
            @mouseleave="hoveredContact = null"
          >
            <div class="row-cell select-cell">
              <input
                type="checkbox"
                :checked="isContactSelected(contact)"
                @change="toggleContact(contact)"
                class="checkbox"
              >
            </div>
            
            <div class="row-cell name-cell">
              <div class="contact-info">
                <div class="contact-avatar">
                  {{ contact.firstName.charAt(0).toUpperCase() }}
                </div>
                <div class="contact-details">
                  <div class="contact-name">
                    {{ contact.firstName }} {{ contact.lastName || '' }}
                  </div>
                  <div class="contact-company" v-if="contact.company">
                    {{ contact.company }}
                  </div>
                </div>
              </div>
            </div>
            
            <div class="row-cell email-cell">
              <div class="email-content">
                <span class="email-address">{{ contact.email }}</span>
                <button
                  @click="sendQuickEmail(contact)"
                  class="quick-email-btn"
                  title="Envoi rapide"
                >
                  <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="row-cell phone-cell">
              {{ contact.phone || '-' }}
            </div>
            
            <div class="row-cell status-cell">
              <select
                :value="contact.status"
                @change="updateContactStatus(contact.id, $event.target.value)"
                class="status-select"
                :class="getStatusClass(contact.status)"
              >
                <option value="Non traité">Non traité</option>
                <option value="Traité">Traité</option>
                <option value="Relancé">Relancé</option>
              </select>
            </div>
            
            <div class="row-cell source-cell">
              <span class="source-badge" :class="getSourceClass(contact.source)">
                {{ contact.source || 'Inconnue' }}
              </span>
            </div>
            
            <div class="row-cell date-cell">
              <div class="date-info">
                <div class="date-value">
                  {{ formatDate(contact.createdAt) }}
                </div>
                <div class="date-time">
                  {{ formatTime(contact.createdAt) }}
                </div>
              </div>
            </div>
            
            <div class="row-cell actions-cell">
              <div class="actions-menu">
                <button
                  @click="openContactDetail(contact)"
                  class="action-btn"
                  title="Voir détails"
                >
                  <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                
                <button
                  @click="composeEmailForContact(contact)"
                  class="action-btn"
                  title="Envoyer email"
                >
                  <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="contacts.length > 0" class="pagination">
        <div class="pagination-info">
          Affichage de {{ (pagination.page - 1) * pagination.limit + 1 }} à {{ Math.min(pagination.page * pagination.limit, pagination.total) }} sur {{ pagination.total }} contacts
        </div>
        
        <div class="pagination-controls">
          <button
            @click="changePage(pagination.page - 1)"
            :disabled="!pagination.hasPrev"
            class="pagination-btn"
          >
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Précédent
          </button>
          
          <div class="page-numbers">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="changePage(page)"
              :class="['page-btn', { active: page === pagination.page }]"
              class="pagination-btn"
            >
              {{ page }}
            </button>
          </div>
          
          <button
            @click="changePage(pagination.page + 1)"
            :disabled="!pagination.hasNext"
            class="pagination-btn"
          >
            Suivant
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de composition d'email -->
    <div v-if="showEmailComposer" class="email-composer-modal">
      <div class="modal-backdrop" @click="closeEmailComposer"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">
            Composer un email
            <span v-if="emailRecipients.length > 1" class="recipients-count">
              ({{ emailRecipients.length }} destinataires)
            </span>
          </h3>
          <button @click="closeEmailComposer" class="close-btn">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <!-- Aperçu des destinataires -->
          <div class="recipients-section">
            <div class="recipients-header">
              <span class="section-label">Destinataires</span>
              <button
                v-if="emailRecipients.length > 3"
                @click="showAllRecipients = !showAllRecipients"
                class="toggle-recipients-btn"
              >
                {{ showAllRecipients ? 'Réduire' : `Voir tous (${emailRecipients.length})` }}
              </button>
            </div>
            
            <div class="recipients-list">
              <div
                v-for="contact in displayedRecipients"
                :key="contact.id"
                class="recipient-item"
              >
                <div class="recipient-avatar">
                  {{ contact.firstName.charAt(0).toUpperCase() }}
                </div>
                <div class="recipient-info">
                  <div class="recipient-name">{{ contact.firstName }} {{ contact.lastName || '' }}</div>
                  <div class="recipient-email">{{ contact.email }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulaire d'email -->
          <form @submit.prevent="sendEmail" class="email-form">
            <!-- Templates -->
            <div class="form-group">
              <label class="form-label">Template (optionnel)</label>
              <select
                v-model="selectedTemplate"
                @change="applyTemplate"
                class="form-select"
              >
                <option value="">Sélectionner un template</option>
                <option
                  v-for="template in emailTemplates"
                  :key="template.id"
                  :value="template.id"
                >
                  {{ template.name }}
                </option>
              </select>
            </div>

            <!-- Sujet -->
            <div class="form-group">
              <label class="form-label">
                Sujet <span class="required">*</span>
              </label>
              <input
                v-model="emailData.subject"
                type="text"
                required
                placeholder="Sujet de l'email"
                class="form-input"
              >
            </div>

            <!-- Corps du message -->
            <div class="form-group">
              <label class="form-label">
                Message <span class="required">*</span>
              </label>
              <textarea
                v-model="emailData.message"
                required
                placeholder="Votre message..."
                rows="8"
                class="form-textarea"
              ></textarea>
              <div class="message-help">
                Vous pouvez utiliser {firstName} pour personnaliser avec le prénom.
              </div>
            </div>

            <!-- Actions -->
            <div class="form-actions">
              <button
                type="button"
                @click="saveTemplate"
                class="save-template-btn"
                :disabled="!emailData.subject || !emailData.message"
              >
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Sauvegarder comme template
              </button>
              
              <div class="primary-actions">
                <button
                  type="button"
                  @click="closeEmailComposer"
                  class="cancel-btn"
                >
                  Annuler
                </button>
                
                <button
                  type="submit"
                  :disabled="sending || !emailData.subject || !emailData.message"
                  class="send-btn"
                >
                  <svg v-if="sending" class="icon spinning" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  {{ sending ? 'Envoi...' : 'Envoyer' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal de détails du contact -->
    <ContactDetailModal
      v-if="showContactDetail"
      :contact="selectedContactForDetail"
      @close="closeContactDetail"
      @update="handleContactUpdate"
    />

    <!-- Modal pour sauvegarder le template -->
    <SaveTemplateModal
      v-if="showSaveTemplate"
      :templateData="emailData"
      @close="closeSaveTemplate"
      @save="handleTemplateSave"
    />
  </div>
</template>

<script>
import ContactDetailModal from './ContactDetailModal.vue'
import SaveTemplateModal from './SaveTemplateModal.vue'

export default {
  name: 'ContactsEmailsSection',
  
  components: {
    ContactDetailModal,
    SaveTemplateModal
  },

  props: {
    contacts: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: () => ({
        page: 1,
        limit: 20,
        total: 0,
        pages: 1,
        hasNext: false,
        hasPrev: false
      })
    },
    filters: {
      type: Object,
      default: () => ({
        search: '',
        status: '',
        source: ''
      })
    },
    selectedContacts: {
      type: Array,
      default: () => []
    }
  },

  emits: [
    'update-filters',
    'load-contacts', 
    'select-contact',
    'select-all',
    'update-status',
    'send-email',
    'clear-selection'
  ],

  data() {
    return {
      localFilters: { ...this.filters },
      searchTimeout: null,
      hoveredContact: null,
      
      // Email composer
      showEmailComposer: false,
      emailRecipients: [],
      emailData: {
        subject: '',
        message: ''
      },
      selectedTemplate: '',
      sending: false,
      
      // Templates
      emailTemplates: [
        {
          id: 'welcome',
          name: 'Email de bienvenue',
          subject: 'Bienvenue {firstName} !',
          message: 'Bonjour {firstName},\n\nMerci de vous être inscrit(e) à YaalStudio...'
        },
        {
          id: 'follow-up',
          name: 'Email de relance',
          subject: 'Suite à votre inscription',
          message: 'Bonjour {firstName},\n\nJ\'espère que vous allez bien...'
        }
      ],
      
      // Modals
      showContactDetail: false,
      selectedContactForDetail: null,
      showSaveTemplate: false,
      showAllRecipients: false
    }
  },

  computed: {
    isAllSelected() {
      return this.contacts.length > 0 && this.selectedContacts.length === this.contacts.length
    },
    
    isPartialSelected() {
      return this.selectedContacts.length > 0 && this.selectedContacts.length < this.contacts.length
    },
    
    visiblePages() {
      const current = this.pagination.page
      const total = this.pagination.pages
      const pages = []
      
      for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
        pages.push(i)
      }
      
      return pages
    },
    
    displayedRecipients() {
      if (this.showAllRecipients) {
        return this.emailRecipients
      }
      return this.emailRecipients.slice(0, 3)
    }
  },

  watch: {
    filters: {
      handler(newFilters) {
        this.localFilters = { ...newFilters }
      },
      deep: true
    }
  },

  methods: {
    // Recherche et filtres
    debounceSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.updateFilters()
      }, 300)
    },

    updateFilters() {
      this.$emit('update-filters', this.localFilters)
    },

    // Sélection des contacts
    isContactSelected(contact) {
      return this.selectedContacts.some(c => c.id === contact.id)
    },

    toggleContact(contact) {
      this.$emit('select-contact', contact)
    },

    toggleSelectAll() {
      this.$emit('select-all')
    },

    clearSelection() {
      this.$emit('clear-selection')
    },

    // Actions sur les contacts
    updateContactStatus(contactId, newStatus) {
      this.$emit('update-status', contactId, newStatus)
    },

    bulkUpdateStatus(event) {
      const newStatus = event.target.value
      if (newStatus && this.selectedContacts.length > 0) {
        this.selectedContacts.forEach(contact => {
          this.$emit('update-status', contact.id, newStatus)
        })
        event.target.value = '' // Reset select
      }
    },

    // Email
    openEmailComposer() {
      if (this.selectedContacts.length > 0) {
        this.emailRecipients = [...this.selectedContacts]
        this.showEmailComposer = true
        this.resetEmailForm()
      }
    },

    composeEmailForContact(contact) {
      this.emailRecipients = [contact]
      this.showEmailComposer = true
      this.resetEmailForm()
    },

    quickEmail() {
      // Ouvrir directement un template rapide
      this.openEmailComposer()
      this.selectedTemplate = 'welcome'
      this.applyTemplate()
    },

    sendQuickEmail(contact) {
      this.composeEmailForContact(contact)
      this.selectedTemplate = 'welcome'
      this.applyTemplate()
    },

    closeEmailComposer() {
      this.showEmailComposer = false
      this.emailRecipients = []
      this.resetEmailForm()
      this.showAllRecipients = false
    },

    resetEmailForm() {
      this.emailData = {
        subject: '',
        message: ''
      }
      this.selectedTemplate = ''
    },

    applyTemplate() {
      if (this.selectedTemplate) {
        const template = this.emailTemplates.find(t => t.id === this.selectedTemplate)
        if (template) {
          this.emailData.subject = template.subject
          this.emailData.message = template.message
        }
      }
    },

    async sendEmail() {
      try {
        this.sending = true
        
        const emailPayload = {
          recipients: this.emailRecipients.map(c => ({
            id: c.id,
            email: c.email,
            firstName: c.firstName
          })),
          subject: this.emailData.subject,
          message: this.emailData.message
        }
        
        this.$emit('send-email', emailPayload)
        this.closeEmailComposer()
        
      } catch (error) {
        console.error('Erreur envoi email:', error)
      } finally {
        this.sending = false
      }
    },

    // Templates
    saveTemplate() {
      this.showSaveTemplate = true
    },

    closeSaveTemplate() {
      this.showSaveTemplate = false
    },

    handleTemplateSave(templateData) {
      this.emailTemplates.push({
        id: Date.now().toString(),
        name: templateData.name,
        subject: this.emailData.subject,
        message: this.emailData.message
      })
      this.closeSaveTemplate()
    },

    // Détails du contact
    openContactDetail(contact) {
      this.selectedContactForDetail = contact
      this.showContactDetail = true
    },

    closeContactDetail() {
      this.showContactDetail = false
      this.selectedContactForDetail = null
    },

    handleContactUpdate(updatedContact) {
      this.$emit('update-status', updatedContact.id, updatedContact.status)
    },

    // Pagination
    changePage(page) {
      if (page !== this.pagination.page) {
        this.$emit('load-contacts', { page })
      }
    },

    // Utilitaires
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('fr-FR')
    },

    formatTime(dateString) {
      return new Date(dateString).toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },

    getStatusClass(status) {
      const classes = {
        'Non traité': 'status-pending',
        'Traité': 'status-completed',
        'Relancé': 'status-follow-up'
      }
      return classes[status] || 'status-default'
    },

    getSourceClass(source) {
      const classes = {
        'Landing Page': 'source-landing',
        'Facebook': 'source-facebook',
        'Google': 'source-google'
      }
      return classes[source] || 'source-default'
    }
  }
}
</script>

<style scoped>
.contacts-emails-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Barre d'outils principale */
.main-toolbar {
  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  overflow: hidden;
}

.toolbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  gap: 2rem;
}

.search-filters {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.search-container {
  position: relative;
  min-width: 300px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  transition: var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--text-primary);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gray-400);
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  background: var(--background-primary);
  min-width: 150px;
}

.main-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.compose-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 0.875rem;
}

.compose-btn.primary {
  background: var(--text-primary);
  color: var(--background-primary);
}

.compose-btn.primary:hover:not(:disabled) {
  background: var(--color-gray-700);
  transform: translateY(-1px);
}

.compose-btn:disabled {
  background: var(--color-gray-300);
  color: var(--color-gray-500);
  cursor: not-allowed;
}

.compose-btn.has-selection {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.selection-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bulk-select {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 0.75rem;
  background: var(--background-primary);
}

.clear-btn {
  width: 40px;
  height: 40px;
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

.clear-btn:hover {
  background: var(--color-gray-200);
  color: var(--color-red-600);
}

/* Barre de sélection */
.selection-bar {
  background: linear-gradient(135deg, var(--text-primary), var(--color-gray-700));
  color: var(--background-primary);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.selection-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.selection-count {
  font-weight: 600;
  font-size: 0.875rem;
}

.selected-contacts-preview {
  display: flex;
  align-items: center;
}

.preview-avatars {
  display: flex;
  align-items: center;
}

.contact-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
  margin-left: -8px;
  border: 2px solid var(--text-primary);
  color: var(--background-primary);
}

.contact-avatar:first-child {
  margin-left: 0;
}

.more-count {
  margin-left: 8px;
  font-size: 0.75rem;
  opacity: 0.8;
}

.quick-actions {
  display: flex;
  gap: 0.75rem;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius);
  background: transparent;
  color: var(--background-primary);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.quick-action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.quick-action-btn.primary {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

/* Table des contacts */
.contacts-table-container {
  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  overflow: hidden;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: var(--color-gray-500);
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
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
  font-size: 0.875rem;
  color: var(--color-gray-600);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: var(--color-gray-500);
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  color: var(--color-gray-400);
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: 0.5rem;
}

.empty-description {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  max-width: 400px;
}

.contacts-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 50px 2fr 2fr 1.5fr 1fr 1fr 1fr 100px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: var(--color-gray-50);
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  color: var(--color-gray-700);
}

.table-body {
  max-height: 600px;
  overflow-y: auto;
}

.contact-row {
  display: grid;
  grid-template-columns: 50px 2fr 2fr 1.5fr 1fr 1fr 1fr 100px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  transition: var(--transition);
  cursor: pointer;
}

.contact-row:hover {
  background: var(--color-gray-50);
}

.contact-row.selected {
  background: rgba(0, 0, 0, 0.02);
  border-left: 3px solid var(--text-primary);
}

.row-cell {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--text-primary);
  color: var(--background-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-name {
  font-weight: 600;
  color: var(--text-primary);
}

.contact-company {
  font-size: 0.75rem;
  color: var(--color-gray-500);
}

.email-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
}

.email-address {
  color: var(--color-gray-700);
}

.quick-email-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: var(--color-gray-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  color: var(--color-gray-500);
  opacity: 0;
}

.contact-row:hover .quick-email-btn {
  opacity: 1;
}

.quick-email-btn:hover {
  background: var(--text-primary);
  color: var(--background-primary);
  transform: scale(1.1);
}

.status-select {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 0.75rem;
  background: var(--background-primary);
  font-weight: 500;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
  border-color: #fbbf24;
}

.status-completed {
  background: #d1fae5;
  color: #065f46;
  border-color: #10b981;
}

.status-follow-up {
  background: #dbeafe;
  color: #1e40af;
  border-color: #3b82f6;
}

.source-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.source-landing {
  background: #e0e7ff;
  color: #3730a3;
}

.source-facebook {
  background: #dbeafe;
  color: #1e40af;
}

.source-google {
  background: #fef3c7;
  color: #92400e;
}

.source-default {
  background: var(--color-gray-100);
  color: var(--color-gray-600);
}

.date-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.date-value {
  font-weight: 500;
  color: var(--color-gray-700);
  font-size: 0.75rem;
}

.date-time {
  font-size: 0.625rem;
  color: var(--color-gray-500);
}

.actions-menu {
  display: flex;
  gap: 0.25rem;
  opacity: 0;
  transition: var(--transition);
}

.contact-row:hover .actions-menu {
  opacity: 1;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--color-gray-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  color: var(--color-gray-500);
}

.action-btn:hover {
  background: var(--text-primary);
  color: var(--background-primary);
  transform: scale(1.1);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--color-gray-50);
  border-top: 1px solid var(--border-color);
}

.pagination-info {
  font-size: 0.875rem;
  color: var(--color-gray-600);
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  background: var(--background-primary);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition);
  color: var(--color-gray-700);
}

.pagination-btn:hover:not(:disabled) {
  background: var(--color-gray-50);
  border-color: var(--color-gray-300);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn.active {
  background: var(--text-primary);
  color: var(--background-primary);
  border-color: var(--text-primary);
}

/* Modal de composition d'email */
.email-composer-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.recipients-count {
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-gray-600);
}

.close-btn {
  width: 40px;
  height: 40px;
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

.close-btn:hover {
  background: var(--color-gray-200);
  color: var(--color-red-600);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.recipients-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--color-gray-50);
  border-radius: var(--border-radius);
}

.recipients-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-label {
  font-weight: 600;
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.toggle-recipients-btn {
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 0.75rem;
  cursor: pointer;
  text-decoration: underline;
}

.recipients-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
}

.recipient-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--background-primary);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
}

.recipient-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--text-primary);
  color: var(--background-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
}

.recipient-info {
  flex: 1;
}

.recipient-name {
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--text-primary);
}

.recipient-email {
  font-size: 0.75rem;
  color: var(--color-gray-600);
}

.email-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 500;
  color: var(--color-gray-700);
  font-size: 0.875rem;
}

.required {
  color: var(--color-red-500);
}

.form-select,
.form-input {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  transition: var(--transition);
}

.form-select:focus,
.form-input:focus {
  outline: none;
  border-color: var(--text-primary);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.form-textarea {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  resize: vertical;
  min-height: 150px;
  font-family: inherit;
  transition: var(--transition);
}

.form-textarea:focus {
  outline: none;
  border-color: var(--text-primary);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.message-help {
  font-size: 0.75rem;
  color: var(--color-gray-500);
  font-style: italic;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.save-template-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  background: var(--background-primary);
  border-radius: var(--border-radius);
  color: var(--color-gray-700);
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition);
}

.save-template-btn:hover:not(:disabled) {
  background: var(--color-gray-50);
  border-color: var(--color-gray-300);
}

.save-template-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary-actions {
  display: flex;
  gap: 1rem;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--border-color);
  background: var(--background-primary);
  border-radius: var(--border-radius);
  color: var(--color-gray-700);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.cancel-btn:hover {
  background: var(--color-gray-50);
}

.send-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  background: var(--text-primary);
  color: var(--background-primary);
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 0.875rem;
}

.send-btn:hover:not(:disabled) {
  background: var(--color-gray-700);
  transform: translateY(-1px);
}

.send-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinning {
  animation: spin 1s linear infinite;
}

.icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--text-primary);
}

/* Responsive */
@media (max-width: 1200px) {
  .table-header,
  .contact-row {
    grid-template-columns: 50px 2fr 2fr 1fr 1fr 1fr 80px;
  }
  
  .phone-cell {
    display: none;
  }
}

@media (max-width: 900px) {
  .toolbar-content {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .search-filters {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .search-container {
    min-width: unset;
  }
  
  .main-actions {
    justify-content: center;
  }
  
  .table-header,
  .contact-row {
    grid-template-columns: 50px 2fr 2fr 1fr 80px;
  }
  
  .source-cell {
    display: none;
  }
}

@media (max-width: 600px) {
  .modal-content {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }
  
  .recipients-list {
    grid-template-columns: 1fr;
  }
  
  .table-header,
  .contact-row {
    grid-template-columns: 50px 2fr 1fr 60px;
  }
  
  .email-cell,
  .date-cell {
    display: none;
  }
  
  .pagination {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .selection-bar {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .quick-actions {
    width: 100%;
    justify-content: center;
  }
}
</style> 