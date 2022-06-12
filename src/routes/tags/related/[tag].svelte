<script context="module">
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
	import { page } from '$app/stores'
	import Heading from '$lib/layouts/Heading.svelte'
	import MasonryCard from '$lib/components/MasonryCard.svelte'

	export /**
	 * @type {any}
	 */
	let searchedTag
	export let gifs
</script>

<div class="px-6 text-secondary breadcrumbs">
	<ul>
		<li class="capitalize">
			<a sveltekit:prefetch href="/">Home</a>
		</li>
		<li class="capitalize">
			<a sveltekit:prefetch href="/tags">{$page.url.pathname.split('/')[1]}</a>
		</li>
		<li class="capitalize">
			<a sveltekit:prefetch href={$page.url.toString()}>{$page.url.pathname.split('/')[2]}</a>
		</li>
	</ul>
</div>
<section class="space-y-6 p-6 md:p-60">
	<Heading title="{searchedTag} related posts" />

	<div class="columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
		{#each gifs as gif}
			<MasonryCard
				type={gif.type}
				username={gif.userName}
				verified={gif.verified}
				poster={gif.urls.poster}
				src={gif.urls.sd}
				id={gif.id}
				width={gif.width}
				height={gif.height}
			/>
		{/each}
	</div>
</section>
