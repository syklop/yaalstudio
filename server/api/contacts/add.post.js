import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    console.log('🚀 Début traitement contact avec Prisma')
    
    // Récupérer les données du formulaire
    const body = await readBody(event)
    
    // Validation des données
    const { 
      firstName, 
      email, 
      phone, 
      source = 'Landing Page',
      countryCode,
      dialCode,
      sessionId // ID de session pour le tracking des visiteurs
    } = body
    
    console.log('📝 Données reçues:', { firstName, email, phone, source })
    
    if (!firstName || !email || !phone) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tous les champs sont requis (prénom, email, téléphone)'
      })
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Format d\'email invalide'
      })
    }

    // Validation téléphone français
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(phone.replace(/[\s\-()]/g, ''))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Format de téléphone invalide'
      })
    }

    // Obtenir les informations de la requête pour analytics
    const userAgent = getHeader(event, 'user-agent') || ''
    const ipAddress = getHeader(event, 'x-forwarded-for') || getHeader(event, 'x-real-ip') || 'unknown'
    const referrer = getHeader(event, 'referer') || ''

    // Préparer les données pour Prisma
    let contactSuccess = false
    let contactError = null
    let contactData = null

    try {
      console.log('💾 Tentative d\'ajout dans la base de données Prisma')
      
      // Vérifier si l'email existe déjà
      const existingContact = await prisma.contact.findUnique({
        where: { email: email.toLowerCase().trim() }
      })

      if (existingContact) {
        console.log('⚠️ Contact déjà existant, mise à jour...')
        
        // Mettre à jour le contact existant
        contactData = await prisma.contact.update({
          where: { email: email.toLowerCase().trim() },
          data: {
            firstName: firstName.trim(),
            phone: phone.trim(),
            source,
            countryCode,
            dialCode,
            userAgent,
            ipAddress,
            referrer,
            updatedAt: new Date()
          }
        })
      } else {
        // Créer un nouveau contact
        contactData = await prisma.contact.create({
          data: {
            firstName: firstName.trim(),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            source,
            countryCode,
            dialCode,
            userAgent,
            ipAddress,
            referrer,
            status: 'Non traité'
          }
        })
      }
      
      contactSuccess = true
      console.log('✅ Contact sauvegardé avec succès en base de données')
      
      // Marquer le visiteur comme "converti" si sessionId est fourni
      if (sessionId) {
        try {
          await prisma.visitor.updateMany({
            where: { sessionId },
            data: { hasConverted: true }
          })
          console.log('✅ Visiteur marqué comme converti')
        } catch (visitorError) {
          console.log('⚠️ Impossible de marquer le visiteur comme converti:', visitorError.message)
        }
      }
      
    } catch (dbError) {
      console.error('❌ Erreur base de données:', dbError.message)
      contactError = dbError.message
      contactSuccess = false
    }

    // Envoyer email de confirmation
    let emailSent = false
    let emailError = null
    
    console.log('📧 Tentative envoi email...')
    
    try {
      await $fetch('/api/emails/confirmation', {
        method: 'POST',
        body: {
          email,
          firstName,
          source
        }
      })
      emailSent = true
      console.log('✅ Email envoyé avec succès')
      
    } catch (emailErr) {
      console.error('❌ Erreur email:', emailErr.message)
      emailError = emailErr.message
      emailSent = false
    }

    // Log du résultat final
    console.log('🎯 Résultat final:', {
      contactSuccess,
      emailSent,
      contactError,
      emailError
    })

    // Vérifier que le contact a été sauvegardé
    if (!contactSuccess) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Erreur lors de la sauvegarde du contact'
      })
    }

    // Réponse de succès
    return {
      success: true,
      message: emailSent 
        ? 'Inscription réussie ! Vous recevrez bientôt votre cadeau par email.'
        : 'Inscription réussie ! Un problème temporaire empêche l\'envoi de l\'email, nous vous contacterons bientôt.',
      data: {
        id: contactData.id,
        firstName,
        email: email.toLowerCase().trim(),
        timestamp: contactData.createdAt.toISOString(),
        databaseStatus: contactSuccess ? 'success' : 'failed',
        emailStatus: emailSent ? 'sent' : 'failed',
        ...(contactError && { contactError }),
        ...(emailError && { emailError })
      }
    }

  } catch (error) {
    console.error('💥 Erreur globale API contacts/add:', error)
    
    // Si c'est une erreur createError de Nuxt, la relancer
    if (error.statusCode) {
      throw error
    }
    
    // Sinon, erreur générique
    throw createError({
      statusCode: 500,
      statusMessage: 'Une erreur interne est survenue'
    })
  }
})