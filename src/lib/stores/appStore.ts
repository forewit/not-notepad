import { writable } from "svelte/store";


interface AppData {
    authRedirect: string
}

export const appStore = writable<AppData>({
    authRedirect: "/"
})