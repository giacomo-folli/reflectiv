import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    response.ok({ success: true })
  }

  async me({ auth, response }: HttpContext) {
    const { id } = auth.getUserOrFail()
    const user = await User.query().where('id', id)
    response.json({ user })
  }

  async delete({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.ok({ success: true })
  }
}
