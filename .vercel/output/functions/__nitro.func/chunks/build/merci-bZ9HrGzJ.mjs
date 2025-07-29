import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'googleapis';
import 'jsonwebtoken';
import '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'consola';
import '@iconify/utils';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  name: "ThankYouPage",
  data() {
    return {
      firstName: ""
    };
  },
  head() {
    return {
      title: "Merci ! Bienvenue chez YaalStudio",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Merci pour votre inscription ! D\xE9couvrez vos ressources strat\xE9giques exclusives et restez connect\xE9e pour le lancement de YaalStudio."
        },
        {
          name: "robots",
          content: "noindex, nofollow"
        }
      ]
    };
  },
  mounted() {
    this.firstName = this.$route.query.name || localStorage.getItem("yaal_user_name") || "";
    this.initAnimations();
    if (localStorage.getItem("yaal_user_name")) {
      localStorage.removeItem("yaal_user_name");
    }
  },
  methods: {
    initAnimations() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
            }
          });
        },
        { threshold: 0.1 }
      );
      const elements = (void 0).querySelectorAll(".fade-in-up");
      elements.forEach((el) => observer.observe(el));
    },
    goHome() {
      this.$router.push("/");
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "thank-you-page" }, _attrs))} data-v-ef19031f><div class="page-decorations" data-v-ef19031f><div class="floating-element element-1" data-v-ef19031f></div><div class="floating-element element-2" data-v-ef19031f></div><div class="floating-element element-3" data-v-ef19031f></div><div class="geometric-pattern" data-v-ef19031f></div></div><div class="container" data-v-ef19031f><div class="thank-you-content" data-v-ef19031f><div class="brand fade-in-up" data-v-ef19031f><h1 class="brand-name" data-v-ef19031f>YAALSTUDIO</h1><p class="brand-tagline script-font" data-v-ef19031f>Maison de strat\xE9gie</p></div><div class="main-content" data-v-ef19031f><div class="success-icon fade-in-up delay-1" data-v-ef19031f><div class="checkmark" data-v-ef19031f>\u2713</div><div class="success-ripple" data-v-ef19031f></div></div><h2 class="thank-you-title fade-in-up delay-2" data-v-ef19031f><span class="title-highlight script-font" data-v-ef19031f>F\xE9licitations !</span><br data-v-ef19031f> Vous faites partie des premi\xE8res </h2><div class="thank-you-description fade-in-up delay-3" data-v-ef19031f><p class="thank-intro" data-v-ef19031f> Merci <strong data-v-ef19031f>${ssrInterpolate($data.firstName || "pour votre inscription")}</strong> ! Votre inscription a \xE9t\xE9 confirm\xE9e avec succ\xE8s. </p><p class="thank-details" data-v-ef19031f> Vous allez recevoir dans les prochaines minutes un email contenant <strong data-v-ef19031f>votre guide strat\xE9gique gratuit</strong> : </p><div class="gift-highlight" data-v-ef19031f><div class="gift-decoration" data-v-ef19031f></div><h3 data-v-ef19031f>&quot;Les 5 Fondations Invisibles de ton Empire&quot;</h3></div><div class="gift-list" data-v-ef19031f><div class="gift-item" data-v-ef19031f><span class="gift-number" data-v-ef19031f>01</span><div class="gift-content" data-v-ef19031f><h4 data-v-ef19031f>Guide PDF</h4><p data-v-ef19031f>&quot;Les 5 Fondations Invisibles de ton Empire&quot;</p></div><div class="gift-arrow" data-v-ef19031f>\u2192</div></div><div class="gift-item" data-v-ef19031f><span class="gift-number" data-v-ef19031f>02</span><div class="gift-content" data-v-ef19031f><h4 data-v-ef19031f>Template</h4><p data-v-ef19031f>Canvas de Planification Strat\xE9gique</p></div><div class="gift-arrow" data-v-ef19031f>\u2192</div></div><div class="gift-item" data-v-ef19031f><span class="gift-number" data-v-ef19031f>03</span><div class="gift-content" data-v-ef19031f><h4 data-v-ef19031f>Checklist</h4><p data-v-ef19031f>Audit Express de votre Projet</p></div><div class="gift-arrow" data-v-ef19031f>\u2192</div></div><div class="gift-item" data-v-ef19031f><span class="gift-number" data-v-ef19031f>04</span><div class="gift-content" data-v-ef19031f><h4 data-v-ef19031f>Bonus</h4><p data-v-ef19031f>Acc\xE8s prioritaire aux futurs contenus</p></div><div class="gift-arrow" data-v-ef19031f>\u2192</div></div></div></div><div class="next-steps fade-in-up delay-4" data-v-ef19031f><h3 class="steps-title" data-v-ef19031f>Et <span class="script-font" data-v-ef19031f>maintenant</span> ?</h3><div class="steps-grid" data-v-ef19031f><div class="step-card" data-v-ef19031f><div class="step-decoration" data-v-ef19031f></div><div class="step-number" data-v-ef19031f>1</div><h4 data-v-ef19031f>V\xE9rifiez votre email</h4><p data-v-ef19031f>Votre guide vous attend dans votre bo\xEEte de r\xE9ception</p></div><div class="step-card" data-v-ef19031f><div class="step-decoration" data-v-ef19031f></div><div class="step-number" data-v-ef19031f>2</div><h4 data-v-ef19031f>Explorez le contenu</h4><p data-v-ef19031f>D\xE9couvrez vos outils strat\xE9giques exclusifs</p></div><div class="step-card" data-v-ef19031f><div class="step-decoration" data-v-ef19031f></div><div class="step-number" data-v-ef19031f>3</div><h4 data-v-ef19031f>Restez connect\xE9e</h4><p data-v-ef19031f>Suivez-nous pour le lancement officiel</p></div></div></div><div class="back-home fade-in-up delay-5" data-v-ef19031f><button class="btn-home" data-v-ef19031f><span data-v-ef19031f>\u2190 Retour \xE0 l&#39;accueil</span></button></div></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/merci.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const merci = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ef19031f"]]);

export { merci as default };
//# sourceMappingURL=merci-bZ9HrGzJ.mjs.map
