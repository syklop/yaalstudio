# YaalStudio - Landing Page Moderne + Dashboard

## 🚀 Vue d'ensemble

Landing page moderne pour **YaalStudio** avec système de collecte de prospects et dashboard d'administration. Design inspiré du style moderne avec fond sombre, overlay géométrique et typographie élégante.

### ✨ Fonctionnalités

- **Landing Page optimisée** : Design moderne, responsive et performant
- **Collecte de prospects** : Formulaire avec validation et sauvegarde Google Sheets
- **Email automatique** : Envoi de cadeaux gratuits via Brevo
- **Dashboard admin** : Gestion des contacts et envoi d'emails de masse
- **SEO optimisé** : Meta tags, sitemap et optimisations Core Web Vitals

## 🛠 Stack Technique

- **Nuxt 3** avec Options API
- **@nuxt/ui** pour les composants UI
- **@nuxt/fonts** pour l'optimisation des polices Google
- **@nuxt/image** pour l'optimisation des images
- **Google Sheets API** pour le stockage des contacts
- **Brevo API** pour l'envoi d'emails
- **TypeScript** pour la robustesse du code

## 📁 Architecture

```
yaalstudio/
├── components/
│   ├── ContactForm.vue          # Formulaire de capture de prospects
│   ├── DashboardNav.vue         # Navigation du dashboard (à créer)
│   ├── EmailComposer.vue        # Composeur d'email (à créer)
│   └── ContactsList.vue         # Liste des contacts (à créer)
├── pages/
│   ├── index.vue                # Landing page principale ✅
│   ├── merci.vue                # Page de remerciement ✅
│   ├── login.vue                # Authentification admin (à créer)
│   └── dashboard/
│       ├── index.vue            # Dashboard principal (à créer)
│       ├── contacts.vue         # Gestion des contacts (à créer)
│       └── emails.vue           # Envoi d'emails (à créer)
├── server/api/
│   ├── contacts/
│   │   ├── add.post.js          # Ajouter contact → Google Sheets ✅
│   │   ├── list.get.js          # Récupérer contacts (à créer)
│   │   └── export.get.js        # Export CSV/Excel (à créer)
│   ├── emails/
│   │   ├── confirmation.post.js # Email de confirmation ✅
│   │   ├── send.post.js         # Envoi email de masse (à créer)
│   │   └── schedule.post.js     # Planification d'envoi (à créer)
│   └── auth/
│       ├── login.post.js        # Authentification admin (à créer)
│       └── logout.post.js       # Déconnexion (à créer)
├── assets/
│   ├── css/
│   │   └── main.css             # Styles principaux ✅
│   ├── files/                   # Fichiers cadeaux (à créer)
│   └── email-templates/         # Templates HTML emails (à créer)
└── middleware/
    └── auth.js                  # Protection routes dashboard (à créer)
```

## ⚙️ Installation et Configuration

### 1. Installation des dépendances

```bash
npm install
```

### 2. Configuration des variables d'environnement

Créez un fichier `.env` à la racine du projet avec :

```env
# Configuration Google Sheets
GOOGLE_SHEETS_ID=your_google_sheet_id_here
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key_here

# Configuration Email (Brevo)
BREVO_API_KEY=your_brevo_api_key_here
FROM_EMAIL=noreply@yaalstudio.com
FROM_NAME=YaalStudio

# Configuration Site
NUXT_PUBLIC_SITE_URL=https://yaalstudio.com
NUXT_PUBLIC_SITE_NAME=YaalStudio
NUXT_PUBLIC_SITE_DESCRIPTION=Votre partenaire créatif pour tous vos projets digitaux

# Configuration Dashboard Admin
ADMIN_EMAIL=admin@yaalstudio.com
ADMIN_PASSWORD=your_secure_admin_password
JWT_SECRET=your_jwt_secret_key_here

# Développement
NODE_ENV=development
NUXT_HOST=0.0.0.0
NUXT_PORT=3000
```

### 3. Configuration Google Sheets

1. **Créer une Google Sheet** avec les colonnes suivantes dans l'onglet "Contacts" :
   - A: Date
   - B: Prénom
   - C: Email
   - D: Téléphone
   - E: Source
   - F: Statut

2. **Activer l'API Google Sheets** :
   - Aller sur [Google Cloud Console](https://console.cloud.google.com/)
   - Créer un projet ou sélectionner un projet existant
   - Activer l'API Google Sheets
   - Créer une clé API
   - Rendre la sheet publique en lecture/écriture

3. **Récupérer l'ID de la sheet** depuis l'URL :
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID/edit
   ```

### 4. Configuration Brevo (ex-Sendinblue)

1. **Créer un compte** sur [Brevo](https://brevo.com)
2. **Générer une clé API** dans les paramètres
3. **Configurer un expéditeur vérifié**

## 🚀 Lancement

### Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Production

```bash
# Build
npm run build

# Preview
npm run preview
```

## 🎨 Design System

### Couleurs
- **Primaire** : Noir (#000000)
- **Secondaire** : Blanc (#FFFFFF)  
- **Accent** : Bleu (#3B82F6)
- **Accent Purple** : Violet (#8B5CF6)

### Typographie
- **Police** : Inter (Google Fonts)
- **Poids** : 300, 400, 500, 600, 700

### Animations
- **Transitions** : 300ms ease-in-out
- **Animations d'entrée** : fadeInUp avec délais échelonnés

## 📧 Configuration Email

Le système d'email utilise **Brevo** pour l'envoi automatique. Template HTML responsive inclus avec :

- Design cohérent avec la landing page
- Call-to-action pour télécharger les ressources
- Footer avec désabonnement
- Tracking des ouvertures et clics

## 🔒 Sécurité

- Validation côté client et serveur
- Sanitisation des données
- Protection CSRF
- JWT pour l'authentification admin
- Variables d'environnement sécurisées

## 📊 Analytics et Performance

- **SEO** : Meta tags optimisés, sitemap automatique
- **Performance** : Images optimisées, CSS minifié, code splitting
- **Analytics** : Prêt pour Google Analytics / Tag Manager
- **Core Web Vitals** : Optimisé pour les métriques de performance

## 🚧 Prochaines étapes

### Phase 1 - Complété ✅
- [x] Landing page avec design moderne
- [x] Formulaire de contact avec validation
- [x] Intégration Google Sheets
- [x] Email de confirmation automatique
- [x] Page de remerciement

### Phase 2 - À développer
- [ ] Dashboard d'administration
- [ ] Authentification sécurisée
- [ ] Liste et gestion des contacts
- [ ] Export des données (CSV/Excel)
- [ ] Composeur d'email avec variables
- [ ] Système de planification d'envoi
- [ ] Analytics et statistiques

### Phase 3 - Optimisations
- [ ] Tests unitaires et e2e
- [ ] Monitoring et logs
- [ ] Optimisations performance avancées
- [ ] PWA et mode offline
- [ ] Multi-langue (i18n)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**YaalStudio** - La maison de stratégie pour donner forme aux idées ✨
