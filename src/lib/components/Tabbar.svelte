<script lang="ts">
  import { base } from "$app/paths";
  import Tab from "$lib/components/Tab.svelte";
  import { tabsStore, tabsHandlers } from "$lib/stores/tabsStore";
  import { metadataStore } from "$lib/stores/metadataStore";
  import { cubicInOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { animateCSS, animateSimple } from "$lib/modules/animate";

  const MIN_DRAG_DISTANCE = 12;
  const TAB_MAX_WIDTH = 200; // if you change this, update in css also
  const TAB_MIN_WIDTH = 32; // if you change this, update in css also
  const TAB_ANIMATION_DURATION = 200;
  const TAB_RESIZE_DELAY = 1600;
  const TAB_SCROLL_SPEED = 0.3;

  export const closeActiveTab = () => {
    closeTab($metadataStore.order[$metadataStore.activeIndex]);
  };

  $: activeTabID = $metadataStore.order[$metadataStore.activeIndex];
  $: placeholderTabID = $metadataStore.order[$metadataStore.placeholderIndex];

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

  function newTab() {
    tabsHandlers.newTab();
  }

  const closeTab = (id: string) => {
    const index = $metadataStore.order.findIndex((tab) => tab === id);

    if (index < 0 || !tabElms[index]) {
      console.warn("Cannot close tab!");
      return;
    }

    lockWidth = tabElms[index].getBoundingClientRect().width;

    if (index < $metadataStore.order.length - 1) {
      tabsElm.style.setProperty("--tab-max-width", `${lockWidth}px`);
      unlockWidth();
    }

    // pre-emtive tab switching if you close the active tab
    if (index == $metadataStore.activeIndex) {
      if (index == $metadataStore.order.length - 1)
        tabsHandlers.setActiveIndex(index - 1);
      else tabsHandlers.setActiveIndex(index + 1);
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
        tabsHandlers.removeTab(id);
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
        if ($metadataStore.order.length == 1)
          tabsElm.style.gridTemplateColumns = `minmax(${t * TAB_MIN_WIDTH}px, ${t * targetWidth}px)`;
        else
          tabsElm.style.gridTemplateColumns = `repeat(${$metadataStore.order.length - 1}, minmax(var(--tab-min-width), var(--tab-max-width))) minmax(${t * TAB_MIN_WIDTH}px, ${t * targetWidth}px)`;
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
    e.dataTransfer.setData("text/plain", activeTabID);
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
      clone.style.left = `${x + offsetX}px`; // or x + offsetX
      clone.style.top = `${y - originalRect.height / 2}px`; // or y + offsetY
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

    if (x > farLeft + $metadataStore.order.length * tabWidth) {
      moveToIndex = $metadataStore.order.length - 1;
    } else {
      for (let i = 0; i < $metadataStore.order.length; i++) {
        if (x > farLeft + i * tabWidth && x < farLeft + (i + 1) * tabWidth) {
          moveToIndex = i;
          break;
        }
      }
    }

    if (x < 20) {
      scrollBy = -TAB_SCROLL_SPEED;
      requestAnimationFrame(keepScrollingWhileDragging);
    } else if (x > tabsElm.clientWidth - 10) {
      scrollBy = TAB_SCROLL_SPEED;
      requestAnimationFrame(keepScrollingWhileDragging);
    } else {
      scrollBy = 0;
    }

    if (moveToIndex == -1 || moveToIndex == $metadataStore.placeholderIndex)
      return;
    animateMovingTab($metadataStore.placeholderIndex, moveToIndex);
  }

  let last = 0;
  function keepScrollingWhileDragging(timestamp: number) {
    if (!dragging || scrollBy == 0) {
      last = 0;
      return;
    }

    if (last == 0) last = timestamp;
    const elapsed = timestamp - last;
    last = timestamp;

    tabsElm.scrollBy({ left: scrollBy * elapsed });
    requestAnimationFrame(keepScrollingWhileDragging);
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
    draggedTabTitle = $tabsStore[$metadataStore.order[index]].title;
  }

  function pointerMoveHandler(e: MouseEvent | TouchEvent) {
    let x: number;
    let y: number;
    if (e instanceof TouchEvent) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
      //e.preventDefault();
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
    tabsHandlers.setPlaceholderIndex(); // TODO?: make placeholderIndex it's own store so that it doesn't trigger updates to tabStore
    dragging = false;
  }

  $: if (dragging) {
    preventHover = true;
  } else {
    // Reset hover prevention after 20ms to prevent flickering
    setTimeout(() => {
      preventHover = false;
    }, 20);
  }

  $: if (draggingOutside) {
    $metadataStore.trashcanVisible = true;
  } else {
    $metadataStore.trashcanVisible = false;
  }

  // On mount setup
  onMount(() => {
    tabsElm.style.setProperty("--tab-max-width", `${TAB_MAX_WIDTH}px`);
    tabsElm.style.setProperty("--tab-min-width", `${TAB_MIN_WIDTH}px`);
  });
</script>

<div bind:this={tabbarContainerElm}>
  <div class="tabbar">
    <div class="tabs" bind:this={tabsElm}>
      {#each $metadataStore.order as id, i (id)}
        <div
          bind:this={tabElms[i]}
          class="tab-container"
          class:placeholder={placeholderTabID == id}
          use:animateTabOpening
        >
          <Tab
            bind:title={$tabsStore[id].title}
            active={activeTabID == id}
            {preventHover}
            onPointerdown={(e) => pointerDownHandler(e, i)}
            onDragstart={dragstartHandler}
          />
        </div>
      {/each}
    </div>

    <div class="new-tab-container">
      <button class="button" on:click={newTab}>
        <span
          class="button-icon"
          style="-webkit-mask: url({base}/images/svg/plus.svg) no-repeat center / contain;
        mask: url({base}/images/svg/plus.svg) no-repeat center / contain;"
        ></span>
      </button>
    </div>

    <div class="buttons-container">
      <button
        class="button"
        on:click={() => {
          $metadataStore.toolbarVisible = !$metadataStore.toolbarVisible;
          if (!$metadataStore.toolbarVisible)
            $metadataStore.tool = undefined;
        }}
      >
        <span
          class="button-icon"
          style="-webkit-mask: url({base}/images/svg/gear.svg) no-repeat center / contain;
      mask: url({base}/images/svg/gear.svg) no-repeat center / contain;"
        ></span>
      </button>
    </div>

    <div bind:this={clone} class="clone" class:draggingOutside class:dragging>
      <Tab title={draggedTabTitle} active={!draggingOutside} preventHover />
    </div>
  </div>
  <div class="divider"></div>
</div>

<style>
  * {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
  }

  .tabbar {
    background-color: var(--bg);
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: end;
    height: var(--tabbar-height);
  }

  .divider {
    background-color: var(--main);
    height: var(--tabbar-divider-size);
  }

  .new-tab-container {
    margin-bottom: var(--tab-gaps);
    margin-right: var(--tab-gaps);
    display: flex;
  }
  .buttons-container {
    margin-bottom: var(--tab-gaps);
    margin-right: calc(var(--tab-gaps) + var(--safe-area-inline));
  }

  .tabs {
    --tab-max-width: 200px; /* update in JS also*/
    --tab-min-width: 32px; /* update in JS also*/
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(var(--tab-min-width), var(--tab-max-width));
    gap: var(--tab-gaps);
    overflow-x: scroll;
    padding-inline: calc(var(--tab-radius) + var(--safe-area-inline))
      var(--tab-radius);
    scrollbar-width: none;
  }

  .tabs::-webkit-scrollbar {
    display: none;
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
    z-index: 2;
  }
  .clone.draggingOutside {
    opacity: 0.7;
  }

  .button {
    font-size: var(--ui-font-size);
    width: 1.7em;
    height: 1.7em;
    margin: 4px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color var(--transition-speed);
    transition: opacity var(--transition-speed);
  }
  .button:active {
    background-color: var(--bg-alt);
  }
  .button-icon {
    width: 1em;
    height: 1em;
    background-color: var(--text);
  }
</style>
