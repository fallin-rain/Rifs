export async function get({ params, url }: { params: any; url: any }) {
	// url.searchParams.set('search_text=', params.tag)
	// url.searchParams.set('order=', 'recent')
	// url.searchParams.set('count=', '10')

	const res = await fetch(
		import.meta.env.VITE_API_V2 +
			'/gifs/search?search_text=' +
			params.tag +
			'&count=20' +
			'&order=recent'
	)
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
