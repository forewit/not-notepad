import { writable } from "svelte/store";
import type { ThemeNames, Theme } from "$lib/modules/themes";


interface Settings {
    authRedirect: string,
    theme: ThemeNames,
    spellCheck: boolean
    customTheme: Theme
}

export const settingsStore = writable<Settings>({
    authRedirect: "/",
    theme: "Custom",
    spellCheck: true,
    customTheme: {
        name: "Custom",
        bg: "#ffffff",
        bgAlt: "#eeeeee",
        main: "#a1a1a1",
        caret: "#5599aa",
        error: "#551111",
        sub: "#cccccc",
        text: "#222222",
    }
})

