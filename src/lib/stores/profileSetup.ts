import { writable } from 'svelte/store'
import { browser } from '$app/env'

export let profileSetup = writable((browser && localStorage.getItem('profileSetup')) || 'notSetup')

profileSetup.subscribe(isSetup => browser && localStorage.setItem('profileSetup', isSetup))
