// import type { HttpContext } from '@adonisjs/core/http'

import User from "#models/user"
import { HttpContext } from "@adonisjs/core/http"

export default class AuthController {
    async login({ request, response, auth }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])

        if (!email || !password) {
            return response.badRequest({ message: 'Email and password are required' })
        }

        try {
            const user = await User.verifyCredentials(email, password)
            if (!user) return response.notFound({ message: "This user doesn't exists" })

            /* const { sessionId, user } = await loginUser(email, password) */
            await auth.use('web').login(user)
            return response.ok({ success: true, user })
        } catch (error: any) {
            console.error(error)
            const err = error instanceof Error ? error.message : 'Invalid email or password'
            return response.unauthorized({ message: err })
        }
    }

    async register({ request, response }: HttpContext) {
        const { email, password, name } = request.only(['email', 'password', 'name'])
        if (!email || !password || !name) {
            return response.badRequest({ message: 'Email, password, and name are required' })
        }

        try {


            const user = await User.create({email, name, password})
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

    async logout({ response, auth }: HttpContext) {
        await auth.use('web').logout()
        return response.redirect('/login')    
    }

    async me({ response, auth }: HttpContext) {
        try {
            await auth.use('web').check()
            const user = auth.use('web').user
            if (!user) {
                return response.unauthorized({ message: 'Not authenticated' })
            }
            return response.ok({ user })
        } catch (error: any) {
            console.error(error)
            return response.internalServerError({ message: 'Authentication check failed' })
        }
    }
} 