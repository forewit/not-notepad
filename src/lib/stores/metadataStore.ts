import { writable } from "svelte/store";

export const metadataStore = writable({
    order: [] as string[],
    activeIndex: 0,
    placeholderIndex: -1,
    tool: undefined as "pen" | "highlighter" | "eraser" | "text" | undefined,
    toolbarVisible: false,
    trashcanVisible: false,
});
