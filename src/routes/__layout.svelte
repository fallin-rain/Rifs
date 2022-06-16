<script>
	// @ts-nocheck

	import '../tailwind.css'
	import Nav from '$lib/components/Nav.svelte'

	let loaded = false

	function pageLoaded() {
		loaded = true
	}
</script>

<div class="min-h-screen bg-base-300">
	{#if loaded}
		<Nav />
		<main class="min-h-screen my-[65px]">
			<slot />
		</main>
	{:else}
		<div use:pageLoaded class="min-h-screen grid place-items-center">loading...</div>
	{/if}
</div>
