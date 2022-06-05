<script context="module" lang="ts">
	export async function load({ fetch, url }) {
		const res = await fetch('/search/query' + url.search)
		const data = await res.json()

		return {
			props: { data },
		}
	}
</script>

<!--
	### TAILWIND NEW REDESIGN QUERY PARAMS
	https://play.tailwindcss.com/EctFk79Ted -->
<script lang="ts">
	import { goto } from '$app/navigation'

	import { navigating, page } from '$app/stores'
	import LinkBtn from '$lib/components/LinkBtn.svelte'

	import MasonryCard from '$lib/components/MasonryCard.svelte'
	import Divider from '$lib/layouts/Divider.svelte'
	import Heading from '$lib/layouts/Heading.svelte'
	import Tags from '$lib/layouts/Tags.svelte'
	import { count, search_text } from '$lib/stores/queryParams'

	import { lazyload } from '$lib/utils/lazyload'
	import { onMount } from 'svelte'

	export let data: object

	let query = ''
	let searchResults = ''
	let searching = false

	async function searchQuery() {
		searching = true

		if (!query) return

		let currentQuery = $page.url.searchParams.get('query')

		if ($search_text.trim() == currentQuery?.trim()) return

		await goto('/search?query=' + encodeURIComponent($search_text.trim()), { keepfocus: true })

		searchResults = data.data

		searching = false
		console.log(searchResults)
	}

	async function searchText() {
		if (searchResults.length === 0) return

		await goto('/search?search_text=' + encodeURIComponent(searchResults[0].text))
	}

	// debounce
	let timer: NodeJS.Timeout | undefined

	function debounce(delay = 750) {
		searching = true

		clearTimeout(timer)

		timer = setTimeout(searchQuery, delay)
	}

	onMount(() => {
		lazyload('[data-lazyvideo]', {
			threshold: 0.4,
		})
	})

	console.log(navigating)
</script>

<section class="space-y-6">
	<div
		class="flex w-full max-w-sm items-center justify-between overflow-hidden rounded-lg bg-slate-800 bg-opacity-40"
	>
		<input
			type="text"
			placeholder="Search tags and creators"
			bind:value={query}
			on:keypress={() => {
				search_text.set(query)
				debounce()
			}}
			class="flex-shrink w-min bg-transparent pl-6 focus:outline-none"
		/>
		<button class="inline-block text-sm flex-shrink-0 rounded-lg bg-slate-800 p-4">
			{#if !query}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clip-rule="evenodd"
					/>
				</svg>
			{:else if searching}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 animate-spin"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
						clip-rule="evenodd"
					/>
				</svg>
			{:else if searchResults.length === 0}
				<svg
					on:click={() => (query = '')}
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			{:else}
				<svg
					on:click={searchText}
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clip-rule="evenodd"
					/>
				</svg>
			{/if}
		</button>
	</div>

	{#if query}
		<div class="space-y-6 rounded-lg bg-slate-800 bg-opacity-40 p-6">
			{#if searchResults.length > 0}
				<div class="flex flex-wrap items-center gap-x-3 gap-y-4">
					{#each searchResults as searchResult}
						{#if searchResult.type == 'tag'}
							<div class="flex flex-wrap items-center gap-x-3 gap-y-4">
								<a
									sveltekit:prefetch
									href={'/search?search_text=' + searchResult?.text}
									class="rounded-full border border-pink-500 px-4 py-1.5 text-sm font-medium"
								>
									{searchResult?.text}
								</a>
							</div>
						{:else if searchResult.type == 'creator'}
							<Divider />
							<a
								sveltekit:prefetch
								href={'/user/' + searchResult?.username}
								class="flex items-center justify-start gap-3"
							>
								<img
									src={searchResult?.userpic
										? searchResult?.userpic
										: 'https://avatars.dicebear.com/api/initials/' +
										  searchResult?.username +
										  '.svg?backgroundColors=pink'}
									class="block h-10 w-10 rounded-full bg-slate-600 object-cover"
									alt="Found creator {searchResult?.username}"
								/>
								<h5 class="text-lg font-semibold text-pink-400">@{searchResult?.username}</h5>
							</a>
						{/if}
					{/each}
				</div>
			{:else if searching}
				<p class="text-center">Searching...</p>
			{:else}
				<p class="text-center">No results found!</p>
			{/if}
		</div>
	{/if}

	<Heading title="Popular tags" />
	<div class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-4">
		{#each data.searchResults.tags as tag}
			<Tags linkPath={'/search?search_text='} {tag} />
		{/each}
	</div>
	<Divider />
	<Heading title="Recent posts" />
	<!-- user's posts -->
	<div class="columns-2 lg:columns-3 xl:columns-4 gap-3 w-full mx-auto space-y-3">
		{#each data.searchResults.gifs as gif}
			<MasonryCard
				poster={gif.urls.poster}
				src={gif.urls.vthumbnail}
				verified={gif.verified}
				username={gif.userName}
				id={gif.id}
				height={gif.height}
				width={gif.width}
			/>
		{/each}
	</div>
	<LinkBtn
		url={`${$page.url.pathname}?search_text=${$page.url.searchParams.get(
			'search_text'
		)}&count=${$count}`}
	/>
</section>
