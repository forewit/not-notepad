<script lang="ts">
  import "$lib/styles/theme.css";
  import { base } from "$app/paths";
  import Button from "$lib/components/Button.svelte";

  export let title = "";
  export let active = false;
  export let onClose = () => {};
  export let onClick = () => {};

  let inputElm: HTMLInputElement;
</script>

<div class="tab-container">
  <button
    class="tab"
    class:active
    on:dblclick|self={() => inputElm.select()}
    on:click={onClick}
  >
    <div class="divider"></div>
    <input
      bind:this={inputElm}
      bind:value={title}
      autocorrect="off"
      autocomplete="off"
      spellcheck="false"
      type="text"
    />
    <div class="close-button">
      <Button url="{base}/images/svg/cancel.svg" onClick={onClose}></Button>
    </div>
  </button>
</div>

<style>
  * {
    user-select: none;
  }

  .tab-container {
    container-name: tab;
    container-type: inline-size;
  }

  .divider {
    position: absolute;
    bottom: 9px;
    left: -2px;
    width: 2px;
    height: 12px;
    border-radius: 1px;
    z-index: 999;
    background-color: var(--tab-active-color);
    transition: opacity 0.2s;
  }

  .tab:first-child .divider,
  .tab.active .divider,
  .tab:hover .divider,
  .tab.active + .tab .divider,
  .tab:hover + .tab .divider {
    opacity: 0;
  }

  .tab {
    outline-offset: -2px;
    background-color: var(--tab-background-color);
    border-radius: var(--tab-radius);

    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    height: 100%;
    margin-block: 4px
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
    padding-bottom: 4px;
  }
  .tab::after,
  .tab::before {
    content: "";
    opacity: 0;
    pointer-events: none;
    position: absolute;
    bottom: 0;
    width: var(--tab-radius);
    height: calc(2 * var(--tab-radius));
    background-color: transparent;
    box-shadow: 0 var(--tab-radius) 0 0 var(--tab-active-color);
  }
  .tab.active::before {
    opacity: 1;
    left: calc(var(--tab-radius) * -1);
    border-bottom-right-radius: 100vw;
  }
  .tab.active::after {
    opacity: 1;
    right: calc(var(--tab-radius) * -1);
    border-bottom-left-radius: 100vw;
  }
  .tab input {
    font-family: var(--default-font);
    font-size: var(--tab-font-size);
    color: var(--tab-text-color);
    background-color: transparent;

    padding: 0 !important;
    margin-inline: 9px 0;
    white-space: nowrap;
    outline: none;
    border: none;
    pointer-events: none;
    overflow: hidden;
  }
  .tab input::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: pink;
    z-index: 2;
  }
  .tab input:focus {
    pointer-events: all;
  }

   @container tab (width < 60px) {
    .tab:not(.active) .close-button {
      width: 0;
    }
    .tab:not(.active) input {
      margin-inline: 6px;
    }
  } 
</style>
