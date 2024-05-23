<script lang="ts">
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
      <Tab title={tab.title} onClose={() => closeTab(tab.id)} />
    {/each}
  </div>

  <div class="buttons">
    <Button url="/images/svg/plus.svg" onClick={newTab}></Button>
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
    position: relative;
    overflow-x: auto;
    max-width: max-content;
    display: flex;
    gap: 2px;
    padding-inline: var(--tab-radius);
  }
</style>
