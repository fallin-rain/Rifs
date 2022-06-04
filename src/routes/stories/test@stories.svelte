<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/stories')
		const data = await res.json()

		return {
			props: {
				stories: data.stories,
			},
		}
	}
</script>

<script>
	import Video from '$lib/layouts/Video.svelte'
	import { lazyload } from '$lib/utils/lazyload'
	import { onMount } from 'svelte'

	onMount(() =>
		lazyload('[data-lazyvideo]', {
			threshold: 0,
			rootMargin: '200px',
		})
	)
	export let stories
</script>

<div class="w-full h-screen grid min-h-screen place-items-center bg-black p-6">
	<div class="space-y-4">
		<!-- exit -->
		<a
			href="/"
			sveltekit:prefetch
			class="w-max flex items-center gap-0.5 font-medium text-slate-400"
		>
			Close
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</a>
		<div
			id="noscrollbar"
			class="flex h-[90vh] w-full snap-y snap-mandatory flex-col gap-4 overflow-y-scroll"
		>
			{#each stories as story}
				<div
					class="relative w-full h-[80vh] flex-shrink-0 snap-center overflow-hidden rounded-xl text-pink-400"
				>
					<Video
						id={story.id}
						username={story.userName}
						verified={story.verified}
						poster={story.urls.poster}
						src={story.urls.sd}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	/* Hide scrollbar for Chrome, Safari and Opera */
	div#noscrollbar::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	div#noscrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
