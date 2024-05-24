<script lang="ts">
    /**
     * TODO:
     * - scrollbar on the top instead of the bottom
    */
  import "$lib/styles/theme.css";
  import { base } from "$app/paths";
  import Tab from "$lib/components/Tab.svelte";
  import Button from "$lib/components/Button.svelte";

  interface Tab {
    title: string;
    text: string;
  }
  let tabs: Tab[] = [
    { id: Date.now().toString(), title: "Tab 1", text: "Tab 1" },
  ];
  let activeTabID: string;

  const closeTab = (id: string) => {
    tabs = tabs.filter((tab) => tab.id != id);
  };

  const newTab = () => {
    let newID = Date.now().toString();
    tabs.push({ id: newID, title: "Untitled", text: "" });
    tabs = tabs; // force reactivity
  };
</script>

<div class="toolbar">
  <div class="tabs">
    {#each tabs as tab}
      <Tab
        bind:title={tab.title}
        selected={activeTabID === tab.id}
        onClose={() => closeTab(tab.id)}
        onSelect={() => (activeTabID = tab.id)}
      />
    {/each}
  </div>

  <div class="buttons">
    <Button url="{base}/images/svg/plus.svg" onClick={newTab}></Button>
  </div>
</div>

<style>
  .toolbar {
    background-color: var(--toolbar-background-color);
    display: grid;
    grid-template-columns: auto 1fr;

    align-items: end;
    height: 3rem;
  }

  .tabs {
    overscroll-behavior-inline: contain;
    position: relative;
    overflow-x: auto;
    max-width: max-content;
    display: flex;
    gap: 2px;
    padding-inline: var(--tab-radius);
  }

  .tabs::-webkit-scrollbar {

  }
</style>
