export function lazyload(selector, params) {
	if (typeof IntersectionObserver === 'undefined') return

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				const video = entry.target

				if (entry.isIntersecting) {
					video.src = video.dataset.src
					video.poster = video.dataset.poster

					video.removeAttribute('data-src')
					video.removeAttribute('data-poster')

					observer.unobserve(video)
				}
			})
		},
		{
			rootMargin: params.margin,
			threshold: params.threshold,
		}
	)

	document.querySelectorAll(selector).forEach(card => observer.observe(card))

	const newObserver = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				const video = entry.target

				if (entry.isIntersecting) return
				video.pause()
			})
		},
		{
			rootMargin: params.margin,
			threshold: params.threshold,
		}
	)
	document.querySelectorAll(selector).forEach(card => newObserver.observe(card))
}
