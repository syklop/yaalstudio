import { d as defineEventHandler, e as getHeader, f as extractTokenFromHeader, v as verifyToken, c as createError, i as getRouterParam, r as readBody, a as prisma } from '../../../../_/nitro.mjs';
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

const _id__patch = defineEventHandler(async (event) => {
  try {
    console.log("\u270F\uFE0F Mise \xE0 jour du statut contact");
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token || !verifyToken(token)) {
      throw createError({
        statusCode: 401,
        statusMessage: "Non autoris\xE9"
      });
    }
    const contactId = getRouterParam(event, "id");
    if (!contactId) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID du contact manquant"
      });
    }
    const body = await readBody(event);
    const { status } = body;
    if (!status) {
      throw createError({
        statusCode: 400,
        statusMessage: "Statut manquant"
      });
    }
    const validStatuses = ["Non trait\xE9", "Trait\xE9", "Relanc\xE9"];
    if (!validStatuses.includes(status)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Statut invalide"
      });
    }
    const existingContact = await prisma.contact.findUnique({
      where: { id: contactId }
    });
    if (!existingContact) {
      throw createError({
        statusCode: 404,
        statusMessage: "Contact non trouv\xE9"
      });
    }
    const updatedContact = await prisma.contact.update({
      where: { id: contactId },
      data: {
        status,
        updatedAt: /* @__PURE__ */ new Date()
      },
      select: {
        id: true,
        firstName: true,
        email: true,
        status: true,
        updatedAt: true
      }
    });
    console.log(`\u2705 Statut du contact ${contactId} mis \xE0 jour: ${status}`);
    return {
      success: true,
      message: "Statut mis \xE0 jour avec succ\xE8s",
      data: {
        contact: updatedContact
      }
    };
  } catch (error) {
    console.error("\u274C Erreur mise \xE0 jour contact:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de la mise \xE0 jour du contact"
    });
  }
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
