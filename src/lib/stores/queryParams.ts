import { writable } from 'svelte/store'

export let count = writable(20)
export let order = writable('')
export let search_text = writable('')
