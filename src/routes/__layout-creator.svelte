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
		<div class="my-[66px]">
			<slot />
		</div>
	{:else}
		<div use:pageLoaded class="min-h-screen grid place-items-center">loading...</div>
	{/if}
</div>
