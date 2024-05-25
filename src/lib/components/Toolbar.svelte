<script lang="ts">
  // TODO: implement tab re-ordering

  import "$lib/styles/theme.css";
  import { base } from "$app/paths";
  import Tab from "$lib/components/Tab.svelte";
  import Button from "$lib/components/Button.svelte";

  interface Tab {
    id: string;
    title: string;
  }

  export let tabs: Tab[];
  export let activeTabID: string;

  let tabsOrder: string[] = tabs.map((tab) => tab.id);
  let tabsElm: HTMLElement;
  let lockMaxWidth = 0;

  const debounce = (func: Function, timeout = 300) => {
    //@ts-ignore
    let timer;
    //@ts-ignore
    return (...args) => {
      //@ts-ignore
      clearTimeout(timer);
      //@ts-ignore
      timer = setTimeout(() => {
        //@ts-ignore
        func.apply(this, args);
      }, timeout);
    };
  };

  const closeTab = (id: string) => {
    let tabIndex = tabsOrder.indexOf(id);

    lockMaxWidth = tabsElm.children[0].clientWidth;
    debouncedClosingTabs();

    tabs = tabs.filter((tab) => tab.id != id);
    tabsOrder = tabsOrder.filter((tab) => tab != id);
    setActiveTab(tabsOrder[Math.min(tabIndex, tabsOrder.length - 1)]);
  };

  // TODO: Implement
  const debouncedClosingTabs = debounce(() => {
    console.log("debounced closing tabs...");
    lockMaxWidth = 0;
  }, 700);

  const newTab = () => {
    let newID = Date.now().toString();
    tabs.push({ id: newID, title: "Untitled" });
    tabsOrder.push(newID);
    tabs = tabs; // force reactivity
    setActiveTab(newID);
  };

  const setActiveTab = (id: string) => {
    activeTabID = id;
    if (lockMaxWidth > 0) return;
    setTimeout(() => {
      tabsElm.querySelector(".tab.active")?.scrollIntoView({
        behavior: "smooth",
      });
    });
  };
</script>

<div>
  <div class="toolbar">
    <div class="tabs" bind:this={tabsElm}>
      {#each tabs as tab}
        <Tab
          bind:title={tab.title}
          bind:lockMaxWidth
          active={activeTabID == tab.id}
          onClose={() => closeTab(tab.id)}
          onClick={() => setActiveTab(tab.id)}
        />
      {/each}
    </div>

    <div class="buttons">
      <Button url="{base}/images/svg/plus.svg" onClick={newTab}></Button>
    </div>
  </div>
  <div class="separator"></div>
</div>

<style>
  .toolbar {
    background-color: var(--toolbar-background-color);
    display: grid;
    grid-template-columns: auto 1fr;

    align-items: end;
    height: 3rem;
  }

  .separator {
    background-color: var(--tab-active-color);
    height: var(--toolbar-scrollbar-size);
  }

  .tabs {
    overscroll-behavior-inline: contain;
    position: relative;
    overflow-x: scroll;
    max-width: max-content;
    display: flex;
    gap: 2px;
    padding-inline: var(--tab-radius);
  }

  .tabs::-webkit-scrollbar {
    display: none;
  }

  @supports (scrollbar-width: thin) {
    .tabs {
      margin-bottom: calc(-1 * var(--toolbar-scrollbar-size));
    }
    .tabs::-webkit-scrollbar {
      height: var(--toolbar-scrollbar-size);
      display: block;
    }
    .tabs::-webkit-scrollbar-thumb {
      background-color: var(--toolbar-scrollbar-color);
      border-radius: 100vw;
    }
    .tabs::-webkit-scrollbar-button {
      width: 0.15rem;
    }
  }
</style>
