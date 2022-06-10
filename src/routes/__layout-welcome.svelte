<script>
	// @ts-nocheck

	import '../tailwind.css'

	let loaded = false

	function pageLoaded() {
		loaded = true
	}
</script>

<div class="min-h-screen">
	{#if loaded}
		<slot />
	{:else}
		<div use:pageLoaded class="min-h-screen grid place-items-center">loading...</div>
	{/if}
</div>
