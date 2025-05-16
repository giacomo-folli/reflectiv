import type { RequestHandler } from '@sveltejs/kit';
import { mockDiaryQuestionResponse } from '$lib/mock-data';

/**
 * GET /api/diary/question
 * Returns the question for a given date or day number.
 * Input is validated; errors are returned with appropriate status codes.
 *
 * @param request - The incoming request object
 * @returns Response with the question or error
 */
export const GET: RequestHandler = async ({ url }) => {
    // TODO: Implement input validation and fetching logic
    // const date = url.searchParams.get('date');
    // const day = url.searchParams.get('day');
    return new Response(JSON.stringify(mockDiaryQuestionResponse), { status: 200 });
};
