<template>
  <div class="thank-you-page">
    <!-- Éléments décoratifs de fond -->
    <div class="page-decorations">
      <div class="floating-element element-1"></div>
      <div class="floating-element element-2"></div>
      <div class="floating-element element-3"></div>
      <div class="geometric-pattern"></div>
    </div>

    <div class="container">
      <div class="thank-you-content">
        <!-- Brand -->
        <div class="brand fade-in-up">
          <h1 class="brand-name">YAALSTUDIO</h1>
          <p class="brand-tagline script-font">Maison de stratégie</p>
        </div>

        <!-- Main Thank You Section -->
        <div class="main-content">
          <div class="success-icon fade-in-up delay-1">
            <div class="checkmark">✓</div>
            <div class="success-ripple"></div>
          </div>

          <h2 class="thank-you-title fade-in-up delay-2">
            <span class="title-highlight script-font">Félicitations !</span><br/>
            Vous faites partie des premières
          </h2>

          <div class="thank-you-description fade-in-up delay-3">
            <p class="thank-intro">
              Merci <strong>{{ firstName || 'pour votre inscription' }}</strong> ! 
              Votre inscription a été confirmée avec succès.
            </p>
            
            <p class="thank-details">
              Vous allez recevoir dans les prochaines minutes un email contenant 
              <strong>votre guide stratégique gratuit</strong> :
            </p>

            <div class="gift-highlight">
              <div class="gift-decoration"></div>
              <h3>"Les 3 erreurs qui empêchent de <span class="script-font">structurer</span> son projet"</h3>
            </div>

            <div class="gift-list">
              <div class="gift-item">
                <span class="gift-number">01</span>
                <div class="gift-content">
                  <h4>Guide PDF complet</h4>
                  <p>Stratégies concrètes et méthodes éprouvées</p>
                </div>
                <div class="gift-arrow">→</div>
              </div>
              <div class="gift-item">
                <span class="gift-number">02</span>
                <div class="gift-content">
                  <h4>Templates exclusifs</h4>
                  <p>Outils pratiques pour structurer votre projet</p>
                </div>
                <div class="gift-arrow">→</div>
              </div>
              <div class="gift-item">
                <span class="gift-number">03</span>
                <div class="gift-content">
                  <h4>Accès prioritaire</h4>
                  <p>Aux futurs contenus et ressources YaalStudio</p>
                </div>
                <div class="gift-arrow">→</div>
              </div>
            </div>
          </div>

          <!-- Next Steps -->
          <div class="next-steps fade-in-up delay-4">
            <h3 class="steps-title">Et <span class="script-font">maintenant</span> ?</h3>
            <div class="steps-grid">
              <div class="step-card">
                <div class="step-decoration"></div>
                <div class="step-number">1</div>
                <h4>Vérifiez votre email</h4>
                <p>Votre guide vous attend dans votre boîte de réception</p>
              </div>
              <div class="step-card">
                <div class="step-decoration"></div>
                <div class="step-number">2</div>
                <h4>Explorez le contenu</h4>
                <p>Découvrez vos outils stratégiques exclusifs</p>
              </div>
              <div class="step-card">
                <div class="step-decoration"></div>
                <div class="step-number">3</div>
                <h4>Restez connectée</h4>
                <p>Suivez-nous pour le lancement officiel</p>
              </div>
            </div>
          </div>

          <!-- Back to Home -->
          <div class="back-home fade-in-up delay-5">
            <button @click="goHome" class="btn-home">
              <span>← Retour à l'accueil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThankYouPage',
  data() {
    return {
      firstName: ''
    }
  },
  head() {
    return {
      title: 'Merci ! Bienvenue chez YaalStudio',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Merci pour votre inscription ! Découvrez vos ressources stratégiques exclusives et restez connectée pour le lancement de YaalStudio.'
        },
        {
          name: 'robots',
          content: 'noindex, nofollow'
        }
      ]
    }
  },
  mounted() {
    this.firstName = this.$route.query.name || localStorage.getItem('yaal_user_name') || ''
    this.initAnimations()
    
    if (localStorage.getItem('yaal_user_name')) {
      localStorage.removeItem('yaal_user_name')
    }
  },
  methods: {
    initAnimations() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate')
            }
          })
        },
        { threshold: 0.1 }
      )

      const elements = document.querySelectorAll('.fade-in-up')
      elements.forEach(el => observer.observe(el))
    },
    
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');

.thank-you-page {
  min-height: 100vh;
  background: var(--background-primary);
  color: var(--text-primary);
  position: relative;
  display: flex;
  align-items: center;
  padding: 4rem 0;
  overflow: hidden;
}

/* Éléments décoratifs de fond */
.page-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  animation: floatElement 10s ease-in-out infinite;
}

.element-1 {
  width: 120px;
  height: 120px;
  top: 15%;
  right: 10%;
  animation-delay: 0s;
}

.element-2 {
  width: 80px;
  height: 80px;
  bottom: 25%;
  left: 8%;
  animation-delay: 3s;
}

.element-3 {
  width: 60px;
  height: 60px;
  top: 50%;
  left: 15%;
  animation-delay: 6s;
}

.geometric-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.03) 0%, transparent 50%);
  animation: patternMove 15s linear infinite;
}

@keyframes floatElement {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
  50% { transform: translateY(-30px) rotate(180deg); opacity: 0.8; }
}

@keyframes patternMove {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.thank-you-content {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}

.brand {
  margin-bottom: 3rem;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: var(--text-primary);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.brand-tagline {
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 400;
}

.script-font {
  font-family: 'Dancing Script', cursive;
  font-weight: 600;
  font-style: italic;
  color: var(--text-primary);
}

.brand-tagline.script-font {
  font-size: 1.2rem;
}

.main-content {
  background: var(--background-primary);
  color: var(--text-primary);
  padding: 0;
  border-radius: 0;
  border: none;
  box-shadow: none;
}

.success-icon {
  margin-bottom: 2.5rem;
  position: relative;
  display: inline-block;
}

.checkmark {
  width: 80px;
  height: 80px;
  background: var(--text-primary);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--background-primary);
  margin: 0 auto;
  position: relative;
  z-index: 2;
  animation: checkmarkPulse 2s ease-in-out infinite;
}

.success-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  border: 2px solid var(--text-primary);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ripple 2s ease-out infinite;
}

@keyframes checkmarkPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes ripple {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
}

.thank-you-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 2.5rem;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.title-highlight {
  font-weight: 900;
}

.title-highlight.script-font {
  font-size: 3.5rem;
}

.thank-you-description {
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.thank-intro {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.thank-details {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.gift-highlight {
  background: linear-gradient(135deg, var(--background-secondary) 0%, var(--color-gray-100) 100%);
  padding: 2rem;
  margin-bottom: 3rem;
  border-left: 4px solid var(--text-primary);
  position: relative;
  overflow: hidden;
}

.gift-decoration {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.gift-highlight h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.gift-highlight .script-font {
  font-size: 1.4rem;
}

.gift-list {
  display: grid;
  gap: 2rem;
  margin: 3rem 0;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.gift-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--background-primary) 0%, var(--background-secondary) 100%);
  border-radius: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.gift-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
  transition: left 0.6s ease;
}

.gift-item:hover::before {
  left: 100%;
}

.gift-item:hover {
  transform: translateX(8px);
  background: linear-gradient(135deg, var(--background-secondary) 0%, var(--color-gray-200) 100%);
}

.gift-number {
  width: 40px;
  height: 40px;
  background: var(--text-primary);
  color: var(--background-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.gift-item:hover .gift-number {
  background: var(--accent-color);
  color: var(--background-primary);
  transform: scale(1.1);
}

.gift-content {
  flex: 1;
}

.gift-content h4 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.gift-content p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 400;
  line-height: 1.4;
}

.gift-arrow {
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 700;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.gift-item:hover .gift-arrow {
  opacity: 1;
  transform: translateX(0);
}

.next-steps {
  margin: 4rem 0;
}

.steps-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 3rem;
}

.steps-title .script-font {
  font-size: 2.3rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.step-card {
  background: linear-gradient(135deg, var(--background-secondary) 0%, var(--color-gray-100) 100%);
  padding: 2rem;
  text-align: center;
  border-radius: 0;
  border: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.step-decoration {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.step-card:hover {
  transform: translateY(-8px);
  background: linear-gradient(135deg, var(--color-gray-200) 0%, var(--color-gray-300) 100%);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.step-number {
  width: 40px;
  height: 40px;
  background: var(--text-primary);
  color: var(--background-primary);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.step-card:hover .step-number {
  background: var(--text-primary);
  color: var(--background-primary);
  transform: scale(1.1);
}

.step-card h4 {
  color: var(--text-primary);
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.step-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

.btn-home {
  background: var(--text-primary);
  color: var(--background-primary);
  border: none;
  padding: 1.25rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;
}

.btn-home::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.btn-home:hover::before {
  left: 100%;
}

.btn-home:hover {
  background: var(--accent-color);
  color: var(--background-primary);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .thank-you-page {
    padding: 2rem 0;
  }
  
  .thank-you-title {
    font-size: 2.5rem;
  }
  
  .title-highlight.script-font {
    font-size: 2.8rem;
  }
  
  .thank-intro {
    font-size: 1rem;
  }
  
  .steps-grid {
    grid-template-columns: 1fr;
  }
  
  .gift-highlight {
    padding: 1.5rem;
  }
  
  .gift-highlight h3 {
    font-size: 1.125rem;
  }
  
  .gift-highlight .script-font {
    font-size: 1.25rem;
  }
  
  .steps-title .script-font {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .thank-you-title {
    font-size: 2rem;
  }
  
  .title-highlight.script-font {
    font-size: 2.3rem;
  }
  
  .steps-title {
    font-size: 1.5rem;
  }
  
  .steps-title .script-font {
    font-size: 1.8rem;
  }
  
  .gift-list {
    gap: 1.5rem;
  }
  
  .gift-item {
    gap: 1rem;
    padding: 1rem;
  }
  
  .gift-number {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
  
  .step-card {
    padding: 1.5rem;
  }
}

/* Animations améliorées */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.fade-in-up.delay-1 { animation-delay: 0.2s; }
.fade-in-up.delay-2 { animation-delay: 0.4s; }
.fade-in-up.delay-3 { animation-delay: 0.6s; }
.fade-in-up.delay-4 { animation-delay: 0.8s; }
.fade-in-up.delay-5 { animation-delay: 1s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up.animate {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
</style> 
