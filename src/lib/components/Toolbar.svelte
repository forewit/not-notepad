<script lang="ts">
  /**
   * TODO:
   * - 
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
    { id: Date.now().toString(), title: "Tab 1", text: "Tab 1" },
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

<div class="container">
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
</div>


<style>
    .container {
    }
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
    overflow-x: scroll;
    max-width: max-content;
    display: flex;
    gap: 2px;
    padding-inline: var(--tab-radius);

    padding-bottom: 0.3rem;
    margin-bottom: -0.6rem;
  }

  .tabs::-webkit-scrollbar {
    height: 0.3rem;
  }
  .tabs::-webkit-scrollbar-thumb {
    background-color: var(--ui-color);
    border-radius: 100vw;
  }
  .tabs::-webkit-scrollbar-button {
    width: 0.3rem;
  }
</style>
