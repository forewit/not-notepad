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
    font-weight: var(--ui-font-weight);
    height: 100%;
    display: flex;
    align-items: center;
    margin-inline: 8px;
    text-wrap: nowrap;
    overflow: hidden;
    pointer-events: none;

  }
  .tab.active .title,
  .tab:hover .title {
    color: var(--bg);
  }

  .preventHover * {
    pointer-events: none !important;
  }
</style>
