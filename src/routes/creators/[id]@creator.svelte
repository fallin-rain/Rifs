<script context="module" lang="ts">
	export async function load({ fetch, params }) {
		const singleRes = await fetch('/api/creators/' + params.id)
		const singleResData = await singleRes.json()

		const relatedRes = await fetch('/api/creators/related/' + params.id)
		const relatedResData = await relatedRes.json()

		return {
			status: singleRes.status,
			props: {
				gif: singleResData.gif,
				user: singleResData.user,
				tags: singleResData.gif.tags,
				related_gifs: relatedResData.gifs,
			},
		}
	}
</script>

<script>
	import { onMount } from 'svelte'
	import { lazyload } from '$lib/utils/lazyload'

	import Tags from '$lib/layouts/Tags.svelte'
	import Heading from '$lib/layouts/Heading.svelte'
	import MasonryCard from '$lib/components/MasonryCard.svelte'
	import Video from '$lib/layouts/Video.svelte'

	export let gif
	export let user
	export let tags
	export let related_gifs

	onMount(() => {
		lazyload('[data-lazyvideo]', {
			threshold: 0.4,
		})
	})
</script>

<div class="relative mx-auto block w-full overflow-hidden aspect-video bg-black text-accent">
	<Video
		onlyControls={true}
		src={gif.urls.hd}
		poster={gif.urls.poster}
		width={gif.width}
		height={gif.height}
	/>
</div>
<section class="p-6 md:px-60 space-y-6">
	<div class="w-full flex items-center justify-between text-accent">
		<!-- share -->
		<button class="btn btn-xs btn-ghost">
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
					d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
				/>
			</svg>
		</button>
		<div class="divider divider-horizontal" />
		<!-- save -->
		<button class="btn btn-xs btn-ghost">
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
					d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
				/>
			</svg>
		</button>
		<div class="divider divider-horizontal" />
		<!-- downlaod -->
		<button class="btn btn-xs btn-ghost">
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
					d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
				/>
			</svg>
		</button>
		<div class="divider divider-horizontal" />
		<!-- Fullscreen -->
		<button
			on:click={() => {
				const video = document.querySelector('video')
				// Controls are not appearning on fscn
				// video?.requestFullscreen()
				// video?.setAttribute('controls', 'true')

				// if (video?.requestFullscreen) video?.removeAttribute('cotrols')
			}}
			class="btn btn-xs btn-ghost"
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
					d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
				/>
			</svg>
		</button>
	</div>

	<div class="flex items-center justify-between">
		<div>
			<a
				href={'/user/' + user.username}
				class="inline-flex items-center justify-center text-center text-accent text-lg font-semibold tracking-wide"
			>
				{user.name || 'No name'}
				{#if user.verified}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="ml-1 h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							id="verified"
							fill-rule="evenodd"
							d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
			</a>
			<p class="text-sm">@{user.username}</p>
		</div>
		<a href={'/user/' + user.username} class="btn btn-accent btn-xs">View profile</a>
	</div>
	<div class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-4">
		{#each tags as tag}
			<!-- <Tags linkPath={'/tags/related/'} {tag} /> -->
			<a
				sveltekit:prefetch
				href={'/tags/related/' + tag}
				class="badge badge-accent badge-outline badge-md"
			>
				{tag}
			</a>
		{/each}
	</div>
	<div class="divider divider-horizontal" />
	<Heading title="Related posts" />
	<div class="mt-6 columns-1 lg:columns-3 2xl:columns-4 gap-6 w-full mx-auto space-y-6">
		{#each related_gifs as data}
			<MasonryCard
				username={data.userName}
				verified={data.verified}
				poster={data.urls.poster}
				src={data.urls.sd}
				id={data.id}
				width={data.width}
				height={data.height}
			/>
		{/each}
	</div>
</section>
