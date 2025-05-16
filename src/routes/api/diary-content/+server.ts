import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { generateMockReflectionContent } from '$lib/mock-diary-content';

export const GET: RequestHandler = ({ url, locals }) => {
  // Check if user is logged in
  if (!locals.user) {
    throw error(401, 'You must be logged in to generate content');
  }

  // Get query parameters
  const monthParam = url.searchParams.get('month');
  const yearParam = url.searchParams.get('year');

  // Validate parameters
  if (!monthParam || !yearParam) {
    throw error(400, 'Month and year parameters are required');
  }

  const month = parseInt(monthParam);
  const year = parseInt(yearParam);

  if (isNaN(month) || month < 1 || month > 12) {
    throw error(400, 'Month must be between 1 and 12');
  }

  if (isNaN(year) || year < 2000 || year > 2100) {
    throw error(400, 'Year must be between 2000 and 2100');
  }

  // In a real implementation, this would call an AI service
  // For now, we're using mock data
  const content = generateMockReflectionContent(month, year);

  return json(content);
};