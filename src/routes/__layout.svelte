<script>
	import '../tailwind.css'
	import Header from '$lib/components/Header.svelte'
</script>

<div class="min-h-screen bg-slate-900 text-pink-200">
	<Header />
	<slot />
</div>
