<script>
	/** @type {boolean} Eruv Status; TRUE is up, FALSE is down */
	export let status;
</script>

{#if status}
	<!-- content here -->
	<span class="eruvUp"> UP </span>
{:else}
	<!-- else content here -->
	<span class="eruvDown"> DOWN </span>
{/if}

<style>
	/* your styles go here */
	.eruvUp {
		color: #508d24;
	}

	.eruvDown {
		color: rgb(141, 36, 36);
	}
</style>
