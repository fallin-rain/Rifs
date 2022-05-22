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

	function formatTS(timestamp: number | string) {
		const date = new Date(timestamp * 1000)
		return new Intl.DateTimeFormat('en-us', { dateStyle: 'medium' }).format(date)
	}
</script>

<!-- Stories -->
<section id="sotries">
	<h1 class="mb-6 text-2xl font-semibold tracking-wide text-pink-200">Stories</h1>

	<div id="overflow" class="flex gap-6 overflow-x-scroll pb-2">
		{#each stories as story}
			<Stories hasAudio={story.hasAudio} src={story.urls.sd} poster={story.urls.poster} />
		{/each}
	</div>
</section>

<!-- Trending -->
<section id="trending">
	<h1 class="mb-6 text-2xl font-semibold tracking-wide text-pink-200">Trending</h1>

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
				src={data.urls.vthumbnail}
			/>
		{/each}
	</div>
</section>

<style>
	/* Hide scrollbar for Chrome, Safari and Opera */
	#overflow::-webkit-scrollbar {
		display: none !important;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	#overflow {
		-ms-overflow-style: none !important; /* IE and Edge */
		scrollbar-width: none !important; /* Firefox */
	}
</style>
