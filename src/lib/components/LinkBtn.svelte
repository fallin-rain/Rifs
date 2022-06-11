<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let href = ''
	export let text = 'Load more'

	const dispatch = createEventDispatcher()
</script>

<div class="text-center">
	{#if href}
		<a
			{href}
			sveltekit:noscroll
			sveltekit:prefetch
			on:click={() => dispatch('loadmore')}
			class="btn">{text}</a
		>
	{:else}
		<button class="btn" on:click={() => dispatch('action')}>{text}</button>
	{/if}
</div>
