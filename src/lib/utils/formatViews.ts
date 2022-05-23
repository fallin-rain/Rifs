export function formatViews(number: number) {
	return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(number)
}
