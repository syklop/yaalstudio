export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  
  // Credentials admin définis dans le code
  const ADMIN_EMAIL = 'admin@yaalstudio.com'
  const ADMIN_PASSWORD = 'Yaal@Studio2024!Admin'
  
  return {
    success: true,
    adminCredentials: {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD.substring(0, 4) + '***'  // Masquer le mot de passe
    },
    config: {
      brevoEmail: config.adminEmail,  // Email Brevo pour les envois
      hasJwtSecret: !!config.jwtSecret
    },
    env: {
      NODE_ENV: process.env.NODE_ENV,
      brevoEmailFromEnv: process.env.ADMIN_EMAIL  // Email Brevo
    }
  }
}) 