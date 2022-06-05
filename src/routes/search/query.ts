export async function get({ url }) {
	const query = url.searchParams.get('query')
	const res = await fetch(import.meta.env.VITE_API_V1 + '/tags/suggest?query=' + query)
	const data = await res.json()

	const search_text = url.searchParams.get('search_text')
	let count = url.searchParams.get('count') || '10'

	const searchData = await fetch(
		import.meta.env.VITE_API_V2 +
			'/gifs/search?search_text=' +
			search_text +
			'&order=recent' +
			'&count=' +
			count
	)
	const searchResults = await searchData.json()

	return {
		status: res.status,
		body: {
			data,
			searchResults,
		},
	}
}
