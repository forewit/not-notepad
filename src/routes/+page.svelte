<script lang="ts">
  import { themes } from "$lib/modules/themes";
  import { metadataStore } from "$lib/stores/metadataStore";
  import { firebaseHandlers, firebaseStore } from "$lib/stores/firebaseStore";
  import { settingsStore } from "$lib/stores/settingsStore";
  import { base } from "$app/paths";
  import { onMount } from "svelte";
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
  let editor: Editor;
  let drawing: Drawing;
  let canvasHeight = 0;
  let cursorCSS = "";
  let drawingTool: "pen" | "eraser" | undefined = undefined;
  let activeTabID = "";

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

  function keydownHandler(e: KeyboardEvent) {
    // escape
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      if ($metadataStore.tool !== undefined) {
        $metadataStore.tool = undefined;
      }
    }

    // alt + 1: toggle pen
    else if (e.altKey && e.key === "1") {
      e.preventDefault();
      e.stopPropagation();

      if ($metadataStore.tool === "pen") {
        $metadataStore.tool = undefined;
      } else {
        $metadataStore.tool = "pen";
        $metadataStore.toolbarVisible = true;
      }
    }

    // alt + 2: toggle highlighter
    else if (e.altKey && e.key === "2") {
      e.preventDefault();
      e.stopPropagation();

      if ($metadataStore.tool === "highlighter") {
        $metadataStore.tool = undefined;
      } else {
        $metadataStore.tool = "highlighter";
        $metadataStore.toolbarVisible = true;
      }
    }

    // alt + 3: toggle eraser
    else if (e.altKey && e.key === "3") {
      e.preventDefault();
      e.stopPropagation();

      if ($metadataStore.tool === "eraser") {
        $metadataStore.tool = undefined;
      } else {
        $metadataStore.tool = "eraser";
        $metadataStore.toolbarVisible = true;
      }
    }

    // ctrl + z
    else if (e.ctrlKey && e.key === "z") {
      e.preventDefault();
      e.stopPropagation();
      console.log("undo");
    }
    // ctrl + Z
    else if (e.ctrlKey && e.key === "Z") {
      e.preventDefault();
      e.stopPropagation();
      console.log("redo");
    }
  }

  metadataStore.subscribe((curr) => {
    activeTabID = curr.order[curr.activeIndex];

    switch (curr.tool) {
      case "pen":
        cursorCSS = `cursor: url(${base}/images/svg/pen.svg) 1 17, auto;`;
        drawingTool = "pen";
        const theme = themes.find((t) => t.name === $settingsStore.theme);
        if (theme) hexPencilColor = theme.caret;
        break;

      case "highlighter":
        hexPencilColor = "#ffdd33";
        cursorCSS = `cursor: url(${base}/images/svg/highlighter.svg) 1 18, auto;`;
        drawingTool = "pen";
        break;

      case "eraser":
        drawingTool = "eraser";
        cursorCSS = `cursor: url(${base}/images/svg/eraser.svg) 5 18, auto;`;
        break;

      default:
        cursorCSS = "";
        drawingTool = undefined;
        break;
    }
  });

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

  onMount(() => {
    //document.addEventListener("keydown", keydownHandler);
  });
</script>

<svelte:window on:keydown|nonpassive={keydownHandler} />

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
    <div
      class="scrollable-canvas"
      bind:clientHeight={canvasHeight}
      style={cursorCSS}
    >
      <div class="editor-container">
        {#key activeTabID}
          <Editor bind:this={editor} tabID={activeTabID} />
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
