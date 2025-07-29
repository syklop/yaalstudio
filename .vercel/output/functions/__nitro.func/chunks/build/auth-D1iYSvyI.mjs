import { F as executeAsync } from '../_/nitro.mjs';
import { e as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import 'googleapis';
import 'jsonwebtoken';
import '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue';
import 'consola';
import '@iconify/utils';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'pinia';
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

const auth = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  console.log("\u{1F6E1}\uFE0F Middleware auth - Route:", to.path, "depuis:", from == null ? void 0 : from.path);
  if (to.path === "/login" && (from == null ? void 0 : from.path) === "/login") {
    console.log("\u{1F504} \xC9vitement boucle de redirection login");
    return;
  }
  if (to.path.startsWith("/dashboard")) {
    console.log("\u{1F50D} Acc\xE8s dashboard - V\xE9rification stricte...");
    try {
      const { useAuthStore } = ([__temp, __restore] = executeAsync(() => import('./auth-C8D5J8YS.mjs')), __temp = await __temp, __restore(), __temp);
      const authStore = useAuthStore();
      if (!authStore.isInitialized) {
        console.log("\u26A1 Initialisation auth en cours...");
        const isAuthenticated = ([__temp, __restore] = executeAsync(() => authStore.initAuth()), __temp = await __temp, __restore(), __temp);
        if (!isAuthenticated) {
          console.log("\u274C \xC9chec authentification - Redirection login");
          return navigateTo("/login?redirect=" + encodeURIComponent(to.fullPath));
        }
      }
      if (!authStore.isLoggedIn || authStore.isSessionExpired) {
        console.log("\u274C Non authentifi\xE9 ou session expir\xE9e - Redirection login");
        try {
          ;
          [__temp, __restore] = executeAsync(() => authStore.clearAuthData()), await __temp, __restore();
        } catch (clearError) {
          console.warn("\u26A0\uFE0F Erreur nettoyage donn\xE9es auth:", clearError);
        }
        return navigateTo("/login?redirect=" + encodeURIComponent(to.fullPath));
      }
      console.log("\u2705 Authentification valid\xE9e - Acc\xE8s dashboard autoris\xE9");
    } catch (error) {
      console.error("\u274C Erreur critique middleware:", error);
      return navigateTo("/login?error=auth_error");
    }
  }
  if (to.path === "/login") {
    try {
      const { useAuthStore } = ([__temp, __restore] = executeAsync(() => import('./auth-C8D5J8YS.mjs')), __temp = await __temp, __restore(), __temp);
      const authStore = useAuthStore();
      if (authStore.isInitialized && authStore.isLoggedIn && !authStore.isSessionExpired) {
        console.log("\u{1F504} D\xE9j\xE0 connect\xE9 - Redirection vers dashboard");
        const redirectTo = to.query.redirect || "/dashboard";
        return navigateTo(redirectTo);
      }
    } catch (error) {
      console.error("\u274C Erreur v\xE9rification login:", error);
    }
  }
});

export { auth as default };
//# sourceMappingURL=auth-D1iYSvyI.mjs.map
