<script lang="ts">
  import "$lib/styles/theme.css";
  import { base } from "$app/paths";

  export let title = "";
  export let active = false;
  export let preventHover = false;
  export let onClose = () => {};
  export let onPointerdown = (e: MouseEvent | TouchEvent) => {};
  export let onDragstart = (e: DragEvent) => {};

  let inputElm: HTMLInputElement;
</script>

<div class="container" class:preventHover>
  <button
    class="tab"
    class:active
    on:dblclick|self={() => inputElm.select()}
    on:mousedown|self={onPointerdown}
    on:touchstart|self={onPointerdown}
    draggable="true"
    on:dragstart|self={onDragstart}
  >
    <input
      bind:this={inputElm}
      bind:value={title}
      autocorrect="off"
      autocomplete="off"
      spellcheck="false"
      type="text"
    />
    <button
      class="close-button"
      on:click|stopPropagation={onClose}
      draggable="true"
      on:dragstart|stopPropagation|preventDefault
    >
      <!-- svg from url -->
      <div
        class="close-icon"
        style="-webkit-mask: url({base}/images/svg/cancel.svg) no-repeat center / contain;
        mask: url({base}/images/svg/cancel.svg) no-repeat center / contain;"
      ></div>
    </button>
  </button>
</div>

<style>
  * {
    user-select: none;
    -webkit-user-select: none;
  }

  .container {
    container-name: tab;
    container-type: inline-size;
    height: 100%;
    display: flex;
  }

  .tab {
    outline-offset: -2px;
    background-color: var(--tab-background-color);
    border-radius: var(--tab-radius);

    min-width: 0;
    position: relative;
    display: grid;
    margin-bottom: var(--tab-gaps);
    grid-template-columns: 1fr auto;
    align-items: center;
  }
  .tab:hover {
    background-color: var(--tab-hover-color);
  }

  .tab.active {
    transition: background-color 0s;
    background-color: var(--tab-active-color);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-bottom: 0;
    padding-bottom: var(--tab-gaps);
  }
  .tab::after,
  .tab::before {
    content: "";
    display: none;
    pointer-events: none;
    position: absolute;
    bottom: 0;
    width: calc(2 * var(--tab-radius));
    height: var(--tab-radius);
    background-color: transparent;
    z-index: -1;
  }
  .tab.active::before {
    display: block;
    /* left: calc(var(--tab-radius) * -2);
    border-bottom-right-radius: 100vw;
    box-shadow: var(--tab-radius) 0 0 0 var(--tab-active-color); */

    left: calc(var(--tab-radius) * -1);
    width: calc(var(--tab-radius));
    aspect-ratio: 1;
    background-image: radial-gradient(
      circle at 0 0,
      transparent var(--tab-radius),
      var(--tab-active-color) calc(var(--tab-radius) + 1px)
    );
  }
  .tab.active::after {
    display: block;
    /* right: calc(var(--tab-radius) * -2);
    border-bottom-left-radius: 100vw;
    box-shadow: calc(-1 * var(--tab-radius)) 0 0 0 var(--tab-active-color); */

    right: calc(var(--tab-radius) * -1);
    width: calc(var(--tab-radius));
    aspect-ratio: 1;
    background-image: radial-gradient(
      circle at 100% 0,
      transparent var(--tab-radius),
      var(--tab-active-color) calc(var(--tab-radius) + 1px)
    );
  }
  .tab input {
    font-family: var(--default-font);
    font-size: var(--tab-font-size);
    color: var(--tab-text-color);
    background-color: transparent;

    padding: 0;
    margin-inline-start: 0.6em;
    white-space: nowrap;
    outline: none;
    border: none;
    pointer-events: none;
    overflow: hidden;
  }
  .tab input:focus {
    pointer-events: all;
  }

  @container tab (width < 60px) {
    .tab:not(.active) .close-button {
      display: none;
    }
    .tab:not(.active) input {
      margin-inline: 6px;
    }
  }
  /* this should only happen during the tab opening/closing animation */
  @container tab (width < 38px) {
    .tab .close-button {
      display: none;
    }
  }

  .close-button {
    width: 1.5em;
    aspect-ratio: 1;
    margin: 4px;
    margin-inline-end: 0.3em;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;
  }
  .close-button:hover {
    background-color: var(--slight-transparent);
  }
  .close-button:active {
    opacity: 0.8;
  }

  .close-icon {
    background-color: var(--ui-color);
    width: 0.7em;
    aspect-ratio: 1;
  }

  .preventHover * {
    pointer-events: none !important;
  }
</style>
