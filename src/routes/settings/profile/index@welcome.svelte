<script lang="ts">
	import Divider from '$lib/layouts/Divider.svelte'
	import Heading from '$lib/layouts/Heading.svelte'

	import { profileSetup } from '$lib/stores/profileSetup'

	let name = 'happy'

	$: defaultURl = `https://avatars.dicebear.com/api/adventurer/${
		name.toLocaleLowerCase().trim() || 'happy'
	}.svg?flip=true`

	let profileData = {
		username: '',
		userimageSrc: '',
		completed: false,
	}
	// $: console.log(profileData)
</script>

<section class="min-h-screen flex flex-col items-center justify-between p-6 md:p-60">
	<div class="space-y-6 text-center">
		<Heading title="Set up your profile" />
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
			<h3 class="text-xl capitalize h-max font-semibold tracking-wide text-primary">
				{name || 'happy'}
			</h3>
		</div>

		<div class="form-control w-full">
			<label for="username" class="label">
				<span class="label-text">What is your name?</span>
			</label>
			<input
				bind:value={name}
				id="username"
				type="text"
				placeholder="Your name"
				class="input input-bordered input-secondary w-full"
			/>
			<div class="label">
				<p class="label-text text-sm text-info">Don't your any sensitive information as name.</p>
			</div>
		</div>

		<div class="divider" />

		<a
			href="/"
			sveltekit:prefetch
			on:click={() => {
				;(profileData.username = name || 'happy'), (profileData.completed = true)
				profileData.userimageSrc = `https://avatars.dicebear.com/api/adventurer/${profileData.username}.svg?flip=true`

				profileSetup.set(JSON.stringify(profileData))
			}}
			class="btn btn-primary w-full"
		>
			Done
		</a>
		<p class="text-sm text-info">
			Your profile data will be stored in your browser and never leaves the phone.
		</p>
	</div>
</section>
