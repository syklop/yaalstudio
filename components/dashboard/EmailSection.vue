<template>
  <div class="email-section">
    <!-- Sélection des contacts -->
    <div class="contacts-card">
      <h3 class="card-title">Destinataires sélectionnés</h3>
      
      <div v-if="selectedContacts.length === 0" class="empty-state">
        <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
        <p class="empty-text">Aucun contact sélectionné</p>
        <p class="empty-subtext">
          Allez dans l'onglet <strong>Contacts</strong> pour sélectionner des destinataires.
          <br>
          <span class="empty-note">💡 Si vous n'avez aucun contact, vous pouvez créer des contacts de test depuis l'onglet Contacts.</span>
        </p>
      </div>

      <div v-else>
        <div class="contacts-header">
          <span class="contacts-count">
            {{ selectedContacts.length }} contact(s) sélectionné(s)
          </span>
          <button
            @click="clearSelection"
            class="clear-all-btn"
          >
            Tout désélectionner
          </button>
        </div>

        <div class="contacts-list">
          <div class="contacts-container">
            <div
              v-for="contact in selectedContacts"
              :key="contact.id"
              class="contact-item"
            >
              <div class="contact-details">
                <div class="contact-name">{{ contact.firstName }}</div>
                <div class="contact-email">{{ contact.email }}</div>
              </div>
              <button
                @click="removeContact(contact)"
                class="remove-contact-btn"
              >
                <svg class="remove-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Éditeur d'email -->
    <div v-if="selectedContacts.length > 0" class="editor-card">
      <h3 class="card-title">Composer l'email</h3>

      <form @submit.prevent="sendEmail" class="email-form">
        <!-- Templates -->
        <div class="form-group">
          <label class="form-label">
            Template (optionnel)
          </label>
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
          
          <!-- Barre d'outils -->
          <div class="editor-toolbar">
            <div class="toolbar-buttons">
              <button
                type="button"
                @click="formatText('bold')"
                class="toolbar-btn"
                title="Gras"
              >
                <svg class="toolbar-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
                </svg>
              </button>
              
              <button
                type="button"
                @click="formatText('italic')"
                class="toolbar-btn"
                title="Italique"
              >
                <svg class="toolbar-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"/>
                </svg>
              </button>

              <div class="toolbar-separator"></div>

              <button
                type="button"
                @click="insertPersonalization('firstName')"
                class="personalization-btn blue"
                title="Insérer le prénom"
              >
                {{prénom}}
              </button>
              
              <button
                type="button"
                @click="insertPersonalization('email')"
                class="personalization-btn green"
                title="Insérer l'email"
              >
                {{email}}
              </button>
            </div>
          </div>

          <textarea
            ref="messageTextarea"
            v-model="emailData.message"
            required
            rows="10"
            placeholder="Tapez votre message ici... Utilisez {{prénom}} et {{email}} pour personnaliser"
            class="form-textarea"
          ></textarea>
        </div>

        <!-- Aperçu personnalisé -->
        <div v-if="emailData.message && selectedContacts.length > 0" class="preview-card">
          <h4 class="preview-title">
            Aperçu pour {{ selectedContacts[0].firstName }}:
          </h4>
          <div class="preview-content">
            <div class="preview-subject">{{ emailData.subject }}</div>
            <div class="preview-message">{{ getPersonalizedMessage(selectedContacts[0]) }}</div>
          </div>
        </div>

        <!-- Actions -->
        <div class="form-actions">
          <div class="recipients-info">
            {{ selectedContacts.length }} destinataire(s)
          </div>
          
          <div class="action-buttons">
            <button
              type="button"
              @click="saveTemplate"
              class="btn btn-secondary"
            >
              Sauvegarder comme template
            </button>
            
            <button
              type="submit"
              :disabled="sending || !emailData.subject || !emailData.message"
              class="btn btn-primary"
            >
              <span v-if="sending" class="sending-content">
                <svg class="spinner" fill="none" viewBox="0 0 24 24">
                  <circle class="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </span>
              <span v-else>Envoyer à {{ selectedContacts.length }} contact(s)</span>
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Modal save template -->
    <SaveTemplateModal
      v-if="showSaveTemplate"
      :email-data="emailData"
      @close="showSaveTemplate = false"
      @save="handleSaveTemplate"
    />
  </div>
</template>

<script>
import SaveTemplateModal from './SaveTemplateModal.vue'

export default {
  name: 'EmailSection',
  components: {
    SaveTemplateModal
  },

  props: {
    selectedContacts: {
      type: Array,
      default: () => []
    }
  },

  emits: ['send-email'],

  data() {
    return {
      emailData: {
        subject: '',
        message: ''
      },
      selectedTemplate: '',
      sending: false,
      showSaveTemplate: false,
      emailTemplates: [
        {
          id: 'welcome',
          name: 'Email de bienvenue',
          subject: 'Bienvenue chez YaalStudio !',
          message: `Bonjour {{prénom}},

Merci de votre intérêt pour YaalStudio !

Nous avons bien reçu votre demande et nous vous recontacterons rapidement.

En attendant, n'hésitez pas à consulter nos ressources gratuites sur notre site.

Cordialement,
L'équipe YaalStudio`
        },
        {
          id: 'followup',
          name: 'Email de relance',
          subject: 'Votre projet avec YaalStudio',
          message: `Bonjour {{prénom}},

J'espère que vous allez bien.

Je me permets de revenir vers vous concernant votre projet évoqué récemment.

Avez-vous eu l'occasion de réfléchir à nos services ?

N'hésitez pas à me contacter pour discuter de vos besoins.

Cordialement,
L'équipe YaalStudio`
        }
      ]
    }
  },

  methods: {
    clearSelection() {
      this.$emit('clear-selection')
    },

    removeContact(contact) {
      this.$emit('remove-contact', contact)
    },

    applyTemplate() {
      if (!this.selectedTemplate) return
      
      const template = this.emailTemplates.find(t => t.id === this.selectedTemplate)
      if (template) {
        this.emailData.subject = template.subject
        this.emailData.message = template.message
      }
    },

    formatText(command) {
      const textarea = this.$refs.messageTextarea
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = textarea.value.substring(start, end)

      let formattedText = selectedText
      if (command === 'bold') {
        formattedText = `**${selectedText}**`
      } else if (command === 'italic') {
        formattedText = `*${selectedText}*`
      }

      const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end)
      this.emailData.message = newValue

      this.$nextTick(() => {
        textarea.focus()
        textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
      })
    },

    insertPersonalization(type) {
      const textarea = this.$refs.messageTextarea
      if (!textarea) return

      const cursorPosition = textarea.selectionStart
      const placeholder = type === 'firstName' ? '{{prénom}}' : '{{email}}'
      
      const newValue = textarea.value.substring(0, cursorPosition) + placeholder + textarea.value.substring(cursorPosition)
      this.emailData.message = newValue

      this.$nextTick(() => {
        textarea.focus()
        textarea.setSelectionRange(cursorPosition + placeholder.length, cursorPosition + placeholder.length)
      })
    },

    getPersonalizedMessage(contact) {
      return this.emailData.message
        .replace(/{{prénom}}/g, contact.firstName)
        .replace(/{{email}}/g, contact.email)
    },

    saveTemplate() {
      if (!this.emailData.subject || !this.emailData.message) {
        alert('Veuillez remplir le sujet et le message avant de sauvegarder')
        return
      }
      this.showSaveTemplate = true
    },

    handleSaveTemplate(templateData) {
      this.emailTemplates.push({
        id: `custom_${Date.now()}`,
        name: templateData.name,
        subject: this.emailData.subject,
        message: this.emailData.message
      })
      this.showSaveTemplate = false
    },

    async sendEmail() {
      if (!this.emailData.subject || !this.emailData.message || this.selectedContacts.length === 0) {
        return
      }

      this.sending = true

      try {
        const emailPayload = {
          subject: this.emailData.subject,
          message: this.emailData.message,
          recipients: this.selectedContacts.map(contact => ({
            id: contact.id,
            email: contact.email,
            firstName: contact.firstName,
            personalizedMessage: this.getPersonalizedMessage(contact)
          }))
        }

        this.$emit('send-email', emailPayload)

        this.emailData = { subject: '', message: '' }
        this.selectedTemplate = ''
        
      } catch (error) {
        console.error('❌ Erreur envoi email:', error)
        alert('Erreur lors de l\'envoi des emails')
      } finally {
        this.sending = false
      }
    }
  }
}
</script>

<style scoped>
.email-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

/* Cards */
.contacts-card, .editor-card {
  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  transition: var(--transition);
  width: 100%;
}

.contacts-card:hover, .editor-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  letter-spacing: 0.025em;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 3rem 2rem;
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

.empty-text {
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  word-wrap: break-word;
  hyphens: auto;
}

.empty-subtext {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  margin: 0;
  word-wrap: break-word;
  hyphens: auto;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.empty-note {
  font-size: 0.75rem;
  color: var(--color-gray-500);
  margin-top: 0.5rem;
  display: block;
}

/* Contacts */
.contacts-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.contacts-count {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  font-weight: 600;
}

.clear-all-btn {
  background: none;
  border: none;
  font-size: 0.875rem;
  color: #dc2626;
  cursor: pointer;
  transition: var(--transition);
  font-weight: 500;
}

.clear-all-btn:hover {
  color: #b91c1c;
}

.contacts-list {
  max-height: 12rem;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.contacts-container {
  display: flex;
  flex-direction: column;
}

.contact-item {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  transition: var(--transition);
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-item:hover {
  background: var(--color-gray-50);
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.contact-email {
  font-size: 0.875rem;
  color: var(--color-gray-500);
}

.remove-contact-btn {
  background: none;
  border: none;
  color: var(--color-gray-400);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: var(--transition);
}

.remove-contact-btn:hover {
  color: #dc2626;
  background: #fef2f2;
}

.remove-icon {
  width: 1rem;
  height: 1rem;
}

/* Form */
.email-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: 0.5rem;
}

.required {
  color: #dc2626;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: var(--transition);
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.form-input::placeholder {
  color: var(--color-gray-500);
}

/* Editor toolbar */
.editor-toolbar {
  border: 1px solid var(--border-color);
  border-bottom: none;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  background: var(--color-gray-50);
  padding: 0.75rem;
}

.toolbar-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toolbar-btn {
  background: none;
  border: none;
  padding: 0.25rem;
  color: var(--color-gray-600);
  cursor: pointer;
  border-radius: 0.25rem;
  transition: var(--transition);
}

.toolbar-btn:hover {
  color: var(--color-gray-800);
  background: var(--color-gray-200);
}

.toolbar-icon {
  width: 1rem;
  height: 1rem;
}

.toolbar-separator {
  width: 1px;
  height: 1rem;
  background: var(--color-gray-300);
}

.personalization-btn {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.personalization-btn.blue {
  background: #dbeafe;
  color: #1d4ed8;
}

.personalization-btn.blue:hover {
  background: #bfdbfe;
}

.personalization-btn.green {
  background: #d1fae5;
  color: #059669;
}

.personalization-btn.green:hover {
  background: #a7f3d0;
}

.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-top: none;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  resize: none;
  font-family: inherit;
  line-height: 1.6;
  transition: var(--transition);
  min-height: 200px;
}

.form-textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.form-textarea::placeholder {
  color: var(--color-gray-500);
}

/* Preview */
.preview-card {
  background: var(--color-gray-50);
  border-radius: var(--border-radius);
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.preview-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-700);
  margin: 0 0 0.5rem 0;
}

.preview-content {
  background: var(--background-primary);
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid var(--border-color);
}

.preview-subject {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.preview-message {
  white-space: pre-wrap;
  font-size: 0.875rem;
  color: var(--text-primary);
  line-height: 1.5;
}

/* Form actions */
.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  flex-wrap: wrap;
  gap: 1rem;
}

.recipients-info {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
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

.btn-primary:hover:not(:disabled) {
  background: var(--color-gray-700);
  transform: translateY(-2px);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sending-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  width: 1rem;
  height: 1rem;
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

/* Responsive */
@media (max-width: 768px) {
  .contacts-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }

  .form-actions {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .action-buttons {
    flex-direction: column;
  }

  .toolbar-buttons {
    flex-wrap: wrap;
  }

  .empty-state {
    padding: 2rem 1rem;
    max-width: none;
  }

  .empty-text {
    font-size: 1.125rem;
  }

  .empty-subtext {
    max-width: none;
  }
}

@media (max-width: 480px) {
  .empty-state {
    padding: 1.5rem 0.75rem;
  }

  .empty-text {
    font-size: 1rem;
  }

  .empty-subtext {
    font-size: 0.8rem;
  }
}
</style> 