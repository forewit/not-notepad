<script lang="ts">
  import Tabbar from "$lib/components/Tabbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { tabsStore, metadataStore } from "$lib/stores/tabsStore";
  import { firebaseStore, firebaseHandlers } from "$lib/stores/firebaseStore";
  import Drawing from "$lib/components/Drawing.svelte";

  $: activeTabID = $metadataStore.order[$metadataStore.activeIndex];

  let stroke = 10;
  let radius = 1;
  let smoothness = 3;
  let color = "rgba(253, 221, 77, 0.4)";
  let drawing: Drawing;
</script>

{#if $firebaseStore.currentUser && !$firebaseStore.isLoading}
  <div class="page-container">
    <Tabbar onDrawingUndo={() => drawing.undo()} />
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
        {#each Object.keys($tabsStore) as id (id)}
          <Drawing
            bind:this={drawing}
            {color}
            {stroke}
            {radius}
            {smoothness}
            tabID={id}
            hide={id !== activeTabID}
            disabled={id !== activeTabID ||
              $metadataStore.activeTool !== "pencil"}
          />
        {/each}
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
    grid-template-rows: auto 1fr;
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
