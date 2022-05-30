import { writable, get } from 'svelte/store'

export let count = writable(10)
export let order = writable('recent')
export let search_text = writable('')
