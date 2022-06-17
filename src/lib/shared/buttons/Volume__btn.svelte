<script>
	import { createEventDispatcher } from 'svelte'
	import Volume from '$lib/shared/icons/Volume__ico.svelte'
	import Muted from '../icons/Muted__ico.svelte'

	export let muted = true
	export let hint = {
		onmute: '',
		onunmute: '',
	}
	const dispatch = createEventDispatcher()
</script>

<button on:click={() => dispatch('click')} class="btn gap-1 {$$restProps.class}">
	{#if muted}
		<Muted />
		{hint.onmute}
	{:else}
		<Volume />
		{hint.onunmute}
	{/if}
</button>
