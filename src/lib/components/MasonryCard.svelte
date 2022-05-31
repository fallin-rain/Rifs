<script lang="ts">
	export let autoplay: boolean
	export let poster: string
	export let src: string
	export let username: string
	export let verified: boolean
	export let id: string
</script>

<a href={'/creators/' + id} sveltekit:prefetch data-card class="block break-inside-avoid">
	<div class="max-h-[450px] sm:max-h-full w-full bg-slate-400 relative overflow-hidden rounded-xl">
		<div
			class="absolute bottom-0 left-0 text-sm p-3 tracking-tight font-bold text-pink-200 bg-gradient-to-t from-black to-transparent w-full"
		>
			<div class="flex items-center justify-between">
				<a href={'/user/' + username} class="w-full overflow-hidden truncate">{username}</a>
				{#if verified}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="inline-block h-4 w-4 text-pink-400"
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
			</div>
		</div>
		<video class="block w-full h-full" muted loop {autoplay} {poster} {src} />
	</div>
</a>
