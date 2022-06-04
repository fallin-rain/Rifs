<script lang="ts">
	import { count } from '$lib/stores/queryParams'

	export let url: any
	export let text = 'Load more'

	function loadmore() {
		if ($count >= 80) return

		count.update(inc => (inc += 10))
	}
</script>

<a
	href={url}
	sveltekit:noscroll
	sveltekit:prefetch
	on:click={loadmore}
	class="block cursor-pointer w-max mx-auto mt-6 bg-slate-800 px-4 py-2 text-sm font-semibold rounded-lg"
	>{text}</a
>
