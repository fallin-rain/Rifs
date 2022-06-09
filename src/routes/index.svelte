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
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'
	import { fly } from 'svelte/transition'
	import { lazyload } from '$lib/utils/lazyload'
	// import { formatTS } from '$lib/utils/formatTS'
	// import { formatViews } from '$lib/utils/formatViews'
	import { first_time_visit } from '$lib/stores/persistWelcome'

	// import Card from '$lib/components/Card.svelte'
	// import Heading from '$lib/layouts/Heading.svelte'
	// import Stories from '$lib/components/Stories.svelte'
	import MasonryCard from '$lib/components/MasonryCard.svelte'
	import LinkBtn from '$lib/components/LinkBtn.svelte'

	export let fetched
	export let trending: string[]
	export let hotGifs: string[]
	export let creators: string[]
	export let reels: string[]
	export let images: string[]

	let data = { trending, hotGifs, creators, reels, images }

	$first_time_visit == 'yes' && browser && goto('/welcome')

	function cacheData() {
		if (browser && sessionStorage.getItem('temp')) return

		browser && sessionStorage.setItem('temp', JSON.stringify(data))
	}

	if (fetched) cacheData()

	onMount(() => {
		lazyload('[data-lazyvideo]', {
			threshold: 0.4,
		})
	})
</script>

<svelte:head>
	<title>Rifs</title>
</svelte:head>

<!-- TAILWIND REDESIGN HOMEPAGE -->
<!-- https://play.tailwindcss.com/DNorBkRrQs -->

{#if $first_time_visit !== 'yes'}
	<!-- main content -->
	<section class="mt-[50px] p-6 md:p-60">
		<div
			in:fly={{ y: 200, duration: 450 }}
			class="columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6"
		>
			{#each trending as data}
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
{/if}

<style>
	/* #overflow {
		scrollbar-color: rgba(233, 30, 99, 1) #0f172a;
		scrollbar-width: thin;
	}

	#overflow::-webkit-scrollbar-track {
		border-radius: 0px !important;
		background-color: #0f172a !important;
	}

	#overflow::-webkit-scrollbar {
		width: 10px !important;
		border-radius: 0px !important;
		background-color: #0f172a !important;
	}

	#overflow::-webkit-scrollbar-thumb {
		border-radius: 10px !important;
		background: rgb(232, 36, 90) !important;
		background: -moz-linear-gradient(
			38deg,
			rgba(232, 36, 90, 1) 0%,
			rgba(232, 35, 92, 1) 0%,
			rgba(233, 30, 99, 1) 31%,
			rgba(232, 39, 83, 1) 31%,
			rgba(229, 57, 53, 1) 100%
		);
		background: -webkit-linear-gradient(
			38deg,
			rgba(232, 36, 90, 1) 0%,
			rgba(232, 35, 92, 1) 0%,
			rgba(233, 30, 99, 1) 31%,
			rgba(232, 39, 83, 1) 31%,
			rgba(229, 57, 53, 1) 100%
		);
		background: linear-gradient(
			38deg,
			rgba(232, 36, 90, 1) 0%,
			rgba(232, 35, 92, 1) 0%,
			rgba(233, 30, 99, 1) 31%,
			rgba(232, 39, 83, 1) 31%,
			rgba(229, 57, 53, 1) 100%
		) !important;
	} */
	/* Hide scrollbar for Chrome, Safari and Opera */
	section::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	section {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
	#tab-bar {
		transition: transform 450ms ease-out;
	}
	.hide {
		transform: translateY(-200px);
	}
</style>
