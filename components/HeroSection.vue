<template>
  <section class="hero-section">
    <!-- Éléments décoratifs subtils -->
    <div class="decorative-elements">
      <div class="floating-dot dot-1"></div>
      <div class="floating-dot dot-2"></div>
      <div class="floating-dot dot-3"></div>
      <div class="floating-dot dot-4"></div>
      <div class="floating-dot dot-5"></div>
      <div class="geometric-line line-1"></div>
      <div class="geometric-line line-2"></div>
      <div class="geometric-line line-3"></div>
      <div class="geometric-circle circle-1"></div>
      <div class="geometric-circle circle-2"></div>
      <div class="geometric-square square-1"></div>
    </div>

    <div class="hero-container">
      <div class="hero-content">
        <!-- Badge minimaliste avec animation -->
        <div class="hero-badge fade-in-up">
          <span>ÉCOUTE</span>
        </div>

        <!-- Titre principal ultra-audacieux -->
        <h1 class="hero-title blinka-serif fade-in-up delay-1">
          <span class="title-line">Aucun <span class="title-highlight">Business</span></span>
          <span class="title-line">Ne perdure sans <span class="title-emphasis">structure</span></span>
          <span class="script-intro delight-sunset">J'en suis la preuve</span>
        </h1>

        <!-- Description épurée -->
        <div class="hero-description fade-in-up delay-2">
          <div class="description-main">
            <p class="main-description-text">
              TU AVANCES. TU VENDS. TU TENTES.<br/>
              MAIS SANS SYSTÈME, SANS OFFRE CLAIRE, SANS POSITIONNEMENT PRÉCIS...<br/>
              TU RESTES DANS L'INSTINCT. ET L'INSTINCT N'EST PAS UNE STRATÉGIE.<br/>
              MAIS SI ON TE DISAIT QUE CE QUE TU APPELLES "BUSINESS" N'EST ENCORE QU'UN COMMENCEMENT ?
            </p>
          </div>
          <p class="final-question">Serais-tu prêt·e à découvrir les codes ?</p>
        </div>

        <!-- CTA moderne avec micro-interactions -->
        <div class="hero-cta fade-in-up delay-3">
          <button class="cta-button" @click="handleCTAClick">
            <span class="cta-text">JE DÉCOUVRE LES CODES</span>
            <span class="cta-arrow">→</span>
          </button>
        </div>
      </div>

      <!-- Image repositionnée avec effet parallax subtil -->
      <div class="hero-image fade-in-up delay-2">
        <div class="image-wrapper">
          <img src="/yaalwoman.webp" alt="YAAL Studio - Femme d'affaires professionnelle" class="main-image" />
        </div>
      </div>
    </div>
    <img src="/wave01.svg" alt="" class="hero-wave" />
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  mounted() {
    this.initScrollAnimations()
  },
  methods: {
    handleCTAClick() {
      const el = document.getElementById('classes-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    initScrollAnimations() {
      // Désactiver parallax sur mobile
      if (window.innerWidth >= 768) {
        window.addEventListener('scroll', this.handleScroll)
      }
    },
    handleScroll() {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.5
      
      const decorativeElements = document.querySelector('.decorative-elements')
      if (decorativeElements) {
        decorativeElements.style.transform = `translateY(${parallax}px)`
      }
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
}
</script>

<style scoped>
.hero-wave {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  z-index: 5;
  pointer-events: none;
  user-select: none;
}

.hero-section {
  min-height: 100vh;
  background: var(--background-secondary);
  position: relative;
  display: flex;
  align-items: center;
  padding: 0;
  overflow: hidden;
}

/* Éléments décoratifs subtils */
.decorative-elements {
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
  animation: float 6s ease-in-out infinite;
}

.dot-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.dot-2 {
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.dot-3 {
  bottom: 30%;
  left: 20%;
  animation-delay: 4s;
}

.dot-4 {
  top: 15%;
  right: 25%;
  animation-delay: 1s;
  width: 3px;
  height: 3px;
}

.dot-5 {
  bottom: 60%;
  left: 70%;
  animation-delay: 3s;
  width: 2px;
  height: 2px;
}

.geometric-line {
  position: absolute;
  background: var(--text-primary);
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

.line-3 {
  width: 80px;
  height: 1px;
  top: 70%;
  right: 30%;
  transform: rotate(15deg);
  animation: pulse 5s ease-in-out infinite 1s;
}

.geometric-circle {
  position: absolute;
  border: 1px solid var(--text-primary);
  border-radius: 50%;
  opacity: 0.3;
  animation: rotate 20s linear infinite;
}

.circle-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  right: 5%;
  animation-delay: 0s;
}

.circle-2 {
  width: 80px;
  height: 80px;
  bottom: 15%;
  left: 10%;
  animation-delay: 10s;
}

.geometric-square {
  position: absolute;
  border: 1px solid var(--text-primary);
  opacity: 0.2;
  animation: rotate 15s linear infinite reverse;
}

.square-1 {
  width: 40px;
  height: 40px;
  top: 50%;
  left: 5%;
  transform: rotate(45deg);
}

@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
  50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 5;
  height: 100%;
  gap: 40px;
}

.hero-content {
  flex: 1;
  min-width: 0;
  text-align: center;
  max-width: 600px;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: var(--text-primary);
  color: var(--background-primary);
  font-size: clamp(0.65rem, 1.5vw, 0.75rem);
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  border-radius: 0;
  transition: all 0.3s ease;
}

.hero-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.hero-title {
  font-size: clamp(1.8rem, 5vw, 3.5rem);
  text-align: center;
  font-weight: 700;
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  transition: font-size 0.3s ease;
}

.title-line {
  display: block;
}

.script-intro {
  font-size: clamp(1.3rem, 3.5vw, 3.5rem);
  font-weight: 400;
  color: var(--text-secondary);
  font-style: normal;
  margin-top: 0.8rem;
  display: block;
  line-height: 1.2;
  transition: font-size 0.3s ease;
}

.hero-description {
  margin-bottom: 1.5rem;
  text-align: center;
  max-width: 100%;
  transition: all 0.3s ease;
}

.main-description-text {
  font-size: clamp(0.8rem, 1.8vw, 1rem);
  line-height: 1.6;
  color: var(--text-primary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 0;
  transition: font-size 0.3s ease;
}

.final-question {
  font-size: clamp(0.9rem, 2.2vw, 1.2rem);
  font-weight: 500;
  color: var(--text-primary);
  margin-top: 1rem;
  font-style: italic;
  transition: font-size 0.3s ease;
}

.hero-cta {
  margin-bottom: 1rem;
  text-align: center;
}

.cta-button {
  background: var(--text-primary);
  color: var(--background-primary);
  border: none;
  padding: clamp(0.8rem, 2vw, 1.2rem) clamp(1.5rem, 4vw, 2.5rem);
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  border-radius: 25px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button:hover {
  background: var(--accent-color);
  color: var(--background-primary);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.cta-arrow {
  font-size: clamp(1rem, 2vw, 1.2rem);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.cta-button:hover .cta-arrow {
  transform: translateX(6px);
}

.hero-image {
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 3;
  transition: all 0.3s ease;
}

.image-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  transition: max-width 0.3s ease;
}

.main-image {
  width: 100%;
  height: auto;
  max-height: 800px;
  object-fit: cover;
  object-position: center top;
  border-radius: 50% 50% 0 0;
  filter: grayscale(20%) contrast(1.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  aspect-ratio: 3/4;
}

.main-image:hover {
  filter: grayscale(10%) contrast(1.15);
  transform: scale(1.02);
}

/* Responsive Design */
/* Très grand écran (>1920px) */
@media (min-width: 1921px) {
  .hero-container {
    max-width: 1800px;
    gap: 80px;
  }
  
  .hero-title {
    font-size: clamp(3.5rem, 4.5vw, 5rem);
  }
  
  .script-intro {
    font-size: clamp(3.5rem, 4vw, 4.5rem);
  }
  
  .main-description-text {
    font-size: clamp(1rem, 1.2vw, 1.3rem);
  }
  
  .final-question {
    font-size: clamp(1.2rem, 1.4vw, 1.5rem);
  }
  
  .cta-button {
    padding: clamp(1.2rem, 1.5vw, 1.5rem) clamp(2.5rem, 3vw, 3rem);
    font-size: clamp(0.9rem, 1vw, 1.1rem);
  }
  
  .image-wrapper {
    max-width: 700px;
  }
}

/* Desktop large (1441px - 1920px) */
@media (min-width: 1441px) and (max-width: 1920px) {
  .hero-container {
    max-width: 1600px;
    gap: 60px;
  }
  
  .hero-title {
    font-size: clamp(2.5rem, 3.2vw, 3.2rem);
  }
  
  .script-intro {
    font-size: clamp(2.5rem, 3vw, 3.2rem);
  }
  
  .main-description-text {
    font-size: clamp(0.9rem, 1vw, 1.1rem);
  }
  
  .final-question {
    font-size: clamp(1rem, 1.1vw, 1.2rem);
  }
  
  .cta-button {
    padding: clamp(1rem, 1.1vw, 1.2rem) clamp(2rem, 2.3vw, 2.5rem);
    font-size: clamp(0.8rem, 0.9vw, 0.95rem);
  }
  
  .image-wrapper {
    max-width: 650px;
  }
}

/* Desktop standard (1201px - 1440px) */
@media (min-width: 1201px) and (max-width: 1440px) {
  .hero-container {
    max-width: 1400px;
    gap: 50px;
  }
  
  .hero-title {
    font-size: clamp(2.2rem, 3.2vw, 2.8rem);
  }
  
  .script-intro {
    font-size: clamp(2.2rem, 2.8vw, 2.8rem);
  }
  
  .main-description-text {
    font-size: clamp(0.85rem, 0.95vw, 1rem);
  }
  
  .final-question {
    font-size: clamp(0.95rem, 1.1vw, 1.15rem);
  }
  
  .cta-button {
    padding: clamp(0.95rem, 1.1vw, 1.15rem) clamp(1.8rem, 2.2vw, 2.3rem);
    font-size: clamp(0.75rem, 0.85vw, 0.9rem);
  }
  
  .image-wrapper {
    max-width: 600px;
  }
}

/* Laptop large (1025px - 1200px) */
@media (min-width: 1025px) and (max-width: 1200px) {
  .hero-container {
    max-width: 1200px;
    gap: 40px;
    padding: 1.2rem;
  }
  
  .hero-content {
    max-width: 550px;
  }
  
  .hero-title {
    font-size: clamp(2.2rem, 3.5vw, 3rem);
    margin-bottom: 1.2rem;
  }
  
  .script-intro {
    font-size: clamp(2.2rem, 3vw, 3rem);
    margin-top: 0.6rem;
  }
  
  .main-description-text {
    font-size: clamp(0.85rem, 0.95vw, 1rem);
    line-height: 1.5;
  }
  
  .final-question {
    font-size: clamp(0.95rem, 1.1vw, 1.2rem);
  }
  
  .cta-button {
    padding: clamp(0.9rem, 1.1vw, 1.2rem) clamp(1.8rem, 2.2vw, 2.3rem);
    font-size: clamp(0.75rem, 0.85vw, 0.9rem);
  }
  
  .image-wrapper {
    max-width: 500px;
  }
  
  .main-image {
    max-height: 650px;
  }
}

/* Laptop standard (769px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .hero-container {
    max-width: 1000px;
    gap: 30px;
    padding: 1rem;
  }
  
  .hero-content {
    max-width: 480px;
  }
  
  .hero-badge {
    font-size: clamp(0.6rem, 0.8vw, 0.7rem);
    padding: 0.4rem 1.2rem;
    margin-bottom: 1.2rem;
  }
  
  .hero-title {
    font-size: clamp(2rem, 3.2vw, 2.8rem);
    margin-bottom: 1rem;
  }
  
  .script-intro {
    font-size: clamp(2rem, 2.8vw, 2.8rem);
    margin-top: 0.5rem;
  }
  
  .main-description-text {
    font-size: clamp(0.8rem, 0.9vw, 0.95rem);
    line-height: 1.4;
  }
  
  .final-question {
    font-size: clamp(0.9rem, 1vw, 1.1rem);
  }
  
  .cta-button {
    padding: clamp(0.8rem, 1vw, 1.1rem) clamp(1.6rem, 2vw, 2.1rem);
    font-size: clamp(0.7rem, 0.8vw, 0.85rem);
  }
  
  .image-wrapper {
    max-width: 420px;
  }
  
  .main-image {
    max-height: 550px;
  }
}


/* Nouvelle disposition pour les mobiles (≤782px) */
@media (max-width: 1185px) {
  .hero-section {
    min-height: auto;
    padding: 2rem 0;
    display: block;
  }
  
  .hero-container {
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 1rem;
    height: auto;
    gap: 0;
  }
  
  .hero-content {
    order: 1;
    max-width: 100%;
    padding: 2rem 0;
    margin-bottom: 0;
    text-align: center;
  }
  
  .hero-title {
    font-size: clamp(2rem, 6vw, 3rem);
    margin-bottom: 1rem;
  }
  
  .script-intro {
    font-size: clamp(1.5rem, 4vw, 1.8rem);
  }
  
  .hero-description {
    margin: 2rem auto;
    max-width: 90%;
  }
  
  .main-description-text {
    font-size: clamp(1rem, 3vw, 1.1rem);
    line-height: 1.7;
  }
  
  .final-question {
    font-size: clamp(1.1rem, 3.2vw, 1.3rem);
    margin-top: 1.5rem;
  }
  
  .hero-cta {
    margin: 2rem auto 3rem;
  }
  
  .cta-button {
    padding: 1rem 2.5rem;
    font-size: 1rem;
  }
  
  .hero-image {
    order: 2;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding-top: 0;
    align-items: center;
  }
  
  .image-wrapper {
    max-width: 350px;
  }
  
  .main-image {
    max-height: 500px;
  }
}



/* Mobile plus petit */
@media (max-width: 480px) {
  .hero-section {
    padding: 1.5rem 0;
  }
  
  .hero-container {
    padding: 0.5rem;
  }
  
  .hero-image .image-wrapper {
    max-width: 280px;
  }
  
  .title-highlight, .title-emphasis {
    display: inline-block;
  }
}

/* Optimisation paysage mobile */
@media (max-height: 500px) and (orientation: landscape) {
  .hero-section {
    min-height: auto;
    padding: 1rem 0;
  }
  
  .hero-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    gap: 15px;
  }
  
  .hero-content {
    flex: 1;
    min-width: 0;
    text-align: left;
    order: 1;
    max-width: 60%;
  }
  
  .hero-title {
    text-align: left;
    font-size: clamp(1.4rem, 3.5vw, 2rem);
  }
  
  .script-intro {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  }
  
  .main-description-text {
    font-size: clamp(0.7rem, 1.5vw, 0.85rem);
    line-height: 1.4;
  }
  
  .final-question {
    font-size: clamp(0.8rem, 1.8vw, 1rem);
  }
  
  .hero-image {
    flex: 0 0 35%;
    max-width: 180px;
    order: 2;
  }
  
  .hero-badge,
  .hero-description,
  .hero-cta {
    text-align: left;
  }
}

/* Très petits écrans */
@media (max-width: 360px) {
  .hero-title {
    font-size: 1.6rem;
  }
  
  .script-intro {
    font-size: 1.1rem;
  }
  
  .main-description-text {
    font-size: 0.75rem;
  }
  
  .hero-image .image-wrapper {
    max-width: 220px;
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

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Écrans ultra-wide (>2560px) */
@media (min-width: 2561px) {
  .hero-container {
    max-width: 2200px;
    gap: 100px;
  }
  
  .hero-title {
    font-size: clamp(3.2rem, 3.8vw, 4.5rem);
  }
  
  .script-intro {
    font-size: clamp(3.2rem, 3.5vw, 4.2rem);
  }
  
  .main-description-text {
    font-size: clamp(1rem, 1.1vw, 1.3rem);
  }
  
  .final-question {
    font-size: clamp(1.1rem, 1.2vw, 1.4rem);
  }
  
  .cta-button {
    padding: clamp(1.2rem, 1.3vw, 1.5rem) clamp(2.5rem, 2.8vw, 3rem);
    font-size: clamp(0.9rem, 1vw, 1.1rem);
  }
  
  .image-wrapper {
    max-width: 800px;
  }
  
  .main-image {
    max-height: 1000px;
  }
}

/* Optimisation pour les ratios d'écran spécifiques */
@media (min-aspect-ratio: 16/9) and (min-width: 1200px) {
  .hero-container {
    align-items: center;
    min-height: 80vh;
  }
  
  .hero-content {
    padding: 2rem 0;
  }
}

@media (min-aspect-ratio: 21/9) and (min-width: 1440px) {
  .hero-container {
    gap: 80px;
    padding: 2rem 3rem;
  }
  
  .hero-content {
    max-width: 700px;
  }
  
  .image-wrapper {
    max-width: 700px;
  }
}

/* Ajustements pour les écrans haute résolution */
@media (min-resolution: 192dpi) and (min-width: 1200px) {
  .hero-title {
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  
  .main-description-text {
    font-weight: 500;
    letter-spacing: 0.02em;
  }
}
</style>