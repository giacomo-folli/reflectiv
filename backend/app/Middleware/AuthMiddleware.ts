import { validateSession } from '../Services/AuthService'

export default class AuthMiddleware {
  async handle({ request, response }, next) {
    const sessionId = request.cookie('sessionId')
    
    if (!sessionId) {
      return response.unauthorized({ message: 'Authentication required' })
    }

    const user = validateSession(sessionId)
    if (!user) {
      response.clearCookie('sessionId', { 
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
      })
      return response.unauthorized({ message: 'Invalid session' })
    }

    // Add user to request context
    request.user = user
    
    await next()
  }
} 