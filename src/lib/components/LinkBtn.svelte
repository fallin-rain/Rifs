<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let url: any
	export let text = 'Load more'

	const dispatch = createEventDispatcher()
</script>

<a
	href={url}
	sveltekit:noscroll
	sveltekit:prefetch
	on:click={() => dispatch('loadmore')}
	class="block cursor-pointer w-max mx-auto mt-6 bg-slate-800 px-6 py-3 text-sm font-semibold rounded-lg"
	>{text}</a
>
