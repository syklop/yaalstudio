<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Sauvegarder le template</h3>
          <button @click="$emit('close')" class="close-button">
            <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveTemplate" class="modal-form">
          <div class="form-group">
            <label class="form-label">
              Nom du template <span class="required">*</span>
            </label>
            <input
              v-model="templateName"
              type="text"
              required
              placeholder="Ex: Email de bienvenue personnalisé"
              class="form-input"
            >
          </div>

          <div class="form-group">
            <label class="form-label">
              Description (optionnel)
            </label>
            <textarea
              v-model="templateDescription"
              rows="3"
              placeholder="Description du template..."
              class="form-textarea"
            ></textarea>
          </div>

          <div class="preview-section">
            <h4 class="preview-title">Aperçu du template :</h4>
            <div class="preview-content">
              <div class="preview-subject">{{ emailData.subject }}</div>
              <div class="preview-message">{{ emailData.message.substring(0, 100) }}...</div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              @click="$emit('close')"
              class="btn btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              :disabled="!templateName.trim()"
              class="btn btn-primary"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaveTemplateModal',
  props: {
    emailData: {
      type: Object,
      required: true
    }
  },

  emits: ['close', 'save'],

  mounted() {
    // Solution simple et efficace : gérer seulement le scroll
    document.body.style.overflow = 'hidden'
  },

  beforeUnmount() {
    // Restaurer le scroll du body
    document.body.style.overflow = ''
  },

  data() {
    return {
      templateName: '',
      templateDescription: ''
    }
  },

  methods: {
    saveTemplate() {
      if (!this.templateName.trim()) return

      this.$emit('save', {
        name: this.templateName.trim(),
        description: this.templateDescription.trim()
      })
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
  z-index: 9999 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  pointer-events: auto;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 36rem;
  margin: 1.25rem auto;
}

.modal-content {
  background: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  border: 1px solid var(--border-color);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
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

.modal-form {
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
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: var(--transition);
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--color-gray-500);
}

.form-textarea {
  resize: vertical;
  min-height: 4rem;
}

.preview-section {
  background: var(--color-gray-50);
  border-radius: var(--border-radius);
  padding: 0.75rem;
}

.preview-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-700);
  margin: 0 0 0.5rem 0;
}

.preview-content {
  font-size: 0.875rem;
  color: var(--color-gray-600);
}

.preview-subject {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.preview-message {
  color: var(--color-gray-600);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.btn {
  padding: 0.75rem 1rem;
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

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    max-width: calc(100% - 2rem);
  }

  .modal-content {
    padding: 1rem;
  }

  .modal-footer {
    flex-direction: column;
  }
}
</style> 