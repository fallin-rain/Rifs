export async function get({ params }) {
	const res = await fetch(import.meta.env.VITE_API_V2 + '/gifs/' + params.id + '/related')
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
