import { writable } from "svelte/store";

interface Tab {
    title: string;
    text: string;
}

export const tabsStore = writable({
    tabs: [] as Tab[],
    activeIndex: 0,
    placeholderIndex: -1
});

export const tabsHandlers = {
    newTab: (options?: { title?: string, text?: string, callback?: () => void }) => {
        const { title = "Untitled", text = "", callback = () => { } } = options || {};
        tabsStore.update(curr => {
            curr.tabs.push({ title, text });
            curr.activeIndex = curr.tabs.length - 1;
            return curr;
        })
        callback();
    },
    removeTab: (index: number) => {
        tabsStore.update(curr => {
            curr.tabs.splice(index, 1);
            if (index == curr.activeIndex - 1) curr.activeIndex = Math.max(0, index);
            else curr.activeIndex = Math.min(curr.activeIndex, curr.tabs.length - 1);
            return curr;
        })
    },
    setActiveIndex: (index: number) => {
        tabsStore.update(curr => {
            if (index < 0) curr.activeIndex = 0;
            else if (index >= curr.tabs.length) curr.activeIndex = curr.tabs.length - 1;
            else curr.activeIndex = index;
            return curr;
        })
    },
    setPlaceholderIndex: (index?: number) => {
        tabsStore.update(curr => {
            curr.placeholderIndex = (index === undefined || index < 0 || index >= curr.tabs.length) ? -1 : index;
            return curr;
        })
    },
    swapTabs: (index1: number, index2: number, callback = () => { }) => {
        tabsStore.update(curr => {
            const temp = curr.tabs[index1];
            curr.tabs[index1] = curr.tabs[index2];
            curr.tabs[index2] = temp;
            if (curr.activeIndex == index1) curr.activeIndex = index2;
            else if (curr.activeIndex == index2) curr.activeIndex = index1;
            if (curr.placeholderIndex == index1) curr.placeholderIndex = index2;
            else if (curr.placeholderIndex == index2) curr.placeholderIndex = index1;
            return curr;
        })
        callback();
    }
};

