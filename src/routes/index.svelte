<script context="module">
	export const router = false;
	export const hydrate = false;

	let lastUpdated, status;

	import Status from '$lib/status.svelte';
	// import { lastUpdated, status } from '$lib/eruvStatus.json';

		/** @type {import('@sveltejs/kit').Load} */
		export async function load({ page, fetch, session, stuff }) {
		const url = `/status.json`;
		const res = await fetch(url);

		if (res.ok) {
			const data = await res.json();
			status = data.status;
			lastUpdated = data.lastUpdated;
			return {
				body: {
					status, lastUpdated
				}
			}
		}
	}
</script>

<svelte:head>
	<title>Shenk Eruv Status</title>
</svelte:head>

<h1>
	The Eruv is <Status {status} /> as of {lastUpdated}.
</h1>

<style>
	h1 {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}
</style>
