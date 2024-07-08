<script lang="ts">
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
    draggable="true"
    on:dblclick|self={() => inputElm.select()}
    on:mousedown|self={onPointerdown}
    on:touchstart|self={onPointerdown}
    on:dragstart|self={onDragstart}
  >
  </button>

  <div class="tab-wrapper">
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
      <span
        class="close-icon"
        style="-webkit-mask: url({base}/images/svg/cancel.svg) no-repeat center / contain;
        mask: url({base}/images/svg/cancel.svg) no-repeat center / contain;"
      ></span>
    </button>
  </div>
</div>

<style>
  * {
    user-select: none;
    -webkit-user-select: none;
  }

  .container {
    position: relative;
    container-name: tab;
    container-type: inline-size;
    height: 100%;
    display: flex;
  }

  .tab {
    background-color: var(--bg-alt);
    border-radius: var(--tab-radius);
    transition: background-color var(--transition-speed);

    outline-offset: -2px;
    min-width: 0;
    width: 100%;
    position: relative;
    display: grid;
    grid-auto-flow: column;
    margin-bottom: var(--tab-gaps);
    align-items: center;
  }
  .tab:hover,
  .tab:not(.active):has(+ .tab-wrapper .close-button:hover) {
    background-color: var(--text);
  }

  .tab.active {
    transition: background-color 0s;
    background-color: var(--main);
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
    left: calc(var(--tab-radius) * -1);
    width: calc(var(--tab-radius));
    aspect-ratio: 1;
    background-image: radial-gradient(
      circle at 0 0,
      transparent var(--tab-radius),
      var(--main) calc(var(--tab-radius) + 1px)
    );
  }
  .tab.active::after {
    display: block;
    right: calc(var(--tab-radius) * -1);
    width: calc(var(--tab-radius));
    aspect-ratio: 1;
    background-image: radial-gradient(
      circle at 100% 0,
      transparent var(--tab-radius),
      var(--main) calc(var(--tab-radius) + 1px)
    );
  }

  @container tab (width < 60px) {
    .tab:not(.active) ~ .close-button {
      display: none;
    }
    .tab:not(.active) ~ input {
      margin-inline: 6px;
    }
  }
  /* this should only happen during the tab opening/closing animation */
  @container tab (width < 38px) {
    .tab ~ .close-button {
      display: none;
    }
  }

  .tab-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: var(--tab-gaps);
    pointer-events: none;

    display: grid;
    grid-auto-flow: column;
    align-items: center;
  }

  .tab-wrapper input {
    color: var(--text);
    font-family: var(--ui-font);
    font-size: var(--ui-font-size);
    background-color: transparent;
    padding: 0;
    margin-inline-start: 0.7em;
    white-space: nowrap;
    outline: none;
    border: none;
    pointer-events:none;
    overflow: hidden;
  }
  .tab-wrapper input:focus {
    pointer-events: all;
  }
  .tab:hover ~ .tab-wrapper input,
  .tab.active ~ .tab-wrapper input,
  .tab-wrapper input:has(+ .close-button:hover) {
    color: var(--bg);
  }

  .close-button {
    pointer-events: all;
    width: 1.5em;
    height: 1.5em;
    aspect-ratio: 1;
    margin-inline: 3px 0.4em;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color var(--transition-speed);
  }
  .close-button:hover {
    background-color: var(--bg-alt);
  }

  .close-icon {
    width: 0.7em;
    aspect-ratio: 1;
  }
  .close-icon,
  .close-button:hover .close-icon {
    background-color: var(--text);
  }
  .tab:hover ~ .tab-wrapper .close-button .close-icon,
  .tab.active ~ .tab-wrapper .close-button:not(:hover) .close-icon {
    background-color: var(--bg);
  }
  .tab.active ~ .tab-wrapper .close-button:hover .close-icon {
    background-color: var(--main);
  }

  .preventHover * {
    pointer-events: none !important;
  }
</style>
