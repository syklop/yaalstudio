import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'

export async function getGoogleSheetsClient() {
  const config = useRuntimeConfig()
  const serviceAccountPath = config.googleServiceAccountPath
  
  console.log('🔍 Tentative de chargement du service account:', serviceAccountPath)
  
  if (!serviceAccountPath) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_PATH non défini dans la configuration')
  }
  
  // Résoudre le chemin relatif
  const fullPath = path.resolve(serviceAccountPath)
  console.log('📁 Chemin complet du fichier:', fullPath)
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Fichier de compte de service Google introuvable: ${fullPath}`)
  }
  
  const serviceAccount = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
  console.log('✅ Service account chargé:', serviceAccount.client_email)
  
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
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
      throw new Error('GOOGLE_SHEETS_ID non défini')
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
    throw error
  }
}