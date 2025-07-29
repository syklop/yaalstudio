<template>
  <div class="landing-page">
    <!-- Section HeroSection avec l'image -->
    <HeroSection @cta-clicked="scrollToClasses" />
    <!-- Section ClassesSection -->
    <ClassesSection @cta-clicked="handleClassesCTA" />

    <!-- Section d'inscription en fin de page -->
    <section class="signup-section" id="contact-section">
      <!-- Décorations scintillantes -->
      <div class="twinkling-dots">
        <div class="dot dot-1"></div>
        <div class="dot dot-2"></div>
        <div class="dot dot-3"></div>
        <div class="dot dot-4"></div>
        <div class="dot dot-5"></div>
        <div class="dot dot-6"></div>
        <div class="dot dot-7"></div>
        <div class="dot dot-8"></div>
        <div class="dot dot-9"></div>
        <div class="dot dot-10"></div>
      </div>
      
      <div class="container">
        <div class="signup-main-grid">
          <!-- Colonne gauche : texte + image + bouton -->
          <div class="signup-left">
            <div class="signup-left-inner">
              <h2 class="signup-title">Tu veux une marque lisible,<br>stratégique, durable&nbsp;?</h2>
              <p class="signup-subtitle">Pose les fondations. Commence maintenant.</p>
              <div class="signup-ebook-imgblock">
                <div class="ebook-container">
                  <div class="ebook-card-outer">
                    <div class="ebook-card-inner">
                      <img src="/ebok.webp" alt="Ebook Les 5 fondations invisibles de ton empire" class="ebook-image-3d" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Colonne droite : formulaire -->
          <div class="signup-form-column fade-in-up delay-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="modern-footer">
      <div class="container">
        <div class="footer-content">
          <!-- Footer Header -->
          <div class="footer-header">
            <h3 class="footer-brand">YAALSTUDIO</h3>
            <p class="footer-tagline">Là où naissent les empires de demain</p>
          </div>
          <!-- Footer Grid -->
          <div class="footer-grid">
            <!-- Contact Info -->
            <div class="footer-section">
              <h4 class="footer-section-title">Contact</h4>
              <div class="footer-links">
                <a href="mailto:contact@yaalstudio.com" class="footer-link">
                  contact@yaalstudio.com
                </a>
              </div>
            </div>
            <!-- Legal -->
            <div class="footer-section">
              <h4 class="footer-section-title">Légal</h4>
              <div class="footer-links">
                <a href="#" class="footer-link">Mentions légales</a>
                <a href="#" class="footer-link">Politique de confidentialité</a>
                <a href="#" class="footer-link">Conditions d'utilisation</a>
              </div>
            </div>
          </div>
          <!-- Footer Bottom -->
          <div class="footer-bottom">
            <div class="footer-separator"></div>
            <div class="footer-copyright">
              <p>&copy; 2025 YaalStudio. Tous droits réservés. Développé par <a href="https://the-syklop.srv557357.hstgr.cloud/" class="footer-link">The sy-klop</a></p>
              <p class="footer-made-with">Conçu avec excellence pour les visionnaires</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import ContactForm from '~/components/ContactForm.vue'
import HeroSection from '~/components/HeroSection.vue'
import ClassesSection from '~/components/ClassesSection.vue'

export default {
  name: 'LandingPage',
  components: {
    ContactForm,
    HeroSection,
    ClassesSection
  },
  head() {
    return {
      title: 'YaalStudio - Une maison est en train de naître',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'YaalStudio - Maison de stratégie pour donner forme aux idées et structurer les visions. Rejoignez les premières pour recevoir vos ressources exclusives.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'YaalStudio - Une maison est en train de naître'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Maison de stratégie pour donner forme aux idées et structurer les visions. Rejoignez les premières pour recevoir vos ressources exclusives.'
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        }
      ]
    }
  },
  mounted() {
    this.initAnimations()
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
    scrollToClasses() {
      const classesSection = document.querySelector('.classes-section')
      if (classesSection) {
        classesSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    },
    handleClassesCTA() {
      const contactSection = document.querySelector('#contact-section')
      if (contactSection) {
        contactSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    }
  }
}
</script>

<style scoped>
.landing-page {
  background: var(--background-dark);
  position: relative;
}

.signup-section {
  background: var(--text-primary);
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: 0;
  position: relative;
  overflow: hidden;
}

/* Décorations scintillantes */
.twinkling-dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--background-primary);
  border-radius: 50%;
  opacity: 0.6;
  animation: twinkle 3s infinite;
}

.dot-1 { top: 15%; left: 10%; animation-delay: 0s; }
.dot-2 { top: 25%; left: 85%; animation-delay: 0.5s; }
.dot-3 { top: 45%; left: 15%; animation-delay: 1s; }
.dot-4 { top: 65%; left: 80%; animation-delay: 1.5s; }
.dot-5 { top: 85%; left: 20%; animation-delay: 2s; }
.dot-6 { top: 35%; left: 90%; animation-delay: 2.5s; }
.dot-7 { top: 75%; left: 5%; animation-delay: 0.8s; }
.dot-8 { top: 10%; left: 70%; animation-delay: 1.3s; }
.dot-9 { top: 55%; left: 95%; animation-delay: 1.8s; }
.dot-10 { top: 95%; left: 60%; animation-delay: 0.3s; }

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.signup-main-grid {
  display: grid;
  grid-template-columns: 1.1fr 1.3fr;
  align-items: center;
  gap: 3.5rem;
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
  min-height: 90vh;
  padding: 4rem 2rem 4rem 2rem;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
}
.signup-left {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.signup-left-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2.2rem;
  width: 100%;
  max-width: 420px;
}
.signup-title {
  font-family: 'Blinka Serif', serif;
  font-size: 2.3rem;
  font-weight: 700;
  color: var(--background-primary);
  margin-bottom: 0.2rem;
  line-height: 1.15;
}
.signup-subtitle {
  font-size: 1.15rem;
  color: var(--background-primary);
  margin-bottom: 0.2rem;
  opacity: 0.9;
}
.signup-ebook-imgblock {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

/* Container pour l'effet hover */
.ebook-container {
  position: relative;
  width: 100%;
  max-width: 340px;
  min-width: 200px;
  cursor: pointer;
}

/* Carte externe avec gradient */
.ebook-card-outer {
  width: 100%;
  height: auto;
  background-image: linear-gradient(163deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%);
  border-radius: 20px;
  transition: all 0.3s ease;
  padding: 8px;
}

/* Carte interne avec l'image */
.ebook-card-inner {
  width: 100%;
  height: auto;
  background: var(--background-primary);
  border-radius: 12px;
  transition: all 0.2s ease;
  overflow: hidden;
}

.ebook-image-3d {
  width: 100%;
  height: auto;
  border-radius: 12px;
  transition: all 0.2s ease;
  display: block;
}

/* Effets hover */
.ebook-container:hover .ebook-card-outer {
  box-shadow: 0px 0px 30px 1px rgba(255, 255, 255, 0.30);
  transform: scale(1.02);
}

.ebook-container:hover .ebook-card-inner {
  transform: scale(0.98);
  border-radius: 20px;
}
.ebook-btn {
  background: var(--text-primary);
  color: var(--background-primary);
  border: none;
  border-radius: 2rem;
  padding: 1rem 2.8rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.ebook-btn:hover {
  background: var(--accent-color);
  transform: translateY(-2px) scale(1.04);
}
.signup-form-column {
  min-width: 340px;
  max-width: 540px;
  background: var(--background-primary);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.10);
  padding: 3rem 2.2rem 2.2rem 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.signup-form-column > * {
  width: 100%;
}

@media (max-width: 1100px) {
  .signup-main-grid {
    gap: 2.2rem;
    padding: 2.5rem 0.5rem 2.5rem 0.5rem;
  }
  .signup-title {
    font-size: 1.3rem;
  }
  .ebook-container {
    max-width: 200px;
    min-width: 180px;
  }
  .signup-form-column {
    padding: 1.5rem 0.7rem 1.5rem 0.7rem;
  }
}
@media (max-width: 900px) {
  .signup-section {
    min-height: unset;
    padding: 0;
  }
  .signup-main-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    min-height: unset;
    padding: 2rem 0.5rem 2rem 0.5rem;
  }
  .signup-left, .signup-form-column {
    max-width: 100%;
    width: 100%;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .signup-left-inner {
    align-items: center;
    text-align: center;
  }
  .signup-ebook-imgblock {
    justify-content: center;
  }
  .ebook-container {
    max-width: 240px;
    min-width: 160px;
    margin: 0 auto;
  }
  .ebook-image-3d {
    max-width: 240px;
    min-width: 160px;
    width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
}
@media (max-width: 600px) {
  .signup-section {
    padding: 0.5rem 0;
  }
  .signup-title {
    font-size: 1.5rem;
  }
  .ebook-container {
    max-width: 90vw;
    min-width: 140px;
    margin: 0 auto;
  }
  .ebook-image-3d {
    max-width: 90vw;
    min-width: 140px;
    width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  .signup-form-column {
    min-width: 0;
    max-width: 100%;
    padding: 0.5rem;
  }
}

/* Footer moderne et cohérent avec le thème noir et blanc */
.modern-footer {
  background: var(--background-dark);
  color: var(--background-primary);
  padding: 4rem 0 2rem 0;
  position: relative;
  overflow: hidden;
}

/* Éléments décoratifs subtils */
.modern-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header du footer */
.footer-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.footer-brand {
  font-family: 'Blinka Serif', serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--background-primary);
  margin-bottom: 0.5rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.footer-tagline {
  font-size: 1rem;
  color: var(--text-light);
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.05em;
}

/* Grid du footer */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section {
  text-align: center;
}

.footer-section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--background-primary);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
}

.footer-section-title::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 1px;
  background: var(--border-color);
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  color: var(--text-light);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.25rem 0;
}



.footer-link:hover {
  color: var(--background-primary);
  transform: translateX(5px);
}

.footer-link:hover::before {
  width: 100%;
}

/* Bottom du footer */
.footer-bottom {
  text-align: center;
  position: relative;
}

.footer-separator {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
  margin-bottom: 2rem;
}

.footer-copyright {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.footer-copyright p {
  font-size: 0.85rem;
  color: var(--text-light);
  margin: 0;
}

.footer-made-with {
  font-style: italic;
  color: var(--text-secondary) !important;
  font-size: 0.8rem !important;
}

/* Responsive */
@media (max-width: 768px) {
  .modern-footer {
    padding: 3rem 0 1.5rem 0;
  }
  
  .footer-content {
    padding: 0 1rem;
  }
  
  .footer-brand {
    font-size: 1.5rem;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-section {
    text-align: center;
  }
  
  .footer-links {
    align-items: center;
  }
}

@media (max-width: 480px) {
  .modern-footer {
    padding: 2rem 0 1rem 0;
  }
  
  .footer-header {
    margin-bottom: 2rem;
  }
  
  .footer-brand {
    font-size: 1.3rem;
  }
  
  .footer-tagline {
    font-size: 0.9rem;
  }
  
  .footer-grid {
    gap: 1.5rem;
  }
  
  .footer-section-title {
    font-size: 1rem;
  }
  
  .footer-link {
    font-size: 0.85rem;
  }
}
</style> 
