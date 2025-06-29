import type { PageLoad } from './$types';
import { LinkService } from '$lib/services/link.service';

export const load: PageLoad = async ({ fetch }) => {
	const service = new LinkService({ fetch });
	const links = await service.list();

	return { links };
};
