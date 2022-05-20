<!-- Only for testing -->
<script context="module" lang="ts">
	export async function load({ fetch }) {
		const res = await fetch(
			'http://api.redgifs.com/v1/creators/search?page=1&order=recent&tags=Natural'
		)

		const data = await res.json()

		return {
			props: { items: data.items },
		}
	}
</script>

<script>
	const log = console.debug

	import { onMount } from 'svelte'

	import Card from '../lib/components/Card.svelte'
	import Header from '../lib/components/Header.svelte'

	let mounted = true
	onMount(() => {
		const videos = document.querySelectorAll('video')
		if (typeof IntersectionObserver === 'undefined') return

    let playable = null;

		const lazzy = new IntersectionObserver(entries => {
			entries.forEach(entry => {
        log(entry)
				if (!entry.isIntersecting) {
					entry.target.pause()
					playable = false
				} else {
            entry.target.play()
            playable = true
          }
			})
		})
		videos.forEach(video => lazzy.observe(video))

    onvisibilitychange = () => {
        if (!playable)
          videos.forEach(video => video.pause())
        else videos.forEach(video => video.play())
      }
	})
	export let items
</script>

<div class="min-h-screen bg-slate-900 text-pink-200">
	<Header />
	<main class="px-6 md:px-20 py-24 flex flex-wrap items-center gap-6">
		{#if mounted}
			{#each items as item}
				<Card
					profileName={item.username}
					profileUrl={item.profileUrl}
					verified={item.verified}
					followers={item.followers}
					gifs={item.gifs}
					date={item.creationtime}
					poster={item.poster}
					src={item.preview}
				/>
			{/each}
		{:else}
			loading...
		{/if}
	</main>
</div>
