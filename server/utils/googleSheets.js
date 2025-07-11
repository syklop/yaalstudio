import { google } from 'googleapis'

export async function getGoogleSheetsClient() {
  const config = useRuntimeConfig()
  
  console.log('🔍 Initialisation du client Google Sheets avec les variables d\'environnement...')
  
  // Vérification des variables d'environnement requises
  if (!config.googleClientEmail) {
    throw new Error('GOOGLE_CLIENT_EMAIL non défini dans les variables d\'environnement')
  }
  
  if (!config.googlePrivateKey) {
    throw new Error('GOOGLE_PRIVATE_KEY non défini dans les variables d\'environnement')
  }
  
  // Reconstitution de l'objet credentials à partir des variables d'environnement
  const credentials = {
    type: 'service_account',
    project_id: config.googleProjectId,
    private_key_id: config.googlePrivateKeyId,
    private_key: config.googlePrivateKey.replace(/\\n/g, '\n'),
    client_email: config.googleClientEmail,
    client_id: config.googleClientId,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(config.googleClientEmail)}`,
    universe_domain: 'googleapis.com'
  }
  
  console.log('✅ Credentials reconstitués pour:', credentials.client_email)
  
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })
  
  const sheets = google.sheets({ version: 'v4', auth })
  return sheets
}

export async function appendToSheet(data) {
  try {
    console.log('📊 Tentative d\'ajout dans Google Sheets:', data)
    
    const sheets = await getGoogleSheetsClient()
    const config = useRuntimeConfig()
    const spreadsheetId = config.googleSheetsId
    
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_ID non défini dans les variables d\'environnement')
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
    const response = await sheets.spreadsheets.values.append(request)
    console.log('✅ Succès Google Sheets:', response.data.updates)
    
    return response.data
    
  } catch (error) {
    console.error('❌ Erreur Google Sheets:', error.message)
    console.error('Détails de l\'erreur:', error)
    throw error
  }
}