import { writable } from "svelte/store";
import type { Op } from "quill/core";

function generateUUID() {
    return crypto.randomUUID();
}
function newTabFromString(str: string) {
    let data: TabData;
    try {
        data = <TabData>JSON.parse(str);
    } catch (err) {
        throw err
    }

    if (!data || !data.id || !data.title || !data.ops) {
        throw new Error("Invalid tab data!");
    }
    newTab({ data })
}
function newTab(options?: { data?: TabData, index?: number, callback?: () => void }) {

    const { data = { id: generateUUID(), title: "Untitled", ops: [] }, index = -1, callback = () => { } } = options || {};

    tabsStore.update(curr => {
        if (curr.tabs.some((tab) => tab.id == data.id)) return curr;

        if (index < 0) {
            curr.tabs.push(data);
            curr.activeIndex = curr.tabs.length - 1;
        }
        else {
            curr.tabs.splice(index, 0, data);
            curr.activeIndex = index;
        }
        return curr;
    })
    callback();
}
function removeTab(index: number) {

    tabsStore.update(curr => {
        if (index < 0 || index >= curr.tabs.length) return curr;

        if (curr.placeholderIndex == index) curr.placeholderIndex = -1;
        curr.tabs.splice(index, 1);
        if (index == curr.activeIndex - 1) curr.activeIndex = Math.max(0, index);
        else curr.activeIndex = Math.min(curr.activeIndex, curr.tabs.length - 1);
        return curr;
    })
}
function setActiveIndex(index: number) {
    tabsStore.update(curr => {
        if (index < 0) curr.activeIndex = 0;
        else if (index > curr.tabs.length) curr.activeIndex = curr.tabs.length - 1;
        else curr.activeIndex = index;
        return curr;
    })
}
function setPlaceholderIndex(index?: number) {
    tabsStore.update(curr => {
        curr.placeholderIndex = (index === undefined || index < 0 || index >= curr.tabs.length) ? -1 : index;
        return curr;
    })
}
function moveTab(fromIndex: number, toIndex: number, callback = () => { }) {
    if (fromIndex == toIndex) return;
    tabsStore.update(curr => {
        if (fromIndex < 0 || fromIndex >= curr.tabs.length || toIndex < 0 || toIndex >= curr.tabs.length) return curr;
        const element = curr.tabs[fromIndex];
        curr.tabs.splice(fromIndex, 1);
        curr.tabs.splice(toIndex, 0, element);
        if (curr.activeIndex == fromIndex) curr.activeIndex = toIndex;
        if (curr.placeholderIndex == fromIndex) curr.placeholderIndex = toIndex;
        return curr;
    })
    callback();
}

export type TabData = {
    id: string;
    title: string;
    ops: Op[];
}

export const tabsStore = writable({
    tabs: [] as TabData[],
    activeIndex: 0,
    placeholderIndex: -1
});

export const tabsHandlers = {
    newTabFromString,
    newTab,
    removeTab,
    setActiveIndex,
    setPlaceholderIndex,
    moveTab
};