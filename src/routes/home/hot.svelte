<script>
	import { temp } from '$lib/stores/temp'

	if ($temp) {
		console.log($temp)
	} else console.log('No temp data stored')
	//TODO: separate tabs to individual routes and use cache data to load and avoid fetch
</script>
