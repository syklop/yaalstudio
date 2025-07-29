import { useAuthStore } from './auth-C8D5J8YS.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderDynamicModel, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import 'pinia';
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
  name: "LoginPage",
  layout: false,
  // Pas de layout pour la page de login
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      showPassword: false,
      loading: false,
      errorMessage: ""
    };
  },
  computed: {
    isFormValid() {
      return this.form.email && this.form.password && this.form.email.includes("@");
    }
  },
  mounted() {
    const authStore = useAuthStore();
    if (authStore.isLoggedIn) {
      this.$router.push("/dashboard");
    }
    if (this.$route.query.email) {
      this.form.email = this.$route.query.email;
    }
    this.watchError();
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = "";
      try {
        const authStore = useAuthStore();
        console.log("\u{1F510} Tentative de connexion admin...");
        const result = await authStore.login({
          email: this.form.email,
          password: this.form.password
        });
        if (result.success) {
          console.log("\u2705 Connexion r\xE9ussie, redirection...");
          const redirectTo = this.$route.query.redirect || "/dashboard";
          await this.$router.push(redirectTo);
        } else {
          this.errorMessage = result.error || "Erreur de connexion";
        }
      } catch (error) {
        console.error("\u274C Erreur login:", error);
        this.errorMessage = "Identifiants incorrects ou erreur de connexion";
      } finally {
        this.loading = false;
      }
    },
    watchError() {
      this.$watch("errorMessage", (newVal) => {
        if (newVal) {
          setTimeout(() => {
            this.errorMessage = "";
          }, 5e3);
        }
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-04ee6e90><div class="decorative-bg" data-v-04ee6e90><div class="floating-dot dot-1" data-v-04ee6e90></div><div class="floating-dot dot-2" data-v-04ee6e90></div><div class="floating-dot dot-3" data-v-04ee6e90></div><div class="floating-dot dot-4" data-v-04ee6e90></div><div class="geometric-line line-1" data-v-04ee6e90></div><div class="geometric-line line-2" data-v-04ee6e90></div></div><div class="login-container" data-v-04ee6e90><div class="login-card" data-v-04ee6e90><div class="login-header" data-v-04ee6e90><h1 class="login-title" data-v-04ee6e90><span class="title-main" data-v-04ee6e90>YaalStudio</span><span class="title-sub" data-v-04ee6e90>Administration</span></h1><p class="login-subtitle" data-v-04ee6e90> Connectez-vous pour acc\xE9der au dashboard </p></div><form class="login-form" data-v-04ee6e90><div class="form-group" data-v-04ee6e90><label for="email" class="form-label" data-v-04ee6e90>Email</label><input id="email"${ssrRenderAttr("value", $data.form.email)} type="email" class="form-input" placeholder="admin@yaalstudio.com" required${ssrIncludeBooleanAttr($data.loading) ? " disabled" : ""} autocomplete="email" data-v-04ee6e90></div><div class="form-group" data-v-04ee6e90><label for="password" class="form-label" data-v-04ee6e90>Mot de passe</label><div class="password-input-wrapper" data-v-04ee6e90><input id="password"${ssrRenderDynamicModel($data.showPassword ? "text" : "password", $data.form.password, null)}${ssrRenderAttr("type", $data.showPassword ? "text" : "password")} class="form-input" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required${ssrIncludeBooleanAttr($data.loading) ? " disabled" : ""} autocomplete="current-password" data-v-04ee6e90><button type="button" class="password-toggle"${ssrIncludeBooleanAttr($data.loading) ? " disabled" : ""} data-v-04ee6e90>`);
  if ($data.showPassword) {
    _push(`<span data-v-04ee6e90>\u{1F441}\uFE0F</span>`);
  } else {
    _push(`<span data-v-04ee6e90>\u{1F648}</span>`);
  }
  _push(`</button></div></div>`);
  if ($data.errorMessage) {
    _push(`<div class="error-message" data-v-04ee6e90><span class="error-icon" data-v-04ee6e90>\u26A0\uFE0F</span> ${ssrInterpolate($data.errorMessage)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<button type="submit" class="login-button"${ssrIncludeBooleanAttr($data.loading || !$options.isFormValid) ? " disabled" : ""} data-v-04ee6e90>`);
  if ($data.loading) {
    _push(`<span class="loading-content" data-v-04ee6e90><span class="loading-spinner" data-v-04ee6e90></span> Connexion... </span>`);
  } else {
    _push(`<span class="button-content" data-v-04ee6e90><span class="button-text" data-v-04ee6e90>Se connecter</span><span class="button-arrow" data-v-04ee6e90>\u2192</span></span>`);
  }
  _push(`</button></form><div class="login-footer" data-v-04ee6e90><p class="footer-text" data-v-04ee6e90> Acc\xE8s r\xE9serv\xE9 aux administrateurs YaalStudio </p><button type="button" class="back-link" data-v-04ee6e90> \u2190 Retour au site </button></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-04ee6e90"]]);

export { login as default };
//# sourceMappingURL=login-DpTkL_gz.mjs.map
