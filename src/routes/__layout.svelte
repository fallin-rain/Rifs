<script>
	import '../tailwind.css'
	import Header from '$lib/components/Header.svelte'
</script>

<div class="min-h-screen bg-slate-900 text-pink-200">
	<Header />
	<main class="px-6 py-20 space-y-10 md:px-20">
		<slot />
	</main>
</div>

<style>
	* {
		user-select: none;
		-moz-user-select: -moz-none;
		-webkit-user-select: none;
	}
	/* Custom scrollbar */
	/* Colour generated from https://cssgradient.io/ */

	section::-webkit-scrollbar-track {
		border-radius: 5px !important;
		background-color: #0f172a !important;
	}

	section::-webkit-scrollbar {
		width: 10px !important;
		border-radius: 5px !important;
		background-color: #0f172a !important;
	}

	section::-webkit-scrollbar-thumb {
		border-radius: 5px !important;
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
