<script>
	import '../tailwind.css'
	import Header from '$lib/components/Header.svelte'
	import Nav from '$lib/components/Nav.svelte'
</script>

<div
	class="min-h-screen select-none scrollbar-thin scrollbar-thumb-pink-900 scrollbar-track-blue-600 bg-slate-900 text-pink-200"
>
	<Header />
	<main class="px-6 scrollbar py-20 space-y-10 md:px-20">
		<slot />
	</main>
	<Nav />
</div>

<style>
	/* Custom scrollbar */
	/* Colour generated from https://cssgradient.io/ */

	:global(html) {
		scrollbar-color: rgba(233, 30, 99, 1) #0f172a;
		scrollbar-width: none;
		user-select: none !important;
	}

	:global(html)::-webkit-scrollbar-track {
		border-radius: 0px !important;
		background-color: #0f172a !important;
		display: none;
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
		) !important;
		background: -webkit-linear-gradient(
			38deg,
			rgba(232, 36, 90, 1) 0%,
			rgba(232, 35, 92, 1) 0%,
			rgba(233, 30, 99, 1) 31%,
			rgba(232, 39, 83, 1) 31%,
			rgba(229, 57, 53, 1) 100%
		) !important;
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
