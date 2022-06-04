export async function get() {
	const res = await fetch(
		import.meta.env.VITE_API_V2 + '/gifs/search' + '?order=recent&type=g&ratio=v&long=y&count=80'
	)
	const data = await res.json()

	if (!res.ok)
		return {
			status: res.status,
			error: res.statusText,
		}

	return {
		status: res.status,
		body: {
			stories: data.gifs,
		},
	}
}
