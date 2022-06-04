<script lang="ts">
	import Video from '$lib/layouts/Video.svelte'

	export let poster: string
	export let src: string
	export let username: string
	export let verified: boolean
	export let id: string
	export let height: string
	export let width: string
</script>

<div class="relative overflow-hidden rounded-xl text-pink-400">
	<!-- video -->
	<!-- svelte-ignore a11y-media-has-caption -->
	<Video {id} {username} {verified} {poster} {src} {height} {width} />
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
