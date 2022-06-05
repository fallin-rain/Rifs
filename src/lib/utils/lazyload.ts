export function lazyload(selector: string, params) {
	if (typeof IntersectionObserver === 'undefined') return

	params.autoplay = params.autoplay || false
	params.margin = params.margin || '0px'
	params.threshold = params.threshold || 0

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				const video = entry.target

				if (entry.isIntersecting) {
					video.src = video.dataset.src
					video.poster = video.dataset.poster

					if (params.autoplay) video.play()

					observer.unobserve(video)
				}
			})
		},
		{
			rootMargin: params.margin,
			threshold: params.threshold,
		}
	)

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
	document.querySelectorAll(selector).forEach(card => {
		observer.observe(card)
		newObserver.observe(card)
	})
}
