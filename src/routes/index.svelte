<script context="module" lang="ts">
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

<script lang="ts">
	export let stories
	export let trending
	export let hotGifs
	export let hotCreators
	export let newCreators
	export let oneMGifs
	export let soundGifs

	const log = console.debug

	import { onMount } from 'svelte'

	import Card from '$lib/components/Card.svelte'
	import Stories from '$lib/components/Stories.svelte'
	import { formatTS } from '$lib/utils/formatTS'
	import { lazyload } from '$lib/utils/lazyload'
	import { browser } from '$app/env'

	// browser && lazyload('video')
</script>

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
				src={story.urls.sd}
				height={story.height}
				width={story.width}
				poster={story.urls.poster}
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

	<div class="space-y-6">
		{#each trending as data}
			<Card
				username={data.user.username}
				profileName={data.user.username}
				verified={data.user.verified}
				date={formatTS(data.user.creationtime)}
				hasAudio={data.hasAudio}
				gifs={data.user.gifs}
				views={data.user.views}
				poster={data.urls.poster}
				hasTags={data.tags}
				tags={data.tags}
				src={data.urls.sd}
				width={data.width}
				height={data.height}
			/>
		{/each}
	</div>
</section>
