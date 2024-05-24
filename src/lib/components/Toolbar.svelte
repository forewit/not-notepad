<script lang="ts">
  import "$lib/styles/theme.css";
  import { base } from "$app/paths";
  import Tab from "$lib/components/Tab.svelte";
  import Button from "$lib/components/Button.svelte";

  export let tabs: Tab[];
  export let activeTabID: string;

  interface Tab {
    id: string;
    title: string;
  }

  const closeTab = (id: string) => {
    tabs = tabs.filter((tab) => tab.id != id);
  };

  const newTab = () => {
    let newID = Date.now().toString();
    tabs.push({ id: newID, title: "Untitled"});
    tabs = tabs; // force reactivity
  };

  const setActiveTab = (id: string) => {
    activeTabID = id;
  };
</script>

<div>
  <div class="toolbar">
    <div class="tabs">
      {#each tabs as tab}
        <Tab
          bind:title={tab.title}
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

  @supports selector(::-webkit-scrollbar-thumb) {
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