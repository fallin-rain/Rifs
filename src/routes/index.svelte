<script context="module">
	const log = console.debug

	export async function load({ fetch }) {
		const res = await fetch('/api/home')
		const data = await res.json()

		return {
			status: res.status,
			props: {
				stories: data.verticalGifs,
				trending: data.horizontalGifs,
				hotGifs: data.hotGifs,
				hotCreators: data.hotCreators,
				newCreators: data.newCreators,
				oneMGifs: data.longGifs,
				soundGifs: data.soundGifs,
			},
		}
	}
</script>

<script>
	export let stories
	export let trending
	export let hotGifs
	export let hotCreators
	export let newCreators
	export let oneMGifs
	export let soundGifs

	// const log = console.debug

	import { onMount } from 'svelte'

	import Card from '$lib/components/Card.svelte'
	import Stories from '$lib/components/Stories.svelte'
	import { formatTS } from '$lib/utils/formatTS'
	import { formatViews } from '$lib/utils/formatViews'
	import { lazyload } from '$lib/utils/lazyload'
	import MasonryCard from '$lib/components/MasonryCard.svelte'

	onMount(() => {
		lazyload('[data-card] video', {
			threshold: 0.8,
		})
	})
</script>

<svelte:head>
	<title>Rifs</title>
</svelte:head>

<!-- Stories -->
<section id="sotries">
	<h1
		class="mb-6 bg-gradient-to-br from-pink-500 to-red-600 bg-clip-text font-serif text-2xl font-extrabold italic tracking-wide text-transparent"
	>
		Stories
	</h1>

	<div id="overflow" class="flex gap-6 overflow-x-scroll pb-2">
		{#each stories as story}
			<Stories
				hasAudio={story.hasAudio}
				source={story.urls.sd}
				height={story.height}
				width={story.width}
				poster={story.urls.poster}
				autoplay={false}
			/>
		{/each}
	</div>
</section>

<!-- Trending -->
<section id="trending">
	<h1
		class="mb-6 bg-gradient-to-br from-pink-500 to-red-600 bg-clip-text font-serif text-2xl font-extrabold italic tracking-wide text-transparent"
	>
		Trending
	</h1>

	<div class="columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
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
				source={data.urls.hd}
			/>
			<!-- <MasonryCard
				username={data.user.username}
				profileName={data.user.username}
				verified={data.user.verified}
				views={formatViews(data.user.views)}
				poster={data.urls.poster}
				autoplay={true}
				source={data.urls.hd}
			/> -->
		{/each}
	</div>
</section>

<style>
	/* Custom scrollbar */
	/* Colour generated from https://cssgradient.io/ */

	section#trending::-webkit-scrollbar-track {
		border-radius: 5px !important;
		background-color: #0f172a !important;
	}

	section#trending::-webkit-scrollbar {
		width: 10px !important;
		border-radius: 5px !important;
		background-color: #0f172a !important;
	}

	section#trending::-webkit-scrollbar-thumb {
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
