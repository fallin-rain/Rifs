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
	import Card from '../lib/components/Card.svelte'
	import Header from '../lib/components/Header.svelte'

	export let items
</script>

<div class="min-h-screen bg-slate-900 text-pink-200">
	<Header />
	<main class="px-6 md:px-20 py-24 flex flex-wrap items-center gap-6">
		{#each items as item}
			<Card
				profileName={item.username}
				profileUrl={item.profileUrl}
				verified={item.verified}
				followers={item.followers}
				gifs={item.gifs}
				date={item.creationtime}
				poster={items.poster}
				src={item.preview}
			/>
		{/each}
	</main>
</div>
