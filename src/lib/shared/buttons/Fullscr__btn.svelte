<script>
	import { createEventDispatcher } from 'svelte'
	import CollapseIco from '../icons/Collapse__ico.svelte'
	import ExpandIco from '../icons/Expand__ico.svelte'

	export let fullscreen = false
	export let hint = {
		onfullscreen: '',
		onNotfullscreen: '',
	}
	const dispatch = createEventDispatcher()
</script>

<button on:click={() => dispatch('click')} class="btn gap-1 {$$restProps.class}">
	{#if fullscreen}
		<CollapseIco />
		{hint.onfullscreen}
	{:else}
		<ExpandIco />
		{hint.onNotfullscreen}
	{/if}
</button>
