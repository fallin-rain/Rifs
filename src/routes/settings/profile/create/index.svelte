<script lang="ts">
	import { profileSetup } from '$lib/stores/profileSetup'

	let gender = 'female'

	let acc = 'sunglasses'
	let haircolor = 'gray'
	let seed = 'happy'
	let skincolor = 'variant02'
	let mouth = 'variant25'
	let hair = 'long12'
	let eye = 'variant21'

	const hairstyles = new Array(9).fill().map((_, i) => (i = i + 1))

	$: url = `https://avatars.dicebear.com/api/adventurer/${
		seed || 'happy'
	}.svg?flip=true&mouth=variant25&eyebrows=variant09&accessoires=${acc}&hair=${hair}&hairColor=${haircolor}&skinColor=${skincolor}&eyes=${eye}`

	$: console.log(url)

	// https://play.tailwindcss.com/JrV9jwAJVU

	let styles = {
		accessoires: ['sunglasses', 'glasses', 'mustache', 'blush', 'birthmark'],
		hairColors: ['red', 'blonde', 'brown', 'black', 'gray', 'green', 'blue', 'pink', 'purple'],
		eyes: ['variant01', 'variant04', 'variant06', 'variant21'],
	}
</script>

<section>
	<div class="space-y-6 text-center">
		<h1
			class="bg-gradient-to-br from-pink-500 to-red-600 bg-clip-text text-center font-serif text-2xl font-extrabold italic tracking-wide text-transparent"
		>
			Set up your profile
		</h1>
		<div>
			<div
				class="bg-slate-200 shadow-md shadow-slate-800 w-36 h-36 overflow-hidden rounded-2xl mx-auto mb-2"
			>
				<img
					src={url}
					alt="create your profile like this"
					class="block w-full h-full object-cover object-top"
				/>
			</div>
			<h3 class="text-xl capitalize h-max font-semibold tracking-wide text-pink-300">
				{seed || 'happy'}
			</h3>
		</div>

		<label for="username" class="text-left mb-3 inline-block">
			<p class="mb-2 text-pink-400">Your name</p>
			<input
				id="username"
				class="w-full bg-slate-800 rounded-lg px-6 py-2 focus:ring-2 focus:ring-pink-600 outline-none"
				placeholder="Name"
				type="text"
				bind:value={seed}
			/>
			<span class="mt-2 text-xs text-slate-400 inline-block"
				>Name could be anything. Don't use sensitive data as name.</span
			>
		</label>

		<div class="text-left space-y-6">
			<!-- Accessoires -->
			<div>
				<p class="mb-3 text-pink-400">Accessoires</p>
				<div class="flex flex-wrap items-center gap-x-3 gap-y-4 capitalize">
					<button
						data-active
						class="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-pink-600 to-red-800 p-0.5 text-xs font-medium"
					>
						<span
							class="rounded-full bg-gradient-to-br from-pink-600 to-red-800 px-4 py-2 text-pink-200"
							>Sunglass</span
						>
					</button>
					{#each styles.accessoires as accessory}
						<button
							data-inactive
							on:click={e => {
								acc = e.target?.textContent
							}}
							class="inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-pink-600 to-red-800 p-0.5 text-xs font-medium"
						>
							<span class="capitalize relative rounded-full bg-slate-900 px-4 py-2 text-pink-200">
								{accessory}
							</span>
						</button>
					{/each}
				</div>
			</div>
			<!-- Skin Color -->
			<div>
				<p class="mb-3 text-pink-400">Skin color</p>
				<div class="flex flex-wrap items-center gap-x-3 gap-y-4">
					<button
						on:click={() => (skincolor = 'variant01')}
						class="w-8 h-8 rounded-full bg-[#f5f0dd]"
					/>
					<button on:click={() => (skincolor = 'variant02')} class="w-8 h-8 rounded bg-[#e7deb9]" />
					<button on:click={() => (skincolor = 'variant03')} class="w-8 h-8 rounded bg-[#c4b987]" />
					<button on:click={() => (skincolor = 'variant04')} class="w-8 h-8 rounded bg-[#7f6518]" />
					<button on:click={() => (skincolor = 'variant05')} class="w-8 h-8 rounded bg-[#443610]" />
				</div>
			</div>
			<!-- Hairstyle -->
			<div>
				<p class="mb-3 text-pink-400">Hairtyle</p>

				<!-- Gender -->
				<div class="mb-4">
					<button
						on:click={() => (gender = 'male')}
						class="text-sm font-semibold bg-slate-800 px-3 py-1 rounded-lg">Male</button
					>
					&nbsp;
					<button
						on:click={() => (gender = 'female')}
						class="text-sm font-semibold bg-slate-800 px-3 py-1 rounded-lg">Female</button
					>
				</div>

				<div class="flex flex-wrap items-center gap-x-3 gap-y-4 capitalize">
					{#each hairstyles as hairstyle}
						<button
							data-inactive
							on:click={() => {
								hair = gender == 'male' ? 'short0' + hairstyle : 'long0' + hairstyle
							}}
							class="inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-pink-600 to-red-800 p-0.5 text-xs font-medium"
						>
							<span class="capitalize rounded-full bg-slate-900 px-4 py-2 text-pink-200">
								{gender == 'male' ? 'short 0' + hairstyle : 'long 0' + hairstyle}
							</span>
						</button>
					{/each}
				</div>
			</div>
			<!-- Hair -->
			<div class="after:border-slate-800 after:border after:rounded after:block after:mt-6">
				<p class="mb-3 text-pink-400">Hair color</p>
				<div class="flex flex-wrap items-center gap-x-3 gap-y-4 capitalize">
					<button
						data-active
						class="capitalize inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-pink-600 to-red-800 p-0.5 text-xs font-medium"
					>
						<span
							class="rounded-full bg-gradient-to-br from-pink-600 to-red-800 px-4 py-2 text-pink-200"
							>Blonde</span
						>
					</button>
					{#each styles.hairColors as hairColor}
						<button
							data-inactive
							on:click={e => {
								if (e.target?.textContent == 'red') haircolor = 'red03'
								else if (e.target?.textContent == 'blonde') haircolor = 'blonde03'
								else if (e.target?.textContent == 'brown') haircolor = 'brown02'
								else haircolor = e.target?.textContent
							}}
							class="inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-pink-600 to-red-800 p-0.5 text-xs font-medium"
						>
							<span class="capitalize rounded-full bg-slate-900 px-4 py-2 text-pink-200">
								{hairColor}
							</span>
						</button>
					{/each}
				</div>
			</div>
		</div>

		<a
			href="/"
			on:click={() => profileSetup.set('completed')}
			class="inline-block text-center tracking-wide rounded-xl bg-gradient-to-br from-pink-600 to-red-800 py-2 px-8 text-sm font-medium"
		>
			<span class="block w-full text-center tracking-normal leading-tight text-base font-bold"
				>Done!</span
			>
			Let me browse now
		</a>
		<p class="text-sm text-slate-400 after:border-slate-800">
			Your profile data will be stored in your browser and never leaves the phone.
		</p>
	</div>
</section>
