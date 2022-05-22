<script context="module" lang="ts">
	export async function load({ fetch, params }) {
		const res = await fetch('/api/user/' + params.username)
		const data = await res.json()

		return {
			status: res.status,
			props: {
				user: data.users[0],
				tags: data.tags,
				gifs: data.gifs,
			},
		}
	}
</script>

<script lang="ts">
	export let user: string
	export let tags: string[]
	export let gifs: string[]

	function formatTS(timestamp: number | string) {
		const date = new Date(timestamp * 1000)
		return new Intl.DateTimeFormat('en-us', { dateStyle: 'medium' }).format(date)
	}
</script>

<section id="trending">
	<div class="max-w-sm mx-auto flex flex-col gap-4 items-center text-pink-200">
		<div class="w-36 h-36 overflow-hidden rounded-2xl">
			<img
				class="block bg-slate-600 w-full h-full object-cover object-top"
				src={user.profileImageUrl}
				alt={user.profileImageUrl ? 'Profile image of ' + user.name : 'No profile image'}
			/>
		</div>
		<div class="text-center">
			<h3 class="font-semibold tracking-wide text-pink-400">{user.name}</h3>
			<p class="font-sm">@{user.username}</p>
		</div>
		<div class="min-w-full flex items-center justify-between">
			<!-- followers -->
			<div class="text-center">
				<p class="">{user.followers}</p>
				<p class="text-sm text-slate-600">Followers</p>
			</div>
			<!-- gifs -->
			<div class="text-center">
				<p class="">{user.gifs}</p>
				<p class="text-sm text-slate-600">Gifs</p>
			</div>
			<!-- creation time -->
			<div class="text-center">
				<p class="">{formatTS(user.creationtime)}</p>
				<p class="text-sm text-slate-600">Created on</p>
			</div>
		</div>
		<p class="min-w-full">{user.description ? user.description : 'No description'}</p>
		<!-- social links -->
		<div class="min-w-full flex items-center flex-wrap gap-x-4 gap-y-1">
			<a
				class="{user.socialUrl2
					? ''
					: 'hidden'} bg-gradient-to-br from-pink-400 to-red-600 bg-clip-text font-semibold text-transparent"
				href={user.socialUrl2}
				target="_blank">Twitter</a
			>
			<a
				class="{user.socialUrl3
					? ''
					: 'hidden'} bg-gradient-to-br from-pink-400 to-red-600 bg-clip-text font-semibold text-transparent"
				href={user.socialUrl3}
				target="_blank">Instagram</a
			>
			<a
				class="{user.socialUrl4
					? ''
					: 'hidden'} bg-gradient-to-br from-pink-400 to-red-600 bg-clip-text font-semibold text-transparent"
				href={user.socialUrl4}
				target="_blank">MayVids</a
			>
			<a
				class="{user.socialUrl5
					? ''
					: 'hidden'} bg-gradient-to-br from-pink-400 to-red-600 bg-clip-text font-semibold text-transparent"
				href={user.socialUrl5}
				target="_blank">Reddit</a
			>
			<a
				class="{user.socialUrl6
					? ''
					: 'hidden'} bg-gradient-to-br from-pink-400 to-red-600 bg-clip-text font-semibold text-transparent"
				href={user.socialUrl6}>OnlyFans</a
			>
		</div>
	</div>
</section>
