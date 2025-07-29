import { d as defineEventHandler, r as readBody, e as getHeader, a as prisma } from '../../_/nitro.mjs';
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

const trackVisitor_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const {
      sessionId,
      page,
      referrer,
      duration
    } = body;
    const userAgent = getHeader(event, "user-agent") || "";
    const ipAddress = getHeader(event, "x-forwarded-for") || getHeader(event, "x-real-ip") || "unknown";
    const existingVisitor = await prisma.visitor.findUnique({
      where: { sessionId }
    });
    if (existingVisitor) {
      const updatedVisitor = await prisma.visitor.update({
        where: { sessionId },
        data: {
          totalViews: existingVisitor.totalViews + 1,
          duration: duration || existingVisitor.duration,
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      if (page) {
        await prisma.pageView.create({
          data: {
            page,
            duration: duration || null,
            visitorId: updatedVisitor.id
          }
        });
      }
      return {
        success: true,
        message: "Visiteur mis \xE0 jour",
        data: { id: updatedVisitor.id }
      };
    } else {
      const newVisitor = await prisma.visitor.create({
        data: {
          sessionId,
          ipAddress,
          userAgent,
          referrer: referrer || null,
          landingPage: page || "/",
          totalViews: 1,
          duration: duration || null,
          isReturning: false,
          hasConverted: false
        }
      });
      if (page) {
        await prisma.pageView.create({
          data: {
            page,
            duration: duration || null,
            visitorId: newVisitor.id
          }
        });
      }
      return {
        success: true,
        message: "Nouveau visiteur cr\xE9\xE9",
        data: { id: newVisitor.id }
      };
    }
  } catch (error) {
    console.error("\u274C Erreur tracking visiteur:", error);
    return {
      success: false,
      message: "Erreur lors du tracking du visiteur"
    };
  }
});

export { trackVisitor_post as default };
//# sourceMappingURL=track-visitor.post.mjs.map
