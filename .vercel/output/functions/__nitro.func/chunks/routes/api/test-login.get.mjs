import { d as defineEventHandler, j as useRuntimeConfig } from '../../_/nitro.mjs';
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

const testLogin_get = defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const ADMIN_EMAIL = "admin@yaalstudio.com";
  const ADMIN_PASSWORD = "Yaal@Studio2024!Admin";
  return {
    success: true,
    adminCredentials: {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD.substring(0, 4) + "***"
      // Masquer le mot de passe
    },
    config: {
      brevoEmail: config.adminEmail,
      // Email Brevo pour les envois
      hasJwtSecret: !!config.jwtSecret
    },
    env: {
      NODE_ENV: "production",
      brevoEmailFromEnv: process.env.ADMIN_EMAIL
      // Email Brevo
    }
  };
});

export { testLogin_get as default };
//# sourceMappingURL=test-login.get.mjs.map
