import { writable } from 'svelte/store'

export let count = writable(40)
export let order = writable('recent')
export let search_text = writable('')
