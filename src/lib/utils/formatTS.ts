export function formatTS(timestamp: number) {
	const date = new Date(timestamp * 1000)
	return new Intl.DateTimeFormat('en-us', { dateStyle: 'medium' }).format(date)
}
