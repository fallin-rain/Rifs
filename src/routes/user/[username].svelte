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
	import Tags from '$lib/layouts/Tags.svelte'
	import Heading from '$lib/layouts/Heading.svelte'
	import MasonryCard from '$lib/components/MasonryCard.svelte'
	import { formatTS } from '$lib/utils/formatTS'

	export let user: string
	export let tags: string[]
	export let gifs: string[]
</script>

<section class="p-6 space-y-6 md:p-60">
	<!-- about user -->
	<div class="max-w-sm mx-auto flex flex-col gap-4 items-center">
		<div class="avatar">
			<div class="w-36 mask mask-squircle">
				<img
					class="bg-slate-600 text-xs"
					src={user.profileImageUrl ||
						'https://avatars.dicebear.com/api/initials/' + user.name + '.svg?backgroundColors=pink'}
					alt={(user.profileImageUrl && user.name) || 'No profile image'}
				/>
			</div>
		</div>

		<div class="text-center space-y-3">
			<h3
				class="flex max-h-min text-center items-center justify-center text-lg font-semibold tracking-wide"
			>
				{user.name || 'No name'}
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
			<p class="text-sm text-accent">@{user.username}</p>
			<span class="text-sm">Since <time>{formatTS(user.creationtime)}</time></span>
		</div>
		<div class="flex items-center justify-between">
			<!-- followers -->
			<div class="text-center pr-5">
				<p class="">{user.followers}</p>
				<p class="text-sm">Followers</p>
			</div>
			<div class="divider divider-horizontal" />
			<!-- gifs -->
			<div class="text-center pl-5">
				<p class="">{user.gifs}</p>
				<p class="text-sm">Total gifs</p>
			</div>
		</div>
	</div>
	<p class="{user.description || 'hidden'} min-w-full">
		{user.description}
	</p>
	<!-- social links -->
	<div class="min-w-full flex items-center flex-wrap gap-6">
		<a
			class="{user.socialUrl1 || 'hidden'} link link-hover link-secondary flex items-center gap-1"
			href={user.socialUrl1}
			target="_blank"
		>
			PornHub
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
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
			class="{user.socialUrl2 || 'hidden'} link link-hover link-secondary flex items-center gap-1"
			href={user.socialUrl2}
			target="_blank"
		>
			Twitter
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
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
			class="{user.socialUrl3 || 'hidden'} link link-hover link-secondary flex items-center gap-1"
			href={user.socialUrl3}
			target="_blank"
		>
			Instagram
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
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
			class="{user.socialUrl4 || 'hidden'} link link-hover link-secondary flex items-center gap-1"
			href={user.socialUrl4}
			target="_blank"
		>
			ManyVids
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
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
			class="{user.socialUrl5 || 'hidden'} link link-hover link-secondary flex items-center gap-1"
			href={user.socialUrl5}
			target="_blank"
		>
			Reddit
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
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
			class="{user.socialUrl6 || 'hidden'} link link-hover link-secondary flex items-center gap-1"
			href={user.socialUrl6}
			target="_blank"
		>
			OnlyFans
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
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

	<Heading title="Most used tags" />
	<div class="mt-6 h-12 flex items-center gap-x-3 gap-y-4 overflow-y-hidden overflow-x-scroll">
		{#each tags as tag}
			<Tags linkPath={'/tags/related/'} {tag} />
		{/each}
	</div>

	<Heading title="Recent posts" />
	<!-- user's posts -->
	<div class="columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
		{#each gifs as gif}
			<MasonryCard
				type={gif.type}
				username={gif.userName}
				verified={gif.verified}
				poster={gif.poster}
				src={gif.urls.sd}
				id={gif.id}
				height={gif.height}
				width={gif.width}
			/>
		{/each}
	</div>
</section>
