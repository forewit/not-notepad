import { writable, get } from "svelte/store";
import type { Op } from "quill/core";
import type { StackItem } from "quill/modules/history";


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
function newTabFromString(id: string, str: string) {
    let data: TabData;
    //let unpackedStr = str.replaceAll();

    try {
        data = <TabData>JSON.parse(str);
    } catch (err) {
        throw err
    }

    if (!data || !data.title || !data.ops || !data.history) {
        throw new Error("Invalid tab data!");
    }
    newTab({ id, data })
}

function packTabs() {
    let packedTabs: Record<string, string> = {};
    Object.entries(get(tabsStore)).forEach(([id, tab]) => {
        const str = JSON.stringify(tab);
        packedTabs[id] = replaceSubstrings(str, replacementMap);;
    });
    return packedTabs;
}
function loadPackedTabs(tabs: Record<string, string>) {
    Object.entries(tabs).forEach(([id, str]) => {
        const replaced = replaceSubstrings(str, invertedReplacementMap);
        newTabFromString(id, replaced);
    });
}
function newTab(options?: { id?: string, data?: TabData, index?: number, callback?: () => void }) {
    const { id = generateUUID(), data = { title: "Untitled", ops: [], history: { undo: [], redo: [] } }, index = -1, callback = () => { } } = options || {};
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
    if (!get(tabsStore)[id]) return;

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

export type TabData = {
    title: string;
    ops: Op[];
    history: HistoryStack;
}

export const tabsStore = writable({} as Record<string, TabData>);

export const metadataStore = writable({
    order: [] as string[],
    activeIndex: 0,
    placeholderIndex: -1
});
