#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const envTemplate = `# Configuration Google Sheets
GOOGLE_SHEETS_ID=your_google_sheets_id_here
GOOGLE_SHEETS_API_KEY=your_google_api_key_here

# Configuration Brevo (pour les emails)
BREVO_API_KEY=your_brevo_api_key_here
FROM_EMAIL=contact@yaalstudio.com
FROM_NAME=YaalStudio
ADMIN_EMAIL=sy.klopbeat@gmail.com

# Configuration sécurité
ADMIN_PASSWORD=your_admin_password_here
JWT_SECRET=your_jwt_secret_here

# Configuration publique
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_PUBLIC_SITE_NAME=YaalStudio
NUXT_PUBLIC_SITE_DESCRIPTION=Votre partenaire créatif pour tous vos projets digitaux`

const envPath = path.join(__dirname, '.env')

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envTemplate)
  console.log('✅ Fichier .env créé avec succès!')
  console.log('📝 Éditez le fichier .env pour configurer vos variables d\'environnement')
} else {
  console.log('⚠️  Le fichier .env existe déjà')
}

console.log('\n📋 Variables d\'environnement à configurer:')
console.log('1. GOOGLE_SHEETS_ID - ID de votre feuille Google Sheets')
console.log('2. GOOGLE_SHEETS_API_KEY - Clé API Google Sheets')
console.log('3. BREVO_API_KEY - Clé API Brevo pour les emails')
console.log('\n💡 L\'application fonctionne même sans ces variables (mode fallback)') 