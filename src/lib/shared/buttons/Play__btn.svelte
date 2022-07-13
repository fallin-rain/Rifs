<script>
	import { createEventDispatcher } from 'svelte'
	import PauseIco from '../icons/Pause__ico.svelte'
	import PlayIco from '../icons/Play__ico.svelte'

	export let paused = true
	export let hint = {
		onplay: '',
		onpause: '',
	}
	const dispatch = createEventDispatcher()
</script>

<button on:click={() => dispatch('click')} class="btn gap-1 {$$restProps.class}">
	{#if paused}
		<PauseIco />
		{hint.onpause}
	{:else}
		<PlayIco />
		{hint.onplay}
	{/if}
</button>
