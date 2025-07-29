import prisma from '~/server/utils/prisma'
import { extractTokenFromHeader, verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    console.log('🌱 Début du seeding des contacts')

    // Vérifier l'authentification (seul l'admin peut seed)
    const authHeader = getHeader(event, 'authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token || !verifyToken(token)) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Non autorisé - Seul l\'admin peut seed la base'
      })
    }

    // Données de test réalistes
    const testContacts = [
      {
        firstName: 'Sophie',
        email: 'sophie.martin@email.com',
        phone: '+33123456789',
        source: 'Landing Page',
        status: 'Non traité',
        countryCode: 'FR',
        dialCode: '+33',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        ipAddress: '192.168.1.10',
        country: 'France',
        city: 'Paris',
        referrer: 'https://google.com'
      },
      {
        firstName: 'Pierre',
        email: 'pierre.dubois@email.com',
        phone: '+33987654321',
        source: 'Facebook',
        status: 'Traité',
        countryCode: 'FR',
        dialCode: '+33',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        ipAddress: '192.168.1.11',
        country: 'France',
        city: 'Lyon',
        referrer: 'https://facebook.com'
      },
      {
        firstName: 'Marie',
        email: 'marie.leroy@email.com',
        phone: '+33147258369',
        source: 'Google',
        status: 'Relancé',
        countryCode: 'FR',
        dialCode: '+33',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
        ipAddress: '192.168.1.12',
        country: 'France',
        city: 'Marseille',
        referrer: 'https://google.com'
      },
      {
        firstName: 'Thomas',
        email: 'thomas.bernard@email.com',
        phone: '+33612345678',
        source: 'Landing Page',
        status: 'Non traité',
        countryCode: 'FR',
        dialCode: '+33',
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        ipAddress: '192.168.1.13',
        country: 'France',
        city: 'Toulouse',
        referrer: 'https://yaalstudio.com'
      },
      {
        firstName: 'Julie',
        email: 'julie.moreau@email.com',
        phone: '+33756789012',
        source: 'Referral',
        status: 'Traité',
        countryCode: 'FR',
        dialCode: '+33',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        ipAddress: '192.168.1.14',
        country: 'France',
        city: 'Nice',
        referrer: 'https://linkedin.com'
      },
      {
        firstName: 'Alexandre',
        email: 'alexandre.petit@email.com',
        phone: '+33634567890',
        source: 'Instagram',
        status: 'Non traité',
        countryCode: 'FR',
        dialCode: '+33',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
        ipAddress: '192.168.1.15',
        country: 'France',
        city: 'Bordeaux',
        referrer: 'https://instagram.com'
      },
      {
        firstName: 'Camille',
        email: 'camille.roux@email.com',
        phone: '+33789012345',
        source: 'Landing Page',
        status: 'Relancé',
        countryCode: 'FR',
        dialCode: '+33',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        ipAddress: '192.168.1.16',
        country: 'France',
        city: 'Nantes',
        referrer: 'https://google.com'
      },
      {
        firstName: 'Lucas',
        email: 'lucas.fournier@email.com',
        phone: '+33567890123',
        source: 'YouTube',
        status: 'Non traité',
        countryCode: 'FR',
        dialCode: '+33',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        ipAddress: '192.168.1.17',
        country: 'France',
        city: 'Strasbourg',
        referrer: 'https://youtube.com'
      },
      {
        firstName: 'Emma',
        email: 'emma.girard@email.com',
        phone: '+33456789012',
        source: 'Facebook',
        status: 'Traité',
        countryCode: 'FR',
        dialCode: '+33',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
        ipAddress: '192.168.1.18',
        country: 'France',
        city: 'Lille',
        referrer: 'https://facebook.com'
      },
      {
        firstName: 'Hugo',
        email: 'hugo.simon@email.com',
        phone: '+33345678901',
        source: 'Landing Page',
        status: 'Non traité',
        countryCode: 'FR',
        dialCode: '+33',
        userAgent: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0',
        ipAddress: '192.168.1.19',
        country: 'France',
        city: 'Rennes',
        referrer: 'https://google.com'
      }
    ]

    // Vérifier si la base contient déjà des contacts
    const existingContactsCount = await prisma.contact.count()
    
    if (existingContactsCount > 0) {
      console.log(`⚠️ Base déjà peuplée avec ${existingContactsCount} contacts`)
      return {
        success: true,
        message: `Base déjà peuplée avec ${existingContactsCount} contacts existants`,
        action: 'skipped',
        existingContacts: existingContactsCount
      }
    }

    // Créer les contacts de test
    console.log('🔄 Création des contacts de test...')
    
    const createdContacts = []
    for (const contactData of testContacts) {
      try {
        const contact = await prisma.contact.create({
          data: {
            ...contactData,
            // Ajouter quelques variations dans les dates
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Dans les 30 derniers jours
            updatedAt: new Date()
          }
        })
        createdContacts.push(contact)
        console.log(`✅ Contact créé: ${contact.firstName} (${contact.email})`)
      } catch (error) {
        console.error(`❌ Erreur création contact ${contactData.firstName}:`, error.message)
        // Continuer avec les autres contacts même si un échoue
      }
    }

    console.log(`🎉 Seeding terminé: ${createdContacts.length} contacts créés`)

    return {
      success: true,
      message: `${createdContacts.length} contacts de test créés avec succès`,
      action: 'created',
      contactsCreated: createdContacts.length,
      contacts: createdContacts.map(c => ({
        id: c.id,
        firstName: c.firstName,
        email: c.email,
        source: c.source,
        status: c.status
      }))
    }

  } catch (error) {
    console.error('❌ Erreur seeding contacts:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors du seeding des contacts'
    })
  }
}) 