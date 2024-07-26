<script lang="ts">
  import Tabbar from "$lib/components/Tabbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import ProgressBar from "$lib/components/ProgressBar.svelte";
  import { tabsStore, metadataStore } from "$lib/stores/tabsStore";
  import { firebaseHandlers, firebaseStore } from "$lib/stores/firebaseStore";
  import { settingsStore } from "$lib/stores/settingsStore";
  import Drawing from "$lib/components/Drawing.svelte";
  import Toolbar from "$lib/components/Toolbar.svelte";
  import { themes } from "$lib/modules/themes";

  let hexPencilColor = "#000000";
  let rgbaPencilColor = "rgba(0, 0, 0, 1)";
  let pencilStroke = 10;
  let tabbar: Tabbar;
  let drawings: Record<string, Drawing> = {};

  function hexToRGB(hex: string, alpha?: number) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  metadataStore.subscribe((curr) => {
    if (curr.activeTool === "highlighter") {
      hexPencilColor = "#ffdd33";
    } else if (curr.activeTool === "pencil") {
      const theme = themes.find((t) => t.name === $settingsStore.theme);
      if (theme) {
        hexPencilColor = theme.caret;
      }
    }
  });

  $: activeTabID = $metadataStore.order[$metadataStore.activeIndex];
  $: rgbaPencilColor =
    $metadataStore.activeTool === "highlighter"
      ? hexToRGB(hexPencilColor, 0.3)
      : hexPencilColor;
</script>

<div class="page-container">
  <Tabbar bind:this={tabbar} />
  <div class="toolbar">
    {#if $metadataStore.toolbarVisible && $metadataStore.order.length > 0}
      <Toolbar
        onClose={() => tabbar.closeActiveTab()}
        onDrawingUndo={() => drawings[activeTabID].undo()}
        onRefresh={() => firebaseHandlers.loadFromFirestore()}
        bind:stroke={pencilStroke}
        bind:color={hexPencilColor}
      />
    {/if}
  </div>
  {#if $firebaseStore.currentUser && !$firebaseStore.isLoading}
    <div class="canvas-container">
      <div class="editor-container">
        {#each Object.keys($tabsStore) as id (id)}
          <Editor disabled={id !== activeTabID} tabID={id} />
        {/each}
      </div>
      <div
        class="drawing-container"
        class:disabled={$metadataStore.activeTool === undefined}
      >
        {#each Object.keys($tabsStore) as id (id)}
          <Drawing
            bind:this={drawings[id]}
            bind:color={rgbaPencilColor}
            bind:stroke={pencilStroke}
            tabID={id}
            hide={id !== activeTabID}
            disabled={id !== activeTabID ||
              $metadataStore.activeTool === undefined}
          />
        {/each}
      </div>
    </div>
  {:else}
    <ProgressBar />
  {/if}
</div>

<style>
  .page-container {
    background-color: var(--bg);
    height: 100%;
    position: relative;
    display: grid;
    grid-template-rows: auto auto 1fr;
    grid-template-columns: 100%;
  }
  .canvas-container {
    position: relative;
    margin-left: var(--safe-area-left);
    margin-right: var(--safe-area-right);
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
