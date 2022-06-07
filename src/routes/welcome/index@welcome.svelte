<script>
	import Heading from '$lib/layouts/Heading.svelte'
	import { first_time_visit } from '$lib/stores/persistWelcome'
</script>

<section class="min-h-screen flex flex-col items-center justify-between p-6 md:p-60">
	<Heading title="Welcome to Rifs" />

	<div class="text-center">
		<p>
			<span class="italic font-serif font-semibold">Rifs</span> is an adult web app and not intended
			for any kind of misuse.
		</p>
		<p>Use this site responsibly. Enjoy!</p>
	</div>

	<div class="space-y-6 w-full">
		<a
			href="/settings/profile"
			sveltekit:prefetch
			on:click={() => first_time_visit.set('visited')}
			class="btn btn-block btn-primary"
		>
			Okay
		</a>

		<a href="/welcome/denied" class="btn btn-block btn-ghost"> Take me back</a>
	</div>
</section>
