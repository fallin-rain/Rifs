<script lang="ts">
	import Toast from '$lib/layouts/Toast.svelte'

	export let date = ''
	export let id = ''
	export let profileName = ''
	export let username = ''
	export let gifs = ''
	export let views = ''
	export let verified = false
	export let hasAudio = false
	export let hasTags = false
	export let tags: string[] = []

	// video attributes
	// export let width: string = ''
	// export let height: string = ''
	export let poster = ''
	export let src = ''
	export let autoplay = false

	const shareData = {
		title: 'Rifs',
		text: 'Found this awesome creator on Rifs',
		url: '/user/' + username,
	}

	export let shared = true
</script>

<a
	href={'/creators/' + id}
	data-card
	sveltekit:prefetch
	class="rounded-xl block bg-slate-800 max-w-sm mx-auto break-inside-avoid"
>
	<div class="flex flex-col p-4">
		<div class="flex w-full items-end justify-between">
			<div class="flex flex-col">
				<a
					href={'/user/' + username}
					sveltekit:prefetch
					class="mb-1 flex items-center text-base font-semibold tracking-wide text-pink-400"
				>
					{profileName}
					<!-- Only appears if creator is verified -->
					{#if verified}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								id="verified"
								fill-rule="evenodd"
								d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
							/>
						</svg>
					{/if}
				</a>
				<div
					class="flex flex-row-reverse justify-end items-center gap-3 text-xs font-semibold text-slate-400"
				>
					{#if hasAudio}
						<div class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					{/if}
					{#if gifs}
						<div class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
									clip-rule="evenodd"
								/>
							</svg>
							&nbsp;
							<span>{gifs}</span>
						</div>
					{/if}
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
							<path
								fill-rule="evenodd"
								d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
								clip-rule="evenodd"
							/>
						</svg>
						&nbsp;
						<span>{views}</span>
					</div>
				</div>
			</div>
			<time class="text-xs text-slate-400">{date}</time>
		</div>
		<!-- tags -->
		{#if hasTags}
			<div class="mt-3 flex flex-wrap items-center gap-2">
				{#each tags as tag}
					<a
						sveltekit:prefetch
						href={'/tags/related/' + tag}
						class="px-2.5 py-1.5 rounded-full border border-pink-500 text-pink-300 text-xs leading-none tracking-wide"
						>{tag}</a
					>
				{/each}
			</div>
		{/if}
	</div>
	<!-- gif -->
	<div class="w-full h-full overflow-hidden bg-slate-600 relative">
		<div class="absolute inset-0 bg-black bg-opacity-30" />
		<video
			class="block w-full h-full"
			muted
			controls
			loop
			{autoplay}
			data-poster={poster}
			data-src={src}
		/>
	</div>
	<!-- CTAs -->
	<div class="flex justify-end items-center gap-4 p-4">
		<div class="flex flex-row-reverse gap-4">
			<a
				href={src}
				download={username + '.mp4'}
				class="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-pink-600 to-red-800 p-0.5 text-sm font-medium"
			>
				<span
					class="relative rounded-full bg-gradient-to-br from-pink-600 to-red-800 px-5 py-2 text-pink-200"
				>
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
				</span>
			</a>
			<button
				class="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-pink-600 to-red-800 p-0.5 text-sm font-medium"
			>
				<span class="relative rounded-full bg-slate-800 px-5 py-2 text-pink-200">
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
				</span>
			</button>
			<button
				class="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-pink-600 to-red-800 p-0.5 text-sm font-medium"
				on:click={async () => {
					try {
						await navigator.share(shareData)
						shared = true
						console.log('shared')
					} catch (error) {
						shared = false
						console.error(error)
					}
				}}
			>
				<span class="relative rounded-full bg-slate-800 px-5 py-2 text-pink-200">
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
				</span>
			</button>
		</div>
	</div>
</a>
