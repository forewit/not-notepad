<script lang="ts">
  import Tabbar from "$lib/components/Tabbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { tabsStore, metadataStore } from "$lib/stores/tabsStore";
  import { firebaseStore, firebaseHandlers } from "$lib/stores/firebaseStore";
  import Drawing from "$lib/components/Drawing.svelte";

  $: activeTabID = $metadataStore.order[$metadataStore.activeIndex];

  let stroke = 10;
  let radius = 3;
  let smoothness = 2;
  let color = "#429A53";
</script>

{#if $firebaseStore.currentUser && !$firebaseStore.isLoading}
  <div class="page-container">
    <Tabbar refreshClicked={firebaseHandlers.loadFromFirestore} />
    <div class="canvas-container">
      <div class="editor-container">
        {#each Object.keys($tabsStore) as id (id)}
          <Editor disabled={id !== activeTabID} tabID={id} />
        {/each}
      </div>
      <div
        class="drawing-container"
        class:disabled={$metadataStore.activeTool !== "pencil"}
      >
        <Drawing
          {color}
          {stroke}
          {radius}
          {smoothness}
          disabled={$metadataStore.activeTool !== "pencil"}
        />
      </div>
    </div>
  </div>
{:else}
  <Spinner />
{/if}

<style>
  .page-container {
    background-color: var(--bg);
    height: 100%;
    position: relative;
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-template-columns: 100%;
  }
  .canvas-container {
    position: relative;
  }
  .drawing-container,
  .editor-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
  .disabled {
    pointer-events: none;
  }
</style>
