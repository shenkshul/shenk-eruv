<script context="module">
    // your script goes here
    import Status from '$lib/status.svelte';
    export let status, date;
</script>

<h1>
    The Eruv is <Status {status} /> as of {date}.
</h1>

<style>
    h1 {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
</style>