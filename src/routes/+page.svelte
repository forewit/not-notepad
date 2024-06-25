<script lang="ts">
  import "$lib/styles/theme.css";
  import Toolbar from "$lib/components/Toolbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import { tabsStore, tabsHandlers } from "../lib/stores/tabsStore";

  tabsHandlers.newTab({data:{
    id: -1,
    title: "Hello 👋",
    text: "Welcome to notep... not notepad. Something completely different (Microsoft, don't sue me). v0.21",
  }});

  $: tab =
    $tabsStore.tabs.length > 0
      ? $tabsStore.tabs[$tabsStore.activeIndex]
      : { text: "Click the ➕ above to create a new tab." };
</script>

<div class="container">
  <Toolbar />
  <Editor bind:text={tab.text} />
</div>

<style>
  .container {
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr;
  }
</style>
