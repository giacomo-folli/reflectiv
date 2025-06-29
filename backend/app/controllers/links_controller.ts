import type { HttpContext } from '@adonisjs/core/http'

export default class LinksController {
  index() {
    return []
  }

  show({ params }: HttpContext) {
    return { id: params.id }
  }
}
