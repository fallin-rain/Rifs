<script>
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	let tabBarOnRoutes = ['hot', 'reels', 'images']

	let shouldHide = false
	let oldScrollPos = 0

	onMount(() => {
		onscroll = () => {
			oldScrollPos < scrollY ? (shouldHide = true) : (shouldHide = false)
			oldScrollPos = scrollY
		}
	})
</script>

<!-- header -->
<header
	class:header-hide={shouldHide}
	class="fixed top-0 z-50 pl-6 navbar border-b-2 border-neutral bg-base-100"
>
	<a
		href="/"
		sveltekit:prefetch
		class="flex-1 bg-gradient-to-br from-[#F471B5] to-red-600 bg-clip-text font-serif text-xl font-extrabold italic tracking-wide text-transparent"
		>Rifs</a
	>
	<div>
		<a
			href="/tags"
			sveltekit:prefetch
			class="btn btn-ghost"
			class:btn-active={$page.url.pathname === '/tags'}
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
					d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
				/>
			</svg>
		</a>
		<!-- VERIFIED link -->
		<a href="#" class="btn btn-ghost"
			><svg
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
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			></a
		>
		<a
			href="/stories/test"
			sveltekit:prefetch
			class="btn btn-ghost"
			class:btn-active={$page.url.pathname === '/stories/test'}
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
					d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
				/>
			</svg>
		</a>

		<a
			href="/settings"
			sveltekit:prefetch
			class="btn btn-ghost"
			class:btn-active={$page.url.pathname === '/settings'}
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
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
				/>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
		</a>
	</div>
</header>

{#if tabBarOnRoutes.some(route => $page.url.pathname.includes(route)) || $page.url.pathname === '/'}
	<!-- TAB BAR -->
	<div
		id="tab-bar"
		class:scroll-tab-bar={shouldHide}
		class="fixed top-0 translate-y-[65px] w-full z-10 tabs justify-between p-2 border-b-2 border-neutral bg-base-100"
	>
		<a href="/" sveltekit:prefetch class="tab" class:tab-active={$page.url.pathname === '/'}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
			</svg></a
		>
		<a href="/hot" sveltekit:prefetch class="tab" class:tab-active={$page.url.pathname === '/hot'}>
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
					d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
				/>
			</svg>
		</a>
		<a
			href="/reels"
			sveltekit:prefetch
			class="tab"
			class:tab-active={$page.url.pathname === '/reels'}
			><svg
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
					d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
				/></svg
			></a
		>
		<a
			href="/images"
			sveltekit:prefetch
			class="tab"
			class:tab-active={$page.url.pathname === '/images'}
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
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
		</a>
	</div>
{/if}

<!-- Nav -->
<nav
	class:nav-hide={shouldHide}
	class="fixed bottom-0 z-50 navbar border-t-2 border-neutral bg-base-100"
>
	<div class="flex items-center justify-between w-full">
		<!-- home -->
		<a
			href="/"
			sveltekit:prefetch
			class="flex-shrink-0 btn btn-ghost"
			class:btn-active={tabBarOnRoutes.some(route => $page.url.pathname.includes(route)) ||
				$page.url.pathname === '/'}
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
			class="flex-shrink-0 btn btn-ghost"
			class:btn-active={$page.url.pathname === '/search'}
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
			class="flex-shrink-0 btn btn-ghost"
			class:btn-active={$page.url.pathname === '/creators'}
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
	nav,
	header,
	#tab-bar {
		transition: transform 250ms ease-out;
	}

	.scroll-tab-bar {
		transform: translateY(0);
	}

	.nav-hide {
		transform: translateY(66px);
	}

	.header-hide {
		transform: translateY(-66px);
	}
</style>
