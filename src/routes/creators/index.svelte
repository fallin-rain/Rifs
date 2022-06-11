<script>
	import MasonryCard from '$lib/components/MasonryCard.svelte'

	import { temp } from '$lib/stores/temp'
	import { lazyload } from '$lib/utils/lazyload'
	import { onMount } from 'svelte'

	let rawdata
	let content

	if ($temp) {
		rawdata = $temp
		content = JSON.parse(rawdata)
		console.log(content)
	} else rawdata = 'Not Loaded'

	onMount(() => {
		lazyload('[data-lazy]', {
			threshold: 0.4,
		})
	})
</script>

{#if content}
	<section class="p-6 space-y-6 md:p-60">WIP</section>
{:else}
	No data
{/if}
