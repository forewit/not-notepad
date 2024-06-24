<script lang="ts">
  // TODO: implement tab re-ordering
  // TODO: re-implement svelte transitions as custom animations to make them smoother

  import "$lib/styles/theme.css";
  import { base } from "$app/paths";
  import Tab from "$lib/components/Tab.svelte";
  import Button from "$lib/components/Button.svelte";
  import { tabsStore, tabsHandlers } from "../stores/tabsStore";
  import type { TabData } from "../stores/tabsStore";
  import { cubicIn, cubicOut, cubicInOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { animateCSS, animateSimple } from "$lib/modules/animate";
  import { flip } from "svelte/animate";

  const SWAP_DURATION_MS = 200; //200;
  const MIN_DRAG_DISTANCE = 12; //12
  const TAB_MAX_WIDTH = 140;
  const TAB_MIN_WIDTH = 70;
  const TAB_ANIMATION_DURATION = 160; //160
  const TAB_RESIZE_DELAY = 1600; //1600
  const TAB_SCROLL_SPEED = 0.3; //10

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

  // a debounce function that only triggers on the leading edge
  function debounce_leading(func: Function, timeout = 300) {
    //@ts-ignore
    let timer;
    //@ts-ignore
    return (...args) => {
      //@ts-ignore
      if (!timer) {
        //@ts-ignore
        func.apply(this, args);
      }
      //@ts-ignore
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
      }, timeout);
    };
  }

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

  const closeTab = (index: number) => {
    // TODO: decide what to do when the last tab is closed
    //if ($tabsStore.tabs.length == 1) return;
    if (!tabElms[index]) {
      console.warn("Cannot close tab!");
      return;
    }

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
  };

  const moveTab = (fromIndex: number, toIndex: number) => {
    const width = tabElms[0].getBoundingClientRect().width;
    console.log(fromIndex, toIndex);

    tabsHandlers.moveTab(fromIndex, toIndex, () => {
      // example where fromIndex > toIndex: [A, B, C, D] move  index 3 to index 1
      // expected output: [A, D, B, C]
      if (fromIndex > toIndex) {
        for (let i = toIndex; i < fromIndex; i++) {
          animateCSS(tabElms[i], {
            duration: TAB_ANIMATION_DURATION,
            easing: cubicInOut,
            css: (t: number, u: number) => {
              return `transform: translateX(-${u * width}px);`;
            },
          });
        }
      }

      // example where fromIndex < toIndex: [A, B, C, D] move index 1 to index 3
      // expected output: [A, C, D, B]
      if (fromIndex < toIndex) {
        for (let i = toIndex; i > fromIndex; i--) {
          animateCSS(tabElms[i], {
            duration: TAB_ANIMATION_DURATION,
            easing: cubicInOut,
            css: (t: number, u: number) => {
              return `transform: translateX(${u * width}px);`;
            },
          });
        }
      }
    });
  };

  let startPosition: [number, number] | null = null;
  let draggedTabIndex = -1;
  let draggedTabData: TabData = { id: -1, title: "", text: "" };
  let original: HTMLElement;
  let originalRect: DOMRect;
  let clone: HTMLElement;
  let dragging = false;
  let draggingOutside = false;
  let offsetX = 0;
  let offsetY = 0;
  let scrollBy = 0;
  let toolbarContainerElm: HTMLElement;

  function draggingTab(x: number, y: number) {
    clone.style.left = `${x + offsetX}px`;
    clone.style.top = `${originalRect.top}px`;

    // check if you are dragging outside the toolbar
    let toolbarRect = toolbarContainerElm.getBoundingClientRect();
    if (
      x < toolbarRect.left ||
      x > toolbarRect.right ||
      y < toolbarRect.top ||
      y > toolbarRect.bottom
    ) {
      if (!draggingOutside) {
        // was dragging inside the toolbar but now dragging outside
        console.log("out");
        scrollBy = 0;

        // TODO: trigger drag and drop events
        clone.addEventListener("dragstart", dragstartHandler);
        clone.dispatchEvent(new Event("dragstart"));
      }

      // dragging outside the toolbar
      clone.style.top = `${y + offsetY}px`;
      draggingOutside = true;
      return;
    }

    // dragging inside the toolbar
    if (draggingOutside) {
      // was dragging outside the toolbar but now dragging inside the toolbar
      draggingOutside = false;
      console.log("in");
    }

    const farLeft = -tabsElm.scrollLeft;
    const tabWidth = tabElms[0].getBoundingClientRect().width;

    let moveToIndex = -1;

    if (x > farLeft + $tabsStore.tabs.length * tabWidth) {
      moveToIndex = $tabsStore.tabs.length - 1;
    } else {
      for (let i = 0; i < $tabsStore.tabs.length; i++) {
        if (x > farLeft + i * tabWidth && x < farLeft + (i + 1) * tabWidth) {
          moveToIndex = i;
          break;
        }
      }
    }

    if (x < 20) {
      scrollBy = -TAB_SCROLL_SPEED;
      requestAnimationFrame(scrollWhileDragging);
    } else if (x > tabsElm.clientWidth - 10) {
      scrollBy = TAB_SCROLL_SPEED;
      requestAnimationFrame(scrollWhileDragging);
    } else {
      scrollBy = 0;
    }

    if (moveToIndex == -1) return;
    moveTab($tabsStore.placeholderIndex, moveToIndex);
  }

  let last = 0;
  function scrollWhileDragging(timestamp: number) {
    if (!dragging || scrollBy == 0) {
      last = 0;
      return;
    }

    if (last == 0) last = timestamp;
    const elapsed = (timestamp - last);
    last = timestamp;
    
    tabsElm.scrollBy({ left: scrollBy * elapsed });
    requestAnimationFrame(scrollWhileDragging);
  }

  function dragstartHandler(e: DragEvent) {
    //console.warn("drag events not implemented");
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
    originalRect = original.getBoundingClientRect();
    startPosition = [e.clientX, e.clientY];
    offsetX = originalRect.left - e.clientX;
    offsetY = originalRect.top - e.clientY;
    clone.style.width = `${originalRect.width}px`;
    clone.style.left = `${originalRect.left}px`;
    clone.style.top = `${originalRect.top}px`;
    draggedTabData = { ...$tabsStore.tabs[index] };
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
    </div>
    <div bind:this={clone} class="clone" class:dragging>
      <Tab title={draggedTabData.title} active={!draggingOutside} />
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
    height: var(--toolbar-height);
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
      background-color: var(--slight-transparent);
      border-radius: 100vw;
    }
    .tabs::-webkit-scrollbar-button {
      width: 0.15rem;
    }
  }

  .tab-container {
    height: var(--tab-height);
    padding-inline: calc(var(--tab-gaps) / 2);
  }
  .tab-container.placeholder {
    content-visibility: hidden;
  }

  .clone {
    height: var(--tab-height);
    position: fixed;
    display: none;
    top: 0;
    left: 0;
  }
  .clone.dragging {
    display: block;
  }
</style>
