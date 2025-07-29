import prisma from '~/server/utils/prisma'
import { extractTokenFromHeader, verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 Vérification token admin')

    // Extraire le token du header Authorization
    const authHeader = getHeader(event, 'authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token manquant'
      })
    }

    // Vérifier la validité du token JWT
    const payload = verifyToken(token)
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token invalide'
      })
    }

    // Vérifier si la session existe en base de données
    const session = await prisma.adminSession.findUnique({
      where: { token },
      include: {
        admin: {
          select: {
            id: true,
            email: true,
            name: true,
            lastLogin: true
          }
        }
      }
    })

    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Session non trouvée'
      })
    }

    // Vérifier si la session n'est pas expirée
    if (new Date() > session.expiresAt) {
      // Supprimer la session expirée
      await prisma.adminSession.delete({
        where: { token }
      })

      throw createError({
        statusCode: 401,
        statusMessage: 'Session expirée'
      })
    }

    console.log('✅ Token valide pour admin:', session.admin.email)

    return {
      success: true,
      message: 'Token valide',
      data: {
        user: session.admin,
        session: {
          expiresAt: session.expiresAt,
          createdAt: session.createdAt
        }
      }
    }

  } catch (error) {
    console.error('❌ Erreur vérification token:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur interne du serveur'
    })
  }
}) 