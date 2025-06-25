// import type { HttpContext } from '@adonisjs/core/http'

import Link from "#models/link";
import { HttpContext } from "@adonisjs/core/http";

export default class LinksController {
    async index({ response, auth }: HttpContext) {
        const user = auth.getUserOrFail()

        try {
            const links = await Link.query().where('user_id', user.id)
            return response.ok(links);

        } catch (error: any) {
            console.error('Error handling links:', error);
            return response.internalServerError({ message: 'Failed to process request' });
        }
    }

    async show({ response, auth, params }: HttpContext) {
        const user = auth.getUserOrFail()

        try {
            const link = await Link.query().where('user_id', user.id).where('id', params.id).firstOrFail()
            return response.ok(link);

        } catch (error: any) {
            console.error('Error handling links:', error);
            return response.internalServerError({ message: 'Failed to process request' });
        }
    }

    async store({ request, response, auth }: HttpContext) {
        const user = auth.getUserOrFail()

        try {
            const { url, title } = request.only(['url', 'title']);

            if (!url) {
                return response.badRequest({ message: 'URL is required' });
            }

            const link = await Link.create({
                url,
                userId: user.id,
                title: title || '',
            });

            if (!link) {
                return response.internalServerError({ message: 'Failed to create link' });
            }

            return response.created(link);
        } catch (error: any) {
            console.error('Error handling links:', error);
            return response.internalServerError({ message: 'Failed to process request' });
        }
    }
}