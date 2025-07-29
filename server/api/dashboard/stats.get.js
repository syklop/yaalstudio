import prisma from '~/server/utils/prisma'
import { extractTokenFromHeader, verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification
    const authHeader = getHeader(event, 'authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token || !verifyToken(token)) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Non autorisé'
      })
    }

    // Obtenir les dates pour les calculs
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    const weekAgo = new Date(today)
    weekAgo.setDate(weekAgo.getDate() - 7)
    
    const monthAgo = new Date(today)
    monthAgo.setDate(monthAgo.getDate() - 30)

    // Statistiques des contacts
    const [
      totalContacts,
      contactsToday,
      contactsThisWeek,
      contactsThisMonth,
      uniqueVisitorsToday,
      uniqueVisitors7Days,
      uniqueVisitors30Days,
      totalVisitors30Days,
      averageSessionData
    ] = await Promise.all([
      // Total des contacts
      prisma.contact.count(),
      
      // Contacts aujourd'hui
      prisma.contact.count({
        where: {
          createdAt: {
            gte: today
          }
        }
      }),
      
      // Contacts cette semaine
      prisma.contact.count({
        where: {
          createdAt: {
            gte: weekAgo
          }
        }
      }),
      
      // Contacts ce mois
      prisma.contact.count({
        where: {
          createdAt: {
            gte: monthAgo
          }
        }
      }),
      
      // Visiteurs uniques aujourd'hui
      prisma.visitor.count({
        where: {
          createdAt: {
            gte: today
          }
        }
      }),
      
      // Visiteurs uniques 7 derniers jours
      prisma.visitor.count({
        where: {
          createdAt: {
            gte: weekAgo
          }
        }
      }),
      
      // Visiteurs uniques 30 derniers jours
      prisma.visitor.count({
        where: {
          createdAt: {
            gte: monthAgo
          }
        }
      }),
      
      // Total visiteurs pour le taux de conversion
      prisma.visitor.count({
        where: {
          createdAt: {
            gte: monthAgo
          }
        }
      }),
      
      // Durée moyenne des sessions
      prisma.visitor.aggregate({
        where: {
          createdAt: {
            gte: monthAgo
          },
          duration: {
            not: null
          }
        },
        _avg: {
          duration: true
        }
      })
    ])

    // Calculer le taux de conversion
    const conversionRate = totalVisitors30Days > 0 
      ? (contactsThisMonth / totalVisitors30Days) * 100 
      : 0

    // Durée moyenne de session
    const averageSessionDuration = averageSessionData._avg.duration || 0

    // Statistiques par statut de contact
    const contactsByStatus = await prisma.contact.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    })

    // Évolution des contacts sur les 30 derniers jours
    const contactsEvolution = await prisma.contact.findMany({
      where: {
        createdAt: {
          gte: monthAgo
        }
      },
      select: {
        createdAt: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    // Grouper par jour
    const contactsByDay = {}
    contactsEvolution.forEach(contact => {
      const day = contact.createdAt.toISOString().split('T')[0]
      contactsByDay[day] = (contactsByDay[day] || 0) + 1
    })

    // Sources de trafic
    const topSources = await prisma.contact.groupBy({
      by: ['source'],
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 5
    })

    return {
      success: true,
      data: {
        totalContacts,
        contactsToday,
        contactsThisWeek,
        contactsThisMonth,
        uniqueVisitorsToday,
        uniqueVisitors7Days,
        uniqueVisitors30Days,
        conversionRate: parseFloat(conversionRate.toFixed(2)),
        averageSessionDuration: Math.round(averageSessionDuration),
        contactsByStatus: contactsByStatus.map(item => ({
          status: item.status,
          count: item._count.id
        })),
        contactsByDay,
        topSources: topSources.map(item => ({
          source: item.source,
          count: item._count.id
        })),
        lastUpdated: new Date().toISOString()
      }
    }

  } catch (error) {
    console.error('❌ Erreur stats dashboard:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors du calcul des statistiques'
    })
  }
}) 