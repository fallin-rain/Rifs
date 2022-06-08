import { browser } from '$app/env'
import { writable } from 'svelte/store'

export let temp = writable({})
export let cached = browser && localStorage.setItem('temp', JSON.stringify(temp))

// TODO lets see what can i do with these
