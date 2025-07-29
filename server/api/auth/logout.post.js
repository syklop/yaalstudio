import prisma from '~/server/utils/prisma'
import { extractTokenFromHeader } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    console.log('🚪 Déconnexion admin')

    // Extraire le token du header Authorization
    const authHeader = getHeader(event, 'authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token) {
      console.log('⚠️ Aucun token fourni pour la déconnexion')
      return {
        success: true,
        message: 'Déconnexion réussie'
      }
    }

    // Supprimer la session de la base de données
    try {
      await prisma.adminSession.delete({
        where: { token }
      })
      console.log('✅ Session supprimée de la base de données')
    } catch (error) {
      // La session n'existe peut-être pas en base, ce n'est pas grave
      console.log('⚠️ Session non trouvée en base:', error.message)
    }

    return {
      success: true,
      message: 'Déconnexion réussie'
    }

  } catch (error) {
    console.error('❌ Erreur logout:', error)

    // Même en cas d'erreur, renvoyer un succès pour éviter les problèmes côté client
    return {
      success: true,
      message: 'Déconnexion réussie'
    }
  }
}) 