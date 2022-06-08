import { browser } from '$app/env'
import { writable } from 'svelte/store'

export let temp = writable((browser && localStorage.getItem('temp')) || [])

// TODO lets see what can i do with these
