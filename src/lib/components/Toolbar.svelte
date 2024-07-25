<script lang="ts">
  import { base } from "$app/paths";
  import { firebaseStore } from "$lib/stores/firebaseStore";
  import { metadataStore } from "$lib/stores/tabsStore";
  import { slide } from "svelte/transition";

  export let onRefresh = () => {};
  export let onClose = () => {};
  export let drawingStroke: number;
  export let drawingColor: string;
  export let onDrawingUndo = () => {};
</script>

<div class="toolbar-container" transition:slide={{ duration: 200 }}>
  <button
    class="pencil button"
    class:selected={$metadataStore.activeTool === "pencil"}
    on:click={() => {
      $metadataStore.activeTool =
        $metadataStore.activeTool === "pencil" ? undefined : "pencil";
    }}
  >
    <span
      class="button-icon"
      style="-webkit-mask: url({base}/images/svg/pencil.svg) no-repeat center / contain;
  mask: url({base}/images/svg/pencil.svg) no-repeat center / contain;"
    ></span>
  </button>

  {#if $metadataStore.activeTool === "pencil"}
    <div class="pencil-tools" transition:slide={{ duration: 200, axis: "x" }}>
      <button class="button" on:click={onDrawingUndo}>
        <span
          class="button-icon"
          style="-webkit-mask: url({base}/images/svg/undo.svg) no-repeat center / contain;
      mask: url({base}/images/svg/undo.svg) no-repeat center / contain;"
        ></span>
      </button>
      <input type="range" min="2" max="20" step="2" bind:value={drawingStroke} class="slider">
      <input type="color" bind:value={drawingColor} class="color-picker">
    </div>
  {/if}

  <div class="spacer"></div>

  <button class="close button" on:click={onClose}>
    <span
      class="button-icon"
      style="-webkit-mask: url({base}/images/svg/trash.svg) no-repeat center / contain;
        mask: url({base}/images/svg/trash.svg) no-repeat center / contain;"
    ></span>
  </button>
  <button
    class="refresh button"
    on:click={onRefresh}
    disabled={$firebaseStore.savingStatus === "saving"}
  >
    <span
      class="button-icon"
      style="-webkit-mask: url({base}/images/svg/refresh.svg) no-repeat center / contain;
  mask: url({base}/images/svg/refresh.svg) no-repeat center / contain;"
    ></span>
  </button>
  <a class="button" href="{base}/profile">
    <span
      class="button-icon"
      style="-webkit-mask: url({base}/images/svg/user.svg) no-repeat center / contain;
  mask: url({base}/images/svg/user.svg) no-repeat center / contain;"
    ></span>
  </a>
  <button
    class="button"
    on:click={() => {
      $metadataStore.toolbarVisible = false;
      $metadataStore.activeTool = undefined;
    }}
  >
    <span
      class="button-icon"
      style="-webkit-mask: url({base}/images/svg/maximize.svg) no-repeat center / contain;
      mask: url({base}/images/svg/maximize.svg) no-repeat center / contain;"
    ></span>
  </button>
</div>

<style>
  .toolbar-container {
    display: flex;
    justify-content: end;
    gap: 4px;
    padding-block: 2px;
    background-color: var(--main);
    margin-top: calc(-1 * var(--tabbar-divider-size));
    padding-left: calc(var(--tab-gaps) + var(--safe-area-left));
    padding-right: calc(var(--tab-gaps) + var(--safe-area-right));
  }

  .pencil-tools {
    display: flex;
    gap: 4px;
    align-items: center;
  }
  .spacer {
    flex-grow: 1;
  }

  .button {
    width: 27px;
    height: 27px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color var(--transition-speed);
    transition: opacity var(--transition-speed);
  }
  .button:active,
  .button.selected {
    background-color: var(--sub);
    color: var(--bg);
  }
  .button:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .button-icon {
    width: 14px;
    height: 14px;
  }
  .button .button-icon {
    background-color: var(--bg);
  }

  .button:hover .button-icon,
  .button:active .button-icon,
  .button.selected .button-icon {
    background-color: var(--bg);
  }

  .slider {
    appearance: none;
    width: 60px;
    height: 4px;
    border-radius: 100vw;
    background: var(--bg);
    outline: none;
  }
  .slider::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--bg-alt);
    cursor: pointer;
  }
  .slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--bg-alt);
    cursor: pointer;
  }

  .color-picker {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.color-picker::-webkit-color-swatch {
  border-radius: 3px;
  border: none;

}
.color-picker::-moz-color-swatch {
  border-radius: 2px;
  border: none;
}
</style>
