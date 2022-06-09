<script>
	import LinkBtn from '$lib/components/LinkBtn.svelte'
	import MasonryCard from '$lib/components/MasonryCard.svelte'

	import { fly } from 'svelte/transition'
	import { lazyload } from '$lib/utils/lazyload'
	import { onMount } from 'svelte'
	import { browser } from '$app/env'

	let rawdata
	let content

	function load() {
		if (!(browser && sessionStorage.getItem('temp'))) return

		rawdata = browser && sessionStorage.getItem('temp')
		content = JSON.parse(rawdata)

		return content
	}
	load()

	onMount(() => {
		lazyload('[data-lazyvideo]', {
			threshold: 0.4,
		})
	})
</script>

{#if content}
	<section class="mt-[50px] p-6 space-y-6 md:p-60">
		<div
			in:fly={{ y: 200, duration: 450 }}
			class="columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6"
		>
			{#each content.hotGifs as data}
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
		</div>
		<LinkBtn text={'Scroll to top'} on:action={() => window.scroll(0, 0)} />
	</section>
{:else}
	No data
{/if}
