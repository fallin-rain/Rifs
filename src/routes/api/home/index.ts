export async function get() {
	const res = await fetch('https://api.redgifs.com/v2/home/feeds')
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
