<template>
  <div class="login-page">
    <!-- Fond décoratif -->
    <div class="decorative-bg">
      <div class="floating-dot dot-1"></div>
      <div class="floating-dot dot-2"></div>
      <div class="floating-dot dot-3"></div>
      <div class="floating-dot dot-4"></div>
      <div class="geometric-line line-1"></div>
      <div class="geometric-line line-2"></div>
    </div>

    <div class="login-container">
      <div class="login-card">
        <!-- Header -->
        <div class="login-header">
          <h1 class="login-title">
            <span class="title-main">YaalStudio</span>
            <span class="title-sub">Administration</span>
          </h1>
          <p class="login-subtitle">
            Connectez-vous pour accéder au dashboard
          </p>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="form-input"
              placeholder="admin@yaalstudio.com"
              required
              :disabled="loading"
              autocomplete="email"
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Mot de passe</label>
            <div class="password-input-wrapper">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="••••••••••"
                required
                :disabled="loading"
                autocomplete="current-password"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
                :disabled="loading"
              >
                <span v-if="showPassword">👁️</span>
                <span v-else>🙈</span>
              </button>
            </div>
          </div>

          <!-- Message d'erreur -->
          <div v-if="errorMessage" class="error-message">
            <span class="error-icon">⚠️</span>
            {{ errorMessage }}
          </div>

          <!-- Bouton de connexion -->
          <button
            type="submit"
            class="login-button"
            :disabled="loading || !isFormValid"
          >
            <span v-if="loading" class="loading-content">
              <span class="loading-spinner"></span>
              Connexion...
            </span>
            <span v-else class="button-content">
              <span class="button-text">Se connecter</span>
              <span class="button-arrow">→</span>
            </span>
          </button>
        </form>

        <!-- Footer -->
        <div class="login-footer">
          <p class="footer-text">
            Accès réservé aux administrateurs YaalStudio
          </p>
          <button 
            type="button" 
            class="back-link" 
            @click="$router.push('/')"
          >
            ← Retour au site
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: false, // Pas de layout pour la page de login
  
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      showPassword: false,
      loading: false,
      errorMessage: ''
    }
  },

  computed: {
    isFormValid() {
      return this.form.email && this.form.password && this.form.email.includes('@')
    }
  },

  mounted() {
    // Vérifier si l'utilisateur est déjà connecté
    const authStore = useAuthStore()
    if (authStore.isLoggedIn) {
      this.$router.push('/dashboard')
    }

    // Pré-remplir l'email si fourni en query param
    if (this.$route.query.email) {
      this.form.email = this.$route.query.email
    }

    // Effacer les erreurs après 5 secondes
    this.watchError()
  },

  methods: {
    async handleLogin() {
      this.loading = true
      this.errorMessage = ''

      try {
        const authStore = useAuthStore()
        
        console.log('🔐 Tentative de connexion admin...')
        
        const result = await authStore.login({
          email: this.form.email,
          password: this.form.password
        })

        if (result.success) {
          console.log('✅ Connexion réussie, redirection...')
          
          // Redirection vers la page demandée ou le dashboard
          const redirectTo = this.$route.query.redirect || '/dashboard'
          await this.$router.push(redirectTo)
        } else {
          this.errorMessage = result.error || 'Erreur de connexion'
        }

      } catch (error) {
        console.error('❌ Erreur login:', error)
        this.errorMessage = 'Identifiants incorrects ou erreur de connexion'
      } finally {
        this.loading = false
      }
    },

    watchError() {
      this.$watch('errorMessage', (newVal) => {
        if (newVal) {
          setTimeout(() => {
            this.errorMessage = ''
          }, 5000)
        }
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.login-page {
  min-height: 100vh;
  background: var(--background-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

/* Fond décoratif */
.decorative-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--text-primary);
  border-radius: 50%;
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

.dot-1 { top: 20%; left: 10%; animation-delay: 0s; }
.dot-2 { top: 60%; right: 15%; animation-delay: 2s; }
.dot-3 { bottom: 30%; left: 20%; animation-delay: 4s; }
.dot-4 { top: 15%; right: 25%; animation-delay: 1s; }

.geometric-line {
  position: absolute;
  background: var(--text-primary);
  opacity: 0.2;
  transform-origin: center;
}

.line-1 {
  width: 100px;
  height: 1px;
  top: 40%;
  right: 10%;
  transform: rotate(45deg);
  animation: pulse 4s ease-in-out infinite;
}

.line-2 {
  width: 60px;
  height: 1px;
  bottom: 40%;
  left: 5%;
  transform: rotate(-30deg);
  animation: pulse 4s ease-in-out infinite 2s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
  50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
}

@keyframes pulse {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.1); }
}

/* Container principal */
.login-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 420px;
}

.login-card {
  background: var(--background-primary);
  border: 1px solid var(--border-color);
  border-radius: 0;
  padding: 3rem 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

/* Header */
.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.login-title {
  margin-bottom: 1rem;
}

.title-main {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.title-sub {
  display: block;
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-secondary);
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.login-subtitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin: 0;
}

/* Formulaire */
.login-form {
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
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input {
  width: 100%;
  padding: 1rem 0;
  border: none;
  border-bottom: 2px solid var(--border-color);
  background: transparent;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-bottom-color: var(--text-primary);
}

.form-input::placeholder {
  color: var(--text-light);
}

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Input mot de passe */
.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-toggle {
  position: absolute;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: var(--text-primary);
}

.password-toggle:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Message d'erreur */
.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #dc2626;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.error-icon {
  font-size: 1.1rem;
}

/* Bouton de connexion */
.login-button {
  background: var(--text-primary);
  color: var(--background-primary);
  border: none;
  padding: 1.25rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
}

.login-button:hover:not(:disabled) {
  background: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.button-content,
.loading-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.button-arrow {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.login-button:hover .button-arrow {
  transform: translateX(4px);
}

/* Animation de chargement */
.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Footer */
.login-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.footer-text {
  font-size: 0.8rem;
  color: var(--text-light);
  margin-bottom: 1rem;
}

.back-link {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s ease;
  text-decoration: underline;
}

.back-link:hover {
  color: var(--text-primary);
}

/* Responsive */
@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
  }
  
  .title-main {
    font-size: 1.6rem;
  }
  
  .form-input {
    padding: 0.8rem 0;
  }
  
  .login-button {
    padding: 1rem 1.5rem;
  }
}

@media (max-height: 600px) {
  .login-card {
    padding: 2rem;
  }
  
  .login-header {
    margin-bottom: 1.5rem;
  }
  
  .login-form {
    gap: 1rem;
  }
}
</style> 