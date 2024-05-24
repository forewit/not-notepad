<script lang="ts">
  import "$lib/styles/theme.css";
  import Toolbar from "$lib/components/Toolbar.svelte";
  import Editor from "$lib/components/Editor.svelte";

  let tabs = [
    { id: "1", title: "Tab 1", text: "Tab 1 text" },
    { id: "2", title: "Tab 2", text: "Tab 2 text" },
    { id: "3", title: "Tab 3", text: "Tab 3 text" },
    { id: "4", title: "Tab 4", text: "Tab 4 text" },
  ];
  let activeTabID: string;

  $: activeTab = tabs.find((tab) => tab.id == activeTabID) || {
    text: "Click the ➕ above to create a new tab.",
  };
  
</script>

<div class="container">
  <Toolbar bind:tabs bind:activeTabID />
  <Editor bind:text={activeTab.text} />
</div>

<style>
  .container {
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr;
  }
</style>
