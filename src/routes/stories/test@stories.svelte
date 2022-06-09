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

	export let stories

	onMount(() =>
		lazyload('[data-lazyvideo]', {
			autoplay: true,
			threshold: 0.2,
		})
	)

	function prevPage() {
		history.back()
	}
</script>

<div class="w-full h-screen grid min-h-screen place-items-center bg-black p-3">
	<div class="space-y-3">
		<!-- exit -->
		<button on:click={prevPage} class="badge badge-outline">
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
			Close
		</button>
		<div id="noscrollbar" class="h-[90vh] carousel carousel-vertical rounded-box">
			{#each stories as story}
				<div class="relative w-full h-full carousel-item text-accent">
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
