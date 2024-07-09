
type Theme = {
    name: ThemeNames,
    bg: string,
    bgAlt: string,
    main: string,
    caret: string,
    error: string,
    sub: string,
    text: string,
}

export type ThemeNames = "One Dark" | "Rose Pine Dawn"
export const themes: Theme[] = [
     {
        name: "One Dark",
        bg: "#2f343f",
        bgAlt: "#262b34",
        main: "#61afef",
        caret: "#61afef",
        error: "#e06c75",
        sub: "#eceff4",
        text: "#98c379",
    },
    {
        name: "Rose Pine Dawn",
        bg: "#fffaf3",
        bgAlt: "#f0e9df",
        main: "#56949f",
        caret: "#ea9d34",
        error: "#b4637a",
        sub: "#c4a7e7",
        text: "#286983",
    },
]