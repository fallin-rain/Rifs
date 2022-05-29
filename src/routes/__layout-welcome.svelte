<script>
	import '../tailwind.css'
</script>

<div class="min-h-screen bg-slate-900 text-pink-200">
	<main class="p-6 space-y-10 md:p-20">
		<slot />
	</main>
</div>

<style>
	* {
		user-select: none;
		-moz-user-select: -moz-none;
		-webkit-user-select: none;
	}
</style>
