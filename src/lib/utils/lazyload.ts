export function lazyload(selector: string) {
	const elms = document.querySelectorAll(selector)
	if (typeof IntersectionObserver === 'undefined') return

	let playable = null

	const lazyload = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const video = entry.target

			if (entry.isIntersecting) {
				video.setAttribute('poster', video.dataset.poster)
				video.setAttribute('src', video.dataset.src)
				playable = true
			} else {
				video.removeAttribute('poster')
				video.removeAttribute('src')
				video.pause()
				playable = false
			}
		})
	})
	elms.forEach(elm => lazyload.observe(elm))
}
