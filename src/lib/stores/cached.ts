import { browser } from '$app/env'
import { writable } from 'svelte/store'

export let cached = writable((browser && sessionStorage.getItem('cached')) || 'not fetched')

cached.subscribe(cachedData => browser && sessionStorage.setItem('cached', cachedData))
