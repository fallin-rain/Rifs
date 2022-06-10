<script>
	// @ts-nocheck

	import '../tailwind.css'

	let loaded = false

	function pageLoaded() {
		loaded = true
	}
</script>

<main class="min-h-screen bg-base-300">
	{#if loaded}
		<slot />
	{:else}
		<div use:pageLoaded class="min-h-screen grid place-items-center">loading...</div>
	{/if}
</main>
