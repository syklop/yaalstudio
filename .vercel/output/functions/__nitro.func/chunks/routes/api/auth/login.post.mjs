import { d as defineEventHandler, r as readBody, c as createError, a as prisma, g as generateToken, b as getExpiryDate, e as getHeader } from '../../../_/nitro.mjs';
import bcrypt from 'bcryptjs';
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

const login_post = defineEventHandler(async (event) => {
  try {
    console.log("\u{1F510} Tentative de connexion admin");
    const body = await readBody(event);
    const { email, password } = body;
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email et mot de passe requis"
      });
    }
    const ADMIN_EMAIL = "admin@yaalstudio.com";
    console.log("\u{1F4E7} Email re\xE7u:", email);
    console.log("\u{1F511} Mot de passe re\xE7u:", password);
    console.log("\u{1F4E7} Email admin attendu:", ADMIN_EMAIL);
    if (email !== ADMIN_EMAIL) {
      console.log("\u274C Email admin incorrect");
      console.log("Email re\xE7u:", `"${email}"`);
      console.log("Email attendu:", `"${ADMIN_EMAIL}"`);
      throw createError({
        statusCode: 401,
        statusMessage: "Identifiants incorrects"
      });
    }
    const ADMIN_PASSWORD = "Yaal@Studio2024!Admin";
    if (password !== ADMIN_PASSWORD) {
      console.log("\u274C Mot de passe admin incorrect");
      console.log("Mot de passe re\xE7u:", password);
      console.log("Mot de passe attendu:", ADMIN_PASSWORD);
      throw createError({
        statusCode: 401,
        statusMessage: "Identifiants incorrects"
      });
    }
    console.log("\u2705 Mot de passe admin correct");
    let admin = await prisma.admin.findUnique({
      where: { email: ADMIN_EMAIL }
    });
    if (!admin) {
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
      admin = await prisma.admin.create({
        data: {
          email: ADMIN_EMAIL,
          password: hashedPassword,
          name: "Administrateur YaalStudio"
        }
      });
      console.log("\u2705 Compte admin cr\xE9\xE9");
    }
    const tokenPayload = {
      adminId: admin.id,
      email: admin.email,
      type: "admin"
    };
    const token = generateToken(tokenPayload);
    const expiryDate = getExpiryDate();
    const userAgent = getHeader(event, "user-agent") || "";
    const ipAddress = getHeader(event, "x-forwarded-for") || getHeader(event, "x-real-ip") || "unknown";
    await prisma.adminSession.create({
      data: {
        token,
        adminId: admin.id,
        expiresAt: expiryDate,
        userAgent,
        ipAddress
      }
    });
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: /* @__PURE__ */ new Date() }
    });
    console.log("\u2705 Connexion admin r\xE9ussie");
    return {
      success: true,
      message: "Connexion r\xE9ussie",
      data: {
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          lastLogin: admin.lastLogin
        },
        token,
        expiry: expiryDate.toISOString()
      }
    };
  } catch (error) {
    console.error("\u274C Erreur login admin:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur interne du serveur"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
