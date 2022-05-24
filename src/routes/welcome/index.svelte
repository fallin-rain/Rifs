<script lang="ts">
	import { first_time_visit } from '$lib/stores/persistWelcome'
</script>

<section class="text-pink-200 space-y-8">
	<h1
		class="text-center bg-gradient-to-br from-pink-500 to-red-600 bg-clip-text font-serif text-4xl font-extrabold italic tracking-wide text-transparent"
	>
		Welcome
	</h1>

	<div class="text-center text-slate-400">
		<p>
			<span class="italic font-serif font-semibold">Rifs</span> is an adult web app and not intended
			for any kind of misuse.
		</p>
		<p>Use this site responsibly. Enjoy!</p>
	</div>

	<div class="flex items-center fixed bottom-20 left-0 px-6 md:px-20 w-full justify-between gap-6">
		<a
			href="/welcome/denied"
			class="w-full text-center tracking-wide rounded-xl bg-slate-800 py-2 text-sm font-medium"
		>
			<span class="block w-full text-center tracking-normal leading-tight text-base font-bold"
				>Nope!</span
			>
			I'm a weeb
		</a>

		<a
			href="/settings/profile/create"
			on:click={() => first_time_visit.set('visited')}
			class="w-full text-center tracking-wide rounded-xl bg-gradient-to-br from-pink-600 to-red-800 py-2 text-sm font-medium"
		>
			<span class="block w-full text-center tracking-normal leading-tight text-base font-bold"
				>Okay!</span
			>
			I understand
		</a>
	</div>
</section>
