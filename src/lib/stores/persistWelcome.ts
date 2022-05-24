import { writable } from 'svelte/store'
import { browser } from '$app/env'

export let first_time_visit = writable(
	(browser && localStorage.getItem('first_time_visit')) || 'yes'
)

first_time_visit.subscribe(
	isFirstTime => browser && localStorage.setItem('first_time_visit', isFirstTime)
)
