import { d as defineEventHandler, r as readBody, c as createError, j as useRuntimeConfig } from '../../../_/nitro.mjs';
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

const confirmation_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, firstName, source = "Landing Page" } = body;
    if (!email || !firstName) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email et pr\xE9nom requis"
      });
    }
    const config = useRuntimeConfig();
    const BREVO_API_KEY = config.brevoApiKey || process.env.BREVO_API_KEY;
    const FROM_EMAIL = config.fromEmail || process.env.FROM_EMAIL || "noreply@yaalstudio.com";
    const FROM_NAME = config.fromName || process.env.FROM_NAME || "YaalStudio";
    if (!BREVO_API_KEY) {
      console.error("Cl\xE9 API Brevo manquante");
      throw createError({
        statusCode: 500,
        statusMessage: "Configuration email manquante"
      });
    }
    const emailTemplate = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenue chez YaalStudio</title>
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
        .welcome-text { 
          font-size: 1.1rem; 
          margin-bottom: 2rem; 
          color: #000;
        }
        .welcome-text p {
          margin-bottom: 1.5rem;
        }
        .gift-section {
          background: #f8f8f8;
          padding: 2rem;
          border-radius: 0;
          margin: 2rem 0;
          border-left: 4px solid #000;
          position: relative;
        }
        .gift-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(0,0,0,0.02) 50%, transparent 70%);
          pointer-events: none;
        }
        .gift-title {
          color: #000;
          margin-top: 0;
          font-size: 1.4rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          position: relative;
          z-index: 1;
        }
        .gift-list {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
          color: #000;
          position: relative;
          z-index: 1;
        }
        .gift-list li {
          margin-bottom: 0.8rem;
          line-height: 1.6;
        }
        .cta-button { 
          display: inline-block; 
          background: #000; 
          color: #fff; 
          padding: 1.2rem 2.5rem; 
          text-decoration: none; 
          border-radius: 0; 
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 1.5rem 0 0 0;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }
        .cta-button:hover {
          background: #333;
          transform: translateY(-2px);
        }
        .highlight-text {
          color: #666;
          font-style: italic;
          font-size: 0.95rem;
          line-height: 1.5;
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
          .gift-section {
            padding: 1.5rem;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>YAALSTUDIO</h1>
          <p>Bienvenue dans la maison</p>
        </div>
        
        <div class="content">
          <div class="welcome-text">
            <p>Bonjour <strong>${firstName}</strong>,</p>
            
            <p>F\xE9licitations ! Vous faites maintenant partie des premi\xE8res \xE0 rejoindre YaalStudio, notre maison de strat\xE9gie d\xE9di\xE9e \xE0 transformer les id\xE9es en impact concret.</p>
            
            <p>Comme promis, voici votre cadeau de bienvenue :</p>
          </div>

          <div class="gift-section">
            <h3 class="gift-title">\u{1F381} LES 5 FONDATIONS INVISIBLES DE TON EMPIRE</h3>
            <ul class="gift-list">
              <li><strong>Guide PDF :</strong> "Les 5 Fondations Invisibles de ton Empire"</li>
              <li><strong>Template :</strong> Canvas de Planification Strat\xE9gique</li>
              <li><strong>Checklist :</strong> Audit Express de votre Projet</li>
              <li><strong>Bonus :</strong> Acc\xE8s prioritaire aux futurs contenus</li>
            </ul>
            
            <a href="https://www.yaalstudio.com/EBOOK_YAALSTUDIO.pdf" class="cta-button">
              \u2192 T\xE9l\xE9charger mon Ebook Gratuit
            </a>
          </div>

          <p class="highlight-text">
            Ces ressources ont \xE9t\xE9 con\xE7ues pour vous accompagner d\xE8s maintenant dans la structuration de vos projets et l'optimisation de votre approche strat\xE9gique.
          </p>

          <p style="margin-top: 2rem;">
            La maison YaalStudio est en construction, et vous serez parmi les premi\xE8res \xE0 d\xE9couvrir tous nos outils et m\xE9thodes exclusives.
          </p>

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
            Vous recevez cet email car vous vous \xEAtes inscrite sur notre landing page.
            <a href="#">Se d\xE9sabonner</a>
          </p>
        </div>
      </div>
    </body>
    </html>
    `;
    const emailData = {
      sender: {
        name: FROM_NAME,
        email: FROM_EMAIL
      },
      to: [
        {
          email,
          name: firstName
        }
      ],
      subject: `Bienvenue ${firstName} ! Votre pack strat\xE9gique vous attend \u{1F381}`,
      htmlContent: emailTemplate,
      tags: ["confirmation", "welcome", source.toLowerCase().replace(" ", "-")]
    };
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY
      },
      body: JSON.stringify(emailData)
    });
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Erreur Brevo:", errorData);
      throw createError({
        statusCode: 500,
        statusMessage: "Erreur lors de l'envoi de l'email"
      });
    }
    const result = await response.json();
    return {
      success: true,
      message: "Email de confirmation envoy\xE9 avec succ\xE8s",
      data: {
        messageId: result.messageId,
        email,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    console.error("Erreur API emails/confirmation:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'envoi de l'email de confirmation"
    });
  }
});

export { confirmation_post as default };
//# sourceMappingURL=confirmation.post.mjs.map
