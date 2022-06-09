<script lang="ts">
	import Divider from '$lib/layouts/Divider.svelte'
	import Heading from '$lib/layouts/Heading.svelte'
	import { first_time_visit } from '$lib/stores/persistWelcome'

	import { profileSetup } from '$lib/stores/profileSetup'

	let name = 'happy'
	let newname: string

	$: defaultURl = `https://avatars.dicebear.com/api/adventurer/${name
		.toLocaleLowerCase()
		.trim()}.svg?flip=true`

	$: newdefaultURl = `https://avatars.dicebear.com/api/adventurer/${
		newname?.toLocaleLowerCase().trim() || 'happy'
	}.svg?flip=true`

	let profileData = {
		username: '',
		userimageSrc: '',
		completed: false,
	}
</script>

<section class="min-h-screen flex flex-col items-center justify-between p-6 md:p-60">
	<div class="space-y-6 text-center">
		{#if $first_time_visit === 'visited'}
			<Heading title="Set up your profile" />
			<div>
				<div class="avatar">
					<div class="w-36 mask mask-squirc bg-slate-200">
						<img src={defaultURl} alt="create your profile like this" />
					</div>
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
					placeholder="Weeb names are not allowed"
					class="input input-bordered input-secondary w-full"
				/>
				<div class="label">
					<p class="label-text text-sm text-info">Don't set any sensitive information as name.</p>
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
				class="btn btn-primary btn-block"
			>
				Done
			</a>
			<p class="text-sm text-info">
				Your profile data will be stored in your browser and never leaves the phone.
			</p>
		{:else if $first_time_visit === 'update'}
			<!-- UPDATE PROFILE -->
			<Heading title="Update your profile" />
			<div>
				<div class="avatar">
					<div class="w-36 mask mask-squircle bg-slate-200">
						<img
							src={newname ? newdefaultURl : JSON.parse($profileSetup).userimageSrc}
							alt="create your profile like this"
						/>
					</div>
				</div>
				<h3 class="text-xl capitalize h-max font-semibold tracking-wide text-primary">
					{newname || JSON.parse($profileSetup).username}
				</h3>
			</div>

			<div class="form-control w-full">
				<label for="username" class="label">
					<span class="label-text">Set a new name</span>
				</label>
				<input
					bind:value={newname}
					id="username"
					type="text"
					placeholder="Think something nerdy"
					class="input input-bordered input-secondary w-full"
				/>
				<div class="label">
					<p class="label-text text-sm text-info">Don't set any sensitive information as name.</p>
				</div>
			</div>

			<div class="divider" />

			<div>
				<a
					href="/settings"
					sveltekit:prefetch
					on:click={() => {
						;(profileData.username = newname || 'happy'), (profileData.completed = true)
						profileData.userimageSrc = `https://avatars.dicebear.com/api/adventurer/${profileData.username}.svg?flip=true`

						profileSetup.set(JSON.stringify(profileData))
					}}
					class="btn btn-primary btn-block"
				>
					Done
				</a>
				<a href="/settings" sveltekit:prefetch class="mt-2 btn btn-ghost btn-primary btn-block"
					>Discard</a
				>
			</div>
		{/if}
	</div>
</section>
