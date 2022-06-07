<script context="module">
	/** @type {import('@sveltejs/kit').Load} */

	export function load({ error, status }) {
		return {
			props: {
				error: error?.stack,
				status,
			},
		}
	}
</script>

<script>
	import { page } from '$app/stores'

	export let error
	export let status
</script>

<section class="p-6 md:p-24 bg-base-300">
	<div
		class="space-y-6 flex flex-col md:flex-row md:items-center md:justify-center md:gap-20 md:py-auto"
	>
		{#if +status.toString().substring(0, 1) === 5}
			<img
				class="block mx-auto md:mx-0 w-52 h-52 md:w-72 md:h-72 object-cover"
				src="https://avatars.dicebear.com/api/micah/asad.svg"
				alt="oh no"
			/>
			<div class="space-y-6">
				<h1 class="text-6xl mr-auto">Oops!</h1>
				<p>Looks like the server stopped</p>
				<div class="flex w-full flex-col md:flex-row gap-6">
					<a href="/" sveltekit:prefetch class="btn btn-block btn-primary">Go back to home</a>
					<a href={$page.url} sveltekit:reload class="btn btn-block btn-outline">Reload</a>
				</div>
			</div>
		{:else if +status.toString().substring(0, 1) === 4}
			<img
				class="block mx-auto md:mx-0 w-52 h-52 md:w-72 md:h-72 object-cove"
				src="https://avatars.dicebear.com/api/micah/zlost.svg"
				alt="oh no"
			/>
			<div class="space-y-6">
				<h1 class="text-6xl mr-auto">Oops!</h1>
				<p>Looks like you're lost</p>
				<div class="flex w-full flex-col md:flex-row gap-6">
					<a href="/" sveltekit:prefetch class="btn btn-block btn-primary">Go back to home</a>
					<a href="/search" sveltekit:prefetch class="btn btn-block btn-outline">Go tosearch </a>
				</div>
			</div>
		{/if}
	</div>
	<h1 class="mt-20 mb-6 text-2xl font-black italic uppercase">debugging</h1>
	<h3 class="text-xl font-bold text-error">Status {status}</h3>
	<div class="overflow-x-scroll py-6">
		<pre>{error}</pre>
	</div>
</section>
