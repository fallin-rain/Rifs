<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let href: string
	export let text = 'Load more'

	const dispatch = createEventDispatcher()
</script>

{#if href}
	<a
		{href}
		sveltekit:noscroll
		sveltekit:prefetch
		on:click={() => dispatch('loadmore')}
		class="block cursor-pointer w-max mx-auto mt-6 bg-slate-800 px-6 py-3 text-sm font-semibold rounded-lg"
		>{text}</a
	>
{:else}
	<button
		class="block cursor-pointer w-max mx-auto mt-6 bg-slate-800 px-6 py-3 text-sm font-semibold rounded-lg"
		on:click={() => dispatch('action')}>{text}</button
	>
{/if}
