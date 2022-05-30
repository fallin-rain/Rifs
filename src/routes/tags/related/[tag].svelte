<script context="module">
	const log = console.debug

	export async function load({ fetch, params }) {
		const res = await fetch('/api/related/' + params.tag)
		const data = await res.json()

		return {
			status: res.status,
			props: {
				searchedTag: params.tag,
				users: data.users,
				tags: data.tags,
				gifs: data.gifs,
			},
		}
	}
</script>

<script>
	import Card from '$lib/components/Card.svelte'
	import { formatTS } from '$lib/utils/formatTS'
	import { formatViews } from '$lib/utils/formatViews'
	import { lazyload } from '$lib/utils/lazyload'

	import { onMount } from 'svelte'

	onMount(() => {
		lazyload('[data-card] video', {
			threshold: 0.4,
		})
	})
	export let searchedTag
	export let gifs
</script>

<section id="tags">
	<h1
		class="mb-6 bg-gradient-to-br from-pink-500 to-red-600 bg-clip-text font-serif text-2xl font-extrabold italic tracking-wide text-transparent"
	>
		{searchedTag} related posts
	</h1>
	<div class="columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
		{#each gifs as gif}
			<Card
				username={gif.userName}
				profileName={gif.userName}
				verified={gif.verified}
				date={formatTS(gif.createDate)}
				hasAudio={gif.hasAudio}
				views={formatViews(gif.views)}
				poster={gif.poster}
				hasTags={gif.tags}
				tags={gif.tags}
				src={gif.urls.sd}
				autoplay={true}
				id={gif.id}
			/>
		{/each}
	</div>
</section>
