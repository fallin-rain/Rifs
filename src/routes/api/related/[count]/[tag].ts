export async function get({ params, url }) {
	url.searchParams.set('search_text', params.tag)
	url.searchParams.set('count', params.count)
	url.searchParams.set('order', 'recent')

	const res = await fetch(import.meta.env.VITE_API_V2 + '/gifs/search' + url.search)
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
