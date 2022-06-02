<script context="module">
	const log = console.debug

	export async function load({ fetch, params }) {
		if (!params.count) params.count = 10

		const res = await fetch(`/api/related/${params.count}/${params.tag}`)
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
	import { formatTS } from '$lib/utils/formatTS'
	import { formatViews } from '$lib/utils/formatViews'
	import { lazyload } from '$lib/utils/lazyload'
	import { onMount } from 'svelte'

	import Card from '$lib/components/Card.svelte'
	import { page } from '$app/stores'
	import { count } from '$lib/stores/queryParams'

	export let searchedTag
	export let gifs

	onMount(() => {
		lazyload('[data-card] video', {
			threshold: 0.4,
		})
	})

	function loadmore() {
		if ($count >= 80) return

		count.update(inc => (inc += 10))
	}
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
	<a
		href={`/tags/related/${$count.toString()}/${$page.params.tag}`}
		sveltekit:prefetch
		sveltekit:noscroll
		on:click={loadmore}
		class="block w-max mx-auto mt-6 bg-slate-800 px-4 py-2 text-sm font-semibold rounded-lg"
		>Load more</a
	>
</section>
