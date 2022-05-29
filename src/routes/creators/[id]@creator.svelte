<script context="module" lang="ts">
	export async function load({ fetch, params }) {
		const singleRes = await fetch('/api/creators/' + params.id)
		const singleResData = await singleRes.json()

		const relatedRes = await fetch('/api/creators/related/' + params.id)
		const relatedResData = await relatedRes.json()

		return {
			status: singleRes.status,
			props: {
				gif: singleResData.gif,
				user: singleResData.user,
				related_gifs: relatedResData.gifs,
				related_tags: relatedResData.tags.slice(0, 10),
			},
		}
	}
</script>

<script>
	import { onMount } from 'svelte'
	import { formatTS } from '$lib/utils/formatTS'
	import { lazyload } from '$lib/utils/lazyload'
	import { formatViews } from '$lib/utils/formatViews'

	import Tags from '$lib/layouts/Tags.svelte'
	import Card from '$lib/components/Card.svelte'
	import Divider from '$lib/layouts/Divider.svelte'
	import Heading from '$lib/layouts/Heading.svelte'

	export let gif
	export let user
	export let related_gifs
	export let related_tags

	onMount(() => {
		lazyload('[data-card] video', {
			threshold: 0.8,
		})
	})
</script>

<section>
	<video
		class="mx-auto block w-full md:rounded-xl aspect-video bg-black"
		controls
		loop
		muted
		src={gif.urls.hd}
	/>
	<div class="p-6 md:px-0 space-y-6">
		<div class="flex items-center justify-between">
			<div>
				<a
					href={'/user/' + user.username}
					class="inline-flex items-center justify-center text-center text-lg font-semibold tracking-wide text-pink-400"
				>
					{user.name}
					{#if user.verified}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="ml-1 h-5 w-5"
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
				</a>
				<p class="text-sm text-slate-600">@{user.username}</p>
			</div>
			<a
				href={'/user/' + user.username}
				class="rounded bg-pink-600 px-3 py-1.5 text-sm font-medium tracking-wide">View profile</a
			>
		</div>
		<Divider />
		<Heading title="Related tags" />
		<div class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-4">
			{#each related_tags as tag}
				<Tags linkPath={'/tags/related/'} {tag} />
			{/each}
		</div>
		<Heading title="Related posts" />
		<div class="mt-6 columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
			{#each related_gifs as data}
				<Card
					username={data.userName}
					profileName={data.userName}
					verified={data.verified}
					date={formatTS(data.createDate)}
					hasAudio={data.hasAudio}
					views={formatViews(data.views)}
					poster={data.urls.poster}
					hasTags={data.tags}
					tags={data.tags}
					autoplay={true}
					src={data.urls.sd}
				/>
			{/each}
		</div>
	</div>
</section>
