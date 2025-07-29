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

const testGoogleSheets_get = defineEventHandler(async () => {
  try {
    console.log("\u{1F9EA} Test des variables d'environnement Google Sheets");
    const config = useRuntimeConfig();
    const diagnostics = {
      variables: {
        googleSheetsId: config.googleSheetsId ? "\u2705 D\xE9fini" : "\u274C Manquant",
        googleProjectId: config.googleProjectId ? "\u2705 D\xE9fini" : "\u274C Manquant",
        googleClientEmail: config.googleClientEmail ? "\u2705 D\xE9fini" : "\u274C Manquant",
        googlePrivateKey: config.googlePrivateKey ? "\u2705 D\xE9fini" : "\u274C Manquant",
        googlePrivateKeyId: config.googlePrivateKeyId ? "\u2705 D\xE9fini" : "\u274C Manquant",
        googleClientId: config.googleClientId ? "\u2705 D\xE9fini" : "\u274C Manquant"
      },
      tests: {}
    };
    if (config.googlePrivateKey) {
      try {
        const privateKey = config.googlePrivateKey.replace(/\\n/g, "\n").replace(/"/g, "").trim();
        if (privateKey.includes("BEGIN PRIVATE KEY") && privateKey.includes("END PRIVATE KEY")) {
          diagnostics.tests.privateKeyFormat = "\u2705 Format valide";
        } else {
          diagnostics.tests.privateKeyFormat = "\u274C Format invalide";
        }
      } catch (error) {
        diagnostics.tests.privateKeyFormat = `\u274C Erreur: ${error.message}`;
      }
    }
    if (config.googleSheetsId && config.googleClientEmail && config.googlePrivateKey) {
      try {
        const { getGoogleSheetsClient } = await import('../../_/nitro.mjs').then(function (n) { return n.L; });
        const sheets = await getGoogleSheetsClient();
        if (sheets) {
          diagnostics.tests.connection = "\u2705 Connexion r\xE9ussie";
          try {
            const spreadsheetInfo = await sheets.spreadsheets.get({
              spreadsheetId: config.googleSheetsId
            });
            diagnostics.tests.spreadsheet = `\u2705 Spreadsheet trouv\xE9: ${spreadsheetInfo.data.properties.title}`;
            try {
              await sheets.spreadsheets.values.get({
                spreadsheetId: config.googleSheetsId,
                range: "Contacts!A1:F1"
              });
              diagnostics.tests.contactsSheet = '\u2705 Feuille "Contacts" accessible';
            } catch (error) {
              diagnostics.tests.contactsSheet = `\u274C Feuille "Contacts" inaccessible: ${error.message}`;
            }
          } catch (error) {
            diagnostics.tests.spreadsheet = `\u274C Erreur spreadsheet: ${error.message}`;
          }
        }
      } catch (error) {
        diagnostics.tests.connection = `\u274C Erreur connexion: ${error.message}`;
      }
    } else {
      diagnostics.tests.connection = "\u274C Variables manquantes pour tester la connexion";
    }
    console.log("\u{1F4CB} R\xE9sultats des tests:", diagnostics);
    return {
      success: true,
      diagnostics,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("\u274C Erreur dans le test Google Sheets:", error);
    return {
      success: false,
      error: error.message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

export { testGoogleSheets_get as default };
//# sourceMappingURL=test-google-sheets.get.mjs.map
