import { initializeI18n } from '$lib/i18n';

// Initialize i18n when the app loads
initializeI18n();

// This handles unexpected errors from the client
export const handleError = ({ error }: any) => {
	const err = error instanceof Error ? error.message : 'An unexpected error occurred';

	console.error('Client error:', err);
	return {
		message: err
	};
};
