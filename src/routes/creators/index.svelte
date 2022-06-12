<script>
	import Alert from '$lib/components/Alert.svelte'
	import Heading from '$lib/layouts/Heading.svelte'
	import LinkBtn from '$lib/components/LinkBtn.svelte'
	import MasonryCard from '$lib/components/MasonryCard.svelte'

	import { fly } from 'svelte/transition'
	import { cached } from '$lib/stores/cached'

	/**
	 * @type {string}
	 */
	let data
	let allData = []

	function load() {
		if ($cached === 'not fetched') return

		data = JSON.parse($cached)

		allData = [...data.hotCreators, ...data.newCreators]
	}
	load()
</script>

<section in:fly={{ y: 450, duration: 450 }} class="p-6 space-y-6 md:p-60">
	{#if $cached === 'not fetched'}
		<Alert class="alert-warning" message="Oops! data haven't fetched yet!" />
		<a sveltekit:prefetch href="/" class="btn btn-block btn-primary">Go to homepage to fetch data</a
		>
	{:else}
		<Heading title="New creators" />
		<div class="flex w-full items-center gap-6 overflow-x-scroll">
			{#each data.newCreators as post}
				<div class="flex-shrink-0 card bg-base-100 max-w-xs">
					<figure class="px-6 pt-6">
						<div class="w-24 h-24 mask mask-squircle text-xs">
							<img
								class="bg-slate-600 block object-cover"
								src={post.profileImageUrl ||
									'https://avatars.dicebear.com/api/initials/' +
										post.name +
										'.svg?backgroundColors=pink'}
								alt={(post.profileImageUrl && post.name) || 'No profile image'}
							/>
						</div>
					</figure>
					<div class="card-body items-center text-center">
						<h2 class="card-title">
							<a
								href={'/creators/' + post.thumbnail}
								sveltekit:prefetch
								class="link link-hover flex gap-1 font-bold tracking-wide"
							>
								{post.username}
								{#if post.verified}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="mt-1 h-5 w-5"
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
						</h2>
						<!-- gifs -->
						<div class="mt-2 flex items-center justify-between text-sm">
							<!-- followers -->
							<div class="text-center">
								<p class="">{post.views}</p>
								<p class="text-sm">Total views</p>
							</div>
							<div class="divider divider-horizontal" />
							<!-- gifs -->
							<div class="text-center">
								<p class="">{post.gifs}</p>
								<p class="text-sm">Total gifs</p>
							</div>
						</div>
						<div class="mt-3 card-actions">
							<a role="button" href={'/user/' + post.username} class="btn btn-accent btn-sm"
								>Profile</a
							>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<Heading title="Hot creators" />
		<div class="columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
			{#each allData as post}
				<MasonryCard
					type={1}
					poster={post.poster}
					src={post.preview}
					verified={post.verified}
					username={post.username}
					id={post.thumbnail}
					width={post.width}
					height={post.height}
				/>
			{/each}
		</div>
		<LinkBtn text={'Scroll to top'} on:action={() => window.scroll(0, 0)} />
	{/if}
</section>
