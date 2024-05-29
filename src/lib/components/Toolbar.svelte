<script lang="ts">
  // TODO: implement tab re-ordering

  import "$lib/styles/theme.css";
  import { base } from "$app/paths";
  import Tab from "$lib/components/Tab.svelte";
  import Button from "$lib/components/Button.svelte";
  import { tabsStore, tabsHandlers } from "../stores/tabsStore";
  import { cubicIn, cubicOut, cubicInOut } from "svelte/easing";

  const SWAP_DURATION_MS = 200; //200;
  const EXPAND_IN_DURATION_MS = 120; //120;
  const EXPAND_OUT_DURATION_MS = 80; //80;

  let tabsElm: HTMLDivElement;
  let lockWidth = 0;

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

  function expandIn(root: HTMLElement) {
    let rect = root.getBoundingClientRect();
    return {
      duration: EXPAND_IN_DURATION_MS,
      easing: cubicOut,
      css: (t: number) => `width: ${rect.width * t}px;`,
    };
  }
  function expandOut(root: HTMLElement) {
    let rect = root.getBoundingClientRect();
    root.querySelector(".tab")?.classList.remove("active");
    return {
      duration: EXPAND_OUT_DURATION_MS,
      easing: cubicIn,
      css: (t: number) => `width: ${rect.width * t}px;`,
    };
  }

  function handleClickingOnTab(index: number) {
    tabsHandlers.setActiveIndex(index);
    tabsElm.children[index].scrollIntoView({ behavior: "smooth" });
  }

  function handleClickingNewTab() {
    tabsHandlers.newTab();

    setTimeout(() => {
      tabsElm.scrollBy({ left: tabsElm.scrollWidth, behavior: "smooth" });
    });
  }

  const resetLockWidth = debounce(() => {
    lockWidth = 0;
  }, 1000);

  function closeTab(index: number) {
    // TODO: decide what to do when the last tab is closed
    if ($tabsStore.tabs.length == 1) return;

    if (index < $tabsStore.tabs.length - 1) {
      lockWidth = tabsElm.children[0].clientWidth;
      tabsElm.style.setProperty("--lock-width", `${lockWidth}px`);
      resetLockWidth();
    }

    tabsHandlers.removeTab(index);
  }

  function animateSwap(node: HTMLElement, from: DOMRect, to: DOMRect) {
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    const [ox, oy] = style.transformOrigin.split(" ").map(parseFloat);
    const dx = from.left + (from.width * ox) / to.width - (to.left + ox);

    let start: number;

    function step(timeStamp: number) {
      if (start === undefined) start = timeStamp;
      const u = 1 - cubicInOut((timeStamp - start) / SWAP_DURATION_MS);

      if (u > 0) {
        node.style.cssText = `transform: ${transform} translateX(${dx * u}px);`;
        requestAnimationFrame(step);
      } else {
        node.style.cssText = "";
      }
    }

    requestAnimationFrame(step);
  }

  const swap = (index1: number, index2: number) => {
    const node1 = tabsElm.children[index1] as HTMLElement;
    const node2 = tabsElm.children[index2] as HTMLElement;
    const rect1 = node1.getBoundingClientRect();
    const rect2 = node2.getBoundingClientRect();
    console.log("swapping " + index1 + " and " + index2);

    tabsHandlers.swapTabs(index1, index2, () => {
      animateSwap(node1, rect1, rect2);
      animateSwap(node2, rect2, rect1);
    });
  };
</script>

<div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="toolbar"
    on:click|self={() => {
      swap(0, 1);
    }}
  >
    <div class="tabs" bind:this={tabsElm}>
      {#each $tabsStore.tabs as tab, i (tab)}
        <div
          class="tab-container"
          class:lockMaxWidth={lockWidth > 0}
          in:expandIn
          out:expandOut
        >
          <Tab
            bind:title={$tabsStore.tabs[i].title}
            active={$tabsStore.activeIndex == i}
            onClose={() => closeTab(i)}
            onClick={() => handleClickingOnTab(i)}
          />
        </div>
      {/each}
    </div>

    <div class="buttons">
      <Button url="{base}/images/svg/plus.svg" onClick={handleClickingNewTab}
      ></Button>
    </div>
  </div>
  <div class="separator"></div>
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
    margin-bottom: 4px;
    margin-left: -4px;
  }

  .tab-container {
    width: 140px;
    min-width: 40px;
  }
  .tab-container.lockMaxWidth {
    /* transition: width 80ms ease-out; */
    width: var(--lock-width);
  }

  .tabs {
    overscroll-behavior-inline: contain;
    position: relative;
    overflow-x: scroll;
    max-width: max-content;
    display: flex;
    gap: 5px;
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
</style>
