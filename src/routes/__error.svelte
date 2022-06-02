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

<section>
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
					<a
						href="/"
						sveltekit:prefetch
						class="inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-600 to-red-800 p-0.5 text-sm font-medium"
					>
						<span
							class="block w-full text-center rounded-lg bg-gradient-to-br from-pink-600 to-red-800 px-5 py-2 text-pink-200"
							>Go back to home</span
						>
					</a>
					<a
						href={$page.url}
						sveltekit:reload
						class="inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-600 to-red-800 p-0.5 text-sm font-medium"
					>
						<span class="block w-full text-center rounded-lg bg-slate-900 px-5 py-2 text-pink-200"
							>Reload</span
						>
					</a>
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
					<a
						href="/"
						sveltekit:prefetch
						class="inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-600 to-red-800 p-0.5 text-sm font-medium"
					>
						<span
							class="block w-full text-center rounded-lg bg-gradient-to-br from-pink-600 to-red-800 px-5 py-2 text-pink-200"
							>Go back to home</span
						>
					</a>
					<a
						href="/settings"
						sveltekit:prefetch
						class="inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-600 to-red-800 p-0.5 text-sm font-medium"
					>
						<span class="block w-full text-center rounded-lg bg-slate-900 px-5 py-2 text-pink-200"
							>Go to settings</span
						>
					</a>
				</div>
			</div>
		{/if}
	</div>
	<h1 class="mt-20 mb-6 text-2xl font-black italic uppercase">debugging</h1>
	<h3 class="text-xl font-bold text-red-400">Status {status}</h3>
	<div class="overflow-x-scroll py-6">
		<pre>{error}</pre>
	</div>
</section>
