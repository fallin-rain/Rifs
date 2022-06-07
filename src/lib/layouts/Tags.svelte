<script>
	export let linkPath = ''
	export let tag = ''
</script>

<a
	sveltekit:noscroll
	sveltekit:prefetch
	href={linkPath + tag}
	class="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-pink-600 to-red-800 p-0.5 text-sm font-medium"
>
	<span class="relative rounded-full bg-base-100 px-4 py-1.5">{tag}</span>
</a>
