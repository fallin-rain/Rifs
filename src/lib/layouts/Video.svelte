<script lang="ts">
	export let width: string
	export let height: string
	export let id: string
	export let username: string
	export let verified: boolean
	export let poster: string
	export let src: string

	// video controls
	let saved = false
	let muted = true
	let paused = true
	let showControls = false
	let showControlsTimeout: NodeJS.Timeout | undefined
	let isBuffering = true
	let buffered: TimeRanges
	let buffer: number = 0
	let duration: number
	let currentTime: number

	function seekvideo(e) {
		if (!duration) return

		clearInterval(showControlsTimeout)

		return (currentTime = e.target.value)
	}

	function handleClick(e) {
		if (e.detail === 1) {
			clearInterval(showControlsTimeout)
			showControlsTimeout = setInterval(() => (showControls = false), 2500)
			showControls = true
		} else if (e.detail === 2) {
			paused = !paused
		}
		return
	}
</script>

<!-- NOTE:
    ALWAYS REMEMBER TO WRAP THIS
    COMPONENT IN A <DIV /> WITH
    **POSITION RELATIVE**
-->
<!-- video -->
<!-- svelte-ignore a11y-media-has-caption -->
<video
	class="block w-full min-w-[300px] h-full object-cover object-center"
	data-lazyvideo
	data-poster={poster}
	data-src={src}
	{height}
	{width}
	loop
	bind:buffered
	bind:currentTime
	bind:duration
	bind:muted
	bind:paused
	on:click={handleClick}
/>
<!-- absolute play/pause -->
<button
	id="absolute-playpause"
	class="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
	style={paused ? 'opacity: 1;' : 'opacity: 0;'}
	on:click={() => (paused = !paused)}
>
	<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
		<path
			fill-rule="evenodd"
			d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
			clip-rule="evenodd"
		/>
	</svg>
</button>
<!-- username -->
<div
	id="username"
	class="absolute inset-x-0 top-0 flex items-center justify-between p-3"
	style={showControls || paused
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
<!-- video controls -->
<div
	id="controls"
	class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3"
	style={showControls || paused
		? 'transform: translateY(0px); opacity: 1;'
		: 'transform: translateY(100px); opacity: 0;'}
>
	<!-- play/pause -->
	<button on:click={() => (paused = !paused)}>
		{#if paused}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 flex-shrink-0 rounded-full bg-pink-400 p-0.5 text-pink-800"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 flex-shrink-0 rounded-full bg-pink-400 p-0.5 text-pink-800"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		{/if}
	</button>
	<!-- progress bar -->
	<div class="relative -mt-2 w-full">
		<div
			class="absolute top-2/4 left-0 h-1 rounded-full bg-pink-400 pointer-events-none"
			style="width: 0%;"
		/>
		<input
			type="range"
			class="h-1.5 appearance-none bg-slate-800"
			min="0"
			max={duration ? duration : '0'}
			value={currentTime}
			on:input={seekvideo}
		/>
	</div>
	<!-- mute/unmute -->
	<button on:click={() => (muted = !muted)}>
		{#if muted}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 flex-shrink-0 rounded-full bg-pink-400 p-0.5 text-pink-800"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
					clip-rule="evenodd"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
				/>
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 flex-shrink-0 rounded-full bg-pink-400 p-0.5 text-pink-800"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
				/>
			</svg>
		{/if}
	</button>
</div>

<style>
	button#absolute-playpause {
		transition: opacity 100ms linear;
	}

	div#username,
	div#controls {
		transition: transform 250ms ease-in-out, opacity 100ms linear;
	}

	div#username {
		background: rgb(0, 0, 0);
		background: -moz-linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%);
		background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%);
		background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%);
	}
	div#controls {
		background: rgb(0, 0, 0);
		background: -moz-linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%);
		background: -webkit-linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%);
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%);
	}

	input[type='range'] {
		-webkit-appearance: none;
		width: 100%;
		border-radius: 99px;
	}
	input[type='range']:focus {
		outline: none;
	}
	input[type='range']::-webkit-slider-thumb {
		border-radius: 999px;
		background: rgb(244 114 182 / 1);
		width: 1.5rem;
		height: 1.5rem;
		cursor: pointer;
	}
	input[type='range']::-moz-range-thumb {
		border-radius: 999px;
		background: rgb(244 114 182 / 1);
		width: 1.25rem;
		height: 1.25rem;
		cursor: pointer;
	}
	input[type='range']::-ms-thumb {
		border-radius: 999px;
		background: rgb(244 114 182 / 1);
		width: 30px;
		height: 30px;
		cursor: pointer;
	}
	input[type='range']:focus::-ms-fill-lower {
		background: rgb(244 114 182 / 1);
	}
	input[type='range']:focus::-ms-fill-upper {
		background: rgb(244 114 182 / 1);
	}
</style>
