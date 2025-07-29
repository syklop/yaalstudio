import { d as defineEventHandler, j as useRuntimeConfig, e as getHeader, f as extractTokenFromHeader, c as createError, r as readBody, a as prisma } from '../../../../_/nitro.mjs';
import jwt from 'jsonwebtoken';
import 'googleapis';
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

const sendMass_post = defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token d'authentification requis"
      });
    }
    try {
      jwt.verify(token, config.jwtSecret);
    } catch {
      throw createError({
        statusCode: 401,
        statusMessage: "Token invalide"
      });
    }
    const body = await readBody(event);
    const { subject, message, recipients } = body;
    if (!subject || !message || !recipients || !Array.isArray(recipients) || recipients.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Donn\xE9es invalides"
      });
    }
    if (recipients.length > 100) {
      throw createError({
        statusCode: 400,
        statusMessage: "Trop de destinataires (maximum 100)"
      });
    }
    console.log(`\u{1F4E7} Envoi d'emails en masse - ${recipients.length} destinataires`);
    const results = [];
    const errors = [];
    for (const recipient of recipients) {
      try {
        const personalizedSubject = subject.replace(/{{prénom}}/g, recipient.firstName).replace(/{{email}}/g, recipient.email);
        const personalizedMessage = recipient.personalizedMessage || message.replace(/{{prénom}}/g, recipient.firstName).replace(/{{email}}/g, recipient.email);
        const emailTemplate = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Message de YaalStudio</title>
          <style>
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
              line-height: 1.6; 
              color: #000; 
              margin: 0; 
              padding: 0;
              background-color: #f5f5f5;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: #fff;
              border-radius: 0;
              overflow: hidden;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            }
            .header { 
              background: #000; 
              color: #fff; 
              padding: 3rem 2rem; 
              text-align: center; 
              position: relative;
              overflow: hidden;
            }
            .header::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%);
              pointer-events: none;
            }
            .header h1 { 
              margin: 0; 
              font-size: 2.2rem; 
              font-weight: 700;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              position: relative;
              z-index: 1;
            }
            .header p {
              margin: 0.5rem 0 0 0; 
              opacity: 0.8;
              font-size: 1rem;
              position: relative;
              z-index: 1;
            }
            .content { 
              padding: 3rem 2rem; 
              background: #fff;
            }
            .message-text { 
              font-size: 1.1rem; 
              margin-bottom: 2rem; 
              color: #000;
            }
            .message-text p {
              margin-bottom: 1.5rem;
            }
            .message-section {
              background: #f8f8f8;
              padding: 2rem;
              border-radius: 0;
              margin: 2rem 0;
              border-left: 4px solid #000;
              position: relative;
            }
            .message-section::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(45deg, transparent 30%, rgba(0,0,0,0.02) 50%, transparent 70%);
              pointer-events: none;
            }
            .message-content {
              position: relative;
              z-index: 1;
              color: #000;
              line-height: 1.6;
            }
            .signature {
              margin-top: 2.5rem;
              padding-top: 2rem;
              border-top: 1px solid #eee;
            }
            .footer { 
              background: #000; 
              color: #fff; 
              padding: 2rem; 
              text-align: center; 
              font-size: 0.9rem;
            }
            .footer a { 
              color: #fff; 
              text-decoration: underline;
            }
            .footer a:hover {
              color: #ccc;
            }
            .unsubscribe {
              margin-top: 1rem;
              font-size: 0.8rem;
              opacity: 0.7;
            }
            .unsubscribe a {
              color: #ccc;
            }
            @media (max-width: 600px) {
              .container {
                margin: 0;
                border-radius: 0;
              }
              .header {
                padding: 2rem 1rem;
              }
              .header h1 {
                font-size: 1.8rem;
              }
              .content {
                padding: 2rem 1rem;
              }
              .message-section {
                padding: 1.5rem;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>YAALSTUDIO</h1>
              <p>Message personnalis\xE9</p>
            </div>
            
            <div class="content">
              <div class="message-text">
                <p>Bonjour <strong>${recipient.firstName}</strong>,</p>
              </div>

              <div class="message-section">
                <div class="message-content">
                  ${personalizedMessage.replace(/\n/g, "<br>")}
                </div>
              </div>

              <div class="signature">
                <p>
                  \xC0 tr\xE8s bient\xF4t,<br>
                  <strong>L'\xE9quipe YaalStudio</strong>
                </p>
              </div>
            </div>
            
            <div class="footer">
              <p>
                YaalStudio - La maison de strat\xE9gie<br>
                <a href="mailto:contact@yaalstudio.com">contact@yaalstudio.com</a>
              </p>
              <p class="unsubscribe">
                Vous recevez cet email car vous faites partie de notre communaut\xE9.
                <a href="#">Se d\xE9sabonner</a>
              </p>
            </div>
          </div>
        </body>
        </html>
        `;
        const emailData = {
          sender: {
            name: "YaalStudio",
            email: config.adminEmail
          },
          to: [{
            email: recipient.email,
            name: recipient.firstName
          }],
          subject: personalizedSubject,
          htmlContent: emailTemplate,
          textContent: personalizedMessage
        };
        const response = await $fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": config.brevoApiKey,
            "Content-Type": "application/json"
          },
          body: emailData
        });
        console.log(`\u2705 Email envoy\xE9 \xE0 ${recipient.email}`);
        results.push({
          email: recipient.email,
          status: "success",
          messageId: response.messageId
        });
        try {
          await prisma.contact.update({
            where: { id: recipient.id },
            data: {
              status: "Relanc\xE9",
              updatedAt: /* @__PURE__ */ new Date()
            }
          });
        } catch (updateError) {
          console.warn(`\u26A0\uFE0F Impossible de mettre \xE0 jour le contact ${recipient.id}:`, updateError.message);
        }
        if (recipients.length > 1) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } catch (emailError) {
        console.error(`\u274C Erreur envoi email \xE0 ${recipient.email}:`, emailError);
        errors.push({
          email: recipient.email,
          status: "error",
          error: emailError.message || "Erreur inconnue"
        });
      }
    }
    try {
      await prisma.emailCampaign.create({
        data: {
          subject,
          message,
          recipientCount: recipients.length,
          successCount: results.length,
          errorCount: errors.length,
          sentAt: /* @__PURE__ */ new Date()
        }
      });
    } catch (campaignError) {
      console.warn("\u26A0\uFE0F Impossible de sauvegarder la campagne:", campaignError.message);
    }
    const successCount = results.length;
    const errorCount = errors.length;
    console.log(`\u{1F4CA} R\xE9sultat envoi: ${successCount} succ\xE8s, ${errorCount} erreurs`);
    return {
      success: true,
      message: `Emails envoy\xE9s: ${successCount} succ\xE8s, ${errorCount} erreurs`,
      data: {
        sent: successCount,
        errors: errorCount,
        total: recipients.length,
        results: results.slice(0, 5),
        // Limiter les résultats retournés
        failedEmails: errors.slice(0, 5)
        // Limiter les erreurs retournées
      }
    };
  } catch (error) {
    console.error("\u274C Erreur envoi masse:", error);
    try {
      await prisma.errorLog.create({
        data: {
          type: "EMAIL_MASS_SEND",
          message: error.message,
          stack: error.stack,
          createdAt: /* @__PURE__ */ new Date()
        }
      });
    } catch (logError) {
      console.warn("\u26A0\uFE0F Impossible de logger l'erreur:", logError.message);
    }
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Erreur lors de l'envoi des emails"
    });
  }
});

export { sendMass_post as default };
//# sourceMappingURL=send-mass.post.mjs.map
