export async function get({ params }) {
	let count = 20
	const res = await fetch(import.meta.env.VITE_TAG + params.tag + '&count=' + count)
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
