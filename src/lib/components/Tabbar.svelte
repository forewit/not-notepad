<script lang="ts">
  import "$lib/styles/theme.css";
  import { base } from "$app/paths";
  import Tab from "$lib/components/Tab.svelte";
  import { tabsStore, tabsHandlers } from "../stores/tabsStore";
  import { cubicInOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { animateCSS, animateSimple } from "$lib/modules/animate";

  const MIN_DRAG_DISTANCE = 12;
  const TAB_MAX_WIDTH = 140; // update in .tabs css also
  const TAB_MIN_WIDTH = 70; // update in .tabs css also
  const TAB_ANIMATION_DURATION = 200;
  const TAB_RESIZE_DELAY = 1600;
  const TAB_SCROLL_SPEED = 0.3;

  export let logout = () => {};

  let tabsElm: HTMLDivElement;
  let tabElms: HTMLElement[] = [];
  let lockWidth = 0;
  let startPosition: [number, number] | null = null;
  let draggedTabIndex = -1;
  let draggedTabTitle = "";
  let original: HTMLElement;
  let originalRect: DOMRect;
  let clone: HTMLElement;
  let dragging = false;
  let draggingOutside = false;
  let offsetX = 0;
  let offsetY = 0;
  let scrollBy = 0;
  let tabbarContainerElm: HTMLElement;
  let preventHover = false;

  // Utility functions
  const debounce = (func: Function, timeout = 300) => {
    // @ts-ignore
    let timer;
    // @ts-ignore
    return (...args) => {
      // @ts-ignore
      clearTimeout(timer);
      timer = setTimeout(() => {
        // @ts-ignore
        func.apply(this, args);
      }, timeout);
    };
  };

  function debounce_leading(func: Function, timeout = 300) {
    // @ts-ignore
    let timer;
    // @ts-ignore
    return (...args) => {
      // @ts-ignore
      if (!timer) {
        // @ts-ignore
        func.apply(this, args);
      }
      // @ts-ignore
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
      }, timeout);
    };
  }

  // Tab management functions
  function selectTab(index: number) {
    tabsHandlers.setActiveIndex(index);
    tabsElm.children[index].scrollIntoView({ behavior: "smooth" });
  }

  function newTab() {
    tabsHandlers.newTab();
  }

  const closeTab = (index: number) => {
    if (!tabElms[index]) {
      console.warn("Cannot close tab!");
      return;
    }

    lockWidth = tabElms[index].getBoundingClientRect().width;

    if (index < $tabsStore.tabs.length - 1) {
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

  const unlockWidth = debounce(() => {
    if (!tabsElm) return;
    tabsElm.style.setProperty("--tab-max-width", `${TAB_MAX_WIDTH}px`);

    animateSimple({
      duration: TAB_ANIMATION_DURATION,
      easing: cubicInOut,
      onStep: (t: number, u: number) => {
        tabsElm.style.setProperty(
          "--tab-max-width",
          `${lockWidth + t * (TAB_MAX_WIDTH - lockWidth)}px`
        );
      },
      onEnd: () => {
        tabsElm.style.setProperty("--tab-max-width", `${TAB_MAX_WIDTH}px`);
      },
    });
  }, TAB_RESIZE_DELAY);

  // Animation functions
  function animateTabOpening(element: HTMLElement) {
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

  const animateMovingTab = (fromIndex: number, toIndex: number) => {
    const width = tabElms[0].getBoundingClientRect().width;

    tabsHandlers.moveTab(fromIndex, toIndex, () => {
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

  // Drag-and-drop handlers
  function dragstartHandler(e: DragEvent) {
    if (!e.target || !e.dataTransfer) return;
    e.dataTransfer.setData("text/plain", draggedTabIndex.toString());
    e.dataTransfer.setDragImage(new Image(), 0, 0);
  }

  function dragTab(x: number, y: number) {
    if (x == 0 && y == 0) {
      clone.style.left = `-1000px`;
      clone.style.top = `-1000px`;
      return;
    }

    let tabbarRect = tabbarContainerElm.getBoundingClientRect();
    if (
      x < tabbarRect.left ||
      x > tabbarRect.right ||
      y < tabbarRect.top ||
      y > tabbarRect.bottom
    ) {
      if (!draggingOutside) {
        // Was dragging inside the tabbar, now outside
        scrollBy = 0;
      }

      // Dragging outside the tabbar
      clone.style.left = `${x + offsetX}px`;
      clone.style.top = `${y + offsetY}px`;
      draggingOutside = true;
      return;
    }

    // Was dragging outside the tabbar, now inside
    if (draggingOutside) {
      draggingOutside = false;
    }

    // Dragging inside the tabbar
    clone.style.left = `${x + offsetX}px`;
    clone.style.top = `${originalRect.top}px`;

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

    if (moveToIndex == -1 || moveToIndex == $tabsStore.placeholderIndex) return;
    animateMovingTab($tabsStore.placeholderIndex, moveToIndex);
  }

  let last = 0;
  function scrollWhileDragging(timestamp: number) {
    if (!dragging || scrollBy == 0) {
      last = 0;
      return;
    }

    if (last == 0) last = timestamp;
    const elapsed = timestamp - last;
    last = timestamp;

    tabsElm.scrollBy({ left: scrollBy * elapsed });
    requestAnimationFrame(scrollWhileDragging);
  }

  // Touch and mouse handlers
  function pointerDownHandler(e: MouseEvent | TouchEvent, index: number) {
    if (!e.target) return;
    let x: number;
    let y: number;
    if (e instanceof TouchEvent) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
      e.preventDefault();
    } else {
      x = e.clientX;
      y = e.clientY;
    }

    window.addEventListener("touchmove", pointerMoveHandler, {
      passive: false,
    });
    window.addEventListener("touchend", pointerUpHandler);
    window.addEventListener("mousemove", pointerMoveHandler);
    window.addEventListener("mouseup", pointerUpHandler);
    window.addEventListener("drag", pointerMoveHandler);
    window.addEventListener("dragend", pointerUpHandler);
    window.addEventListener("blur", pointerUpHandler);

    tabsHandlers.setActiveIndex(index);

    original = e.target as HTMLElement;
    originalRect = original.getBoundingClientRect();
    startPosition = [x, y];
    offsetX = originalRect.left - x;
    offsetY = originalRect.top - y;
    clone.style.width = `${originalRect.width}px`;
    clone.style.left = `${originalRect.left}px`;
    clone.style.top = `${originalRect.top}px`;
    draggedTabIndex = index;
    draggedTabTitle = $tabsStore.tabs[index].title;
  }

  function pointerMoveHandler(e: MouseEvent | TouchEvent) {
    let x: number;
    let y: number;
    if (e instanceof TouchEvent) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
      e.preventDefault();
    } else {
      x = e.clientX;
      y = e.clientY;
    }

    if (dragging) {
      dragTab(x, y);
      return;
    }
    if (startPosition === null) return;

    let distance = Math.hypot(startPosition[0] - x, startPosition[1] - y);

    if (distance < MIN_DRAG_DISTANCE) return;
    dragging = true;
    tabsHandlers.setPlaceholderIndex(draggedTabIndex);
    tabsHandlers.setActiveIndex(draggedTabIndex);
  }

  function pointerUpHandler() {
    window.removeEventListener("touchmove", pointerMoveHandler);
    window.removeEventListener("touchend", pointerUpHandler);
    window.removeEventListener("mousemove", pointerMoveHandler);
    window.removeEventListener("mouseup", pointerUpHandler);
    window.removeEventListener("drag", pointerMoveHandler);
    window.removeEventListener("dragend", pointerUpHandler);
    window.removeEventListener("blur", pointerUpHandler);

    startPosition = null;
    draggingOutside = false;
    draggedTabIndex = -1;
    offsetX = 0;
    offsetY = 0;
    tabsHandlers.setPlaceholderIndex(); // TODO: make placeholderIndex it's own store so that it doesn't trigger updates to tabStore
    dragging = false;
  }

  // Reactive statement for hover prevention
  $: if (!dragging) {
    setTimeout(() => (preventHover = false), 20);
  } else preventHover = true;

  // On mount setup
  onMount(() => {
    tabsElm.style.setProperty("--tab-max-width", `${TAB_MAX_WIDTH}px`);
    tabsElm.style.setProperty("--tab-min-width", `${TAB_MIN_WIDTH}px`);
  });
</script>

<div bind:this={tabbarContainerElm}>
  <div class="tabbar">
    <div class="tabs" bind:this={tabsElm}>
      {#each $tabsStore.tabs as tab, i (tab)}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          bind:this={tabElms[i]}
          class="tab-container"
          class:placeholder={$tabsStore.placeholderIndex == i}
          use:animateTabOpening
        >
          <Tab
            bind:title={$tabsStore.tabs[i].title}
            active={$tabsStore.activeIndex == i}
            {preventHover}
            onClose={() => closeTab(i)}
            onPointerdown={(e) => pointerDownHandler(e, i)}
            onDragstart={dragstartHandler}
          />
        </div>
      {/each}
    </div>

    <div class="new-tab-container">
      <button class="button" on:click={newTab}>
        <div
          class="button-icon"
          style="-webkit-mask: url({base}/images/svg/plus.svg) no-repeat center / contain;
        mask: url({base}/images/svg/plus.svg) no-repeat center / contain;"
        ></div>
      </button>
    </div>
    <div class="logout-container">
      <button class="logout button" on:click={logout}>
        <div
          class="button-icon"
          style="-webkit-mask: url({base}/images/svg/logout.svg) no-repeat center / contain;
      mask: url({base}/images/svg/logout.svg) no-repeat center / contain;"
        ></div>
      </button>
    </div>
    
    <div bind:this={clone} class="clone" class:dragging>
      <Tab title={draggedTabTitle} active={!draggingOutside} preventHover />
    </div>
  </div>
  <div class="separator"></div>
</div>

<style>
  .tabbar {
    background-color: var(--tabbar-background-color);
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr 40px;
    align-items: end;
    height: var(--tabbar-height);
  }

  .separator {
    background-color: var(--tab-active-color);
    height: var(--tabbar-scrollbar-size);
  }

  .new-tab-container {
    margin-bottom: var(--tab-gaps);
    display: flex;
  }
  .logout-container {
    margin-bottom: var(--tab-gaps);
  }

  .tabs {
    --tab-max-width: 140px;
    --tab-min-width: 70px;
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(var(--tab-min-width), var(--tab-max-width));
    gap: var(--tab-gaps);
    overflow-x: scroll;
    padding-inline: calc(var(--tab-radius) + 8px) var(--tab-radius);
  }

  .tabs::-webkit-scrollbar {
    display: none;
  }

  @supports (scrollbar-width: thin) {
    .tabs {
      margin-bottom: calc(-1 * var(--tabbar-scrollbar-size));
    }
    .tabs::-webkit-scrollbar {
      height: var(--tabbar-scrollbar-size);
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
    opacity: 1;
  }
  .tab-container.placeholder {
    opacity: 0;
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
    z-index: 1;
  }

  .button {
    width: 1.7em;
    aspect-ratio: 1;
    margin: 4px;
    margin-inline-end: 14px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;
  }
  .button:hover {
    background-color: var(--tab-hover-color);
  }
  .button:active {
    opacity: 0.8;
  }

  .button-icon {
    background-color: var(--ui-color);
    width: 0.9em;
    aspect-ratio: 1;
  }
</style>
