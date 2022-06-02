export async function get({ url }) {
	const res = await fetch(import.meta.env.VITE_API_V1 + '/suggests/' + url.search)
	const data = await res.json()

	console.log(data)

	return {
		status: 200,
		body: {
			data,
		},
	}
}
