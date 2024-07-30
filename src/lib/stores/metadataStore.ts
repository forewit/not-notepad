import { writable } from "svelte/store";

export const metadataStore = writable({
    order: [] as string[],
    activeIndex: 0,
    placeholderIndex: -1,
    activeTool: undefined as "pencil" | "highlighter" | undefined,
    toolbarVisible: false,
    trashcanVisible: false,
});
