<script lang="ts">
  import "$lib/styles/theme.css";
  import Toolbar from "$lib/components/Toolbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import { tabsStore, tabsHandlers } from "../lib/stores/tabsStore";

  tabsHandlers.newTab({
    title: "Hello 👋",
    text: "Welcome to notep... not notepad. Something completely different (Microsoft, don't sue me). v0.15",
  });
</script>

<div class="container">
  <Toolbar />
  <Editor bind:text={$tabsStore.tabs[$tabsStore.activeIndex].text} />
</div>

<style>
  .container {
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr;
  }
</style>
