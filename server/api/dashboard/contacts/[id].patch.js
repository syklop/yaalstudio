import prisma from '~/server/utils/prisma'
import { extractTokenFromHeader, verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    console.log('✏️ Mise à jour du statut contact')

    // Vérifier l'authentification
    const authHeader = getHeader(event, 'authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token || !verifyToken(token)) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Non autorisé'
      })
    }

    // Récupérer l'ID du contact depuis l'URL
    const contactId = getRouterParam(event, 'id')
    if (!contactId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID du contact manquant'
      })
    }

    // Récupérer les données de mise à jour
    const body = await readBody(event)
    const { status } = body

    if (!status) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Statut manquant'
      })
    }

    // Valider le statut
    const validStatuses = ['Non traité', 'Traité', 'Relancé']
    if (!validStatuses.includes(status)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Statut invalide'
      })
    }

    // Vérifier que le contact existe
    const existingContact = await prisma.contact.findUnique({
      where: { id: contactId }
    })

    if (!existingContact) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Contact non trouvé'
      })
    }

    // Mettre à jour le contact
    const updatedContact = await prisma.contact.update({
      where: { id: contactId },
      data: {
        status,
        updatedAt: new Date()
      },
      select: {
        id: true,
        firstName: true,
        email: true,
        status: true,
        updatedAt: true
      }
    })

    console.log(`✅ Statut du contact ${contactId} mis à jour: ${status}`)

    return {
      success: true,
      message: 'Statut mis à jour avec succès',
      data: {
        contact: updatedContact
      }
    }

  } catch (error) {
    console.error('❌ Erreur mise à jour contact:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la mise à jour du contact'
    })
  }
}) 