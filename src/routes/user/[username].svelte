<script context="module" lang="ts">
	export async function load({ fetch, params }) {
		const res = await fetch('/api/user/' + params.username)
		const data = await res.json()

		return {
			status: res.status,
			props: {
				user: data.users[0],
				tags: data.tags,
				gifs: data.gifs,
			},
		}
	}
</script>

<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import Heading from '$lib/layouts/Heading.svelte'
	import { formatTS } from '$lib/utils/formatTS'
	import { formatViews } from '$lib/utils/formatViews'
	import { lazyload } from '$lib/utils/lazyload'
	import { onMount } from 'svelte'

	onMount(() => {
		lazyload('[data-card] video', {
			threshold: 0.8,
		})
	})

	export let user: string
	export let tags: string[]
	export let gifs: string[]
</script>

<section id="about-user">
	<!-- about user -->
	<div class="max-w-sm mx-auto flex flex-col gap-4 items-center text-pink-200">
		<div class="w-36 h-36 overflow-hidden rounded-2xl">
			<img
				class="block bg-slate-600 w-full h-full object-cover object-top"
				src={user.profileImageUrl}
				alt={(user.profileImageUrl && user.name) || 'No profile image'}
			/>
		</div>
		<div class="text-center">
			<h3
				class="flex max-h-min text-center items-center justify-center text-lg font-semibold tracking-wide text-pink-400"
			>
				{user.name}
				{#if user.verified}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 ml-1"
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
			</h3>
			<p class="text-sm text-slate-600">@{user.username}</p>
			<span class="text-sm text-slate-600">Since <time>{formatTS(user.creationtime)}</time></span>
		</div>
		<div class="flex divide-x divide-slate-800 items-center justify-between">
			<!-- followers -->
			<div class="text-center pr-10">
				<p class="">{user.followers}</p>
				<p class="text-sm text-slate-600">Followers</p>
			</div>
			<!-- gifs -->
			<div class="text-center pl-10">
				<p class="">{user.gifs}</p>
				<p class="text-sm text-slate-600">Total gifs</p>
			</div>
		</div>
		<p class="{user.description || 'hidden'} min-w-full">
			{user.description}
		</p>
		<!-- social links -->
		<div class="min-w-full flex items-center flex-wrap gap-x-4 gap-y-1">
			<a
				class="{user.socialUrl1 || 'hidden'} flex items-center font-semibold text-pink-400"
				href={user.socialUrl1}
				target="_blank"
			>
				Porn hub
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 ml-1"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
					/>
				</svg>
			</a>
			<a
				class="{user.socialUrl2 || 'hidden'} flex items-center font-semibold text-pink-400"
				href={user.socialUrl2}
				target="_blank"
			>
				Twitter
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 ml-1"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
					/>
				</svg>
			</a>
			<a
				class="{user.socialUrl3 || 'hidden'} flex items-center font-semibold text-pink-400"
				href={user.socialUrl3}
				target="_blank"
			>
				Instagram
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 ml-1"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
					/>
				</svg>
			</a>
			<a
				class="{user.socialUrl4 || 'hidden'} flex items-center font-semibold text-pink-400"
				href={user.socialUrl4}
				target="_blank"
			>
				Many vids
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 ml-1"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
					/>
				</svg>
			</a>
			<a
				class="{user.socialUrl5 || 'hidden'} flex items-center font-semibold text-pink-400"
				href={user.socialUrl5}
				target="_blank"
			>
				Reddit
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 ml-1"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
					/>
				</svg>
			</a>
			<a
				class="{user.socialUrl6 || 'hidden'} flex items-center font-semibold text-pink-400"
				href={user.socialUrl6}
				target="_blank"
			>
				Only fans
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 ml-1"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
					/>
				</svg>
			</a>
		</div>
	</div>
</section>

<section id="user-tags">
	<Heading title="Most used tags" />
	<div class="flex flex-wrap items-center gap-x-3 gap-y-4">
		{#each tags as tag}
			<a
				href={'/tags/related/' + tag}
				class="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-pink-600 to-red-800 p-0.5 text-sm font-medium"
			>
				<span class="relative rounded-full bg-slate-900 px-4 py-2 text-pink-200">{tag}</span>
			</a>
		{/each}
	</div>
</section>

<section id="user-posts" class="mt-3">
	<h1
		class="mb-6 bg-gradient-to-br from-pink-500 to-red-600 bg-clip-text font-serif text-2xl font-extrabold italic tracking-wide text-transparent"
	>
		Recent posts
	</h1>
	<!-- user's posts -->
	<div class="columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
		{#each gifs as gif}
			<Card
				username={gif.userName}
				profileName={gif.userName}
				verified={gif.verified}
				date={formatTS(gif.createDate)}
				hasAudio={gif.hasAudio}
				views={formatViews(gif.views)}
				poster={gif.poster}
				hasTags={gif.tags}
				tags={gif.tags}
				src={gif.urls.sd}
				autoplay={true}
			/>
		{/each}
	</div>
</section>
