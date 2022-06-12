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

	export let stories

	function prevPage() {
		history.back()
	}

	onscroll = e => {
		const carouselBox = document.querySelector('#carousel-box')

		if (scrollY > 270) carouselBox?.requestFullscreen()
	}

	let testing = true
</script>

<!-- alert message -->
<section class="space-y-6 p-6">
	<div class="alert alert-info">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="stroke-current flex-shrink-0 w-5 h-5"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span class="text-sm">Stories is currently in beta. The UI may change in future builds.</span>
		</div>
	</div>

	<button
		on:click={() => {
			document.querySelector('#carousel-box')?.requestFullscreen()
		}}
		class="mt-20 btn-block btn btn-primary">Click to watch stories</button
	>

	<!-- stories post -->
	<div id="carousel-box" class="bg-black h-screen carousel carousel-vertical rounded-box">
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
</section>

{#if !testing}
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
{/if}

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
