<script context="module">
	let count = 20
	export async function load({ fetch }) {
		const res = await fetch('/api/home/')
		const data = await res.json()
		console.log(count)

		return {
			status: res.status,
			props: {
				hotGifs: data.hotGifs,
				oneMGifs: data.longGifs.slice(0, count),
				soundGifs: data.soundGifs,
				stories: data.verticalGifs.slice(0, count),
				hotCreators: data.hotCreators,
				newCreators: data.newCreators,
				trending: data.horizontalGifs.slice(0, count),
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

	// let trending = []
	// let stories = []
	// let oneMGifs = []
	// let hotCreators = []

	$first_time_visit == 'yes' && browser && goto('/welcome')

	// let count = 5

	onMount(() => {
		lazyload('[data-card] video', {
			threshold: 0.4,
		})
	})

	function loadmore() {
		count += 5
		console.log(count)

		getdata(count)
	}
	async function getdata(count = 5) {
		const res = await fetch('/api/home')
		const data = await res.json()

		// posts[0].trending?.push(data.horizontalGifs.slice(0, count))
		// posts[1].stories?.push(data.verticalGifs.slice(0, count))
		// posts[2].oneMGifs?.push(data.longGifs.slice(0, count))

		trending = [...data.horizontalGifs.slice(0, count)]
		hotCreators = [...data.hotCreators.slice(0, count)]
		stories = [...data.verticalGifs.slice(0, count)]
		oneMGifs = [...data.longGifs.slice(0, count)]

		console.log(trending)
		console.log(hotCreators)
		console.log('stories', stories)
		console.log(oneMGifs)
	}
</script>

<svelte:head>
	<title>Rifs</title>
</svelte:head>

{#if $first_time_visit !== 'yes'}
	<!-- Stories -->
	<section id="sotries" in:fly={{ y: -500, duration: 450 }}>
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
					id={story.id}
					username={story.user.username}
					verified={story.verified}
				/>
			{/each}
		</div>
	</section>

	<!-- Trending -->
	<section id="trending" in:fly={{ y: -500, duration: 450, delay: 250, opacity: 0 }}>
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
			on:click={loadmore}
			class="mx-auto py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
			>Load more</button
		>
	</section>

	<!-- Hot creators -->
	<section in:fly={{ y: 500, duration: 250 }}>
		<Heading title="Hot creators" />

		<div class="mt-6 columns-2 lg:columns-3 2xl:columns-4 gap-6 w-full mx-auto space-y-6">
			{#each hotCreators as c}
				<MasonryCard
					poster={c.poster}
					src={c.preview}
					verified={c.verified}
					id={c.thumbnail}
					username={c.username}
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

<style>
	#overflow {
		scrollbar-color: rgba(233, 30, 99, 1) #0f172a;
		scrollbar-width: thin;
	}

	#overflow::-webkit-scrollbar-track {
		border-radius: 0px !important;
		background-color: #0f172a !important;
	}

	#overflow::-webkit-scrollbar {
		width: 10px !important;
		border-radius: 0px !important;
		background-color: #0f172a !important;
	}

	#overflow::-webkit-scrollbar-thumb {
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
