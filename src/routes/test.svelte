<script>
	import { fly, fade } from 'svelte/transition'
</script>

<div in:fly={{ duration: 200, delay: 1000 }} out:fly={{ x: 1000, duration: 100 }}>
	yiy
	<h1>HSAS</h1>
</div>
