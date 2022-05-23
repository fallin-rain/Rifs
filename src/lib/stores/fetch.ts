import { writable } from 'svelte/store'
import { browser } from '$app/env'

export const data = writable(browser && localStorage.getItem('dataOfHomepage'))

data.subscribe(fetchedData => browser && localStorage.setItem('dataOfHomepage', fetchedData))
