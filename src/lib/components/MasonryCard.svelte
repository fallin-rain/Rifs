<script lang="ts">
	export let autoplay: boolean
	export let poster: string
	export let src: string
	export let username: string
	export let profileName: string
	export let verified: boolean
	export let views: string
	export let id: string
</script>

<a
	href={'/creators/' + id}
	sveltekit:prefetch
	data-card
	class="mx-auto my-6 max-w-[200px] break-inside-avoid"
>
	<div class="max-h-[450px] md:max-h-full w-full bg-slate-400 overflow-hidden rounded-xl">
		<video class="block w-full h-full" muted loop {autoplay} data-poster={poster} data-src={src} />
	</div>
	<div class="mt-2 flex items-end justify-between gap-x-3 text-sm font-semibold">
		<div>
			<a
				href={'/user/' + username}
				sveltekit:prefetch
				class="mt-2 max-w-[8px] truncate tracking-wide text-pink-400"
			>
				{profileName}
			</a>
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
		<p class="leading-none text-slate-400">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="inline-block h-4 w-4"
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
			{views}
		</p>
	</div>
</a>
