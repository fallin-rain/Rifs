import { writable } from 'svelte/store'
import { browser } from '$app/env'

export let cached = writable([])
export let timeout = writable(false)

cached.subscribe(data => browser && localStorage.setItem('cached', JSON.stringify(data)))
timeout.subscribe(time => browser && localStorage.setItem('timeout', JSON.stringify(time)))
