/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const LinksController = () => import('#controllers/links_controller')
const UsersController = () => import('#controllers/users_controller')
const SessionController = () => import('#controllers/session_controller')

router.post('login', [SessionController, 'store'])
router.post('register', [UsersController, 'store'])

router.get('logout', [SessionController, 'delete']).use(middleware.auth())
router.get('me', [SessionController, 'me']).use(middleware.auth())

router.get('links', [LinksController, 'index']).use(middleware.auth())
router.get('links/:id', [LinksController, 'show']).use(middleware.auth())
