<script lang="ts">
  // import { base } from "$app/paths";

  export let title = "";
  export let active = false;
  export let preventHover = false;
  export let onPointerdown = (e: MouseEvent | TouchEvent) => {};
  export let onDragstart = (e: DragEvent) => {};
</script>

<div class="tab-container" class:preventHover>
  <button
    class="tab"
    class:active
    draggable="true"
    on:mousedown|self={onPointerdown}
    on:touchstart|self={onPointerdown}
    on:dragstart|self={onDragstart}
  >
  <span class="title">{title}</span>
</button>
</div>

<style>
  * {
    user-select: none;
    -webkit-user-select: none;
  }

  .tab-container {
    position: relative;
    height: 100%;
    display: flex;
  }

  .tab {
    padding-inline: var(--tab-gaps);
    background-color: var(--bg-alt);
    border-radius: var(--tab-radius);
    transition: background-color var(--transition-speed);

    outline-offset: -2px;
    min-width: 0;
    width: 100%;
    margin-bottom: var(--tab-gaps);
  }
  .tab:hover {
    background-color: var(--sub);
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
    z-index: 1;
  }
  .tab.active::before {
    display: block;
    left: calc(var(--tab-radius) * -1);
    width: var(--tab-radius);
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
    width: var(--tab-radius);
    aspect-ratio: 1;
    background-image: radial-gradient(
      circle at 100% 0,
      transparent var(--tab-radius),
      var(--main) calc(var(--tab-radius) + 1px)
    );
  }
  .title {
    color: var(--text);
    font-family: var(--ui-font);
    font-size: var(--ui-font-size);
    display: block;
    margin-inline: 8px;
    text-align: start;
    text-wrap: nowrap;
    overflow: hidden;
    pointer-events: none;
  }
  .tab.active .title,
  .tab:hover .title {
    color: var(--bg);
  }
  /* .tab:not(.active) ~ .tab-wrapper .close-button {
    display: none;
  } 
  .tab:not(.active) ~ .tab-wrapper input {
    margin-inline: 0.4em;
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
    overflow: hidden;
  }

  .tab-wrapper input {
    color: var(--text);
    font-family: var(--ui-font);
    font-size: var(--ui-font-size);
    min-width: 0;
    background-color: transparent;
    padding: 0;
    margin-inline: 0.4em;
    white-space: nowrap;
    outline: none;
    border: none;
    pointer-events: none;
  }
  .tab-wrapper input:focus {
    pointer-events: all;
  }

  .tab.active ~ .tab-wrapper input {
    color: var(--bg);
  }

  .close-button {
    pointer-events: all;
    width: 24px;
    height: 24px;
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
    width: 12px;
    height: 12px;
  }
  .close-icon,
  .close-button:hover .close-icon {
    background-color: var(--text);
  }
  .tab.active ~ .tab-wrapper .close-button:not(:hover) .close-icon {
    background-color: var(--bg);
  }
  .tab.active ~ .tab-wrapper .close-button:hover .close-icon {
    background-color: var(--main);
  } */

  .preventHover * {
    pointer-events: none !important;
  }
</style>
