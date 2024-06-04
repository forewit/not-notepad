<script lang="ts">
  // TODO: implement tab re-ordering
  // TODO: re-implement svelte transitions as custom animations to make them smoother

  import "$lib/styles/theme.css";
  import { base } from "$app/paths";
  import Tab from "$lib/components/Tab.svelte";
  import Button from "$lib/components/Button.svelte";
  import { tabsStore, tabsHandlers } from "../stores/tabsStore";
  import { cubicIn, cubicOut, cubicInOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { animateCSS, animateSimple } from "$lib/modules/animate";

  const SWAP_DURATION_MS = 200; //200;
  const MIN_DRAG_DISTANCE = 1; //12
  const TAB_MAX_WIDTH = 140;
  const TAB_MIN_WIDTH = 70;
  const TAB_ANIMATION_DURATION = 160; //160
  const TAB_RESIZE_DELAY = 1600; //1600

  let tabsElm: HTMLDivElement;
  let tabElms: HTMLElement[] = [];
  let lockWidth = 0;

  onMount(() => {
    tabsElm.style.setProperty("--tab-max-width", `${TAB_MAX_WIDTH}px`);
    tabsElm.style.setProperty("--tab-min-width", `${TAB_MIN_WIDTH}px`);
  });

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
  }

  function animateTabOpening(element: HTMLElement) {
    // animate grid-template columns
    if (!tabsElm) return;
    const targetWidth = element.getBoundingClientRect().width;

    animateSimple({
      duration: TAB_ANIMATION_DURATION,
      easing: cubicInOut,
      onStep: (t: number, u: number) => {
        if ($tabsStore.tabs.length == 1)
          tabsElm.style.gridTemplateColumns = `minmax(${t * TAB_MIN_WIDTH}px, ${t * targetWidth}px)`;
        else
          tabsElm.style.gridTemplateColumns = `repeat(${$tabsStore.tabs.length - 1}, minmax(var(--tab-min-width), var(--tab-max-width))) minmax(${t * TAB_MIN_WIDTH}px, ${t * targetWidth}px)`;
        tabsElm.scrollLeft = tabsElm.scrollWidth;
      },
      onEnd: () => {
        tabsElm.style.gridTemplateColumns = "";
      },
    });
  }

  const unlockWidth = debounce(() => {
    if (!tabsElm) return;
    tabsElm.style.setProperty("--tab-max-width", `${TAB_MAX_WIDTH}px`);
    const targetWidth = tabElms[0].getBoundingClientRect().width;

    animateSimple({
      duration: TAB_ANIMATION_DURATION,
      easing: cubicInOut,
      onStep: (t: number, u: number) => {
        tabsElm.style.setProperty(
          "--tab-max-width",
          `${lockWidth + t * (targetWidth - lockWidth)}px`
        );
      },
      onEnd: () => {
        tabsElm.style.setProperty("--tab-max-width", `${TAB_MAX_WIDTH}px`);
      },
    });
  }, TAB_RESIZE_DELAY);

  function closeTab(index: number) {
    // TODO: decide what to do when the last tab is closed
    if ($tabsStore.tabs.length == 1) return;

    lockWidth = tabElms[index].getBoundingClientRect().width;

    if (index < $tabsStore.tabs.length - 1 && lockWidth < TAB_MAX_WIDTH) {
      tabsElm.style.setProperty("--tab-max-width", `${lockWidth}px`);
      unlockWidth();
    }

    if (index == $tabsStore.tabs.length - 1) {
      tabsHandlers.setActiveIndex(index - 1);
    } else if (index == $tabsStore.activeIndex) {
      tabsHandlers.setActiveIndex(index + 1);
    }

    animateSimple({
      duration: TAB_ANIMATION_DURATION,
      easing: cubicInOut,
      onStep: (t: number, u: number) => {
        if (index == 0)
          tabsElm.style.gridTemplateColumns = `minmax(${u * TAB_MIN_WIDTH}px, ${u * lockWidth}px)`;
        else
          tabsElm.style.gridTemplateColumns = `repeat(${index}, minmax(var(--tab-min-width), var(--tab-max-width))) minmax(${u * TAB_MIN_WIDTH}px, ${u * lockWidth}px)`;
      },
      onEnd: () => {
        tabsElm.style.gridTemplateColumns = "";
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
  let original: HTMLElement;
  let clone: HTMLElement;
  let dragging = false;
  let draggingOutside = false;
  let offsetX = 0;
  let offsetY = 0;
  let toolbarContainerElm: HTMLElement;

  function draggingTab(x: number, y: number) {
    console.log("weee!!!!");
    //TODO: set the cloned element's position
    clone.style.left = `${x + offsetX}px`;
    clone.style.bottom = "0";

    // check if you are dragging outside the toolbar
    let toolbarRect = toolbarContainerElm.getBoundingClientRect();
    if (
      x < toolbarRect.left ||
      x > toolbarRect.right ||
      y < toolbarRect.top ||
      y > toolbarRect.bottom
    ) {
      if (!draggingOutside) {
        // TODO: trigger drag and drop events
        clone.addEventListener("dragstart", dragstartHandler);
        clone.dispatchEvent(new Event("dragstart"));
      }

      // dragging outside the toolbar
      clone.style.bottom = `${-y + offsetY}px`;
      draggingOutside = true;
      return;
    }

    draggingOutside = false;
    // TODO: check if tabs should be swapped
  }

  function dragstartHandler(e: DragEvent) {
    console.warn("drag events not implemented");
    if (!e.dataTransfer || !clone) return;

    //TODO: figure out how to manually trigger drag events
  }

  function mousedownHandler(e: MouseEvent, index: number) {
    if (!e.target) return;
    window.addEventListener("mousemove", mousemoveHandler);
    window.addEventListener("mouseup", mouseupHandler);
    window.addEventListener("blur", mouseupHandler);

    tabsHandlers.setActiveIndex(index);

    original = e.target as HTMLElement;
    const rect = original.getBoundingClientRect();
    startPosition = [e.clientX, e.clientY];
    offsetX = rect.left - e.clientX;
    offsetY = rect.bottom - e.clientY;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.left = `${e.clientX + offsetX}px`;
    clone.style.bottom = "0";
    draggedTabIndex = index;
  }

  function mousemoveHandler(e: MouseEvent) {
    if (dragging) {
      draggingTab(e.clientX, e.clientY);
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
    offsetY = 0;
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
        <div
          bind:this={tabElms[i]}
          class="tab-container"
          class:placeholder={$tabsStore.placeholderIndex == i}
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
    <div bind:this={clone} class="clone" class:dragging>
      <Tab title={"title"} active={true} />
    </div>
  </div>
  <div class="separator"></div>
</div>

<style>
  .toolbar {
    background-color: var(--toolbar-background-color);
    position: relative;
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
    --tab-max-width: 140px;
    --tab-min-width: 70px;

    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(var(--tab-min-width), var(--tab-max-width));

    overflow-x: scroll;
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
    height: 36px;
    padding-inline: calc(var(--tab-gaps) / 2);
  }
  .tab-container.placeholder {
    content-visibility: hidden;
  }

  .clone {
    position: absolute;
    display: none;
    z-index: 1;
  }
  .clone.dragging {
    display: block;
  }
</style>
