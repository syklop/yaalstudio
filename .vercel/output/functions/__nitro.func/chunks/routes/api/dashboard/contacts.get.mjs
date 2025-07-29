import { d as defineEventHandler, e as getHeader, f as extractTokenFromHeader, v as verifyToken, c as createError, h as getQuery, a as prisma } from '../../../_/nitro.mjs';
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

const contacts_get = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token || !verifyToken(token)) {
      throw createError({
        statusCode: 401,
        statusMessage: "Non autoris\xE9"
      });
    }
    const query = getQuery(event);
    const {
      page = 1,
      limit = 20,
      search = "",
      status = "",
      source = "",
      dateFrom,
      dateTo
    } = query;
    const where = {};
    if (search && search.trim()) {
      where.OR = [
        { firstName: { contains: search.trim(), mode: "insensitive" } },
        { email: { contains: search.trim(), mode: "insensitive" } },
        { phone: { contains: search.trim() } }
      ];
    }
    if (status && status !== "" && status !== "all") {
      where.status = status;
    }
    if (source && source !== "" && source !== "all") {
      where.source = source;
    }
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        where.createdAt.gte = new Date(dateFrom);
      }
      if (dateTo) {
        where.createdAt.lte = new Date(dateTo);
      }
    }
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;
    const [contacts, totalCount] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: {
          createdAt: "desc"
        },
        skip,
        take: limitNum,
        select: {
          id: true,
          firstName: true,
          email: true,
          phone: true,
          source: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          // Informations géographiques
          country: true,
          city: true,
          countryCode: true,
          dialCode: true,
          // Informations techniques pour analytics
          userAgent: true,
          ipAddress: true,
          referrer: true
        }
      }),
      prisma.contact.count({ where })
    ]);
    const totalPages = Math.ceil(totalCount / limitNum);
    const formattedContacts = contacts.map((contact) => ({
      id: contact.id,
      firstName: contact.firstName || "",
      email: contact.email || "",
      phone: contact.phone || "",
      source: contact.source || "Inconnu",
      status: contact.status || "Non trait\xE9",
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
      // Métadonnées optionnelles
      country: contact.country,
      city: contact.city,
      countryCode: contact.countryCode,
      dialCode: contact.dialCode,
      userAgent: contact.userAgent,
      ipAddress: contact.ipAddress,
      referrer: contact.referrer
    }));
    return {
      success: true,
      data: {
        contacts: formattedContacts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: totalCount,
          totalPages,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        },
        filters: {
          search: search || "",
          status: status || "",
          source: source || ""
        }
      }
    };
  } catch (error) {
    console.error("\u274C Erreur contacts:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de la r\xE9cup\xE9ration des contacts"
    });
  }
});

export { contacts_get as default };
//# sourceMappingURL=contacts.get.mjs.map
