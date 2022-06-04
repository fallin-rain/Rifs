<script>
	import { page } from '$app/stores'
</script>

<header
	class="fixed top-0 z-50 flex w-full items-center justify-between border-b border-slate-800 bg-slate-900 px-6 md:px-20 py-3"
>
	<a
		href="/"
		sveltekit:prefetch
		class="bg-gradient-to-br from-pink-500 to-red-600 bg-clip-text font-serif text-xl font-extrabold italic tracking-wide text-transparent"
		>Rifs</a
	>
	<div class="flex items-center space-x-2 text-base">
		<a
			href="/tags"
			class="rounded-lg p-2 flex items-center hover:bg-slate-800 active:bg-slate-800"
			class:selected={$page.url.pathname === '/tags'}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 text-pink-200"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
				/>
			</svg>
			<p class="font-medium ml-1 hidden md:block">Tags</p>
		</a>
		<a
			href="/creators"
			sveltekit:prefetch
			class="rounded-lg p-2 flex items-center hover:bg-slate-800 active:bg-slate-800"
			class:selected={$page.url.pathname === '/creators'}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 text-pink-200"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
			<p class="font-medium ml-1 hidden md:block">Images</p>
		</a>
		<a
			href="#"
			sveltekit:prefetch
			class="rounded-lg p-2 flex items-center hover:bg-slate-800 active:bg-slate-800"
			class:selected={$page.url.pathname === '/verified'}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 text-pink-200"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<p class="font-medium ml-1 hidden md:block">Verified</p>
		</a>
		<a
			href="/settings"
			sveltekit:prefetch
			class="rounded-lg flex items-center justify-center bg-slate-800 p-2 hover:bg-slate-800 active:bg-slate-800"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 text-pink-200"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
				/>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
			<p class="font-medium ml-1 hidden md:block">Settings</p>
		</a>
	</div>
</header>

<style>
	.selected {
		background-color: rgb(30, 41, 59);
	}
</style>
