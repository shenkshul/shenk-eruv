<script context="module">
	export const router = false;
	export const hydrate = false;

	import Status from '$lib/status.svelte';
	import { lastUpdated, status } from '$lib/eruvStatus.json';
</script>

<h1>
	The Eruv is <Status {status} /> as of {lastUpdated}.
</h1>

<style>
	h1 {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}
</style>
