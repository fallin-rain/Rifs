<script>
	import '../tailwind.css'
	import Header from '$lib/components/Header.svelte'
</script>

<div class="min-h-screen bg-slate-900 text-pink-200">
	<Header />
	<main class="px-6 py-20 space-y-10 md:px-20">
		<slot />
	</main>
</div>
