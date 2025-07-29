import { d as defineEventHandler, r as readBody, c as createError, e as getHeader, a as prisma } from '../../../_/nitro.mjs';
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

const add_post = defineEventHandler(async (event) => {
  try {
    console.log("\u{1F680} D\xE9but traitement contact avec Prisma");
    const body = await readBody(event);
    const {
      firstName,
      email,
      phone,
      source = "Landing Page",
      countryCode,
      dialCode,
      sessionId
      // ID de session pour le tracking des visiteurs
    } = body;
    console.log("\u{1F4DD} Donn\xE9es re\xE7ues:", { firstName, email, phone, source });
    if (!firstName || !email || !phone) {
      throw createError({
        statusCode: 400,
        statusMessage: "Tous les champs sont requis (pr\xE9nom, email, t\xE9l\xE9phone)"
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Format d'email invalide"
      });
    }
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-()]/g, ""))) {
      throw createError({
        statusCode: 400,
        statusMessage: "Format de t\xE9l\xE9phone invalide"
      });
    }
    const userAgent = getHeader(event, "user-agent") || "";
    const ipAddress = getHeader(event, "x-forwarded-for") || getHeader(event, "x-real-ip") || "unknown";
    const referrer = getHeader(event, "referer") || "";
    let contactSuccess = false;
    let contactError = null;
    let contactData = null;
    try {
      console.log("\u{1F4BE} Tentative d'ajout dans la base de donn\xE9es Prisma");
      const existingContact = await prisma.contact.findUnique({
        where: { email: email.toLowerCase().trim() }
      });
      if (existingContact) {
        console.log("\u26A0\uFE0F Contact d\xE9j\xE0 existant, mise \xE0 jour...");
        contactData = await prisma.contact.update({
          where: { email: email.toLowerCase().trim() },
          data: {
            firstName: firstName.trim(),
            phone: phone.trim(),
            source,
            countryCode,
            dialCode,
            userAgent,
            ipAddress,
            referrer,
            updatedAt: /* @__PURE__ */ new Date()
          }
        });
      } else {
        contactData = await prisma.contact.create({
          data: {
            firstName: firstName.trim(),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            source,
            countryCode,
            dialCode,
            userAgent,
            ipAddress,
            referrer,
            status: "Non trait\xE9"
          }
        });
      }
      contactSuccess = true;
      console.log("\u2705 Contact sauvegard\xE9 avec succ\xE8s en base de donn\xE9es");
      if (sessionId) {
        try {
          await prisma.visitor.updateMany({
            where: { sessionId },
            data: { hasConverted: true }
          });
          console.log("\u2705 Visiteur marqu\xE9 comme converti");
        } catch (visitorError) {
          console.log("\u26A0\uFE0F Impossible de marquer le visiteur comme converti:", visitorError.message);
        }
      }
    } catch (dbError) {
      console.error("\u274C Erreur base de donn\xE9es:", dbError.message);
      contactError = dbError.message;
      contactSuccess = false;
    }
    let emailSent = false;
    let emailError = null;
    console.log("\u{1F4E7} Tentative envoi email...");
    try {
      await $fetch("/api/emails/confirmation", {
        method: "POST",
        body: {
          email,
          firstName,
          source
        }
      });
      emailSent = true;
      console.log("\u2705 Email envoy\xE9 avec succ\xE8s");
    } catch (emailErr) {
      console.error("\u274C Erreur email:", emailErr.message);
      emailError = emailErr.message;
      emailSent = false;
    }
    console.log("\u{1F3AF} R\xE9sultat final:", {
      contactSuccess,
      emailSent,
      contactError,
      emailError
    });
    if (!contactSuccess) {
      throw createError({
        statusCode: 500,
        statusMessage: "Erreur lors de la sauvegarde du contact"
      });
    }
    return {
      success: true,
      message: emailSent ? "Inscription r\xE9ussie ! Vous recevrez bient\xF4t votre cadeau par email." : "Inscription r\xE9ussie ! Un probl\xE8me temporaire emp\xEAche l'envoi de l'email, nous vous contacterons bient\xF4t.",
      data: {
        id: contactData.id,
        firstName,
        email: email.toLowerCase().trim(),
        timestamp: contactData.createdAt.toISOString(),
        databaseStatus: contactSuccess ? "success" : "failed",
        emailStatus: emailSent ? "sent" : "failed",
        ...contactError && { contactError },
        ...emailError && { emailError }
      }
    };
  } catch (error) {
    console.error("\u{1F4A5} Erreur globale API contacts/add:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Une erreur interne est survenue"
    });
  }
});

export { add_post as default };
//# sourceMappingURL=add.post.mjs.map
