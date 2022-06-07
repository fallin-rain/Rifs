<script>
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	let shouldHide = false
	let oldScrollPos = 0

	let testing = true // hide the old one

	// onMount(() => {
	// 	onscroll = () => {
	// 		oldScrollPos < scrollY ? (shouldHide = true) : (shouldHide = false)
	// 		oldScrollPos = scrollY
	// 	}
	// })
</script>

<nav
	class="fixed bottom-0 z-50 tabs tabs-boxed w-full rounded-none border-t-2 border-neutral bg-base-100"
>
	<div class="flex items-center justify-between w-full px-1 py-3">
		<!-- home -->
		<a
			href="/"
			sveltekit:prefetch
			class="flex-shrink-0 tab"
			class:tab-active={$page.url.pathname === '/'}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
				/>
			</svg>
		</a>
		<!-- Search -->
		<a
			href="/search"
			sveltekit:prefetch
			class="flex-shrink-0 tab"
			class:tab-active={$page.url.pathname === '/search'}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</a>
		<!-- Creators -->
		<a
			href="/creators"
			sveltekit:prefetch
			class="flex-shrink-0 tab"
			class:tab-active={$page.url.pathname === '/creators'}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
				/>
			</svg>
		</a>
	</div>
</nav>

<style>
	nav {
		transition: transform 450ms ease-out;
	}
	.active {
		--color: 15 23 42;
		background-color: rgb(var(--color) / 1);
	}
</style>
