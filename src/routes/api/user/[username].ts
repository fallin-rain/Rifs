export async function get({ params }) {
	const res = await fetch(import.meta.env.VITE_USER + params.username + '/search?order=recent')
	const data = await res.json()

	if (!res.ok)
		return {
			status: res.status,
			error: new Error(res.statusText),
		}

	return {
		body: data,
	}
}
