import { writable, get } from "svelte/store";
import type { Op } from "quill/core";
import type { StackItem } from "quill/modules/history";
import { metadataStore } from "$lib/stores/metadataStore";

const replacementMap = {
    '{"retain":': "⒜",
    '},{"delete":': "⒝",
    '}]},"range":{"index":': "⒞",
    ',"length":': "⒟",
    '}]},"range":null': "⒠",
    '},{"delta":{"ops":[': "⒡",
    '"insert":': "⒢",
    '"attributes":{': "⒣",
    '"code":true': "⒤",
    '"code":false': "⒥",
    '"bold":true': "⒦",
    '"bold":false': "⒧",
    '"italic":true': "⒨",
    '"italic":false': "⒩",
    '"underline":true': "⒪",
    '"underline":false': "⒫",
    '"strike":true': "⒬",
    '"strike":false': "⒭",
    '{"undo":[{"delta":{"ops":[': "⒮",
    '{"delete":': "⒯",
    '],"redo":[]}': "⒰",
    '{"undo":[': "⒱",
    '],"redo":[': "⒲",
    '},{"x":': "⒳",
    ',"y":': "⒴",
}
const invertedReplacementMap = Object.fromEntries(Object.entries(replacementMap).map(([key, value]) => [value, key]));


function replaceSubstrings(str: string, replacements: Record<string, string>) {
    for (const [key, value] of Object.entries(replacements)) {
        str = str.split(key).join(value);
    }
    return str;
}
function generateUUID() {
    return crypto.randomUUID();
}

function packTabs() {
    let packedTabs: PackedTabs = {};
    Object.entries(get(tabsStore)).forEach(([id, tab]) => {
        const ops = replaceSubstrings(JSON.stringify(tab.ops), replacementMap);
        const history = replaceSubstrings(JSON.stringify(tab.history), replacementMap);
        const paths = replaceSubstrings(JSON.stringify(tab.paths), replacementMap);
        packedTabs[id] = { title: tab.title, ops: ops, history: history, paths: paths };
    });
    return packedTabs;
}
function loadPackedTabs(packedTabs: PackedTabs) {
    Object.entries(packedTabs).forEach(([id, packedTab]) => {
        const unpackedOps = replaceSubstrings(packedTab.ops, invertedReplacementMap);
        const unpackedHistory = replaceSubstrings(packedTab.history, invertedReplacementMap);
        const unpackedPaths = replaceSubstrings(packedTab.paths, invertedReplacementMap);
        try {
            const parsedOps = JSON.parse(unpackedOps)
            const parsedHistory = JSON.parse(unpackedHistory)
            const parsedPaths = JSON.parse(unpackedPaths)

            const tabData: TabData = {
                title: packedTab.title,
                ops: parsedOps,
                history: parsedHistory,
                paths: parsedPaths
            };
            newTab({ id, data: tabData })
        } catch (err) {
            console.log("Failed to load tab", err)
        }
    });
}
function newTab(options?: { id?: string, data?: TabData, index?: number, callback?: () => void }) {
    const { id = generateUUID(), data = { title: "Untitled", ops: [], history: { undo: [], redo: [] }, paths: [] }, index = -1, callback = () => { } } = options || {};
    tabsStore.update(curr => {
        if (curr[id]) {
            curr[id] = data;
            return curr;
        }
        curr[id] = data;

        if (index < 0 || index > get(metadataStore).order.length) {
            metadataStore.update(curr => {
                curr.order.push(id);
                curr.activeIndex = curr.order.length - 1;
                return curr;
            })
        }
        else {
            metadataStore.update(curr => {
                curr.order.splice(index, 0, id);
                curr.activeIndex = index;
                return curr;
            })
        }
        return curr;
    })
    callback();
}
function removeTab(id: string) {
    tabsStore.update(curr => {
        delete curr[id];
        return curr;
    })

    metadataStore.update(curr => {
        const index = curr.order.indexOf(id);
        if (index < 0) return curr;

        if (curr.placeholderIndex == index) curr.placeholderIndex = -1;
        curr.order.splice(index, 1);

        if (index == curr.activeIndex - 1) curr.activeIndex = Math.max(0, index);
        else curr.activeIndex = Math.min(curr.activeIndex, curr.order.length - 1);

        return curr;
    })
}
function setActiveIndex(index: number) {
    metadataStore.update(curr => {
        if (index < 0) curr.activeIndex = 0;
        else if (index > curr.order.length) curr.activeIndex = curr.order.length - 1;
        else curr.activeIndex = index;
        return curr;
    })
}
function setPlaceholderIndex(index?: number) {
    metadataStore.update(curr => {
        curr.placeholderIndex = (index === undefined || index < 0 || index >= curr.order.length) ? -1 : index;
        return curr;
    })
}
function moveTab(fromIndex: number, toIndex: number, callback = () => { }) {
    if (fromIndex == toIndex) return;
    metadataStore.update(curr => {
        if (fromIndex < 0 || fromIndex >= curr.order.length || toIndex < 0 || toIndex >= curr.order.length) return curr;

        const id = curr.order[fromIndex];
        curr.order.splice(fromIndex, 1);
        curr.order.splice(toIndex, 0, id);
        if (curr.activeIndex == fromIndex) curr.activeIndex = toIndex;
        if (curr.placeholderIndex == fromIndex) curr.placeholderIndex = toIndex;
        return curr;
    })
    callback();
}

export const tabsHandlers = {
    loadPackedTabs,
    packTabs,
    newTab,
    removeTab,
    setActiveIndex,
    setPlaceholderIndex,
    moveTab
};

export type HistoryStack = {
    undo: StackItem[],
    redo: StackItem[]
}

export type Path = {
    points: { x: number; y: number }[];
    lineWidth: number;
    color: string;
}

export type TabData = {
    title: string;
    ops: Op[];
    history: HistoryStack;
    paths: Path[];
}

export type PackedTabs = Record<string, { title: string, ops: string, history: string, paths: string }>;


export const tabsStore = writable({} as Record<string, TabData>);

