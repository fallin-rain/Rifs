//@ts-nocheck
export function lazyload(selector: string, params) {
	if (typeof IntersectionObserver === 'undefined') return

	params.autoplay = params.autoplay || false
	params.margin = params.margin || '0px'
	params.threshold = params.threshold || 0

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				const target = entry.target

				if (!entry.isIntersecting) return
				if (target.dataset.lazy === 'image') target.src = target.dataset.src

				target.src = target.dataset.src
				target.poster = target.dataset.poster

				if (params.autoplay) target.play()

				observer.unobserve(target)
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
				const target = entry.target

				if (entry.isIntersecting) return
				if (target.dataset.lazy === 'video') target.pause()
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
