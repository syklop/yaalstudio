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

    // Récupérer les paramètres de requête
    const query = getQuery(event)
    const {
      page = 1,
      limit = 20,
      search = '',
      status = '',
      source = '',
      dateFrom,
      dateTo
    } = query

    // Construire les filtres
    const where = {}

    // Filtre de recherche sur prénom, email et téléphone
    if (search && search.trim()) {
      where.OR = [
        { firstName: { contains: search.trim(), mode: 'insensitive' } },
        { email: { contains: search.trim(), mode: 'insensitive' } },
        { phone: { contains: search.trim() } }
      ]
    }

    // Filtre par statut
    if (status && status !== '' && status !== 'all') {
      where.status = status
    }

    // Filtre par source
    if (source && source !== '' && source !== 'all') {
      where.source = source
    }

    // Filtre par date de création
    if (dateFrom || dateTo) {
      where.createdAt = {}
      if (dateFrom) {
        where.createdAt.gte = new Date(dateFrom)
      }
      if (dateTo) {
        where.createdAt.lte = new Date(dateTo)
      }
    }

    // Calculer la pagination
    const pageNum = Math.max(1, parseInt(page))
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)))
    const skip = (pageNum - 1) * limitNum

    // Récupérer les contacts avec toutes les informations nécessaires
    const [contacts, totalCount] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limitNum,
        select: {
          id: true,
          firstName: true,
          email: true,
          phone: true,
          source: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          
          // Informations géographiques
          country: true,
          city: true,
          countryCode: true,
          dialCode: true,
          
          // Informations techniques pour analytics
          userAgent: true,
          ipAddress: true,
          referrer: true
        }
      }),
      prisma.contact.count({ where })
    ])

    // Calculer les informations de pagination
    const totalPages = Math.ceil(totalCount / limitNum)

    // Formatter les contacts pour un affichage optimal
    const formattedContacts = contacts.map(contact => ({
      id: contact.id,
      firstName: contact.firstName || '',
      email: contact.email || '',
      phone: contact.phone || '',
      source: contact.source || 'Inconnu',
      status: contact.status || 'Non traité',
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
      
      // Métadonnées optionnelles
      country: contact.country,
      city: contact.city,
      countryCode: contact.countryCode,
      dialCode: contact.dialCode,
      userAgent: contact.userAgent,
      ipAddress: contact.ipAddress,
      referrer: contact.referrer
    }))

    return {
      success: true,
      data: {
        contacts: formattedContacts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: totalCount,
          totalPages,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        },
        filters: {
          search: search || '',
          status: status || '',
          source: source || ''
        }
      }
    }

  } catch (error) {
    console.error('❌ Erreur contacts:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des contacts'
    })
  }
}) 