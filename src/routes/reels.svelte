<script>
	import Alert from '$lib/components/Alert.svelte'
	import LinkBtn from '$lib/components/LinkBtn.svelte'
	import MasonryCard from '$lib/components/MasonryCard.svelte'

	import { fly } from 'svelte/transition'
	import { cached } from '$lib/stores/cached'

	/**
	 * @type {string}
	 */
	let data

	function load() {
		if ($cached === 'not fetched') return

		data = JSON.parse($cached)
	}
	load()
</script>

<section in:fly={{ y: 450, duration: 450 }} class="mt-28 p-6 space-y-6 md:p-60">
	{#if $cached === 'not fetched'}
		<Alert class="alert-warning" message="Oops! data haven't fetched yet!" />
		<a sveltekit:prefetch href="/" class="btn btn-block btn-primary">Go to homepage to fetch data</a
		>
	{:else}
		<div class="columns-1 lg:columns-3 2xl:columns-4 gap-3 w-full mx-auto space-y-6">
			{#each data.reels as post}
				<MasonryCard
					type={post.type}
					poster={post.urls.poster}
					src={post.urls.vthumbnail}
					verified={post.user.verified}
					username={post.user.username}
					id={post.id}
					width={post.width}
					height={post.height}
				/>
			{/each}
		</div>
		<LinkBtn text={'Scroll to top'} on:action={() => window.scroll(0, 0)} />
	{/if}
</section>
