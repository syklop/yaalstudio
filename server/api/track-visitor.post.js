import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const {
      sessionId,
      page,
      referrer,
      duration
    } = body

    // Obtenir les informations de la requête
    const userAgent = getHeader(event, 'user-agent') || ''
    const ipAddress = getHeader(event, 'x-forwarded-for') || getHeader(event, 'x-real-ip') || 'unknown'
    
    // Vérifier si le visiteur existe déjà
    const existingVisitor = await prisma.visitor.findUnique({
      where: { sessionId }
    })

    if (existingVisitor) {
      // Mettre à jour le visiteur existant
      const updatedVisitor = await prisma.visitor.update({
        where: { sessionId },
        data: {
          totalViews: existingVisitor.totalViews + 1,
          duration: duration || existingVisitor.duration,
          updatedAt: new Date()
        }
      })

      // Ajouter une nouvelle vue de page
      if (page) {
        await prisma.pageView.create({
          data: {
            page,
            duration: duration || null,
            visitorId: updatedVisitor.id
          }
        })
      }

      return {
        success: true,
        message: 'Visiteur mis à jour',
        data: { id: updatedVisitor.id }
      }
    } else {
      // Créer un nouveau visiteur
      const newVisitor = await prisma.visitor.create({
        data: {
          sessionId,
          ipAddress,
          userAgent,
          referrer: referrer || null,
          landingPage: page || '/',
          totalViews: 1,
          duration: duration || null,
          isReturning: false,
          hasConverted: false
        }
      })

      // Ajouter la première vue de page
      if (page) {
        await prisma.pageView.create({
          data: {
            page,
            duration: duration || null,
            visitorId: newVisitor.id
          }
        })
      }

      return {
        success: true,
        message: 'Nouveau visiteur créé',
        data: { id: newVisitor.id }
      }
    }

  } catch (error) {
    console.error('❌ Erreur tracking visiteur:', error)
    
    return {
      success: false,
      message: 'Erreur lors du tracking du visiteur'
    }
  }
}) 