<template>
  <section id="classes-section" class="brand-section" >
   
    
    <!-- Décorations subtiles -->
    <div class="decorative-elements">
      <div class="decor-dot dot-1"></div>
      <div class="decor-dot dot-2"></div>
      <div class="decor-dot dot-3"></div>
      <div class="decor-line line-1"></div>
      <div class="decor-line line-2"></div>
      <div class="decor-circle circle-1"></div>
      <div class="decor-circle circle-2"></div>
      <div class="decor-square square-1"></div>
    </div>
    <!-- Fin décorations -->
    <div class="brand-cards">
      <div class="brand-card brand-card-left">
        <div class="brand-from-label">
          <span class="delight-sunset">From this</span>
        </div>
        <ul>
          <li>
            <span class="brand-icon brand-icon-red"><XIcon size="20" /></span>
            Vous enchaînez les lancements improvisés, sans comprendre pourquoi ça ne convertit pas
          </li>
          <li>
            <span class="brand-icon brand-icon-red"><XIcon size="20" /></span>
            Les idées fusent dans votre tête... mais rien ne prend réellement forme
          </li>
          <li>
            <span class="brand-icon brand-icon-red"><XIcon size="20" /></span>
            Vos journées commencent tôt, finissent tard, mais vous ne savez toujours pas où vous allez.
          </li>
          <li>
            <span class="brand-icon brand-icon-red"><XIcon size="20" /></span>
            Vous avez du stock... mais vous ne savez pas comment structurer une offre ou la présenter.
          </li>
          <li>
            <span class="brand-icon brand-icon-red"><XIcon size="20" /></span>
            Vous avez déjà des clientes... mais vous ne savez pas comment les fidéliser ou les faire monter en gamme
          </li>
        </ul>
      </div>
      <div class="brand-arrow">
        <img src="/arrow.png" alt="Flèche de transition" />
      </div>
      <div class="brand-card brand-card-right">
        <div class="brand-to-label">
          <span class="delight-sunset">To this</span>
        </div>
        <ul>
          <li>
            <span class="brand-icon brand-icon-blue"><CheckIcon size="20" /></span>
            Vous enchaînez les lancements improvisés, sans comprendre pourquoi ça ne convertit pas
          </li>
          <li>
            <span class="brand-icon brand-icon-blue"><CheckIcon size="20" /></span>
            Les idées fusent dans votre tête... mais rien ne prend réellement forme
          </li>
          <li>
            <span class="brand-icon brand-icon-blue"><CheckIcon size="20" /></span>
            Vos journées commencent tôt, finissent tard, mais vous ne savez toujours pas où vous allez.
          </li>
          <li>
            <span class="brand-icon brand-icon-blue"><CheckIcon size="20" /></span>
            Vous avez du stock... mais vous ne savez pas comment structurer une offre ou la présenter.
          </li>
          <li>
            <span class="brand-icon brand-icon-blue"><CheckIcon size="20" /></span>
            Vous avez déjà des clientes... mais vous ne savez pas comment les fidéliser ou les faire monter en gamme
          </li>
        </ul>
      </div>
    </div>
    <div class="brand-cta">
      <button class="brand-cta-btn" @click="$emit('cta-clicked')">JE M'ALIGNE</button>
    </div>
     <!-- Wave décoratif -->
     <!-- <img src="/download.svg" alt="" class="hero-wave" /> -->
  </section>
</template>

<script>
import { XIcon, CheckIcon } from 'lucide-vue-next'

export default {
  name: 'ClassesSection',
  components: {
    XIcon,
    CheckIcon
  },
  methods: {
    handleCTAClick() {
      const el = document.getElementById('classes-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
</script>

<style scoped>
.brand-section {
  background: #fff;
  padding: 4rem 0 2rem 0;
  min-height: 90vh;
  position: relative;
  text-align: center;
  overflow: hidden;
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 1;

  pointer-events: none;
}

.brand-card {
  border-radius: 12px;
  padding: 2.5rem;
  width: 400px;
  position: relative;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}

.brand-from-label {
  position: absolute;
  left: -20px;
  top: -35px;
  transform: rotate(-18deg);
  font-family: 'Dancing Script', cursive;
  font-size: 3.2rem;
  font-weight: 700;
  color: var(--background-primary);
  z-index: 10;
  pointer-events: none;
}

.brand-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 2.5rem auto;
  position: relative;
}

.brand-card {
  border-radius: 12px;
  padding: 2.5rem;
  width: 400px;
  position: relative;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}

.brand-card-left {
  background: #f7f5ef;
  border: none;
}

.brand-card-right {
  background: #f3ede3;
  border: none;
  box-shadow: none;
  position: relative;
}

.brand-to-label {
  position: absolute;
    left: -30px;
    top: -53px;
    transform: rotate(-18deg);
    font-family: 'Dancing Script', cursive;
    font-size: 4.2rem;
    font-weight: 700;
    color: var(--background-primary);
    z-index: 10;
    pointer-events: none;
}

.brand-card li {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  min-font-size: 14px;
  line-height: 1.5;
  text-align: left;
}

.brand-card-left li {
  color: #222;
}

.brand-card-right li {
  color: #444;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
}
.brand-icon-red {
  background-color: #7a2d2d;
  border: 2px solid #7a2d2d;
  color: #ffffff;
}
.brand-icon-blue {
  background-color: #1f2a44;
    border: 2px solid #1f2a44;
    color: #ffffff;
}

.brand-arrow {
  display: flex;
  align-items: center;
  padding: 0 2rem;
}

.brand-arrow img {
  width: 120px;
  height: auto;
  filter: none;
  /* Flèche bordeaux */
  mix-blend-mode: multiply;
}

.brand-cta {
  margin-top: 3rem;
}

.brand-cta-btn {
  background: #1f2a44;
  position: relative;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
}
.brand-cta-btn:hover {
  background: #2d3a5a;
  transform: translateY(-2px);
}

.brand-from-label, .brand-to-label {
  color: #222;
  font-family: 'Dancing Script', cursive;
  font-size: 3.5rem;
  font-weight: 700;
  z-index: 10;
  pointer-events: none;
  background: transparent;
}

.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.decor-dot {
  position: absolute;
  border-radius: 50%;
  opacity: 0.18;
  background: #d1cfc7;
}
.dot-1 {
  width: 8px; height: 8px; top: 12%; left: 8%; background: #e5e3dc;
}
.dot-2 {
  width: 5px; height: 5px; bottom: 18%; right: 12%; background: #7a2d2d;
}
.dot-3 {
  width: 6px; height: 6px; top: 60%; left: 80%; background: #1f2a44;
}

.decor-line {
  position: absolute;
  height: 2px;
  border-radius: 1px;
  opacity: 0.10;
  background: #1f2a44;
}
.line-1 {
  width: 120px; top: 20%; left: 30%; transform: rotate(-12deg); background: #7a2d2d;
}
.line-2 {
  width: 80px; bottom: 10%; right: 20%; transform: rotate(18deg); background: #1f2a44;
}

.decor-circle {
  position: absolute;
  border: 1.5px solid #e5e3dc;
  border-radius: 50%;
  opacity: 0.13;
}
.circle-1 {
  width: 90px; height: 90px; top: 8%; right: 6%; border-color: #1f2a44;
}
.circle-2 {
  width: 60px; height: 60px; bottom: 12%; left: 12%; border-color: #7a2d2d;
}

.decor-square {
  position: absolute;
  border: 1.5px solid #d1cfc7;
  opacity: 0.10;
}
.square-1 {
  width: 32px; height: 32px; top: 55%; left: 5%; transform: rotate(18deg);
}

@media (max-width: 1200px) {
  .brand-cards {
    padding: 0 2rem;
  }
  .brand-card {
    width: 350px;
  }
}
@media (max-width: 900px) {
  .brand-cards {
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
  }
 
  .brand-arrow {
    transform: rotate(90deg);
    padding: 2rem 0;
  }
  .brand-card {
    width: 90%;
    min-width: 0;
  }
  .brand-card li {
    font-size: 1.1rem;
    min-font-size: 16px;
  }
  .brand-from-label {
    left: 10px;
    top: -25px;
    font-size: 2.8rem;
  }
  .brand-to-label {
    left: 10px;
    top: -25px;
    font-size: 2.8rem;
  }
}
@media (max-width: 600px) {
  .brand-card {
    width: 90%;
    padding: 1.5rem;
  }
  .brand-section {
    min-height: 100vh;
  }
  .brand-card li {
    font-size: 1rem;
    min-font-size: 14px;
  }
  .brand-from-label, .brand-to-label {
    font-size: 2.4rem;
    top: -20px;
    left: 8px;
  }
}
</style>
