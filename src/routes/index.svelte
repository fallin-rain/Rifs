<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/api/home')
		const data = await res.json()

		return {
			status: res.status,
			props: {
				hotGifs: data.hotGifs,
				oneMGifs: data.longGifs.slice(0, 9),
				soundGifs: data.soundGifs,
				stories: data.verticalGifs.slice(0, 9),
				hotCreators: data.hotCreators,
				newCreators: data.newCreators,
				trending: data.horizontalGifs.slice(0, 9),
			},
		}
	}
</script>

<script>
	import { onMount } from 'svelte'
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'
	import { fly, fade } from 'svelte/transition'
	import { formatTS } from '$lib/utils/formatTS'
	import { lazyload } from '$lib/utils/lazyload'
	import { formatViews } from '$lib/utils/formatViews'
	import { first_time_visit } from '$lib/stores/persistWelcome'

	import Card from '$lib/components/Card.svelte'
	import Heading from '$lib/layouts/Heading.svelte'
	import Stories from '$lib/components/Stories.svelte'
	import MasonryCard from '$lib/components/MasonryCard.svelte'

	export let hotGifs
	export let stories
	export let oneMGifs
	export let trending
	export let soundGifs
	export let hotCreators
	export let newCreators

	$first_time_visit == 'yes' && browser && goto('/welcome')

	onMount(() => {
		lazyload('[data-card] video', {
			threshold: 0.8,
		})
	})

	let count = 5
</script>

<svelte:head>
	<title>Rifs</title>
</svelte:head>

{#if $first_time_visit !== 'yes'}
	<!-- Stories -->
	<section id="sotries" in:fly={{ y: 500, duration: 250 }}>
		<Heading title="Stories" />

		<div id="overflow" class="mt-6 flex gap-6 overflow-x-scroll pb-2">
			{#each stories as story}
				<Stories
					hasAudio={story.hasAudio}
					src={story.urls.sd}
					height={story.height}
					width={story.width}
					poster={story.urls.poster}
					autoplay={false}
				/>
			{/each}
		</div>
	</section>

	<!-- Trending -->
	<section id="trending" in:fly={{ y: 500, duration: 250 }}>
		<Heading title="Trending" />

		<div class="mt-6 columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
			{#each trending as data}
				<Card
					username={data.user.username}
					profileName={data.user.username}
					verified={data.user.verified}
					date={formatTS(data.user.creationtime)}
					hasAudio={data.hasAudio}
					gifs={formatViews(data.user.gifs)}
					views={formatViews(data.user.views)}
					poster={data.urls.poster}
					hasTags={data.tags}
					tags={data.tags}
					autoplay={true}
					src={data.urls.sd}
					id={data.id}
				/>
			{/each}
		</div>
		<button
			type="button"
			on:click={() => {
				count++
				console.log(count)
			}}
			class="mx-auto py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
			>Load more</button
		>
	</section>

	<!-- Hot creators -->
	<section in:fly={{ y: 500, duration: 250 }}>
		<Heading title="Hot creators" />

		<div class="mt-6 columns-1 lg:columns-3 2xl:columns-4 gap-6 w-full mx-auto space-y-6">
			{#each hotCreators as c}
				<MasonryCard
					poster={c.poster}
					src={c.preview}
					views={formatViews(c.views)}
					verified={c.verified}
					id={c.thumbnail}
					username={c.username}
					profileName={c.name}
					autoplay={true}
				/>
			{/each}
		</div>
	</section>

	<!-- 1 M gifs -->
	<section in:fly={{ y: 500, duration: 250 }}>
		<Heading title="1 minute gifs" />
		<div class="mt-6 columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
			{#each oneMGifs as data}
				<Card
					username={data.user.username}
					profileName={data.user.username}
					verified={data.user.verified}
					date={formatTS(data.user.creationtime)}
					hasAudio={data.hasAudio}
					gifs={formatViews(data.user.gifs)}
					views={formatViews(data.user.views)}
					poster={data.urls.poster}
					hasTags={data.tags}
					tags={data.tags}
					autoplay={true}
					src={data.urls.sd}
					id={data.id}
				/>
			{/each}
		</div>
	</section>
{/if}
