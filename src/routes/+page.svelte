<script lang="ts">
  import "$lib/styles/theme.css";
  import "$lib/styles/quill.css";
  import Tabbar from "$lib/components/Tabbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import { tabsStore, tabsHandlers } from "../lib/stores/tabsStore";
  import { onMount } from "svelte";

  async function newTab() {
    const { Delta: Delta } = await import("quill/core");

    const initialContent = new Delta().insert("Welcome to Not Notepad 🎉\n");
    tabsHandlers.newTab({ data: { id: 0, title: "Hello 👋", content: initialContent } });
    tabsHandlers.newTab();
  }

  onMount(() => {
    newTab(); // TODO: remove
  });
</script>

<div class="container">
  <Tabbar />
  {#if $tabsStore.tabs.length > 0}
    {#each $tabsStore.tabs as tab, i}
      <Editor disabled={i !== $tabsStore.activeIndex} />
    {/each}
  {:else}
    <div class="placeholder">
      <button on:click={newTab} class="new-tab-button"
        >Create your first tab</button
      >
    </div>
  {/if}
</div>

<style>
  .container {
    position: relative;
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-template-columns: 100%;
  }

  .placeholder {
    background-color: var(--editor-background-color);
  }

  .new-tab-button {
    font-size: var(--editor-font-size);
    font-family: var(--editor-font-family);
    color: var(--editor-text-color);
    background-color: var(--tab-active-color);

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: calc(var(--tabbar-height) - 1.8em);
    margin: 1em 0.8em;
    border-radius: 6px;
    padding: 8px;
  }
  .new-tab-button:not(:active):hover {
    background-color: var(--tab-hover-color);
  }
</style>
