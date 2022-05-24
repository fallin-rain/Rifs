<script lang="ts">
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'

	const isProfileSetup = browser && localStorage.getItem('profileSetup')
	let autoplay = true
</script>

<section>
	<h1
		class="mb-6 bg-gradient-to-br from-pink-500 to-red-600 bg-clip-text font-serif text-2xl font-extrabold italic tracking-wide text-transparent"
	>
		Settings
	</h1>
	<div>
		{#if $isProfileSetup == 'Completed'}
			<a href="/settings/profile" class="font-bold text-blue-400">Edit your profile </a>
		{:else}
			<a href="/settings/profile" class="font-bold text-blue-400">Create your profile </a>
		{/if}
	</div>
	<div class="flex items-center justify-between w-max gap-6">
		<button
			on:click={() => (autoplay = !autoplay)}
			class="px-5 py-2 font-semibold text-sm bg-pink-600 text-pink-200 rounded-lg">Autoplay</button
		>
		<p class="text-pink-200">{autoplay ? 'On' : 'Off'}</p>
	</div>
	<pre class="mt-3 text-gray-400 text-sm">this does not work as of now</pre>
</section>
