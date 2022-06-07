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

<style>
	/* Custom scrollbar */
	/* Colour generated from https://cssgradient.io/ */

	:global(html) {
		scrollbar-color: rgba(233, 30, 99, 1) #0f172a;
		scrollbar-width: initial;
	}

	:global(html)::-webkit-scrollbar-track {
		border-radius: 0px !important;
		background-color: #0f172a !important;
	}

	:global(html)::-webkit-scrollbar {
		width: 10px !important;
		border-radius: 0px !important;
		background-color: #0f172a !important;
	}

	:global(html)::-webkit-scrollbar-thumb {
		border-radius: 10px !important;
		background: rgb(232, 36, 90) !important;
		background: -moz-linear-gradient(
			38deg,
			rgba(232, 36, 90, 1) 0%,
			rgba(232, 35, 92, 1) 0%,
			rgba(233, 30, 99, 1) 31%,
			rgba(232, 39, 83, 1) 31%,
			rgba(229, 57, 53, 1) 100%
		);
		background: -webkit-linear-gradient(
			38deg,
			rgba(232, 36, 90, 1) 0%,
			rgba(232, 35, 92, 1) 0%,
			rgba(233, 30, 99, 1) 31%,
			rgba(232, 39, 83, 1) 31%,
			rgba(229, 57, 53, 1) 100%
		);
		background: linear-gradient(
			38deg,
			rgba(232, 36, 90, 1) 0%,
			rgba(232, 35, 92, 1) 0%,
			rgba(233, 30, 99, 1) 31%,
			rgba(232, 39, 83, 1) 31%,
			rgba(229, 57, 53, 1) 100%
		) !important;
	}
</style>
