#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Démarrage du build Vercel...');

try {
  // Installer les dépendances si nécessaire
  console.log('📦 Vérification des dépendances...');
  if (!fs.existsSync('./node_modules/@prisma/client')) {
    console.log('⚠️ @prisma/client non trouvé, installation...');
    execSync('npm install @prisma/client prisma', { stdio: 'inherit' });
  }

  // Générer le client Prisma
  console.log('📦 Génération du client Prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Vérifier que le client Prisma a été généré
  const prismaClientPath = './node_modules/.prisma/client';
  if (!fs.existsSync(prismaClientPath)) {
    throw new Error('Le client Prisma n\'a pas été généré correctement');
  }
  
  console.log('✅ Client Prisma généré avec succès');
  
  // Lancer le build Nuxt
  console.log('🏗️ Démarrage du build Nuxt...');
  execSync('cross-env NODE_OPTIONS="--max-old-space-size=4096" nuxt build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      PRISMA_GENERATE_DATAPROXY: 'true'
    }
  });
  
  console.log('✅ Build terminé avec succès');
  
} catch (error) {
  console.error('❌ Erreur lors du build:', error.message);
  process.exit(1);
} 