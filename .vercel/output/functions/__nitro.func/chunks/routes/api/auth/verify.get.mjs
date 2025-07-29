import { d as defineEventHandler, e as getHeader, f as extractTokenFromHeader, c as createError, v as verifyToken, a as prisma } from '../../../_/nitro.mjs';
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

const verify_get = defineEventHandler(async (event) => {
  try {
    console.log("\u{1F50D} V\xE9rification token admin");
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token manquant"
      });
    }
    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token invalide"
      });
    }
    const session = await prisma.adminSession.findUnique({
      where: { token },
      include: {
        admin: {
          select: {
            id: true,
            email: true,
            name: true,
            lastLogin: true
          }
        }
      }
    });
    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: "Session non trouv\xE9e"
      });
    }
    if (/* @__PURE__ */ new Date() > session.expiresAt) {
      await prisma.adminSession.delete({
        where: { token }
      });
      throw createError({
        statusCode: 401,
        statusMessage: "Session expir\xE9e"
      });
    }
    console.log("\u2705 Token valide pour admin:", session.admin.email);
    return {
      success: true,
      message: "Token valide",
      data: {
        user: session.admin,
        session: {
          expiresAt: session.expiresAt,
          createdAt: session.createdAt
        }
      }
    };
  } catch (error) {
    console.error("\u274C Erreur v\xE9rification token:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur interne du serveur"
    });
  }
});

export { verify_get as default };
//# sourceMappingURL=verify.get.mjs.map
