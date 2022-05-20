<!-- Only for testing -->
<script context="module" lang="ts">
	const log = console.debug

	export async function load({ fetch }) {
		const res = await fetch('/api/fetch.json', {
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        }
      })

		const data = await res.json()

		return {
      status: res.status,
			props: { items: data.items },
		}
	}
</script>

<script>
	const log = console.debug

	import { onMount } from 'svelte'

	import Card from '../lib/components/Card.svelte'
  import HotCard from '../lib/components/HotCard.svelte'

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
  export let status
  log(status)
	export let items
</script>

	<main class="px-6 md:px-20 py-24 flex flex-wrap items-center gap-6">
  <HotCard />
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
	</main>
