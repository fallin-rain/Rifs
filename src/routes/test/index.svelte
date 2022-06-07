<script context="module" lang="ts">
	export async function load({ url, fetch }) {
		const query = url.searchParams.get('query')

		if (!query) return { props: { data: '' } }

		const res = await fetch('/test/search/query?query=' + encodeURIComponent(query))
		const data = await res.json()

		return {
			props: {
				data,
			},
		}
	}
</script>

<script lang="ts">
	import { browser } from '$app/env'

	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	export let data: object
	let query = ''

	async function searchTag() {
		if (!query) return

		let currentQuery = $page.url.searchParams.get('query')

		if (query.trim() == currentQuery?.trim()) return

		await goto('/test/?query=' + encodeURIComponent(query), {
			keepfocus: true,
		})

		if (!data) return
		data.data.forEach(el => {
			console.log(el.type)
			console.log(el.text)
			console.log(el?.username)
			console.log(el?.userpic)
		})
	}

	// debounce
	let timer: NodeJS.Timeout | undefined

	function debounce(delay = 750) {
		clearTimeout(timer)

		timer = setTimeout(searchTag, delay)
	}

	let verified = true
	let poster = 'https://thumbs2.redgifs.com/MenacingDescriptiveCockatoo-poster.jpg'
	let source = [
		'https://thumbs2.redgifs.com/MenacingDescriptiveCockatoo-mobile.mp4',
		'https://thumbs2.redgifs.com/EthicalSparseFunnelweaverspider-mobile.mp4',
	]
</script>

<h1 class="mt-20" />
<form class=" form-control max-w-sm" on:submit|preventDefault={searchTag}>
	<label for="search" class="label">
		<span class="label-text">Search tags and creators</span>
	</label>
	<input
		placeholder="Search"
		class="input input-bordered"
		type="search"
		name="search"
		bind:value={query}
		on:keyup={() => debounce(1200)}
	/><button type="submit" class="mt-3 btn btn-secondary w-max ">Search</button>
</form>

{JSON.stringify(data)}

{#each source as src}
	<div class="relative overflow-hidden rounded-xl">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="#">
			<!-- svelte-ignore a11y-media-has-caption -->
			<video {poster} {src} loop controls />
		</a>
		<!-- username -->
		<div
			id="username"
			class="absolute top-0 left-0 w-full p-3 flex items-center justify-between font-bold tracking-wide"
		>
			<a
				href="https://unsplash.com"
				class="flex w-max items-center justify-between gap-1 text-pink-400"
			>
				username
				{#if verified}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 mt-1"
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
			<button>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 flex-shrink-0 text-pink-400"
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
		</div>
	</div>
{/each}

<style>
	div#username {
		background: rgb(0, 0, 0);
		background: -moz-linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%);
		background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%);
		background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%);
	}
</style>
