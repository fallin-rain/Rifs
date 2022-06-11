<script lang="ts">
	import Video from '$lib/layouts/Video.svelte'

	export let poster: string
	export let src: string
	export let username: string
	export let verified: boolean
	export let id: string
	export let height: string
	export let width: string
	export let type = 2 // type 2 is image

	// profile controls
	let saved = false
	let showControls = false
	let showControlsTimeout: NodeJS.Timeout | undefined

	function handleClick() {
		clearInterval(showControlsTimeout)
		showControlsTimeout = setInterval(() => (showControls = false), 2500)
		showControls = !showControls
	}
</script>

{#if type === 2}
	<div class="relative overflow-hidden rounded-xl text-accent">
		<img
			class="block object-cover object-center"
			data-lazy="image"
			data-src={src}
			alt="user's id is {id}"
			{width}
			{height}
			on:click={handleClick}
		/>
		<!-- username -->
		<div
			id="username"
			class="absolute inset-x-0 top-0 flex items-center justify-between p-3"
			style={showControls
				? 'transform: translateY(0px); opacity: 1;'
				: 'transform: translateY(-100px); opacity: 0;'}
		>
			<a
				href={'/creators/' + id}
				sveltekit:prefetch
				class="flex w-max items-center gap-1 font-bold tracking-wide truncate"
			>
				{username}
				{#if verified}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mt-1 h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
			</a>
			<!-- save -->
			<button>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 flex-shrink-0"
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
				{#if saved}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 flex-shrink-0"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</div>
{:else}
	<div class="relative overflow-hidden rounded-xl text-accent">
		<!-- video -->
		<Video {id} {username} {verified} {poster} {src} {height} {width} />
	</div>
{/if}

<style>
	div#username {
		transition: transform 250ms ease-in-out, opacity 100ms linear;
	}

	div#username {
		background: rgb(0, 0, 0);
		background: -moz-linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%);
		background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%);
		background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%);
	}
</style>
