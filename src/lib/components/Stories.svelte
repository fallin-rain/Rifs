<script lang="ts">
	import VideoPlayer from 'svelte-video-player-kit'

	export let hasAudio: boolean = false

	// video player attributes
	export let width: string = ''
	export let height: string = ''
	export let poster: string = ''
	export let src: string = ''

	let color: string = '#DB2777'
	let focusColor: string = '#DC2626'
	let barsBgColor: string = '#CBD5E1'
	let iconColor: string = '#FBCFE8'
	let bufferedColor: string = '#9D174D'
	let borderRadius: string = '0px'
	let chunkBars: boolean = false
	let loop: boolean = false
</script>

<div data-stories class="relative flex-shrink-0 overflow-hidden rounded-2xl bg-slate-700">
	<!-- sound -->
	<button
		class="absolute z-10 block top-2 right-2 rounded-full bg-slate-700 bg-opacity-60 p-1 text-slate-400"
	>
		{#if hasAudio}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-3 w-3"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
					clip-rule="evenodd"
				/>
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-3 w-3"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		{/if}
	</button>
	<!-- <div class="absolute inset-0 grid place-items-center">
		{#if paused}
			<button
				data-button-play
				on:click={handleClick}
				class="rounded-full bg-opacity-60 bg-red-600 p-1"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
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
			</button>
		{:else}
			<button
				data-button-pause
				on:click={handleClick}
				class="rounded-full bg-opacity-60 bg-red-600 p-1"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
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
			</button>
		{/if}
	</div> -->
	<div class="aspect-[9/16] h-60">
		<!-- <video
			class="block h-full w-full object-cover"
			muted
			data-poster={poster}
			data-src={src}
			controls
		/> -->
		<VideoPlayer
			centerIconSize="40px"
			{color}
			{focusColor}
			{barsBgColor}
			{iconColor}
			{bufferedColor}
			{borderRadius}
			controlsHeight="0px"
			{chunkBars}
			{loop}
			timeDisplay={false}
			{width}
			{height}
			{poster}
			source={src}
		/>
	</div>
</div>
