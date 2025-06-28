// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    if (!email || !password) {
      return response.badRequest({ message: 'Email and password are required' })
    }

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: '7 days',
    })

    return token
  }

  async register({ request, response }: HttpContext) {
    const { email, password, name } = request.only(['email', 'password', 'name'])
    if (!email || !password || !name) {
      return response.badRequest({ message: 'Email, password, and name are required' })
    }

    try {
      const user = await User.create({ email, name, password })
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

  async logout({ auth }: HttpContext) {
    let user = auth.use('api').user
    if (!user) return { revoked: false }

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return {
      revoked: true,
    }
  }

  async me({ auth }: HttpContext) {
    if (!auth.user) return

    let user = auth.user
    return user
  }
}
