import bcrypt from 'bcryptjs'
import prisma from '~/server/utils/prisma'
import { generateToken, getExpiryDate } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    console.log('🔐 Tentative de connexion admin')

    const body = await readBody(event)
    const { email, password } = body

    // Validation des données
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email et mot de passe requis'
      })
    }

    // Credentials admin définis directement dans le code pour éviter les conflits
    const ADMIN_EMAIL = 'admin@yaalstudio.com'

    // Debug des données reçues
    console.log('📧 Email reçu:', email)
    console.log('🔑 Mot de passe reçu:', password)
    console.log('📧 Email admin attendu:', ADMIN_EMAIL)

    // Vérifier les credentials admin
    if (email !== ADMIN_EMAIL) {
      console.log('❌ Email admin incorrect')
      console.log('Email reçu:', `"${email}"`)
      console.log('Email attendu:', `"${ADMIN_EMAIL}"`)
      throw createError({
        statusCode: 401,
        statusMessage: 'Identifiants incorrects'
      })
    }

    // Mot de passe admin défini directement dans le code
    const ADMIN_PASSWORD = 'Yaal@Studio2024!Admin'
    
    // Vérifier le mot de passe
    if (password !== ADMIN_PASSWORD) {
      console.log('❌ Mot de passe admin incorrect')
      console.log('Mot de passe reçu:', password)
      console.log('Mot de passe attendu:', ADMIN_PASSWORD)
      throw createError({
        statusCode: 401,
        statusMessage: 'Identifiants incorrects'
      })
    }

    console.log('✅ Mot de passe admin correct')

    // Chercher ou créer l'admin dans la base de données
    let admin = await prisma.admin.findUnique({
      where: { email: ADMIN_EMAIL }
    })

    if (!admin) {
      // Hasher le mot de passe pour le stocker en base
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12)
      
      // Créer l'admin s'il n'existe pas
      admin = await prisma.admin.create({
        data: {
          email: ADMIN_EMAIL,
          password: hashedPassword,
          name: 'Administrateur YaalStudio'
        }
      })
      console.log('✅ Compte admin créé')
    }

    // Générer le token JWT
    const tokenPayload = {
      adminId: admin.id,
      email: admin.email,
      type: 'admin'
    }

    const token = generateToken(tokenPayload)
    const expiryDate = getExpiryDate()

    // Obtenir les informations de la requête
    const userAgent = getHeader(event, 'user-agent') || ''
    const ipAddress = getHeader(event, 'x-forwarded-for') || getHeader(event, 'x-real-ip') || 'unknown'

    // Sauvegarder la session en base de données
    await prisma.adminSession.create({
      data: {
        token,
        adminId: admin.id,
        expiresAt: expiryDate,
        userAgent,
        ipAddress
      }
    })

    // Mettre à jour la dernière connexion
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() }
    })

    console.log('✅ Connexion admin réussie')

    return {
      success: true,
      message: 'Connexion réussie',
      data: {
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          lastLogin: admin.lastLogin
        },
        token,
        expiry: expiryDate.toISOString()
      }
    }

  } catch (error) {
    console.error('❌ Erreur login admin:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur interne du serveur'
    })
  }
}) 