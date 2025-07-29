import { mergeProps, resolveComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { o as publicAssetsURL } from '../_/nitro.mjs';
import { _ as _export_sfc } from './server.mjs';
import { CheckIcon, XIcon } from 'lucide-vue-next';
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

const _imports_0$2 = publicAssetsURL("/yaalwoman.webp");
const _imports_1 = publicAssetsURL("/wave01.svg");
const _sfc_main$4 = {
  name: "HeroSection",
  mounted() {
    this.initScrollAnimations();
  },
  methods: {
    handleCTAClick() {
      const el = (void 0).getElementById("classes-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    initScrollAnimations() {
      if ((void 0).innerWidth >= 768) {
        (void 0).addEventListener("scroll", this.handleScroll);
      }
    },
    handleScroll() {
      const scrolled = (void 0).pageYOffset;
      const parallax = scrolled * 0.5;
      const decorativeElements = (void 0).querySelector(".decorative-elements");
      if (decorativeElements) {
        decorativeElements.style.transform = `translateY(${parallax}px)`;
      }
    },
    beforeDestroy() {
      (void 0).removeEventListener("scroll", this.handleScroll);
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "hero-section" }, _attrs))} data-v-a7f3f40c><div class="decorative-elements" data-v-a7f3f40c><div class="floating-dot dot-1" data-v-a7f3f40c></div><div class="floating-dot dot-2" data-v-a7f3f40c></div><div class="floating-dot dot-3" data-v-a7f3f40c></div><div class="floating-dot dot-4" data-v-a7f3f40c></div><div class="floating-dot dot-5" data-v-a7f3f40c></div><div class="geometric-line line-1" data-v-a7f3f40c></div><div class="geometric-line line-2" data-v-a7f3f40c></div><div class="geometric-line line-3" data-v-a7f3f40c></div><div class="geometric-circle circle-1" data-v-a7f3f40c></div><div class="geometric-circle circle-2" data-v-a7f3f40c></div><div class="geometric-square square-1" data-v-a7f3f40c></div></div><div class="hero-container" data-v-a7f3f40c><div class="hero-content" data-v-a7f3f40c><div class="hero-badge fade-in-up" data-v-a7f3f40c><span data-v-a7f3f40c>\xC9COUTE</span></div><h1 class="hero-title blinka-serif fade-in-up delay-1" data-v-a7f3f40c><span class="title-line" data-v-a7f3f40c>Aucun <span class="title-highlight" data-v-a7f3f40c>Business</span></span><span class="title-line" data-v-a7f3f40c>Ne perdure sans <span class="title-emphasis" data-v-a7f3f40c>structure</span></span><span class="script-intro delight-sunset" data-v-a7f3f40c>J&#39;en suis la preuve</span></h1><div class="hero-description fade-in-up delay-2" data-v-a7f3f40c><div class="description-main" data-v-a7f3f40c><p class="main-description-text" data-v-a7f3f40c> TU AVANCES. TU VENDS. TU TENTES.<br data-v-a7f3f40c> MAIS SANS SYST\xC8ME, SANS OFFRE CLAIRE, SANS POSITIONNEMENT PR\xC9CIS...<br data-v-a7f3f40c> TU RESTES DANS L&#39;INSTINCT. ET L&#39;INSTINCT N&#39;EST PAS UNE STRAT\xC9GIE.<br data-v-a7f3f40c> MAIS SI ON TE DISAIT QUE CE QUE TU APPELLES &quot;BUSINESS&quot; N&#39;EST ENCORE QU&#39;UN COMMENCEMENT ? </p></div><p class="final-question" data-v-a7f3f40c>Serais-tu pr\xEAt\xB7e \xE0 d\xE9couvrir les codes ?</p></div><div class="hero-cta fade-in-up delay-3" data-v-a7f3f40c><button class="cta-button" data-v-a7f3f40c><span class="cta-text" data-v-a7f3f40c>JE D\xC9COUVRE LES CODES</span><span class="cta-arrow" data-v-a7f3f40c>\u2192</span></button></div></div><div class="hero-image fade-in-up delay-2" data-v-a7f3f40c><div class="image-wrapper" data-v-a7f3f40c><img${ssrRenderAttr("src", _imports_0$2)} alt="YAAL Studio - Femme d&#39;affaires professionnelle" class="main-image" data-v-a7f3f40c></div></div></div><img${ssrRenderAttr("src", _imports_1)} alt="" class="hero-wave" data-v-a7f3f40c></section>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-a7f3f40c"]]);
const _imports_0$1 = publicAssetsURL("/arrow.png");
const _sfc_main$3 = {
  name: "ClassesSection",
  components: {
    XIcon,
    CheckIcon
  },
  methods: {
    handleCTAClick() {
      const el = (void 0).getElementById("classes-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_XIcon = resolveComponent("XIcon");
  const _component_CheckIcon = resolveComponent("CheckIcon");
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "classes-section",
    class: "brand-section"
  }, _attrs))} data-v-d23eb3cd><div class="decorative-elements" data-v-d23eb3cd><div class="decor-dot dot-1" data-v-d23eb3cd></div><div class="decor-dot dot-2" data-v-d23eb3cd></div><div class="decor-dot dot-3" data-v-d23eb3cd></div><div class="decor-line line-1" data-v-d23eb3cd></div><div class="decor-line line-2" data-v-d23eb3cd></div><div class="decor-circle circle-1" data-v-d23eb3cd></div><div class="decor-circle circle-2" data-v-d23eb3cd></div><div class="decor-square square-1" data-v-d23eb3cd></div></div><div class="brand-cards" data-v-d23eb3cd><div class="brand-card brand-card-left" data-v-d23eb3cd><div class="brand-from-label" data-v-d23eb3cd><span class="delight-sunset" data-v-d23eb3cd>From this</span></div><ul data-v-d23eb3cd><li data-v-d23eb3cd><span class="brand-icon brand-icon-red" data-v-d23eb3cd>`);
  _push(ssrRenderComponent(_component_XIcon, { size: "20" }, null, _parent));
  _push(`</span> Vous encha\xEEnez les lancements improvis\xE9s, sans comprendre pourquoi \xE7a ne convertit pas </li><li data-v-d23eb3cd><span class="brand-icon brand-icon-red" data-v-d23eb3cd>`);
  _push(ssrRenderComponent(_component_XIcon, { size: "20" }, null, _parent));
  _push(`</span> Les id\xE9es fusent dans votre t\xEAte... mais rien ne prend r\xE9ellement forme </li><li data-v-d23eb3cd><span class="brand-icon brand-icon-red" data-v-d23eb3cd>`);
  _push(ssrRenderComponent(_component_XIcon, { size: "20" }, null, _parent));
  _push(`</span> Vos journ\xE9es commencent t\xF4t, finissent tard, mais vous ne savez toujours pas o\xF9 vous allez. </li><li data-v-d23eb3cd><span class="brand-icon brand-icon-red" data-v-d23eb3cd>`);
  _push(ssrRenderComponent(_component_XIcon, { size: "20" }, null, _parent));
  _push(`</span> Vous avez du stock... mais vous ne savez pas comment structurer une offre ou la pr\xE9senter. </li><li data-v-d23eb3cd><span class="brand-icon brand-icon-red" data-v-d23eb3cd>`);
  _push(ssrRenderComponent(_component_XIcon, { size: "20" }, null, _parent));
  _push(`</span> Vous avez d\xE9j\xE0 des clientes... mais vous ne savez pas comment les fid\xE9liser ou les faire monter en gamme </li></ul></div><div class="brand-arrow" data-v-d23eb3cd><img${ssrRenderAttr("src", _imports_0$1)} alt="Fl\xE8che de transition" data-v-d23eb3cd></div><div class="brand-card brand-card-right" data-v-d23eb3cd><div class="brand-to-label" data-v-d23eb3cd><span class="delight-sunset" data-v-d23eb3cd>To this</span></div><ul data-v-d23eb3cd><li data-v-d23eb3cd><span class="brand-icon brand-icon-blue" data-v-d23eb3cd>`);
  _push(ssrRenderComponent(_component_CheckIcon, { size: "20" }, null, _parent));
  _push(`</span> Vous encha\xEEnez les lancements improvis\xE9s, sans comprendre pourquoi \xE7a ne convertit pas </li><li data-v-d23eb3cd><span class="brand-icon brand-icon-blue" data-v-d23eb3cd>`);
  _push(ssrRenderComponent(_component_CheckIcon, { size: "20" }, null, _parent));
  _push(`</span> Les id\xE9es fusent dans votre t\xEAte... mais rien ne prend r\xE9ellement forme </li><li data-v-d23eb3cd><span class="brand-icon brand-icon-blue" data-v-d23eb3cd>`);
  _push(ssrRenderComponent(_component_CheckIcon, { size: "20" }, null, _parent));
  _push(`</span> Vos journ\xE9es commencent t\xF4t, finissent tard, mais vous ne savez toujours pas o\xF9 vous allez. </li><li data-v-d23eb3cd><span class="brand-icon brand-icon-blue" data-v-d23eb3cd>`);
  _push(ssrRenderComponent(_component_CheckIcon, { size: "20" }, null, _parent));
  _push(`</span> Vous avez du stock... mais vous ne savez pas comment structurer une offre ou la pr\xE9senter. </li><li data-v-d23eb3cd><span class="brand-icon brand-icon-blue" data-v-d23eb3cd>`);
  _push(ssrRenderComponent(_component_CheckIcon, { size: "20" }, null, _parent));
  _push(`</span> Vous avez d\xE9j\xE0 des clientes... mais vous ne savez pas comment les fid\xE9liser ou les faire monter en gamme </li></ul></div></div><div class="brand-cta" data-v-d23eb3cd><button class="brand-cta-btn" data-v-d23eb3cd>JE M&#39;ALIGNE</button></div></section>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ClassesSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-d23eb3cd"]]);
const _sfc_main$2 = {
  name: "PhoneInput",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: "T\xE9l\xE9phone"
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: true
    },
    error: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "blur"]
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "phone-input-wrapper" }, _attrs))} data-v-cdf37d9d><label class="input-label" data-v-cdf37d9d>${ssrInterpolate($props.label)}</label><input type="tel" class="native-phone-input"${ssrRenderAttr("placeholder", $props.placeholder || "+33 6 12 34 56 78")}${ssrRenderAttr("value", $props.modelValue)}${ssrIncludeBooleanAttr($props.disabled) ? " disabled" : ""}${ssrIncludeBooleanAttr($props.required) ? " required" : ""} maxlength="40" data-v-cdf37d9d>`);
  if ($props.modelValue) {
    _push(`<button class="clear-btn" type="button" aria-label="Effacer le num\xE9ro" data-v-cdf37d9d>\xD7</button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="input-decoration" data-v-cdf37d9d></div>`);
  if ($props.error) {
    _push(`<div class="error-message" data-v-cdf37d9d>${ssrInterpolate($props.error)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PhoneInput.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-cdf37d9d"]]);
const _sfc_main$1 = {
  name: "ContactForm",
  components: {
    PhoneInput: __nuxt_component_0
  },
  data() {
    return {
      form: {
        firstName: "",
        email: "",
        phone: ""
      },
      errors: {
        firstName: "",
        email: "",
        phone: ""
      },
      isLoading: false,
      showSuccess: false,
      errorMessage: ""
    };
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      this.errorMessage = "";
      this.showSuccess = false;
      this.clearErrors();
      try {
        if (!this.validateForm()) {
          return;
        }
        console.log("Envoi du formulaire:", this.form);
        const sessionId = false ? localStorage.getItem("yaal_session_id") : null;
        const response = await $fetch("/api/contacts/add", {
          method: "POST",
          body: {
            firstName: this.form.firstName,
            email: this.form.email,
            phone: this.form.phone,
            source: "Landing Page",
            countryCode: this.form.countryCode,
            dialCode: this.form.dialCode,
            sessionId,
            // Ajouter le sessionId pour marquer la conversion
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        });
        if (response.success) {
          this.showSuccess = true;
          this.resetForm();
          setTimeout(() => {
            this.$router.push("/merci");
          }, 2e3);
        } else {
          throw new Error(response.message || "Erreur lors de l'inscription");
        }
      } catch (error) {
        console.error("Erreur inscription:", error);
        this.errorMessage = error.message || "Une erreur est survenue. Veuillez r\xE9essayer.";
      } finally {
        this.isLoading = false;
      }
    },
    validateForm() {
      let isValid = true;
      this.clearErrors();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.form.email)) {
        this.errors.email = "Veuillez entrer une adresse email valide";
        this.errorMessage = "Veuillez entrer une adresse email valide";
        isValid = false;
      }
      const phoneRegex = /^[+]?[1-9][\d\s\-()]{7,15}$/;
      if (!phoneRegex.test(this.form.phone.replace(/\s/g, ""))) {
        this.errors.phone = "Veuillez entrer un num\xE9ro de t\xE9l\xE9phone valide";
        this.errorMessage = "Veuillez entrer un num\xE9ro de t\xE9l\xE9phone valide";
        isValid = false;
      }
      if (this.form.firstName.trim().length < 2) {
        this.errors.firstName = "Le pr\xE9nom doit contenir au moins 2 caract\xE8res";
        this.errorMessage = "Le pr\xE9nom doit contenir au moins 2 caract\xE8res";
        isValid = false;
      }
      return isValid;
    },
    clearErrors() {
      this.errors = {
        firstName: "",
        email: "",
        phone: ""
      };
    },
    resetForm() {
      this.form = {
        firstName: "",
        email: "",
        phone: "",
        countryCode: "FR",
        dialCode: "+33"
      };
      this.clearErrors();
    },
    handleCountryChange(country) {
      console.log("Pays s\xE9lectionn\xE9:", country.name, country.dialCode);
      this.form.countryCode = country.iso2;
      this.form.dialCode = country.dialCode;
      if (this.errors.phone) {
        this.errors.phone = "";
      }
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_PhoneInput = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "contact-form-container" }, _attrs))} data-v-8a1bd0aa><div class="form-wrapper" data-v-8a1bd0aa><div class="form-decorations" data-v-8a1bd0aa><div class="decoration-dot dot-1" data-v-8a1bd0aa></div><div class="decoration-dot dot-2" data-v-8a1bd0aa></div><div class="decoration-line" data-v-8a1bd0aa></div></div><div class="form-header fade-in-up" data-v-8a1bd0aa><h2 class="form-title" data-v-8a1bd0aa> Aucun spam. Juste de la <span class="text-highlight script-font" data-v-8a1bd0aa>clart\xE9</span>, des ressources et de vraies strat\xE9gies. </h2></div><form class="form-content" data-v-8a1bd0aa><div class="input-group fade-in-up delay-1" data-v-8a1bd0aa><label class="input-label" data-v-8a1bd0aa>Email</label><input${ssrRenderAttr("value", $data.form.email)} type="email" class="form-input" placeholder="votre@email.com" required${ssrIncludeBooleanAttr($data.isLoading) ? " disabled" : ""} data-v-8a1bd0aa><div class="input-decoration" data-v-8a1bd0aa></div></div><div class="input-group fade-in-up delay-2" data-v-8a1bd0aa>`);
  _push(ssrRenderComponent(_component_PhoneInput, {
    modelValue: $data.form.phone,
    "onUpdate:modelValue": ($event) => $data.form.phone = $event,
    label: "WhatsApp",
    placeholder: "+33 6 00 00 00 00",
    disabled: $data.isLoading,
    error: $data.errors.phone,
    onCountryChanged: $options.handleCountryChange
  }, null, _parent));
  _push(`</div><div class="input-group fade-in-up delay-3" data-v-8a1bd0aa><label class="input-label" data-v-8a1bd0aa>Pr\xE9nom</label><input${ssrRenderAttr("value", $data.form.firstName)} type="text" class="form-input" placeholder="Marie" required${ssrIncludeBooleanAttr($data.isLoading) ? " disabled" : ""} data-v-8a1bd0aa><div class="input-decoration" data-v-8a1bd0aa></div></div><div class="form-submit fade-in-up delay-4" data-v-8a1bd0aa><button type="submit" class="submit-button"${ssrIncludeBooleanAttr($data.isLoading) ? " disabled" : ""} data-v-8a1bd0aa>`);
  if (!$data.isLoading) {
    _push(`<span class="btn-content" data-v-8a1bd0aa><span class="btn-text" data-v-8a1bd0aa>OUI, JE VEUX RECEVOIR LE GUIDE</span><span class="btn-arrow" data-v-8a1bd0aa>\u2192</span></span>`);
  } else {
    _push(`<span class="loading-content" data-v-8a1bd0aa><span class="loading-spinner" data-v-8a1bd0aa></span> Inscription en cours... </span>`);
  }
  _push(`</button></div><p class="privacy-text fade-in-up delay-4" data-v-8a1bd0aa> Pas de spam. <span class="script-font" data-v-8a1bd0aa>D\xE9sinscription</span> \xE0 tout moment. </p></form>`);
  if ($data.showSuccess) {
    _push(`<div class="notification success-notification fade-in-up" data-v-8a1bd0aa><div class="notification-icon success-icon" data-v-8a1bd0aa>\u2713</div><p data-v-8a1bd0aa>Parfait ! Vous recevrez bient\xF4t votre guide par email.</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.errorMessage) {
    _push(`<div class="notification error-notification fade-in-up" data-v-8a1bd0aa><div class="notification-icon error-icon" data-v-8a1bd0aa>\u2717</div><p data-v-8a1bd0aa>${ssrInterpolate($data.errorMessage)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContactForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-8a1bd0aa"]]);
const _imports_0 = publicAssetsURL("/ebok.webp");
const _sfc_main = {
  name: "LandingPage",
  components: {
    ContactForm: __nuxt_component_2,
    HeroSection: __nuxt_component_0$1,
    ClassesSection: __nuxt_component_1
  },
  head() {
    return {
      title: "YaalStudio - Une maison est en train de na\xEEtre",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "YaalStudio - Maison de strat\xE9gie pour donner forme aux id\xE9es et structurer les visions. Rejoignez les premi\xE8res pour recevoir vos ressources exclusives."
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "YaalStudio - Une maison est en train de na\xEEtre"
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Maison de strat\xE9gie pour donner forme aux id\xE9es et structurer les visions. Rejoignez les premi\xE8res pour recevoir vos ressources exclusives."
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "website"
        }
      ]
    };
  },
  mounted() {
    this.initAnimations();
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
    scrollToClasses() {
      const classesSection = (void 0).querySelector(".classes-section");
      if (classesSection) {
        classesSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    },
    handleClassesCTA() {
      const contactSection = (void 0).querySelector("#contact-section");
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeroSection = __nuxt_component_0$1;
  const _component_ClassesSection = __nuxt_component_1;
  const _component_ContactForm = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "landing-page" }, _attrs))} data-v-fcd5102a>`);
  _push(ssrRenderComponent(_component_HeroSection, { onCtaClicked: $options.scrollToClasses }, null, _parent));
  _push(ssrRenderComponent(_component_ClassesSection, { onCtaClicked: $options.handleClassesCTA }, null, _parent));
  _push(`<section class="signup-section" id="contact-section" data-v-fcd5102a><div class="twinkling-dots" data-v-fcd5102a><div class="dot dot-1" data-v-fcd5102a></div><div class="dot dot-2" data-v-fcd5102a></div><div class="dot dot-3" data-v-fcd5102a></div><div class="dot dot-4" data-v-fcd5102a></div><div class="dot dot-5" data-v-fcd5102a></div><div class="dot dot-6" data-v-fcd5102a></div><div class="dot dot-7" data-v-fcd5102a></div><div class="dot dot-8" data-v-fcd5102a></div><div class="dot dot-9" data-v-fcd5102a></div><div class="dot dot-10" data-v-fcd5102a></div></div><div class="container" data-v-fcd5102a><div class="signup-main-grid" data-v-fcd5102a><div class="signup-left" data-v-fcd5102a><div class="signup-left-inner" data-v-fcd5102a><h2 class="signup-title" data-v-fcd5102a>Tu veux une marque lisible,<br data-v-fcd5102a>strat\xE9gique, durable\xA0?</h2><p class="signup-subtitle" data-v-fcd5102a>Pose les fondations. Commence maintenant.</p><div class="signup-ebook-imgblock" data-v-fcd5102a><div class="ebook-container" data-v-fcd5102a><div class="ebook-card-outer" data-v-fcd5102a><div class="ebook-card-inner" data-v-fcd5102a><img${ssrRenderAttr("src", _imports_0)} alt="Ebook Les 5 fondations invisibles de ton empire" class="ebook-image-3d" data-v-fcd5102a></div></div></div></div></div></div><div class="signup-form-column fade-in-up delay-3" data-v-fcd5102a>`);
  _push(ssrRenderComponent(_component_ContactForm, null, null, _parent));
  _push(`</div></div></div></section><footer class="modern-footer" data-v-fcd5102a><div class="container" data-v-fcd5102a><div class="footer-content" data-v-fcd5102a><div class="footer-header" data-v-fcd5102a><h3 class="footer-brand" data-v-fcd5102a>YAALSTUDIO</h3><p class="footer-tagline" data-v-fcd5102a>L\xE0 o\xF9 naissent les empires de demain</p></div><div class="footer-grid" data-v-fcd5102a><div class="footer-section" data-v-fcd5102a><h4 class="footer-section-title" data-v-fcd5102a>Contact</h4><div class="footer-links" data-v-fcd5102a><a href="mailto:contact@yaalstudio.com" class="footer-link" data-v-fcd5102a> contact@yaalstudio.com </a></div></div><div class="footer-section" data-v-fcd5102a><h4 class="footer-section-title" data-v-fcd5102a>L\xE9gal</h4><div class="footer-links" data-v-fcd5102a><a href="#" class="footer-link" data-v-fcd5102a>Mentions l\xE9gales</a><a href="#" class="footer-link" data-v-fcd5102a>Politique de confidentialit\xE9</a><a href="#" class="footer-link" data-v-fcd5102a>Conditions d&#39;utilisation</a></div></div></div><div class="footer-bottom" data-v-fcd5102a><div class="footer-separator" data-v-fcd5102a></div><div class="footer-copyright" data-v-fcd5102a><p data-v-fcd5102a>\xA9 2025 YaalStudio. Tous droits r\xE9serv\xE9s. D\xE9velopp\xE9 par <a href="https://the-syklop.srv557357.hstgr.cloud/" class="footer-link" data-v-fcd5102a>The sy-klop</a></p><p class="footer-made-with" data-v-fcd5102a>Con\xE7u avec excellence pour les visionnaires</p></div></div></div></div></footer></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-fcd5102a"]]);

export { index as default };
//# sourceMappingURL=index-CoUiYV_7.mjs.map
