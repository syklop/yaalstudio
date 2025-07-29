import jwt from 'jsonwebtoken'

const config = useRuntimeConfig()

export function generateToken(payload) {
  return jwt.sign(
    payload,
    config.jwtSecret,
    { 
      expiresIn: '2h' // Token expire en 2 heures
    }
  )
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwtSecret)
  } catch (error) {
    console.error('❌ Erreur vérification JWT:', error.message)
    return null
  }
}

export function extractTokenFromHeader(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  return authHeader.substring(7) // Supprimer "Bearer "
}

export function getExpiryDate() {
  const now = new Date()
  now.setHours(now.getHours() + 2) // Expire dans 2 heures
  return now
} 