import { d as defineEventHandler, e as getHeader, f as extractTokenFromHeader, v as verifyToken, c as createError, a as prisma } from '../../_/nitro.mjs';
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

const databaseStatus_get = defineEventHandler(async (event) => {
  try {
    console.log("\u{1F4CA} V\xE9rification du statut de la base de donn\xE9es");
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token || !verifyToken(token)) {
      throw createError({
        statusCode: 401,
        statusMessage: "Non autoris\xE9"
      });
    }
    const [
      contactsCount,
      visitorsCount,
      contactsByStatus,
      contactsBySource,
      recentContacts
    ] = await Promise.all([
      // Total des contacts
      prisma.contact.count(),
      // Total des visiteurs
      prisma.visitor.count(),
      // Répartition par statut
      prisma.contact.groupBy({
        by: ["status"],
        _count: {
          status: true
        }
      }),
      // Répartition par source
      prisma.contact.groupBy({
        by: ["source"],
        _count: {
          source: true
        }
      }),
      // Contacts récents (derniers 7 jours)
      prisma.contact.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3)
          }
        }
      })
    ]);
    const status = {
      database: {
        connected: true,
        provider: "sqlite"
      },
      counts: {
        contacts: contactsCount,
        visitors: visitorsCount,
        recentContacts
      },
      distribution: {
        byStatus: contactsByStatus.reduce((acc, item) => {
          acc[item.status] = item._count.status;
          return acc;
        }, {}),
        bySource: contactsBySource.reduce((acc, item) => {
          acc[item.source || "Unknown"] = item._count.source;
          return acc;
        }, {})
      },
      isEmpty: contactsCount === 0,
      needsSeeding: contactsCount === 0
    };
    console.log("\u2705 Statut base de donn\xE9es r\xE9cup\xE9r\xE9:", status);
    return {
      success: true,
      data: status
    };
  } catch (error) {
    console.error("\u274C Erreur statut base de donn\xE9es:", error);
    return {
      success: false,
      error: "Erreur de connexion \xE0 la base de donn\xE9es",
      data: {
        database: {
          connected: false,
          error: error.message
        },
        isEmpty: true,
        needsSeeding: true
      }
    };
  }
});

export { databaseStatus_get as default };
//# sourceMappingURL=database-status.get.mjs.map
