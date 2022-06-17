<script>
	export let h = '6'
	export let w = '6'
	export let text = ''
	export let bg = ''
</script>

<div class="h-{h} w-{w} text-{text} bg-{bg} {$$restProps.class}" class:hidden={$$restProps.hidden}>
	<svg
		class="h-full w-full"
		viewBox="0 0 24 24"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		stroke="currentColor"
	>
		<path
			d="M8.46447 15.5355L15.5355 8.46446"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
		<path
			d="M8.46447 8.46447L15.5355 15.5355"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
	</svg>
</div>
