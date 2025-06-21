// import type { HttpContext } from '@adonisjs/core/http'

import auth from "#config/auth"
import User from "#models/user"
import { HttpContext } from "@adonisjs/core/http"

export default class AuthController {
    async login({ request, response }: HttpContext) {
        const email = request.input('email')
        const password = request.input('password')
        
        if (!email || !password) {
            return response.badRequest({ message: 'Email and password are required' })
        }

        try {
            const user = await User.query().where('email', 'ILIKE', email).first()
            if (!user) return response.notFound({ message: "This user doesn't exists" })

            /* const { sessionId, user } = await loginUser(email, password) */
            await auth.use('web').login(user)



            /* response.cookie('sessionId', sessionId, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: true,
                maxAge: 60 * 60 * 24 * 7, // 7 days
            }) */

            return response.ok({ success: true, user })
        } catch (error: any) {
            console.error(error)
            const err = error instanceof Error ? error.message : 'Invalid email or password'
            return response.unauthorized({ message: err })
        }
    }

    async register({ request, response }: HttpContext) {
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

    async logout({ request, response }: HttpContext) {
        try {
            const sessionId = request.cookie('sessionId')
            if (sessionId) {
                logoutUser(sessionId)
                response.clearCookie('sessionId', {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: true,
                })
            }
            return response.ok({ success: true })
        } catch (error: any) {
            console.error(error)
            return response.internalServerError({ message: 'Logout failed' })
        }
    }

    async me({ request, response }: HttpContext) {
        try {
            const sessionId = request.cookie('sessionId')
            if (!sessionId) {
                return response.unauthorized({ message: 'Not authenticated' })
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

            return response.ok({ user })
        } catch (error: any) {
            console.error(error)
            return response.internalServerError({ message: 'Authentication check failed' })
        }
    }
} 