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

<script lang="ts">
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
	import LinkBtn from '$lib/components/LinkBtn.svelte'

	export let hotGifs
	export let stories
	export let oneMGifs
	export let trending
	export let soundGifs
	export let hotCreators
	export let newCreators

	$first_time_visit == 'yes' && browser && goto('/welcome')

	onMount(() => {
		lazyload('[data-lazyvideo]', {
			threshold: 0.4,
		})
	})
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
	<!-- test stories -->
	<LinkBtn url={'/stories/test'} text={'Try the new stories'} />
	<!-- Trending -->
	<section id="trending" in:fly={{ y: -500, duration: 450, delay: 250, opacity: 0 }}>
		<Heading title="Trending" />

		<div class="mt-6 columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
			{#each trending as data}
				<MasonryCard
					poster={data.urls.poster}
					src={data.urls.vthumbnail}
					verified={data.user.verified}
					username={data.user.username}
					id={data.id}
					width={data.width}
					height={data.height}
				/>
			{/each}
		</div>
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
					width={c.width}
					height={c.height}
				/>
			{/each}
		</div>
	</section>

	<!-- 1 M gifs -->
	<section in:fly={{ y: 500, duration: 250 }}>
		<Heading title="1 minute gifs" />
		<div class="mt-6 columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
			{#each oneMGifs as data}
				<MasonryCard
					poster={data.urls.poster}
					src={data.urls.vthumbnail}
					verified={data.user.verified}
					username={data.user.username}
					id={data.id}
					width={data.width}
					height={data.height}
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
