import { lastUpdated, status, notes } from '$lib/eruvStatus.json';

export async function get() {
	return {
		body: {
			lastUpdated,
			status,
			notes
		}
	};
}

/** @type {import('@sveltejs/kit').Load} */
export async function load() {
	return {
		body: {
			lastUpdated,
			status,
			notes
		}
	};
}
