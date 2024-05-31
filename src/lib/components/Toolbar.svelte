<script lang="ts">
  // TODO: implement tab re-ordering
  // TODO: re-implement svelte transitions as custom animations to make them smoother

  import "$lib/styles/theme.css";
  import { base } from "$app/paths";
  import Tab from "$lib/components/Tab.svelte";
  import Button from "$lib/components/Button.svelte";
  import { tabsStore, tabsHandlers } from "../stores/tabsStore";
  import { cubicIn, cubicOut, cubicInOut } from "svelte/easing";
  import {animateCSS} from "$lib/modules/animate";

  const SWAP_DURATION_MS = 200; //200;
  const TAB_IN_DURATION_MS = 200; //200;
  const TAB_OUT_DURATION_MS = 200; //200;
  const TAB_RESIZE_DELAY_MS = 1600; //1600
  const MIN_DRAG_DISTANCE = 12; //12

  let tabsElm: HTMLDivElement;
  let lockWidth = 0;
  let unlockingWidth = false;

  const debounce = (func: Function, timeout = 300) => {
    //@ts-ignore
    let timer;
    //@ts-ignore
    return (...args) => {
      //@ts-ignore
      clearTimeout(timer);
      //@ts-ignore
      timer = setTimeout(() => {
        //@ts-ignore
        func.apply(this, args);
      }, timeout);
    };
  };

  function selectTab(index: number) {
    tabsHandlers.setActiveIndex(index);
    tabsElm.children[index].scrollIntoView({ behavior: "smooth" });
  }

  function newTab() {
    tabsHandlers.newTab();

    setTimeout(() => {
      tabsElm.scrollLeft = tabsElm.scrollWidth;
    });
  }

  function animateTabOpening(element: HTMLElement) {
    animateCSS(element, {
      duration: TAB_IN_DURATION_MS,
      easing: cubicInOut,
      css: (t: number, u: number) => {
        return `transform: scaleX(${t}); transform-origin: left;`;
      },
    });
  }

  const unlockWidth = debounce(() => {
    unlockingWidth = true;
    lockWidth = 0;

    setTimeout(() => {
      unlockingWidth = false;
    }, 200);
  }, TAB_RESIZE_DELAY_MS);

  function closeTab(index: number) {
    // TODO: decide what to do when the last tab is closed
    if ($tabsStore.tabs.length == 1) return;

    if (index < $tabsStore.tabs.length - 1) {
      lockWidth = tabsElm.children[0].clientWidth;
      tabsElm.style.setProperty("--lock-width", `${lockWidth}px`);
      unlockWidth();
    }

    if (index == $tabsStore.tabs.length-1) {
      tabsHandlers.setActiveIndex(index - 1);
    } else if (index == $tabsStore.activeIndex) {
      tabsHandlers.setActiveIndex(index + 1);
    }

    let width = tabsElm.children[0].getBoundingClientRect().width;
    console.log(width)
    animateCSS(tabsElm.children[index] as HTMLElement, {
      duration: TAB_OUT_DURATION_MS,
      easing: cubicInOut,
      css: (t: number, u: number) => {
        return `transform: scaleX(${u}); transform-origin: left;`//`width: ${width * u}px; min-width: 0px; margin-left: calc(${-t} * var(--tab-gaps));`;
      },
      onEnd: () => {
        tabsHandlers.removeTab(index);
      },
    });
  }

  const swap = (index1: number, index2: number) => {
    const node1 = tabsElm.children[index1] as HTMLElement;
    const node2 = tabsElm.children[index2] as HTMLElement;
    const dx =
      node1.getBoundingClientRect().left - node2.getBoundingClientRect().left;

    tabsHandlers.swapTabs(index1, index2, () => {
      animateCSS(node1, {
        duration: SWAP_DURATION_MS,
        easing: cubicInOut,
        css: (t: number, u: number) => {
          return `transform: translateX(${dx * u}px);`;
        },
      });
      animateCSS(node2, {
        duration: SWAP_DURATION_MS,
        easing: cubicInOut,
        css: (t: number, u: number) => {
          return `transform: translateX(${-dx * u}px);`;
        },
      });
    });
  };

  let startPosition: [number, number] | null = null;
  let draggedTabIndex = -1;
  let clonedElm: HTMLElement;
  let dragging = false;
  let draggingOutside = false;
  let offsetX = 0;
  let offsetY = 0;
  let toolbarContainerElm: HTMLElement;

  function drag(x: number, y: number) {
    console.log("weee!!!!");
    // check if it's inside the toolbar
    let toolbarRect = toolbarContainerElm.getBoundingClientRect();

    if (
      x < toolbarRect.left ||
      x > toolbarRect.right ||
      y < toolbarRect.top ||
      y > toolbarRect.bottom
    ) {
      if (!draggingOutside) {
        // then set the draggable property to true
        // and set the position of the cloned element
        // to the current mouse position
        clonedElm.style.cssText = ``;
        clonedElm.addEventListener("dragstart", dragstartHandler);
        clonedElm.dispatchEvent(new Event("dragstart"));
      }

      draggingOutside = true;
      return;
    }

    if (draggingOutside) {
    }

    draggingOutside = false;

    // then loop through each tab to see if it's
    // overlapping and swap it with the draggedTabIndex
    // return

    // not,
  }

  function dragstartHandler(e: DragEvent) {
    console.log("dragstart");
    if (!e.dataTransfer || !clonedElm) return;

    e.dataTransfer?.setDragImage(clonedElm, 0, 0);
    e.dataTransfer?.setData("text/plain", clonedElm.id);

    e.preventDefault();
  }

  function mousedownHandler(e: MouseEvent, index: number) {
    if (!e.target) return;
    let tabElm = e.target as HTMLElement;
    window.addEventListener("mousemove", mousemoveHandler);
    window.addEventListener("mouseup", mouseupHandler);
    window.addEventListener("blur", mouseupHandler);

    tabsHandlers.setActiveIndex(index);
    clonedElm = tabElm.cloneNode(true) as HTMLElement;
    startPosition = [e.clientX, e.clientY];
    offsetX = tabElm.getBoundingClientRect().left - e.clientX;
    offsetY = tabElm.getBoundingClientRect().top - e.clientY;
    draggedTabIndex = index;
  }

  function mousemoveHandler(e: MouseEvent) {
    if (dragging) {
      drag(e.clientX, e.clientY);
      return;
    }
    if (startPosition === null) return;

    let distance = Math.hypot(
      startPosition[0] - e.clientX,
      startPosition[1] - e.clientY
    );

    if (distance < MIN_DRAG_DISTANCE) return;
    dragging = true;
    tabsHandlers.setPlaceholderIndex(draggedTabIndex);
    tabsHandlers.setActiveIndex(draggedTabIndex);

    clonedElm.classList.add("cloned-tab");
    e.preventDefault();
    console.log("dragging tab: ", draggedTabIndex);
  }

  function mouseupHandler() {
    window.removeEventListener("mousemove", mousemoveHandler);
    window.removeEventListener("mouseup", mouseupHandler);
    window.removeEventListener("blur", mouseupHandler);
    startPosition = null;
    dragging = false;
    draggingOutside = false;
    draggedTabIndex = -1;
    offsetX = 0;
    tabsHandlers.setPlaceholderIndex();
    console.log("stop dragging");
  }
</script>

<div bind:this={toolbarContainerElm}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="toolbar">
    <div class="tabs" bind:this={tabsElm}>
      {#each $tabsStore.tabs as tab, i (tab)}
        {#if $tabsStore.placeholderIndex == i}
          <div
            class="tab-container placeholder"
            class:lockMaxWidth={lockWidth > 0}
          ></div>
        {:else}
          <div
            class="tab-container"
            class:lockMaxWidth={lockWidth > 0}
            class:unlockingWidth
            use:animateTabOpening
          >
            <Tab
              bind:title={$tabsStore.tabs[i].title}
              active={$tabsStore.activeIndex == i}
              onClose={() => closeTab(i)}
              onClick={() => selectTab(i)}
              onMousedown={(e) => mousedownHandler(e, i)}
            />
          </div>
        {/if}
      {/each}
    </div>

    <div class="buttons">
      <Button url="{base}/images/svg/plus.svg" onClick={newTab}></Button>
      <Button
        url="{base}/images/svg/swap.svg"
        onClick={() => {
          swap(0, 1);
        }}
      ></Button>
    </div>
  </div>
  <div class="separator"></div>
  {#if dragging}
    <div
      bind:this={clonedElm}
      draggable="true"
      class="cloned-tab tab-container"
    ></div>
  {/if}
</div>

<style>
  .toolbar {
    background-color: var(--toolbar-background-color);
    display: grid;
    grid-template-columns: auto 1fr;

    align-items: end;
    height: 3rem;
  }

  .separator {
    background-color: var(--tab-active-color);
    height: var(--toolbar-scrollbar-size);
  }

  .buttons {
    margin-bottom: var(--tab-gaps);
    display: flex;
  }

  .tabs {
    overscroll-behavior-inline: contain;
    position: relative;
    overflow-x: scroll;
    max-width: max-content;
    display: flex;
    gap: var(--tab-gaps);
    padding-inline: var(--tab-radius);
  }

  .tabs::-webkit-scrollbar {
    display: none;
  }

  @supports (scrollbar-width: thin) {
    .tabs {
      margin-bottom: calc(-1 * var(--toolbar-scrollbar-size));
    }
    .tabs::-webkit-scrollbar {
      height: var(--toolbar-scrollbar-size);
      display: block;
    }
    .tabs::-webkit-scrollbar-thumb {
      background-color: var(--toolbar-scrollbar-color);
      border-radius: 100vw;
    }
    .tabs::-webkit-scrollbar-button {
      width: 0.15rem;
    }
  }

  .tab-container {
    width: 140px;
    min-width: 40px;
    height: 36px;
  }
  .tab-container.lockMaxWidth {
    width: var(--lock-width);
  }
  .tab-container.unlockingWidth {
    transition: width 200ms ease-in-out;
  }

  .cloned-tab {
    position: absolute;
  }
</style>
