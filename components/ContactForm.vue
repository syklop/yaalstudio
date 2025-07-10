<template>
  <div class="contact-form-container">
    <div class="form-wrapper">
      <!-- Éléments décoratifs subtils -->
      <div class="form-decorations">
        <div class="decoration-dot dot-1"></div>
        <div class="decoration-dot dot-2"></div>
        <div class="decoration-line"></div>
      </div>

      <div class="form-header fade-in-up">
        <h2 class="form-title">
          Aucun spam. Juste de la <span class="text-highlight script-font">clarté</span>, 
          des ressources et de vraies stratégies.
        </h2>
      </div>

      <form @submit.prevent="handleSubmit" class="form-content">
        <div class="input-group fade-in-up delay-1">
          <label class="input-label">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="form-input"
            placeholder="votre@email.com"
            required
            :disabled="isLoading"
          />
          <div class="input-decoration"></div>
        </div>

        <div class="input-group fade-in-up delay-2">
          <PhoneInput
            v-model="form.phone"
            label="WhatsApp"
            placeholder="+33 6 00 00 00 00"
            :disabled="isLoading"
            :error="errors.phone"
            @country-changed="handleCountryChange"
          />
        </div>

        <div class="input-group fade-in-up delay-3">
          <label class="input-label">Prénom</label>
          <input
            v-model="form.firstName"
            type="text"
            class="form-input"
            placeholder="Marie"
            required
            :disabled="isLoading"
          />
          <div class="input-decoration"></div>
        </div>

        <div class="form-submit fade-in-up delay-4">
          <button
            type="submit"
            class="submit-button"
            :disabled="isLoading"
          >
            <span v-if="!isLoading" class="btn-content">
              <span class="btn-text">OUI, JE VEUX RECEVOIR LE GUIDE</span>
              <span class="btn-arrow">→</span>
            </span>
            <span v-else class="loading-content">
              <span class="loading-spinner"></span>
              Inscription en cours...
            </span>
          </button>
        </div>

        <p class="privacy-text fade-in-up delay-4">
          Pas de spam. <span class="script-font">Désinscription</span> à tout moment.
        </p>
      </form>

      <!-- Notification de succès -->
      <div v-if="showSuccess" class="notification success-notification fade-in-up">
        <div class="notification-icon success-icon">✓</div>
        <p>Parfait ! Vous recevrez bientôt votre guide par email.</p>
      </div>

      <!-- Notification d'erreur -->
      <div v-if="errorMessage" class="notification error-notification fade-in-up">
        <div class="notification-icon error-icon">✗</div>
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PhoneInput from './PhoneInput.vue'
export default {
  name: 'ContactForm',
  components: {
    PhoneInput
  },
  data() {
    return {
      form: {
        firstName: '',
        email: '',
        phone: ''
      },
      errors: {
        firstName: '',
        email: '',
        phone: ''
      },
      isLoading: false,
      showSuccess: false,
      errorMessage: ''
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true
      this.errorMessage = ''
      this.showSuccess = false
      this.clearErrors()

      try {
        if (!this.validateForm()) {
          return
        }

        console.log('Envoi du formulaire:', this.form)

        const response = await $fetch('/api/contacts/add', {
          method: 'POST',
          body: {
            firstName: this.form.firstName,
            email: this.form.email,
            phone: this.form.phone,
            source: 'Landing Page',
            countryCode: this.form.countryCode,
            dialCode: this.form.dialCode,
            timestamp: new Date().toISOString()
          }
        })

        if (response.success) {
          this.showSuccess = true
          this.resetForm()
          
          // Redirection vers la page de remerciement après 2 secondes
          setTimeout(() => {
            this.$router.push('/merci')
          }, 2000)
        } else {
          throw new Error(response.message || 'Erreur lors de l\'inscription')
        }

      } catch (error) {
        console.error('Erreur inscription:', error)
        this.errorMessage = error.message || 'Une erreur est survenue. Veuillez réessayer.'
      } finally {
        this.isLoading = false
      }
    },

    validateForm() {
      let isValid = true
      this.clearErrors()

      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.form.email)) {
        this.errors.email = 'Veuillez entrer une adresse email valide'
        this.errorMessage = 'Veuillez entrer une adresse email valide'
        isValid = false
      }
      // Validation téléphone (plus flexible pour les numéros internationaux)
      const phoneRegex = /^[+]?[1-9][\d\s\-()]{7,15}$/
      if (!phoneRegex.test(this.form.phone.replace(/\s/g, ''))) {
        this.errors.phone = 'Veuillez entrer un numéro de téléphone valide'
        this.errorMessage = 'Veuillez entrer un numéro de téléphone valide'
        isValid = false
      }

      // Validation prénom
      if (this.form.firstName.trim().length < 2) {
        this.errors.firstName = 'Le prénom doit contenir au moins 2 caractères'
        this.errorMessage = 'Le prénom doit contenir au moins 2 caractères'
        isValid = false
      }

      return isValid
    },

    clearErrors() {
      this.errors = {
        firstName: '',
        email: '',
        phone: ''
      }
    },

    resetForm() {
      this.form = {
        firstName: '',
        email: '',
        phone: '',
        countryCode: 'FR',
        dialCode: '+33'
      }
      this.clearErrors()
    },

    handleCountryChange(country) {
      console.log('Pays sélectionné:', country.name, country.dialCode)
      this.form.countryCode = country.iso2
      this.form.dialCode = country.dialCode
      
      // Effacer l'erreur de téléphone si elle existe
      if (this.errors.phone) {
        this.errors.phone = ''
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');


.form-wrapper {
  background: var(--background-primary);
  color: var(--text-primary);
  padding: 3rem;
  border-radius: 0;
  border: none;
  box-shadow: none;
  position: relative;
  overflow: visible;
}

/* Éléments décoratifs subtils */
.form-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.decoration-dot {
  position: absolute;
  width: 3px;
  height: 3px;
  background: var(--text-primary);
  border-radius: 50%;
  animation: pulse 3s ease-in-out infinite;
}

.dot-1 {
  top: 15%;
  right: 10%;
  animation-delay: 0s;
}

.dot-2 {
  bottom: 20%;
  left: 5%;
  animation-delay: 1.5s;
}

.decoration-line {
  position: absolute;
  bottom: 10%;
  right: 15%;
  width: 40px;
  height: 1px;
  background: var(--border-color);
  transform: rotate(30deg);
  animation: fadeInOut 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

.form-header {
  text-align: left;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 1rem;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.text-highlight {
  color: var(--text-primary);
  font-weight: 900;
}

.script-font {
  font-family: 'Dancing Script', cursive;
  font-weight: 600;
  font-style: italic;
  font-size: 1.7rem;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.input-group {
  position: relative;
  z-index: 1;
}

.input-group:has(phone-input), 
.input-group:focus-within {
  z-index: 9999;
}

.input-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
}

.form-input {
  width: 100%;
  padding: 1.25rem 0;
  border: none;
  border-bottom: 2px solid var(--border-color);
  background: transparent;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.form-input::placeholder {
  color: var(--text-light);
  font-weight: 400;
  transition: all 0.3s ease;
}

.form-input:focus {
  border-bottom-color: var(--text-primary);
  transform: translateY(-2px);
}

.form-input:focus::placeholder {
  color: var(--text-secondary);
  transform: translateX(5px);
}

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.input-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--text-primary);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-input:focus + .input-decoration {
  width: 100%;
}

.form-submit {
  margin-top: 1rem;
}

.submit-button {
  width: 100%;
  padding: 1.5rem 2rem;
  background: var(--text-primary);
  color: var(--background-primary);
  border: none;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  min-height: 3rem;
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.submit-button:hover::before {
  left: 100%;
}

.submit-button:hover:not(:disabled) {
  background: var(--accent-color);
  color: var(--background-primary);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.submit-button:active {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.btn-arrow {
  font-size: 1.2rem;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.submit-button:hover .btn-arrow {
  transform: translateX(6px);
}

.loading-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid var(--background-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.contact-form-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 1rem;
}

.form-wrapper {
  background: var(--background-primary);
  color: var(--text-primary);
  padding: 3rem;
  border-radius: 0;
  border: none;
  box-shadow: none;
  position: relative;
  overflow: visible;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.privacy-text {
  text-align: center;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 2rem;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.privacy-text .script-font {
  font-size: 0.9rem;
  color: var(--text-primary);
}

.notification {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  margin-top: 2rem;
  font-weight: 500;
  font-size: 0.9rem;
  border-radius: 0;
  position: relative;
  overflow: hidden;
}

.notification::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: slideIn 0.6s ease-out;
}

@keyframes slideIn {
  to { left: 100%; }
}

.success-notification {
  background: linear-gradient(135deg, var(--background-secondary) 0%, var(--color-gray-100) 100%);
  border: 1px solid var(--text-primary);
  color: var(--text-primary);
}

.error-notification {
  background: linear-gradient(135deg, var(--background-secondary) 0%, var(--color-gray-100) 100%);
  border: 1px solid var(--text-primary);
  color: var(--text-primary);
}

.notification-icon {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 700;
  flex-shrink: 0;
  font-size: 1rem;
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounceIn {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.success-icon {
  background: var(--text-primary);
  color: var(--background-primary);
}

.error-icon {
  background: var(--text-primary);
  color: var(--background-primary);
}

/* Responsive Design Optimisé */

/* Large tablets et petits laptops */
@media (max-width: 1024px) {
  .contact-form-container {
    max-width: 450px;
  }
  
  .form-wrapper {
    padding: 2.5rem;
  }
  
  .form-title {
    font-size: 1.4rem;
    line-height: 1.35;
  }
  
  .script-font {
    font-size: 1.6rem;
  }
}

/* Tablettes */
@media (max-width: 768px) {
  .contact-form-container {
    max-width: 100%;
    padding: 0 1rem;
  }
  
  .form-wrapper {
    padding: 2rem 1.5rem;
  }
  
  .form-header {
    margin-bottom: 2.5rem;
    text-align: center;
  }
  
  .form-title {
    font-size: 1.3rem;
    line-height: 1.4;
  }
  
  .script-font {
    font-size: 1.5rem;
  }
  
  .form-content {
    gap: 1.75rem;
  }
  
  .form-input {
    padding: 1rem 0;
    font-size: 1rem;
  }
  
  .submit-button {
    font-size: 0.9rem;
    padding: 1.25rem 1.5rem;
  }
  
  .input-label {
    font-size: 0.85rem;
    margin-bottom: 0.4rem;
  }
}

/* Mobiles larges */
@media (max-width: 480px) {
  .contact-form-container {
    padding: 0 0.75rem;
  }
  
  .form-wrapper {
    padding: 1.5rem 1rem;
  }
  
  .form-header {
    margin-bottom: 2rem;
  }
  
  .form-title {
    font-size: 1.2rem;
    line-height: 1.45;
  }
  
  .script-font {
    font-size: 1.4rem;
  }
  
  .privacy-text .script-font {
    font-size: 0.9rem;
  }
  
  .form-content {
    gap: 1.5rem;
  }
  
  .form-input {
    padding: 0.9rem 0;
    font-size: 0.95rem;
  }
  
  .submit-button {
    font-size: 0.85rem;
    padding: 1.1rem 1.25rem;
    letter-spacing: 0.05em;
  }
  
  .input-label {
    font-size: 0.8rem;
    margin-bottom: 0.35rem;
  }
  
  .privacy-text {
    font-size: 0.75rem;
    margin-top: 1.5rem;
    line-height: 1.5;
  }
  
  .notification {
    padding: 1.25rem 1rem;
    font-size: 0.85rem;
  }
  
  .notification-icon {
    width: 1.25rem;
    height: 1.25rem;
    font-size: 0.9rem;
  }
}

/* Très petits mobiles */
@media (max-width: 375px) {
  .contact-form-container {
    padding: 0 0.5rem;
  }
  
  .form-wrapper {
    padding: 1.25rem 0.75rem;
  }
  
  .form-title {
    font-size: 1.1rem;
    line-height: 1.5;
  }
  
  .script-font {
    font-size: 1.3rem;
  }
  
  .form-input {
    padding: 0.8rem 0;
    font-size: 0.9rem;
  }
  
  .submit-button {
    font-size: 0.8rem;
    padding: 1rem 1rem;
  }
  
  .btn-content {
    gap: 0.75rem;
  }
  
  .input-label {
    font-size: 0.75rem;
  }
  
  .form-content {
    gap: 1.25rem;
  }
}

/* Mode paysage mobile */
@media (max-height: 500px) and (orientation: landscape) and (max-width: 767px) {
  .form-wrapper {
    padding: 1rem;
  }
  
  .form-header {
    margin-bottom: 1.5rem;
  }
  
  .form-title {
    font-size: 1rem;
    line-height: 1.3;
  }
  
  .script-font {
    font-size: 1.2rem;
  }
  
  .form-content {
    gap: 1rem;
  }
  
  .form-input {
    padding: 0.7rem 0;
  }
  
  .submit-button {
    padding: 0.9rem 1rem;
    font-size: 0.8rem;
  }
  
  .privacy-text {
    font-size: 0.7rem;
    margin-top: 1rem;
  }
}

/* Animations améliorées */
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.fade-in-up.delay-1 { animation-delay: 0.2s; }
.fade-in-up.delay-2 { animation-delay: 0.4s; }
.fade-in-up.delay-3 { animation-delay: 0.6s; }
.fade-in-up.delay-4 { animation-delay: 0.8s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 