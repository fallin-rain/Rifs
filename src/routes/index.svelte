<!-- Only for testing -->
<script context="module" lang="ts">
	const log = console.debug

	export async function load({ fetch }) {
		const res = await fetch('/api/home.json', {
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
			},
		})

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

	const log = console.debug

	import { onMount } from 'svelte'

	import Card from '../lib/components/Card.svelte'
	import HotCard from '../lib/components/HotCard.svelte'
	import Stories from '$lib/components/Stories.svelte'

	onMount(() => {
		const videos = document.querySelectorAll('video')
		if (typeof IntersectionObserver === 'undefined') return

		let playable = null

		const lazyload = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				const video = entry.target

				if (entry.isIntersecting) {
					video.setAttribute('poster', video.dataset.poster)
					video.setAttribute('src', video.dataset.src)
					video.load()
					video.play()
					playable = true
				} else {
					video.removeAttribute('poster')
					video.removeAttribute('src')
					video.pause()
					playable = false
				}
			})
		})
		videos.forEach(video => lazyload.observe(video))

		// document.addEventListener('visibilitychange', () => {
		//	if (!playable) videos.forEach(video => video.pause())
		//	else videos.forEach(video => video.play())
		//  })
	})
</script>

<!-- Stories -->
<section id="sotries" class="mt-14 px-6 py-8">
	<h1 class="mb-6 text-2xl font-light tracking-wide text-pink-300">Stories</h1>

	<div class="flex gap-6 overflow-x-scroll pb-2">
		{#each stories as story}
			<Stories hasAudio={story.hasAudio} src={story.urls.sd} poster={story.urls.poster} />
		{/each}
	</div>
</section>

<!-- Trending -->
<section id="trending" class="px-6 py-8">
	<h1 class="mb-6 text-2xl font-light tracking-wide text-pink-300">Trending</h1>

	<div class="space-y-6">
		{#each trending as data}
			<HotCard
				profileUrl={data.user.url}
				profileName={data.user.username}
				verified={data.user.verified}
				date={data.user.creationtime}
				hasAudio={data.hasAudio}
				gifs={data.user.gifs}
				views={data.user.views}
				poster={data.urls.poster}
				hasTags={data?.tags[0]}
				src={data.urls.sd}
			/>
		{/each}
	</div>
</section>
