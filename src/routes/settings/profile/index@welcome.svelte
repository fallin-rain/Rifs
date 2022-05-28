<script lang="ts">
	import Divider from '$lib/layouts/Divider.svelte'

	import { profileSetup } from '$lib/stores/profileSetup'

	let name = 'happy'
	let seed = name

	$: defaultURl = `https://avatars.dicebear.com/api/adventurer/${seed || 'happy'}.svg?flip=true`

	let profileData = {
		username: '',
		userimageSrc: '',
		completed: false,
	}
	// $: console.log(profileData)
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
					src={defaultURl}
					alt="create your profile like this"
					class="block w-full h-full object-cover object-top"
				/>
			</div>
			<h3 class="text-xl capitalize h-max font-semibold tracking-wide text-pink-300">
				{name || 'happy'}
			</h3>
		</div>

		<label for="username" class="text-left space-y-3 block">
			<p class="text-pink-400">Your name</p>
			<form
				method="post"
				on:submit|preventDefault={() => (seed = name.toLowerCase().replace(' ', '%20'))}
			>
				<input
					id="username"
					class="w-full bg-slate-800 rounded-lg px-6 py-3 focus:ring-2 focus:ring-pink-600 outline-none"
					placeholder="Name"
					type="text"
					bind:value={name}
				/>
			</form>
			<span class="text-xs text-slate-400 inline-block"
				>Name could be anything. Don't use sensitive data as name.</span
			>
		</label>

		<Divider />

		<a
			href="/"
			sveltekit:prefetch
			on:click={() => {
				;(profileData.username = name || 'happy'), (profileData.completed = true)
				profileData.userimageSrc = `https://avatars.dicebear.com/api/adventurer/${profileData.username}.svg?flip=true`

				profileSetup.set(JSON.stringify(profileData))
			}}
			class="block text-center tracking-wide rounded-xl bg-gradient-to-br from-pink-600 to-red-800 py-3 font-semibold"
		>
			Done
		</a>
		<p class="text-sm text-slate-400 before:border-slate-800">
			Your profile data will be stored in your browser and never leaves the phone.
		</p>
	</div>
</section>
