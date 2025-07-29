import { google } from 'googleapis'

export async function getGoogleSheetsClient() {
  const config = useRuntimeConfig()
  
  console.log('🔍 Initialisation du client Google Sheets...')
  
  // Debug des variables d'environnement (sans afficher les clés sensibles)
  console.log('🔧 Variables d\'environnement disponibles:', {
    googleSheetsId: config.googleSheetsId ? '✅ Défini' : '❌ Manquant',
    googleProjectId: config.googleProjectId ? '✅ Défini' : '❌ Manquant',
    googleClientEmail: config.googleClientEmail ? '✅ Défini' : '❌ Manquant',
    googlePrivateKey: config.googlePrivateKey ? '✅ Défini' : '❌ Manquant',
    googlePrivateKeyId: config.googlePrivateKeyId ? '✅ Défini' : '❌ Manquant',
    googleClientId: config.googleClientId ? '✅ Défini' : '❌ Manquant'
  })
  
  // Vérification des variables d'environnement requises
  if (!config.googleClientEmail) {
    console.error('❌ GOOGLE_CLIENT_EMAIL non défini')
    throw new Error('GOOGLE_CLIENT_EMAIL non défini dans les variables d\'environnement')
  }
  
  if (!config.googlePrivateKey) {
    console.error('❌ GOOGLE_PRIVATE_KEY non défini')
    throw new Error('GOOGLE_PRIVATE_KEY non défini dans les variables d\'environnement')
  }

  if (!config.googleSheetsId) {
    console.error('❌ GOOGLE_SHEETS_ID non défini')
    throw new Error('GOOGLE_SHEETS_ID non défini dans les variables d\'environnement')
  }
  
  // Reconstitution de l'objet credentials avec meilleure gestion de la clé privée
  let privateKey
  try {
    // Nettoyage et formatage de la clé privée
    privateKey = config.googlePrivateKey
      .replace(/\\n/g, '\n')
      .replace(/"/g, '')
      .trim()
    
    // Vérification du format de la clé privée
    if (!privateKey.includes('BEGIN PRIVATE KEY') || !privateKey.includes('END PRIVATE KEY')) {
      console.error('❌ Format de clé privée invalide')
      throw new Error('Format de clé privée Google invalide')
    }
    
    console.log('✅ Clé privée formatée correctement')
  } catch (error) {
    console.error('❌ Erreur lors du formatage de la clé privée:', error.message)
    throw new Error('Erreur lors du formatage de la clé privée Google')
  }
  
  const credentials = {
    type: 'service_account',
    project_id: config.googleProjectId,
    private_key_id: config.googlePrivateKeyId,
    private_key: privateKey,
    client_email: config.googleClientEmail,
    client_id: config.googleClientId,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(config.googleClientEmail)}`,
    universe_domain: 'googleapis.com'
  }
  
  console.log('✅ Credentials reconstitués pour:', credentials.client_email)
  
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file'
      ]
    })
    
    console.log('✅ Authentification Google initialisée')
    
    // Test de l'authentification
    await auth.getClient()
    console.log('✅ Client d\'authentification obtenu')
    
    const sheets = google.sheets({ version: 'v4', auth })
    console.log('✅ Client Google Sheets créé')
    
    return sheets
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de l\'authentification Google:', error.message)
    throw new Error(`Erreur d'authentification Google: ${error.message}`)
  }
}

export async function appendToSheet(data) {
  try {
    console.log('📊 Tentative d\'ajout dans Google Sheets:', data)
    
    const sheets = await getGoogleSheetsClient()
    const config = useRuntimeConfig()
    const spreadsheetId = config.googleSheetsId
    
    console.log('📋 Utilisation du spreadsheet ID:', spreadsheetId ? '✅ Défini' : '❌ Manquant')
    
    // Vérification de l'existence du spreadsheet
    try {
      console.log('🔍 Vérification de l\'existence du spreadsheet...')
      const spreadsheetInfo = await sheets.spreadsheets.get({
        spreadsheetId
      })
      console.log('✅ Spreadsheet trouvé:', spreadsheetInfo.data.properties.title)
    } catch (error) {
      console.error('❌ Erreur lors de la vérification du spreadsheet:', error.message)
      throw new Error(`Spreadsheet non accessible: ${error.message}`)
    }
    
    // Vérification de l'existence de la feuille "Contacts"
    try {
      console.log('🔍 Vérification de l\'existence de la feuille "Contacts"...')
      await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Contacts!A1:F1'
      })
      console.log('✅ Feuille "Contacts" trouvée')
    } catch (error) {
      console.error('❌ Erreur: La feuille "Contacts" n\'existe pas ou n\'est pas accessible:', error.message)
      throw new Error('La feuille "Contacts" n\'existe pas dans le spreadsheet')
    }
    
    const request = {
      spreadsheetId,
      range: 'Contacts!A:F',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [data]
      }
    }
    
    console.log('📤 Envoi de la requête à Google Sheets...')
    console.log('📋 Paramètres de la requête:', {
      range: request.range,
      valueInputOption: request.valueInputOption,
      insertDataOption: request.insertDataOption,
      dataLength: data.length
    })
    
    const response = await sheets.spreadsheets.values.append(request)
    console.log('✅ Succès Google Sheets:', response.data.updates)
    
    return response.data
    
  } catch (error) {
    console.error('❌ Erreur Google Sheets complète:', {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error.details
    })
    
    // Gestion des erreurs spécifiques
    if (error.message.includes('permission')) {
      throw new Error('Erreur de permission Google Sheets: Vérifiez que le compte de service a accès au spreadsheet')
    }
    
    if (error.message.includes('not found')) {
      throw new Error('Spreadsheet ou feuille non trouvé: Vérifiez l\'ID du spreadsheet et l\'existence de la feuille "Contacts"')
    }
    
    throw error
  }
}