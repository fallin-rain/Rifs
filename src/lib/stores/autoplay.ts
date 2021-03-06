import { writable } from 'svelte/store'
import { browser } from '$app/env'

export let autoplay = writable((browser && localStorage.getItem('autoplay')) || false)

autoplay.subscribe(val => browser && localStorage.setItem('autoplay', val))
