// export function lazyload(selector, threshold = 0.2, rootMargin = '0px') {
// 	if (typeof IntersectionObserver === 'undefined') return

// 	const observer = new IntersectionObserver(
// 		entries => {
// 			entries.forEach(entry => {
// 				const video = entry.target

// 				if (!entry.isIntersecting) return video.pause()

// 				video.src = video.dataset.source
// 				video.poster = video.dataset.poster
// 			})
// 		},
// 		{
// 			rootMargin,
// 			threshold,
// 		}
// 	)
// 	document.querySelectorAll(selector).forEach(card => observer.observe(card))
// }

export function lazyload(selector, params) {
	if (typeof IntersectionObserver === 'undefined') return

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				const video = entry.target

				if (!entry.isIntersecting) video.pause()

				video.src = video.dataset.source
				video.poster = video.dataset.poster
			})
		},
		{
			rootMargin: params.margin,
			threshold: params.threshold,
		}
	)
	document.querySelectorAll(selector).forEach(card => observer.observe(card))
}
