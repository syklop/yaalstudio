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

const seedContacts_post = defineEventHandler(async (event) => {
  try {
    console.log("\u{1F331} D\xE9but du seeding des contacts");
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token || !verifyToken(token)) {
      throw createError({
        statusCode: 401,
        statusMessage: "Non autoris\xE9 - Seul l'admin peut seed la base"
      });
    }
    const testContacts = [
      {
        firstName: "Sophie",
        email: "sophie.martin@email.com",
        phone: "+33123456789",
        source: "Landing Page",
        status: "Non trait\xE9",
        countryCode: "FR",
        dialCode: "+33",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        ipAddress: "192.168.1.10",
        country: "France",
        city: "Paris",
        referrer: "https://google.com"
      },
      {
        firstName: "Pierre",
        email: "pierre.dubois@email.com",
        phone: "+33987654321",
        source: "Facebook",
        status: "Trait\xE9",
        countryCode: "FR",
        dialCode: "+33",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        ipAddress: "192.168.1.11",
        country: "France",
        city: "Lyon",
        referrer: "https://facebook.com"
      },
      {
        firstName: "Marie",
        email: "marie.leroy@email.com",
        phone: "+33147258369",
        source: "Google",
        status: "Relanc\xE9",
        countryCode: "FR",
        dialCode: "+33",
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1",
        ipAddress: "192.168.1.12",
        country: "France",
        city: "Marseille",
        referrer: "https://google.com"
      },
      {
        firstName: "Thomas",
        email: "thomas.bernard@email.com",
        phone: "+33612345678",
        source: "Landing Page",
        status: "Non trait\xE9",
        countryCode: "FR",
        dialCode: "+33",
        userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        ipAddress: "192.168.1.13",
        country: "France",
        city: "Toulouse",
        referrer: "https://yaalstudio.com"
      },
      {
        firstName: "Julie",
        email: "julie.moreau@email.com",
        phone: "+33756789012",
        source: "Referral",
        status: "Trait\xE9",
        countryCode: "FR",
        dialCode: "+33",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
        ipAddress: "192.168.1.14",
        country: "France",
        city: "Nice",
        referrer: "https://linkedin.com"
      },
      {
        firstName: "Alexandre",
        email: "alexandre.petit@email.com",
        phone: "+33634567890",
        source: "Instagram",
        status: "Non trait\xE9",
        countryCode: "FR",
        dialCode: "+33",
        userAgent: "Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1",
        ipAddress: "192.168.1.15",
        country: "France",
        city: "Bordeaux",
        referrer: "https://instagram.com"
      },
      {
        firstName: "Camille",
        email: "camille.roux@email.com",
        phone: "+33789012345",
        source: "Landing Page",
        status: "Relanc\xE9",
        countryCode: "FR",
        dialCode: "+33",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
        ipAddress: "192.168.1.16",
        country: "France",
        city: "Nantes",
        referrer: "https://google.com"
      },
      {
        firstName: "Lucas",
        email: "lucas.fournier@email.com",
        phone: "+33567890123",
        source: "YouTube",
        status: "Non trait\xE9",
        countryCode: "FR",
        dialCode: "+33",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
        ipAddress: "192.168.1.17",
        country: "France",
        city: "Strasbourg",
        referrer: "https://youtube.com"
      },
      {
        firstName: "Emma",
        email: "emma.girard@email.com",
        phone: "+33456789012",
        source: "Facebook",
        status: "Trait\xE9",
        countryCode: "FR",
        dialCode: "+33",
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
        ipAddress: "192.168.1.18",
        country: "France",
        city: "Lille",
        referrer: "https://facebook.com"
      },
      {
        firstName: "Hugo",
        email: "hugo.simon@email.com",
        phone: "+33345678901",
        source: "Landing Page",
        status: "Non trait\xE9",
        countryCode: "FR",
        dialCode: "+33",
        userAgent: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0",
        ipAddress: "192.168.1.19",
        country: "France",
        city: "Rennes",
        referrer: "https://google.com"
      }
    ];
    const existingContactsCount = await prisma.contact.count();
    if (existingContactsCount > 0) {
      console.log(`\u26A0\uFE0F Base d\xE9j\xE0 peupl\xE9e avec ${existingContactsCount} contacts`);
      return {
        success: true,
        message: `Base d\xE9j\xE0 peupl\xE9e avec ${existingContactsCount} contacts existants`,
        action: "skipped",
        existingContacts: existingContactsCount
      };
    }
    console.log("\u{1F504} Cr\xE9ation des contacts de test...");
    const createdContacts = [];
    for (const contactData of testContacts) {
      try {
        const contact = await prisma.contact.create({
          data: {
            ...contactData,
            // Ajouter quelques variations dans les dates
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1e3),
            // Dans les 30 derniers jours
            updatedAt: /* @__PURE__ */ new Date()
          }
        });
        createdContacts.push(contact);
        console.log(`\u2705 Contact cr\xE9\xE9: ${contact.firstName} (${contact.email})`);
      } catch (error) {
        console.error(`\u274C Erreur cr\xE9ation contact ${contactData.firstName}:`, error.message);
      }
    }
    console.log(`\u{1F389} Seeding termin\xE9: ${createdContacts.length} contacts cr\xE9\xE9s`);
    return {
      success: true,
      message: `${createdContacts.length} contacts de test cr\xE9\xE9s avec succ\xE8s`,
      action: "created",
      contactsCreated: createdContacts.length,
      contacts: createdContacts.map((c) => ({
        id: c.id,
        firstName: c.firstName,
        email: c.email,
        source: c.source,
        status: c.status
      }))
    };
  } catch (error) {
    console.error("\u274C Erreur seeding contacts:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors du seeding des contacts"
    });
  }
});

export { seedContacts_post as default };
//# sourceMappingURL=seed-contacts.post.mjs.map
