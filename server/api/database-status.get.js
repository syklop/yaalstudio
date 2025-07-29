import prisma from '~/server/utils/prisma'
import { extractTokenFromHeader, verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    console.log('📊 Vérification du statut de la base de données')

    // Vérifier l'authentification
    const authHeader = getHeader(event, 'authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token || !verifyToken(token)) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Non autorisé'
      })
    }

    // Compter les différents éléments de la base
    const [
      contactsCount,
      visitorsCount,
      contactsByStatus,
      contactsBySource,
      recentContacts
    ] = await Promise.all([
      // Total des contacts
      prisma.contact.count(),
      
      // Total des visiteurs
      prisma.visitor.count(),
      
      // Répartition par statut
      prisma.contact.groupBy({
        by: ['status'],
        _count: {
          status: true
        }
      }),
      
      // Répartition par source
      prisma.contact.groupBy({
        by: ['source'],
        _count: {
          source: true
        }
      }),
      
      // Contacts récents (derniers 7 jours)
      prisma.contact.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      })
    ])

    const status = {
      database: {
        connected: true,
        provider: 'sqlite'
      },
      counts: {
        contacts: contactsCount,
        visitors: visitorsCount,
        recentContacts
      },
      distribution: {
        byStatus: contactsByStatus.reduce((acc, item) => {
          acc[item.status] = item._count.status
          return acc
        }, {}),
        bySource: contactsBySource.reduce((acc, item) => {
          acc[item.source || 'Unknown'] = item._count.source
          return acc
        }, {})
      },
      isEmpty: contactsCount === 0,
      needsSeeding: contactsCount === 0
    }

    console.log('✅ Statut base de données récupéré:', status)

    return {
      success: true,
      data: status
    }

  } catch (error) {
    console.error('❌ Erreur statut base de données:', error)
    
    return {
      success: false,
      error: 'Erreur de connexion à la base de données',
      data: {
        database: {
          connected: false,
          error: error.message
        },
        isEmpty: true,
        needsSeeding: true
      }
    }
  }
}) 