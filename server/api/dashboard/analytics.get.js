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

    // Simuler des données analytics pour l'instant
    // TODO: Intégrer avec un vrai service d'analytics (Google Analytics, etc.)
    
    // Obtenir le nombre total de contacts pour simuler les vues
    const totalContacts = await prisma.contact.count()
    
    // Simuler des données de pages vues basées sur les contacts
    const pageViews = {
      today: Math.floor(totalContacts * 0.3) || 0,
      week: Math.floor(totalContacts * 0.7) || 0,
      month: totalContacts || 0
    }

    // Simuler des sources de trafic
    const sources = []
    if (totalContacts > 0) {
      // Récupérer les vraies sources depuis les contacts
      const contactSources = await prisma.contact.groupBy({
        by: ['source'],
        _count: {
          source: true
        },
        orderBy: {
          _count: {
            source: 'desc'
          }
        }
      })

      const totalSourcesCount = contactSources.reduce((sum, item) => sum + item._count.source, 0)
      
      sources.push(...contactSources.map((item) => ({
        name: item.source || 'Direct',
        count: item._count.source,
        percentage: totalSourcesCount > 0 ? Math.round((item._count.source / totalSourcesCount) * 100) : 0
      })))
    }

    // Simuler des données d'appareils basées sur UserAgent des contacts
    const devices = []
    if (totalContacts > 0) {
      // Analyser les userAgent pour déterminer les types d'appareils
      const contacts = await prisma.contact.findMany({
        select: {
          userAgent: true
        },
        where: {
          userAgent: {
            not: null
          }
        }
      })

      const deviceCounts = { Mobile: 0, Desktop: 0, Tablet: 0 }
      
      contacts.forEach(contact => {
        if (contact.userAgent) {
          const ua = contact.userAgent.toLowerCase()
          if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
            deviceCounts.Mobile++
          } else if (ua.includes('tablet') || ua.includes('ipad')) {
            deviceCounts.Tablet++
          } else {
            deviceCounts.Desktop++
          }
        }
      })

      const totalDevices = Object.values(deviceCounts).reduce((sum, count) => sum + count, 0)
      
      if (totalDevices > 0) {
        Object.entries(deviceCounts).forEach(([deviceName, count]) => {
          if (count > 0) {
            devices.push({
              name: deviceName,
              count: count,
              percentage: Math.round((count / totalDevices) * 100)
            })
          }
        })
      }
    }

    // Si pas de données, créer des données par défaut
    if (sources.length === 0) {
      sources.push(
        { name: 'Direct', count: 0, percentage: 0 },
        { name: 'Landing Page', count: 0, percentage: 0 }
      )
    }

    if (devices.length === 0) {
      devices.push(
        { name: 'Desktop', count: 0, percentage: 0 },
        { name: 'Mobile', count: 0, percentage: 0 }
      )
    }

    const analyticsData = {
      pageViews,
      sources: sources.slice(0, 5), // Limiter à 5 sources principales
      devices: devices.slice(0, 3)   // Limiter à 3 types d'appareils
    }

    return {
      success: true,
      data: analyticsData
    }

  } catch (error) {
    console.error('❌ Erreur récupération analytics:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur serveur lors de la récupération des analytics'
    })
  }
}) 