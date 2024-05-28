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
    newTab: ({title = "Untitled", text = ""} = {}) => {
        tabsStore.update(curr => {
            curr.tabs.push({title, text});
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
            curr.activeIndex =  (index < 0 || index >= curr.tabs.length) ? 0 : index;
            return curr;
        })
    }
};


