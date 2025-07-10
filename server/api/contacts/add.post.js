import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    console.log('🚀 Début traitement contact')
    
    // Récupérer les données du formulaire
    const body = await readBody(event)
    
    // Validation des données
    const { firstName, email, phone, source = 'Landing Page' } = body
    
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

    // Configuration Google Sheets avec Service Account
    const config = useRuntimeConfig()
    const serviceAccountPath = config.googleServiceAccountPath
    const spreadsheetId = config.googleSheetsId
    
    console.log('⚙️ Configuration Google Sheets:', {
      hasServiceAccountPath: !!serviceAccountPath,
      hasSpreadsheetId: !!spreadsheetId
    })

    // Préparer les données pour Google Sheets
    const timestamp = new Date().toLocaleString('fr-FR', {
      timeZone: 'Europe/Paris',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })

    const contactData = [
      timestamp,
      firstName.trim(),
      email.toLowerCase().trim(),
      phone.trim(),
      source,
      'Non traité'
    ]

    // Envoyer vers Google Sheets avec Service Account
    let sheetsSuccess = false
    let sheetsError = null

    if (serviceAccountPath && spreadsheetId) {
      try {
        console.log('📊 Tentative d\'ajout dans Google Sheets')
        
        // Vérifier le fichier service account
        const fullPath = path.resolve(serviceAccountPath)
        
        if (fs.existsSync(fullPath)) {
          // Charger le service account
          const serviceAccount = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
          console.log('✅ Service account chargé:', serviceAccount.client_email)
          
          // Authentification Google
          const auth = new google.auth.GoogleAuth({
            credentials: serviceAccount,
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
          })
          
          const sheets = google.sheets({ version: 'v4', auth })
          
          // Requête vers Google Sheets
          const request = {
            spreadsheetId,
            range: 'Contacts!A:F',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
              values: [contactData]
            }
          }
          
          console.log('📤 Envoi vers Google Sheets...')
          const response = await sheets.spreadsheets.values.append(request)
          console.log('✅ Succès Google Sheets:', response.data.updates)
          
          sheetsSuccess = true
          
        } else {
          console.error('❌ Fichier service account introuvable:', fullPath)
          sheetsError = 'Fichier service account introuvable'
        }
        
      } catch (googleError) {
        console.error('❌ Erreur Google Sheets:', googleError.message)
        sheetsError = googleError.message
        sheetsSuccess = false
      }
    } else {
      console.log('⚠️ Configuration Google Sheets incomplète, passage en mode fallback')
      sheetsError = 'Configuration Google Sheets incomplète'
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
      sheetsSuccess,
      emailSent,
      sheetsError,
      emailError
    })

    // Réponse de succès
    return {
      success: true,
      message: emailSent 
        ? 'Inscription réussie ! Vous recevrez bientôt votre cadeau par email.'
        : 'Inscription réussie ! Un problème temporaire empêche l\'envoi de l\'email, nous vous contacterons bientôt.',
      data: {
        firstName,
        email: email.toLowerCase().trim(),
        timestamp: new Date().toISOString(),
        sheetsStatus: sheetsSuccess ? 'success' : 'failed',
        emailStatus: emailSent ? 'sent' : 'failed',
        ...(sheetsError && { sheetsError }),
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