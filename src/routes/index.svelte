<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/api/home/')
		const data = await res.json()

		return {
			status: res.status,
			props: {
				trending: data.horizontalGifs + data.hotGifs,
				creators: data.hotCreators + data.newCreators,
				oneMGifs: data.longGifs + data.verticalGifs,
				images: data.hotImages,
			},
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte'
	import { browser } from '$app/env'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { fly, fade } from 'svelte/transition'
	import { formatTS } from '$lib/utils/formatTS'
	import { lazyload } from '$lib/utils/lazyload'
	import { formatViews } from '$lib/utils/formatViews'
	import { first_time_visit } from '$lib/stores/persistWelcome'

	import Card from '$lib/components/Card.svelte'
	import Heading from '$lib/layouts/Heading.svelte'
	import Stories from '$lib/components/Stories.svelte'
	import MasonryCard from '$lib/components/MasonryCard.svelte'
	import LinkBtn from '$lib/components/LinkBtn.svelte'

	export let trending
	export let creators
	export let oneMGifs
	export let images

	let testing = true
	let shouldHide = false
	let oldScrollPos = 0

	$first_time_visit == 'yes' && browser && goto('/welcome')

	onMount(() => {
		onscroll = () => {
			oldScrollPos < scrollY ? (shouldHide = true) : (shouldHide = false)
			oldScrollPos = scrollY
		}
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
	<!-- TEST STARTS -->
	<nav
		class:hide={shouldHide}
		class="sticky top-[53px] z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900 text-slate-400"
	>
		<a
			href="#trend"
			class="py-4 w-full place-items-center grid"
			class:active={$page.url.hash.includes('/' || 'trend')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
			</svg>
		</a>
		<a
			href="#creators"
			class="px-3 py-4 w-full place-items-center grid"
			class:active={$page.url.hash.includes('creators')}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
				/></svg
			></a
		>
		<a
			href="#long-gifs"
			class="px-3 py-4 w-full place-items-center grid"
			class:active={$page.url.hash.includes('long-gifs')}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
				/></svg
			></a
		>
		<a
			href="#images"
			class="px-3 py-4 w-full place-items-center grid"
			class:active={$page.url.hash.includes('images')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
		</a>
	</nav>

	<div class="flex items-start w-full snap-x mt-14 snap-proximity gap-6 overflow-x-scroll">
		<!-- home -->
		<section
			id="trend"
			in:fly={{ y: -500, duration: 450 }}
			class="w-full flex-shrink-0 snap-start space-y-6 scroll-mt-64"
		>
			<div class="mt-6 columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
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
		</section>
		<!-- creaotrs -->
		<section
			id="creators"
			in:fly={{ y: -500, duration: 450 }}
			class="w-full flex-shrink-0 snap-start space-y-6 scroll-mt-64"
		>
			<div class="mt-6 columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
				{#each creators as c}
					<MasonryCard
						poster={c.poster}
						src={c.preview}
						verified={c.verified}
						id={c.thumbnail}
						username={c.username}
						width={c.width}
						height={c.height}
					/>
				{/each}
			</div>
		</section>
		<!-- Long gifs -->
		<section
			id="long-gifs"
			in:fly={{ y: -500, duration: 450 }}
			class="w-full flex-shrink-0 snap-start space-y-6 scroll-mt-64"
		>
			<div class="mt-6 columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
				{#each oneMGifs as data}
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
		</section>
		<!-- images -->
		<section
			id="images"
			in:fly={{ y: -500, duration: 450 }}
			class="w-full flex-shrink-0 snap-start space-y-6 scroll-mt-64"
		>
			<div class="mt-6 columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
				{#each images as data}
					<MasonryCard
						image={true}
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
		</section>
	</div>
	<!-- TEST ENDS -->
	{#if !testing}
		<!-- Stories -->
		<section id="sotries" in:fly={{ y: -500, duration: 450 }}>
			<Heading title="Stories" />

			<div id="overflow" class="mt-6 flex gap-6 overflow-x-scroll pb-2">
				{#each stories as story}
					<Stories
						hasAudio={story.hasAudio}
						src={story.urls.sd}
						height={story.height}
						width={story.width}
						poster={story.urls.poster}
						autoplay={false}
						id={story.id}
						username={story.user.username}
						verified={story.verified}
					/>
				{/each}
			</div>
		</section>
		<!-- test stories -->
		<LinkBtn url={'/stories/test'} text={'Try the new stories'} />
		<!-- Trending -->
		<section id="trending" in:fly={{ y: -500, duration: 450, delay: 250, opacity: 0 }}>
			<Heading title="Trending" />

			<div class="mt-6 columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
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
		</section>

		<!-- Hot creators -->
		<section in:fly={{ y: 500, duration: 250 }}>
			<Heading title="Hot creators" />

			<div class="mt-6 columns-2 lg:columns-3 2xl:columns-4 gap-6 w-full mx-auto space-y-6">
				{#each hotCreators as c}
					<MasonryCard
						poster={c.poster}
						src={c.preview}
						verified={c.verified}
						id={c.thumbnail}
						username={c.username}
						width={c.width}
						height={c.height}
					/>
				{/each}
			</div>
		</section>

		<!-- 1 M gifs -->
		<section in:fly={{ y: 500, duration: 250 }}>
			<Heading title="1 minute gifs" />
			<div class="mt-6 columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
				{#each oneMGifs as data}
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
		</section>
	{/if}
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
	nav {
		transition: transform 450ms ease-out;
	}
	.hide {
		transform: translateY(-200px);
	}
	.active {
		font-weight: 600;
		color: rgb(251 207 232 / 1);
		border-bottom: 2px solid;
		border-color: rgb(251 207 232 / 1);
	}
</style>
