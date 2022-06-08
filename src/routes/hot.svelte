<script>
	import MasonryCard from '$lib/components/MasonryCard.svelte'

	import { temp } from '$lib/stores/temp'
	import { lazyload } from '$lib/utils/lazyload'
	import { onMount } from 'svelte'

	let rawdata
	let hotGifs

	if ($temp) {
		rawdata = $temp
		hotGifs = JSON.parse(rawdata)

		hotGifs.forEach(a => console.log(a.id))
	} else rawdata = 'Not Loaded'
	//TODO: separate tabs to individual routes and use cache data to load and avoid fetch
	onMount(() => {
		lazyload('[data-lazyvideo]', {
			threshold: 0.4,
		})
	})
</script>

{#if hotGifs}
	<section class="p-6 space-y-6 md:p-60">
		{#each hotGifs as data}
			<MasonryCard
				poster={data.urls.poster}
				src={data.urls.vthumbnail}
				verified={data.user.verified}
				username={data.user.username}
				id={data.id}
				width={data.width}
				height={data.height}
			/>
		{/each}
	</section>
{:else}
	No data
{/if}
