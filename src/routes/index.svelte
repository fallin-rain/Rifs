<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/api/home')
		const data = await res.json()

		return {
			status: res.status,
			props: {
				// hotGifs: data.hotGifs,
				// oneMGifs: data.longGifs,
				// soundGifs: data.soundGifs,
				stories: data.verticalGifs,
				// hotCreators: data.hotCreators,
				// newCreators: data.newCreators,
				trending: data.horizontalGifs,
			},
		}
	}
</script>

<script>
	export let hotGifs
	export let stories
	export let oneMGifs
	export let trending
	export let soundGifs
	export let hotCreators
	export let newCreators

	import { onMount } from 'svelte'
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'
	import { formatTS } from '$lib/utils/formatTS'
	import { lazyload } from '$lib/utils/lazyload'
	import { formatViews } from '$lib/utils/formatViews'
	import { first_time_visit } from '$lib/stores/persistWelcome'

	import Card from '$lib/components/Card.svelte'
	import Heading from '$lib/layouts/Heading.svelte'
	import Stories from '$lib/components/Stories.svelte'
	import MasonryCard from '$lib/components/MasonryCard.svelte'
	import Header from '$lib/components/Header.svelte'

	if ($first_time_visit == 'yes') browser && goto('/welcome')

	onMount(() => {
		lazyload('[data-card] video', {
			threshold: 0.8,
		})
	})

	let count = 5
	$: t = trending.slice(0, count)
</script>

<svelte:head>
	<title>Rifs</title>
</svelte:head>

{#if $first_time_visit !== 'yes'}
	<!-- Stories -->
	<section id="sotries">
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
	<section id="trending">
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
					autoplay={false}
					src={data.urls.sd}
				/>
			{/each}
			<!-- <MasonryCard
				username={data.user.username}
				profileName={data.user.username}
				verified={data.user.verified}
				views={formatViews(data.user.views)}
				poster={data.urls.poster}
				autoplay={true}
				src={data.urls.hd}
			/> -->
		</div>
		<button
			type="button"
			on:click={() => {
				count--
				console.log(t)
			}}
			class="mx-auto py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
			>Load more</button
		>
	</section>
{/if}

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
