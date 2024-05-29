import { writable } from "svelte/store";

interface Tab {
    title: string;
    text: string;
}

export const tabsStore = writable({
    tabs: [] as Tab[],
    activeIndex: 0,
});

export const tabsHandlers = {
    newTab: ({ title = "Untitled", text = "" } = {}) => {

        tabsStore.update(curr => {
            curr.tabs.push({ title, text });
            curr.activeIndex = curr.tabs.length - 1;
            return curr;
        })
    },
    removeTab: (index: number) => {
        tabsStore.update(curr => {
            curr.tabs.splice(index, 1);
            curr.activeIndex = Math.min(curr.activeIndex, curr.tabs.length - 1);
            return curr;
        })
    },
    setActiveIndex: (index: number) => {
        tabsStore.update(curr => {
            curr.activeIndex = (index < 0 || index >= curr.tabs.length) ? 0 : index;
            return curr;
        })
    },
    swapTabs: (index1: number, index2: number, callback?: () => void) => {
        tabsStore.update(curr => {
            const temp = curr.tabs[index1];
            curr.tabs[index1] = curr.tabs[index2];
            curr.tabs[index2] = temp;
            if (curr.activeIndex == index1) curr.activeIndex = index2;
            else if (curr.activeIndex == index2) curr.activeIndex = index1;
            return curr;
        })
        if (callback) callback();
    }
};

