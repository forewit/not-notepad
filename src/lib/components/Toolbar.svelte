<script lang="ts">
  import { base } from "$app/paths";
  import { firebaseStore } from "$lib/stores/firebaseStore";
  import { metadataStore } from "$lib/stores/tabsStore";
  import { slide } from "svelte/transition";

  export let onRefresh = () => {};
  export let onClose = () => {};
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
    background-color: var(--main);
    margin-top: calc(-1 * var(--tabbar-divider-size));
    padding-left: calc(var(--tab-gaps) + var(--safe-area-left));
    padding-right: calc(var(--tab-gaps) + var(--safe-area-right));
  }

  /* .pencil-tools {
    position: relative;
  }
  .pencil-tools:before {
    content: "";
    position:absolute;
    bottom: 4px;
    left: 0;
    right:0;
    border-bottom: 3px solid var(--caret);
  } */
  .spacer {
    flex-grow: 1;
  }

  .button {
    width: 27px;
    height: 27px;
    margin: 4px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color var(--transition-speed);
    transition: opacity var(--transition-speed);
  }
  .button:hover {
    background-color: var(--text);
    color: var(--bg);
  }
  .button:active,
  .button.selected {
    background-color: var(--caret);
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
</style>
