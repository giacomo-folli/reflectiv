/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Health check
Route.get('/', async () => {
  return { status: 'ok', message: 'Reflectiv API is running' }
})

// Auth routes
Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register')
  Route.post('/logout', 'AuthController.logout')
  Route.get('/me', 'AuthController.me')
}).prefix('/auth')

// API routes
Route.group(() => {
  Route.post('/diary-content', 'ApiController.diaryContent')
  Route.get('/links', 'ApiController.links')
  Route.post('/links', 'ApiController.links')
  Route.post('/generate-pdf', 'ApiController.generatePdf')
}).prefix('/api')

// Health check endpoint
Route.get('/health', async () => {
  return { status: 'healthy', timestamp: new Date().toISOString() }
})
