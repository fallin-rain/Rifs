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
	https://play.tailwindcss.com/CNWhvlah6i -->
<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { lazyload } from '$lib/utils/lazyload'
	import { count, filter, order, search_text, type } from '$lib/stores/queryParams'

	import Tags from '$lib/layouts/Tags.svelte'
	import Divider from '$lib/layouts/Divider.svelte'
	import Heading from '$lib/layouts/Heading.svelte'
	import LinkBtn from '$lib/components/LinkBtn.svelte'
	import MasonryCard from '$lib/components/MasonryCard.svelte'

	export let data: object

	let searching = false
	let searchResults = ''

	// set query params at first from store
	$page.url.searchParams.set('search_text', $search_text)
	$page.url.searchParams.set('count', $count.toString())

	$: $page.url.searchParams.set('order', $order)
	$: $page.url.searchParams.set('type', $type)
	$: $page.url.searchParams.set('filter', $filter)

	$: console.log($page.url.search)

	async function searchQuery() {
		searching = true

		if (!$search_text) return

		let inputVal = $search_text?.trim() || ''
		let currentQuery = $page.url.searchParams.get('query')?.trim()

		if (inputVal == currentQuery) return

		await goto('/search?query=' + encodeURIComponent(inputVal), { keepfocus: true })

		searchResults = data.data

		searching = false
	}

	async function searchText() {
		if (searchResults.length === 0) return

		$page.url.searchParams.set('search_text', encodeURIComponent(searchResults[0].text))
		count.set(10) // reset count when doing a search

		await goto('/search?search_text=' + $page.url.searchParams.get('search_text'))
	}

	// debounce
	let timer: NodeJS.Timeout | undefined

	function debounce(delay = 750) {
		searching = true

		clearTimeout(timer)

		timer = setTimeout(searchQuery, delay)
	}

	function loadmorePosts() {
		if ($count >= 80) return

		count.update(inc => (inc += 20))
	}

	onMount(() => {
		lazyload('[data-lazyvideo]', {
			threshold: 0.4,
		})
	})
</script>

<section class="space-y-6 p-6 pb-24">
	<div class="form-control">
		<div class="input-group">
			<input
				bind:value={$search_text}
				on:keypress={() => debounce()}
				type="text"
				placeholder="Search tags and creators"
				class="input w-full focus:outline-none"
			/>
			<button class="btn" class:btn-active={$search_text} class:btn-primary={$search_text}>
				{#if !$search_text}
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
						on:click={() => ($search_text = '')}
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
	</div>

	{#if $search_text}
		<div class="space-y-6 rounded-lg bg-base-100 p-6">
			{#if searchResults.length > 0}
				<div class="flex flex-wrap items-center gap-x-3 gap-y-4">
					{#each searchResults as searchResult}
						{#if searchResult.type == 'tag'}
							<div class="flex flex-wrap items-center y-3 gap-x-3 gap-y-4">
								<a
									sveltekit:prefetch
									href={'/search?search_text=' + searchResult?.text}
									class="badge badge-outlinetext-sm font-medium"
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
								<div class="avatar">
									<div class="w-14 mask mask-squircle">
										<img
											src={searchResult?.userpic
												? searchResult?.userpic
												: 'https://avatars.dicebear.com/api/initials/' +
												  searchResult?.username +
												  '.svg?backgroundColors=pink'}
											alt="#"
										/>
									</div>
								</div>
								<h5 class="text-lg font-semibold text-primary">@{searchResult?.username}</h5>
							</a>
						{/if}
					{/each}
				</div>
			{:else if searching}
				<p class="text-center">Searching...</p>
			{:else}
				<p class="text-center text-warning">No results found!</p>
			{/if}
		</div>
	{/if}

	<Heading title="Popular tags" />
	<div class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-4">
		{#each data.searchResults.tags as tag}
			<Tags linkPath={'/search?search_text='} {tag} />
			<!-- <a href={'/search?search_text=' + tag} class="badge">{tag}</a> -->
		{/each}
	</div>
	<div class="divider" />
	<Heading title="Recent posts" />
	<p>The select options are work in progress.</p>
	<div class="w-full max-w-md flex items-center justify-start flex-wrap gap-3">
		<!-- Order -->
		<select on:change={e => order.set(e.target?.value)} class="select">
			<option disabled selected value="">Order</option>
			<option value="recent">Recent</option>
			<option value="trending">Trending</option>
			<option value="best">Best</option>
			<option value="top28">Top 28</option>
		</select>
		<!-- Filter -->
		<select on:change={e => filter.set(e.target?.value)} class="select">
			<option disabled selected value="">Filter</option>
			<option value="verified=y">Verified</option>
			<option value="sound=y">Sounded</option>
			<option value="long=y">1 minute</option>
			<option value="ratio=v">Vertical</option>
			<option value="ratio=h">16x9</option>
		</select>
		<!-- Type -->
		<select on:change={e => filter.set(e.target?.value)} class="select">
			<option disabled selected value="">Type</option>
			<option value="type=g">gifs</option>
			<option value="type=i">Images</option>
		</select>
	</div>
	<!-- user's posts -->
	<div class="columns-1 lg:columns-3 xl:columns-4 gap-3 w-full mx-auto space-y-3">
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
		href={`${$page.url.pathname}?search_text=${
			$page.url.searchParams.get('search_text') || ''
		}&count=${$count}`}
		on:loadmore={loadmorePosts}
	/>
</section>
