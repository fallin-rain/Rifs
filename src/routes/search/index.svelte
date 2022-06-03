<script context="module" lang="ts">
	export async function load({ fetch, url }) {
		const res = await fetch('/search/query' + url.search)
		const data = await res.json()

		return {
			props: { data },
		}
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation'

	import { page } from '$app/stores'

	import MasonryCard from '$lib/components/MasonryCard.svelte'
	import Divider from '$lib/layouts/Divider.svelte'
	import Heading from '$lib/layouts/Heading.svelte'
	import Tags from '$lib/layouts/Tags.svelte'
	import { count } from '$lib/stores/queryParams'

	import { lazyload } from '$lib/utils/lazyload'
	import { onMount } from 'svelte'

	export let data: object

	let query: string
	let searchQueryResults = ''

	async function searchQuery() {
		if (!query) return

		let currentQuery = $page.url.searchParams.get('query')

		if (query.trim() == currentQuery?.trim()) return

		await goto('/search?query=' + encodeURIComponent(query), { keepfocus: true })

		searchQueryResults = data.data
	}

	async function searchText() {
		if (!query) return

		await goto('/search?search_text=' + encodeURIComponent(query))
	}

	// debounce
	let timer: NodeJS.Timeout | undefined

	function debounce(delay = 750) {
		clearTimeout(timer)

		timer = setTimeout(searchQuery, delay)
	}

	function loadmore() {
		if ($count >= 80) return

		count.update(inc => (inc += 10))
	}

	onMount(() => {
		lazyload('video', {
			threshold: 0.4,
		})
	})
</script>

<section class="space-y-6">
	<Heading title="Search" />
	<form
		on:submit|preventDefault={searchText}
		class="flex w-full max-w-sm items-center justify-between overflow-hidden rounded-lg bg-slate-800"
	>
		<input
			type="text"
			placeholder="Search tags and creators"
			bind:value={query}
			on:keyup={() => debounce(550)}
			class="flex-shrink bg-inherit pl-6 focus:outline-none"
		/>
		<button
			on:click={searchText}
			class="inline-block flex-shrink rounded-lg bg-slate-700 px-6 py-3"
		>
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
		</button>
	</form>

	{#if searchQueryResults}
		<div class="space-y-6 rounded-lg bg-slate-800 bg-opacity-40 p-6">
			<!-- <h3 class="font-bold tracking-wide text-slate-400">Tags</h3> -->
			<div class="flex flex-wrap items-center gap-x-3 gap-y-4">
				{#each searchQueryResults as tag}
					{#if tag.type == 'tag'}
						<div class="flex flex-wrap items-center gap-x-3 gap-y-4">
							<a
								sveltekit:prefetch
								href={'/search?search_text=' + tag?.text}
								class="rounded-full border border-pink-500 px-4 py-1.5 text-sm font-medium"
							>
								{tag?.text}
							</a>
						</div>
					{/if}
				{/each}
			</div>
			<!-- <div class="w-full h-0.5 bg-slate-700 rounded-full" /> -->
			<Divider />
			<!-- <h3 class="font-bold tracking-wide text-slate-400">Creators</h3> -->
			{#each searchQueryResults as creator}
				{#if creator.type == 'creator'}
					<a
						sveltekit:prefetch
						href={'/user/' + creator?.username}
						class="flex items-center justify-start gap-3"
					>
						<img
							src={creator?.userpic
								? creator?.userpic
								: 'https://avatars.dicebear.com/api/initials/' +
								  creator?.username +
								  '.svg?backgroundColors=pink'}
							class="block h-10 w-10 rounded-full bg-slate-600 object-cover"
							alt="Found creator {creator?.username}"
						/>
						<h5 class="text-lg font-semibold text-pink-400">@{creator?.username}</h5>
					</a>
				{/if}
			{/each}
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
				src={gif.urls.sd}
				verified={gif.verified}
				username={gif.userName}
				id={gif.id}
				height={gif.height}
				width={gif.width}
			/>
		{/each}
	</div>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a
		href={`${$page.url}&count=${$count}`}
		sveltekit:noscroll
		on:click={loadmore}
		class="block cursor-pointer w-max mx-auto mt-6 bg-slate-800 px-4 py-2 text-sm font-semibold rounded-lg"
		>Load more</a
	>
</section>
