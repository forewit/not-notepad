<script lang="ts">
  import "$lib/styles/theme.css";
  import { base } from "$app/paths";
  import Button from "$lib/components/Button.svelte";

  export let title = "";
  export let active = false;
  export let onClose = () => {};
  export let onClick = () => {};

  const dragStartHandle = (e: DragEvent) => {
    console.log("dragstart");
  };
  const dragOverHandle = (e: DragEvent) => {
    console.log("dragover");
  };
  const dragEndHandle = (e: DragEvent) => {
    console.log("dragend");
  };

  let inputElm;
</script>

<button
  class:active
  class="tab"
  on:dblclick|self={inputElm.select()}
  on:click|self={onClick}
  on:dragstart|self={dragStartHandle}
  on:dragover|self={dragOverHandle}
  on:dragend|self={dragEndHandle}
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
  <Button url="{base}/images/svg/cancel.svg" onClick={onClose}></Button>
</button>

<style>
  * {
    user-select: none;
  }
  .divider {
    position: absolute;
    bottom: 9px;
    left: -2px;
    width: 2px;
    height: 12px;
    border-radius: 1px;
    background-color: var(--tab-active-color);
  }
  .tab:first-child .divider,
  .tab.active .divider,
  .tab:hover .divider,
  .tab.active + .tab .divider,
  .tab:hover + .tab .divider {
    display: none;
  }

  .tab {
    outline-offset: -2px;
    background-color: var(--tab-background-color);
    border-top-left-radius: var(--tab-radius);
    border-top-right-radius: var(--tab-radius);

    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;

    min-width: 80px;
    width: 140px;
    height: 32px;
  }
  .tab:hover {
    background-color: var(--tab-hover-color);
  }
  .tab.active {
    background-color: var(--tab-active-color);
  }
  .tab.active:before {
    content: "";
    pointer-events: none;
    position: absolute;
    bottom: 0;
    width: var(--tab-radius);
    height: calc(2 * var(--tab-radius));
    left: calc(var(--tab-radius) * -1);
    border-bottom-right-radius: 100vw;
    background-color: transparent;
    box-shadow: 0 var(--tab-radius) 0 0 var(--tab-active-color);
    z-index: 1;
  }
  .tab.active:after {
    content: "";
    pointer-events: none;
    position: absolute;
    bottom: 0;
    width: var(--tab-radius);
    height: calc(2 * var(--tab-radius));
    right: calc(var(--tab-radius) * -1);
    border-bottom-left-radius: 100vw;
    background-color: transparent;
    box-shadow: 0 var(--tab-radius) 0 0 var(--tab-active-color);
    z-index: 1;
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
  .tab input:focus {
    pointer-events: all;
  }
</style>