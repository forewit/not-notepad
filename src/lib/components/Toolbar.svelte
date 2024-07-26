<script lang="ts">
  import { base } from "$app/paths";
  import { firebaseStore } from "$lib/stores/firebaseStore";
  import { metadataStore } from "$lib/stores/tabsStore";
  import { slide } from "svelte/transition";

  export let onRefresh = () => {};
  export let onClose = () => {};
  export let onDrawingUndo = () => {};
  export let stroke: number;
  export let color: string;
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
  <button
    class="button"
    class:selected={$metadataStore.activeTool === "highlighter"}
    on:click={() => {
      $metadataStore.activeTool =
        $metadataStore.activeTool === "highlighter" ? undefined : "highlighter";
    }}
  >
    <span
      class="button-icon"
      style="-webkit-mask: url({base}/images/svg/highlighter.svg) no-repeat center / contain;
  mask: url({base}/images/svg/highlighter.svg) no-repeat center / contain;"
    ></span>
  </button>

  {#if $metadataStore.activeTool === "pencil" || $metadataStore.activeTool === "highlighter"}
    <div class="pencil-tools" transition:slide={{ duration: 200, axis: "x" }}>
      <button class="button" on:click={onDrawingUndo}>
        <span
          class="button-icon"
          style="-webkit-mask: url({base}/images/svg/undo.svg) no-repeat center / contain;
      mask: url({base}/images/svg/undo.svg) no-repeat center / contain;"
        ></span>
      </button>
      <input
        type="range"
        min="2"
        max="20"
        step="2"
        bind:value={stroke}
        class="slider"
      />
      <input type="color" bind:value={color} class="color-picker" />
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
</div>

<style>
  .toolbar-container {
    display: flex;
    justify-content: end;
    gap: 4px;
    padding-block: 4px;
    background-color: var(--main);
    margin-top: calc(-1 * var(--tabbar-divider-size));
    padding-left: calc(0.8em + var(--safe-area-left));
    padding-right: calc(0.5em + var(--safe-area-right));
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
    font-size: var(--ui-font-size);
    width: 1.8em;
    height: 1.8em;
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
    width: 0.9em;
    height: 0.9em;
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
    width: 18px;
    height: 18px;
    background-color: var(--bg);
    padding: 0;
    margin-inline: 4px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
  .color-picker::-webkit-color-swatch {
    opacity: 0.8;
    border-radius: 3px;
    border: none;
  }
  .color-picker::-moz-color-swatch {
    border-radius: 3px;
    border: none;
  }
  .color-picker::-webkit-color-swatch-wrapper {
    padding: 2px;
  }
  .color-picker::-moz-color-swatch-wrapper {
    padding: 2px;
  }
</style>
