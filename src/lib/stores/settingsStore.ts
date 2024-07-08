import { writable } from "svelte/store";
import type { ThemeNames } from "$lib/modules/themes";


interface Settings {
    authRedirect: string,
    theme: ThemeNames,
    spellCheck: boolean
}

export const settingsStore = writable<Settings>({
    authRedirect: "/",
    theme: "Rose Pine Dawn",
    spellCheck: true,
})

