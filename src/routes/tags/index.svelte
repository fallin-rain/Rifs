<script>
	const tags = ['Anal', 'Bdsm', 'Lesbian', 'Slave', 'Teen']
</script>

<section id="trending-tags">
	<h1
		class="mb-6 bg-gradient-to-br from-pink-500 to-red-600 bg-clip-text font-serif text-2xl font-extrabold italic tracking-wide text-transparent"
	>
		Trending tags
	</h1>
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
