<script context="module">
	export const router = false;
	export const hydrate = false;

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, stuff }) {
		const url = `/minyanim.json`;
		const res = await fetch(url);

		if (res.ok) {
			const data = await res.json();
			return {
				body: {
					minyanim: data,
					status: 200
				}
			};
		}
	}
</script>

<svelte:head>
	<title>Shenk Minyanim</title>
</svelte:head>
