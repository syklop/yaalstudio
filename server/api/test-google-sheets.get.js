export default defineEventHandler(async () => {
  try {
    console.log('🧪 Test des variables d\'environnement Google Sheets')
    
    const config = useRuntimeConfig()
    
    const diagnostics = {
      variables: {
        googleSheetsId: config.googleSheetsId ? '✅ Défini' : '❌ Manquant',
        googleProjectId: config.googleProjectId ? '✅ Défini' : '❌ Manquant',
        googleClientEmail: config.googleClientEmail ? '✅ Défini' : '❌ Manquant',
        googlePrivateKey: config.googlePrivateKey ? '✅ Défini' : '❌ Manquant',
        googlePrivateKeyId: config.googlePrivateKeyId ? '✅ Défini' : '❌ Manquant',
        googleClientId: config.googleClientId ? '✅ Défini' : '❌ Manquant'
      },
      tests: {}
    }
    
    // Test 1: Vérification du format de la clé privée
    if (config.googlePrivateKey) {
      try {
        const privateKey = config.googlePrivateKey
          .replace(/\\n/g, '\n')
          .replace(/"/g, '')
          .trim()
        
        if (privateKey.includes('BEGIN PRIVATE KEY') && privateKey.includes('END PRIVATE KEY')) {
          diagnostics.tests.privateKeyFormat = '✅ Format valide'
        } else {
          diagnostics.tests.privateKeyFormat = '❌ Format invalide'
        }
      } catch (error) {
        diagnostics.tests.privateKeyFormat = `❌ Erreur: ${error.message}`
      }
    }
    
    // Test 2: Tentative de connexion Google Sheets
    if (config.googleSheetsId && config.googleClientEmail && config.googlePrivateKey) {
      try {
        const { getGoogleSheetsClient } = await import('~/server/utils/googleSheets')
        const sheets = await getGoogleSheetsClient()
        
        if (sheets) {
          diagnostics.tests.connection = '✅ Connexion réussie'
          
          // Test 3: Vérification du spreadsheet
          try {
            const spreadsheetInfo = await sheets.spreadsheets.get({
              spreadsheetId: config.googleSheetsId
            })
            diagnostics.tests.spreadsheet = `✅ Spreadsheet trouvé: ${spreadsheetInfo.data.properties.title}`
            
            // Test 4: Vérification de la feuille "Contacts"
            try {
              await sheets.spreadsheets.values.get({
                spreadsheetId: config.googleSheetsId,
                range: 'Contacts!A1:F1'
              })
              diagnostics.tests.contactsSheet = '✅ Feuille "Contacts" accessible'
            } catch (error) {
              diagnostics.tests.contactsSheet = `❌ Feuille "Contacts" inaccessible: ${error.message}`
            }
            
          } catch (error) {
            diagnostics.tests.spreadsheet = `❌ Erreur spreadsheet: ${error.message}`
          }
        }
      } catch (error) {
        diagnostics.tests.connection = `❌ Erreur connexion: ${error.message}`
      }
    } else {
      diagnostics.tests.connection = '❌ Variables manquantes pour tester la connexion'
    }
    
    console.log('📋 Résultats des tests:', diagnostics)
    
    return {
      success: true,
      diagnostics,
      timestamp: new Date().toISOString()
    }
    
  } catch (error) {
    console.error('❌ Erreur dans le test Google Sheets:', error)
    
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }
  }
}) 