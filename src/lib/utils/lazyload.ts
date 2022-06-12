export function lazyload(
	node: HTMLMediaElement | HTMLImageElement,
	options: { threshold: number; autoplay?: boolean; margin?: string }
) {
	options.autoplay = options.autoplay || false
	options.margin = options.margin || '0px'
	options.threshold = options.threshold || 0

	const observer = new IntersectionObserver(
		entries => {
			if (entries[0].isIntersecting) {
				if (node.dataset.lazy === 'image') node.src = node.dataset.src

				if (node.src != node.dataset.src) node.src = node.dataset.src
				if (node.poster != node.dataset.poster) node.poster = node.dataset.poster

				if (options.autoplay) node.play()
			}
			node.pause()
		},
		{
			rootMargin: options.margin,
			threshold: options.threshold,
		}
	)
	observer.observe(node)
}
