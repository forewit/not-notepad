import { writable } from "svelte/store";
import type { ThemeNames } from "$lib/modules/themes";


export type Settings = {
    spellCheck: boolean
    theme: ThemeNames
}

export const authRedirect = writable<string>("/");

export const settingsStore = writable<Settings>({
    spellCheck: true,
    theme: "Canvas",
})

