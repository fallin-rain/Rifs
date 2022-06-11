<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/api/home/')
		const data = await res.json()

		return {
			status: res.status,
			props: {
				fetched: true,
				trending: [...data.horizontalGifs, ...data.verifiedGifs],
				hotGifs: [...data.hotGifs, ...data.soundGifs],
				creators: [...data.hotCreators, ...data.newCreators],
				reels: [...data.verticalGifs, ...data.longGifs],
				images: [...data.hotImages, ...data.verifiedImages],
			},
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { fly } from 'svelte/transition'
	import { lazyload } from '$lib/utils/lazyload'
	import { first_time_visit } from '$lib/stores/persistWelcome'

	import MasonryCard from '$lib/components/MasonryCard.svelte'
	import LinkBtn from '$lib/components/LinkBtn.svelte'
	import { cached } from '$lib/stores/cached'

	export let fetched
	export let trending: string[]
	export let hotGifs: string[]
	export let creators: string[]
	export let reels: string[]
	export let images: string[]

	let data = { trending, hotGifs, creators, reels, images }

	$first_time_visit === 'yes' && goto('/welcome')

	function cacheData() {
		if ($cached === 'not fetched') {
			cached.set(JSON.stringify(data))
		}
		return
	}

	if (fetched) cacheData()

	onMount(() => {
		lazyload('[data-lazy]', {
			threshold: 0.4,
		})
	})
</script>

<svelte:head>
	<title>Rifs</title>
</svelte:head>

{#if $first_time_visit === 'yes'}
	<div id="hidden" />
{/if}
<!-- main content -->
<section in:fly={{ y: 450, duration: 450 }} class="mt-[50px] p-6 space-y-6 md:p-60">
	<div class="columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
		{#each trending as post}
			<MasonryCard
				type={post.type}
				poster={post.urls.poster}
				src={post.urls.vthumbnail}
				verified={post.user.verified}
				username={post.user.username}
				id={post.id}
				width={post.width}
				height={post.height}
			/>
		{/each}
	</div>
	<LinkBtn text={'Scroll to top'} on:action={() => window.scroll(0, 0)} />
</section>

<style>
	#hidden {
		position: absolute;
		inset: 0;
		background: #0c1322;
		z-index: 999999;
	}
</style>
