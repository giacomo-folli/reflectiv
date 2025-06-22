/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')

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
  router.get('me', [AuthController, 'me'])
}).prefix('auth')



