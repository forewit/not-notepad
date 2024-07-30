<script lang="ts">
  import { themes } from "$lib/modules/themes";
  import { metadataStore } from "$lib/stores/metadataStore";
  import { firebaseHandlers, firebaseStore } from "$lib/stores/firebaseStore";
  import { settingsStore } from "$lib/stores/settingsStore";
  import Tabbar from "$lib/components/Tabbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import ProgressBar from "$lib/components/ProgressBar.svelte";
  import Drawing from "$lib/components/Drawing.svelte";
  import Toolbar from "$lib/components/Toolbar.svelte";
  import Trashcan from "$lib/components/Trashcan.svelte";

  let hexPencilColor = "#000000";
  let rgbaPencilColor = "rgba(0, 0, 0, 1)";
  let pencilStroke = 10;
  let tabbar: Tabbar;
  let drawing: Drawing;
  let canvasHeight = 0;


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
    if (curr.tool === "highlighter") {
      hexPencilColor = "#ffdd33";
    } else if (curr.tool === "pen") {
      const theme = themes.find((t) => t.name === $settingsStore.theme);
      if (theme) {
        hexPencilColor = theme.caret;
      }
    }
  });


  $: drawingTool = $metadataStore.tool === "highlighter" ? "pen" : $metadataStore.tool;
  $: activeTabID = $metadataStore.order[$metadataStore.activeIndex];
  $: rgbaPencilColor =
    $metadataStore.tool === "highlighter"
      ? hexToRGB(hexPencilColor, 0.3)
      : hexPencilColor;
  $: if (canvasHeight > 0) {
    document.documentElement.style.setProperty(
      "--canvas-height",
      canvasHeight + "px"
    );
  }
</script>

<div class="page-container">
  <Tabbar bind:this={tabbar} />
  <div class="toolbar">
    {#if $metadataStore.toolbarVisible && $metadataStore.order.length > 0}
      <Toolbar
        onDrawingUndo={() => drawing.undo()}
        onRefresh={() => firebaseHandlers.loadFromFirestore()}
        bind:stroke={pencilStroke}
        bind:color={hexPencilColor}
      />
    {/if}
  </div>
  {#if $firebaseStore.currentUser && !$firebaseStore.isLoading}
    <div class="scrollable-canvas" bind:clientHeight={canvasHeight}>
      <div class="editor-container">
        {#key activeTabID}
          <Editor tabID={activeTabID} />
          <Drawing
            bind:this={drawing}
            bind:color={rgbaPencilColor}
            bind:stroke={pencilStroke}
            tabID={activeTabID}
            tool={drawingTool}
          />
        {/key}

        
      </div>
      {#if $metadataStore.trashcanVisible}
          <div class="trashcan-container">
            <Trashcan throwAway={tabbar.closeActiveTab} />
          </div>
        {/if}
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
  .scrollable-canvas {
    position: relative;
    margin-left: var(--safe-area-left);
    margin-right: var(--safe-area-right);
    overflow: auto;
    scrollbar-width: none;
    /* scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent; */
  }
  .editor-container {
    position: relative;
    overflow: hidden;
  }
  .trashcan-container {
    position: absolute;
    bottom: 1.2rem;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
