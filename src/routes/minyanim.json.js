import * as minyanim from '$lib/minyanim.json';

export async function get() {
	return {
		body: {
			minyanim
		}
	};
}

/** @type {import('@sveltejs/kit').Load} */
export async function load() {
	return {
		body: {
			minyanim
		}
	};
}
