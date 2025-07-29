import { defineStore } from 'pinia';
import { n as navigateTo } from './server.mjs';
import 'vue';
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
import 'vue/server-renderer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    isCheckingAuth: false,
    isInitialized: false,
    user: null,
    token: null,
    sessionExpiry: null,
    lastActivity: null,
    error: null
  }),
  getters: {
    isLoggedIn: (state) => state.isAuthenticated && !!state.token,
    isSessionExpired: (state) => {
      if (!state.sessionExpiry) return false;
      return /* @__PURE__ */ new Date() > new Date(state.sessionExpiry);
    },
    userInfo: (state) => state.user,
    authToken: (state) => state.token,
    checkingAuth: (state) => state.isCheckingAuth,
    isAdmin: (state) => {
      var _a;
      return state.isAuthenticated && ((_a = state.user) == null ? void 0 : _a.email);
    }
  },
  actions: {
    async initAuth() {
      if (this.isCheckingAuth) {
        console.log("\u{1F511} Auth d\xE9j\xE0 en cours - Attente...");
        let attempts = 0;
        const maxAttempts = 50;
        while (this.isCheckingAuth && attempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          attempts++;
        }
        console.log("\u{1F511} Auth - Attente termin\xE9e, retour \xE9tat:", this.isAuthenticated);
        return this.isAuthenticated;
      }
      if (this.isInitialized) {
        console.log("\u{1F511} Auth d\xE9j\xE0 initialis\xE9:", this.isAuthenticated);
        return this.isAuthenticated;
      }
      try {
        this.isCheckingAuth = true;
        console.log("\u{1F511} D\xE9but initialisation auth...");
        if (false) ;
        console.log("\u2139\uFE0F Aucune authentification disponible");
        return false;
      } catch (error) {
        console.error("\u274C Erreur critique lors de l'initialisation auth:", error);
        this.error = error.message;
        await this.clearAuthData();
        return false;
      } finally {
        this.isCheckingAuth = false;
        this.isInitialized = true;
        console.log("\u{1F511} Initialisation auth termin\xE9e, \xE9tat final:", this.isAuthenticated);
      }
    },
    async clearAuthData() {
      console.log("\u{1F9F9} Nettoyage donn\xE9es auth...");
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      this.sessionExpiry = null;
      this.lastActivity = null;
      this.error = null;
    },
    async login(credentials) {
      var _a;
      try {
        this.loading = true;
        this.error = null;
        const response = await $fetch("/api/auth/login", {
          method: "POST",
          body: {
            email: credentials.email,
            password: credentials.password
          }
        });
        if (response.success && response.data) {
          this.isAuthenticated = true;
          this.user = response.data.user;
          this.token = response.data.token;
          this.sessionExpiry = response.data.expiry;
          this.lastActivity = (/* @__PURE__ */ new Date()).toISOString();
          if (false) ;
          console.log("\u2705 Connexion r\xE9ussie");
          return { success: true, user: response.data.user };
        } else {
          throw new Error(response.message || "Erreur de connexion");
        }
      } catch (error) {
        console.error("\u274C Erreur de connexion:", error);
        this.error = ((_a = error.data) == null ? void 0 : _a.message) || error.message || "Erreur de connexion";
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
    async logout(skipNavigation = false) {
      console.log("\u{1F6AA} D\xE9but d\xE9connexion...");
      try {
        if (this.token) {
          try {
            await $fetch("/api/auth/logout", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${this.token}`
              }
            });
            console.log("\u2705 Serveur notifi\xE9 de la d\xE9connexion");
          } catch (error) {
            console.warn("\u26A0\uFE0F Erreur d\xE9connexion serveur (continuons quand m\xEAme):", error.message);
          }
        }
        await this.clearAuthData();
        console.log("\u2705 D\xE9connexion r\xE9ussie");
        if (!skipNavigation) {
          await navigateTo("/login");
        }
      } catch (error) {
        console.error("\u274C Erreur critique lors de la d\xE9connexion:", error);
        await this.clearAuthData();
        if (!skipNavigation) {
          await navigateTo("/login");
        }
      }
    },
    async verifyToken() {
      try {
        if (!this.token) return false;
        const response = await $fetch("/api/auth/verify", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${this.token}`
          }
        });
        if (response.success) {
          if (response.data.user) {
            this.user = response.data.user;
            if (false) ;
          }
          this.lastActivity = (/* @__PURE__ */ new Date()).toISOString();
          return true;
        } else {
          this.logout();
          return false;
        }
      } catch (error) {
        console.error("\u274C Erreur v\xE9rification token:", error);
        this.logout();
        return false;
      }
    },
    updateActivity() {
      this.lastActivity = (/* @__PURE__ */ new Date()).toISOString();
      if (this.isSessionExpired) {
        this.logout();
      }
    },
    clearError() {
      this.error = null;
    },
    setError(message) {
      this.error = message;
    }
  }
});

export { useAuthStore };
//# sourceMappingURL=auth-C8D5J8YS.mjs.map
