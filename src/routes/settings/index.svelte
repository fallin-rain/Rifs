<script lang="ts">
	import Divider from '$lib/layouts/Divider.svelte'
	import Heading from '$lib/layouts/Heading.svelte'

	import { browser } from '$app/env'
	import { profileSetup } from '$lib/stores/profileSetup'
	import { autoplay } from '$lib/stores/autoplay'

	let aply = false
	function setAutoplay() {
		console.log($autoplay)
		$autoplay == 'false' ? autoplay.set('true') : autoplay.set('false')
	}
</script>

<section>
	<div class="space-y-6">
		<Heading title="Settings" />
		{#if browser && JSON.parse($profileSetup).completed}
			<div class="mx-auto flex max-w-sm flex-col items-center gap-4 text-pink-200">
				<div
					class="bg-slate-200 shadow-md shadow-slate-800 w-36 h-36 overflow-hidden rounded-2xl mx-auto mb-"
				>
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img
						class="block w-full h-full object-cover object-top"
						src={JSON.parse($profileSetup).userimageSrc}
						alt="No profile image"
					/>
				</div>
				<div class="text-center">
					<h3
						class="flex max-h-min items-center justify-center text-center text-lg font-semibold tracking-wide text-pink-400 capitalize"
					>
						{JSON.parse($profileSetup).username}
					</h3>
				</div>
				<a href="/settings/profile" class="bg-pink-600 px-3 py-1 text-sm font-semibold rounded-full"
					>Edit</a
				>
				<div
					class="mt-1.5 flex items-center justify-between text-slate-500 divide-x divide-slate-800"
				>
					<!-- your downloads -->
					<div class="flex items-center gap-2 pr-6 text-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-50"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
							/>
						</svg>
						<p class="">22</p>
					</div>
					<!-- your saved -->
					<div class="flex items-center gap-2 px-6 text-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
						<p class="">80</p>
					</div>
					<!-- your shares -->
					<div class="flex items-center gap-2 pl-6 text-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
							/>
						</svg>
						<p class="">80</p>
					</div>
				</div>
			</div>
		{:else}
			<a href="/settings/profile" class="font-bold text-blue-400">Create profile</a>
		{/if}
		<Divider />
		<div class="flex items-center justify-between w-max gap-6">
			<button
				on:click={setAutoplay}
				class="px-5 py-2 font-semibold text-sm bg-pink-600 text-pink-200 rounded-lg"
				>Autoplay</button
			>
			<p class="text-pink-200">{JSON.parse($autoplay) ? 'On' : 'Off'}</p>
		</div>
		<pre class="mt-3 text-gray-400 text-sm">this does not work as of now</pre>
	</div>
</section>
