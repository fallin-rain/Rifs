<script>
	import { page } from '$app/stores'

	const pages = $page.url.pathname.split('/')
</script>

<div class="sticky top-0 z-20 text-secondary breadcrumbs bg-base-300">
	<ul>
		{#each pages as pagename, index}
			<li class="capitalize">
				{#if pagename === ''}
					<a href="/">home</a>
				{/if}
				<a
					sveltekit:prefetch
					href={$page.url.host +
						$page.url.pathname
							.split('/', index + 1)
							.toString()
							.replaceAll(',', '/')}>{pagename}</a
				>
			</li>
		{/each}
	</ul>
</div>
