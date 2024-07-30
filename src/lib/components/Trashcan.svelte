<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { base } from "$app/paths";
  import { scale } from "svelte/transition";

  export let throwAway = () => {};

  let trashcanElm: HTMLDivElement;
  let overTrashcan = false;

  const pointerMoveHandler = (e: MouseEvent | TouchEvent) => {
    const rect = trashcanElm.getBoundingClientRect();
    const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const y = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      overTrashcan = false;
      return;
    }

    overTrashcan = true;
  };

  const pointerupHandler = (e: MouseEvent | TouchEvent) => {
    const rect = trashcanElm.getBoundingClientRect();
    const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const y = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      overTrashcan = false;
      return;
    }

    throwAway();
  };

  onMount(() => {
    window.addEventListener("mousemove", pointerMoveHandler);
    window.addEventListener("touchmove", pointerMoveHandler);
    window.addEventListener("drag", pointerMoveHandler);
    window.addEventListener("dragend", pointerupHandler);
    window.addEventListener("mouseup", pointerupHandler);
    window.addEventListener("touchend", pointerupHandler);
  });
  onDestroy(() => {
    window.removeEventListener("mousemove", pointerMoveHandler);
    window.removeEventListener("touchmove", pointerMoveHandler);
    window.removeEventListener("drag", pointerMoveHandler);
    window.removeEventListener("dragend", pointerupHandler);
    window.removeEventListener("mouseup", pointerupHandler);
    window.removeEventListener("touchend", pointerupHandler);
  });
</script>

<div
  transition:scale={{ duration: 200 }}
  class="trashcan"
  bind:this={trashcanElm}
>
  <div
    class="trashcan-icon"
    class:overTrashcan
    style="-webkit-mask: url({base}/images/svg/trash.svg) no-repeat center / contain;
        mask: url({base}/images/svg/trash.svg) no-repeat center / contain;"
  ></div>
</div>

<style>
  .trashcan {
    height: 60px;
    width: 60px;
    background-color: var(--error);
    font-size: var(--ui-font-size);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color var(--transition-speed);
  }
  .trashcan-icon {
    height: 30px;
    width: 30px;
    background-color: var(--bg-alt);
    transition: scale var(--transition-speed);
  }

  .trashcan-icon.overTrashcan {
    scale: 1.2;
  }
</style>
