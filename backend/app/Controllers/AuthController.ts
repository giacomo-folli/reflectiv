import { loginUser, registerUser, logoutUser, validateSession } from '../Services/AuthService'

export default class AuthController {
  async login({ request, response }: any) {
    try {
      const { email, password } = request.only(['email', 'password'])

      if (!email || !password) {
        return response.badRequest({ message: 'Email and password are required' })
      }

      const { sessionId, user } = await loginUser(email, password)

      response.cookie('sessionId', sessionId, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // For now, but should fix
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return response.ok({ success: true, user })
    } catch (error: any) {
      console.error(error)
      const err = error instanceof Error ? error.message : 'Invalid email or password'
      return response.unauthorized({ message: err })
    }
  }

  async register({ request, response }: any) {
    try {
      const { email, password, name } = request.only(['email', 'password', 'name'])

      if (!email || !password || !name) {
        return response.badRequest({ message: 'Email, password, and name are required' })
      }

      const user = await registerUser(email, password, name)
      if (!user) {
        return response.internalServerError({ message: 'Failed to create user' })
      }

      return response.created({ success: true, user })
    } catch (error: any) {
      console.error(error)
      const err = error instanceof Error ? error.message : 'Registration failed'
      return response.badRequest({ message: err })
    }
  }

  async logout({ request, response }: any) {
    try {
      const sessionId = request.cookie('sessionId')
      if (sessionId) {
        logoutUser(sessionId)
        response.clearCookie('sessionId', { path: '/' })
      }
      return response.ok({ success: true })
    } catch (error: any) {
      console.error(error)
      return response.internalServerError({ message: 'Logout failed' })
    }
  }

  async me({ request, response }: any) {
    try {
      const sessionId = request.cookie('sessionId')
      if (!sessionId) {
        return response.unauthorized({ message: 'Not authenticated' })
      }

      const user = validateSession(sessionId)
      if (!user) {
        response.clearCookie('sessionId', { path: '/' })
        return response.unauthorized({ message: 'Invalid session' })
      }

      return response.ok({ user })
    } catch (error: any) {
      console.error(error)
      return response.internalServerError({ message: 'Authentication check failed' })
    }
  }
} 