import { d as defineEventHandler, e as getHeader, f as extractTokenFromHeader, a as prisma } from '../../../_/nitro.mjs';
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

const logout_post = defineEventHandler(async (event) => {
  try {
    console.log("\u{1F6AA} D\xE9connexion admin");
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token) {
      console.log("\u26A0\uFE0F Aucun token fourni pour la d\xE9connexion");
      return {
        success: true,
        message: "D\xE9connexion r\xE9ussie"
      };
    }
    try {
      await prisma.adminSession.delete({
        where: { token }
      });
      console.log("\u2705 Session supprim\xE9e de la base de donn\xE9es");
    } catch (error) {
      console.log("\u26A0\uFE0F Session non trouv\xE9e en base:", error.message);
    }
    return {
      success: true,
      message: "D\xE9connexion r\xE9ussie"
    };
  } catch (error) {
    console.error("\u274C Erreur logout:", error);
    return {
      success: true,
      message: "D\xE9connexion r\xE9ussie"
    };
  }
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
