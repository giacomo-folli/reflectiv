/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const LinksController = () => import('#controllers/links_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Auth routes

router.group(() => {
  router.post('login', [AuthController, 'login'])
  router.post('register', [AuthController, 'register'])
  router.post('logout', [AuthController, 'logout'])
}).prefix('auth')

router.get('/auth/me', [AuthController, 'me']).middleware(
  middleware.auth({ guards: ['api'], }))

router
  .resource('links', LinksController)
  .only(['index', 'store', 'show'])
  .middleware('*', middleware.auth({ guards: ['api'], }))


