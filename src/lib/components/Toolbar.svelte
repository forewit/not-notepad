<script lang="ts">
  // TODO: implement tab re-ordering

  import "$lib/styles/theme.css";
  import { base } from "$app/paths";
  import Tab from "$lib/components/Tab.svelte";
  import Button from "$lib/components/Button.svelte";
  import { tabsStore, tabsHandlers } from "../stores/tabsStore";
  import { quadIn, quadOut } from "svelte/easing";

  function expandIn(root: HTMLElement) {
    let rect = root.getBoundingClientRect();
    return {
      duration: 120,
      easing: quadOut,
      css: (t: number) => `max-width: ${rect.width * t}px;`,
    };
  }
  function expandOut(root: HTMLElement) {
    let rect = root.getBoundingClientRect();
    root.querySelector(".tab")?.classList.remove("active");
    return {
      duration: 80,
      easing: quadIn,
      css: (t: number) => `max-width: ${rect.width * t}px;`,
    };
  }

  interface SwapParams {
    delay?: number;
    duration?: number | ((len: number) => number);
    easing?: (t: number) => number;
    index?: number;
  }

  function swap(
    node: HTMLElement,
    { from, to }: { from: DOMRect; to: DOMRect },
    params: SwapParams = {}
  ) {
    console.log(params.index);
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    const [ox, oy] = style.transformOrigin.split(" ").map(parseFloat);
    const dx = from.left + (from.width * ox) / to.width - (to.left + ox);
    const dy = from.top + (from.height * oy) / to.height - (to.top + oy);
    const {
      delay = 0,
      duration = (d) => Math.sqrt(d) * 120,
      easing = quadOut,
    } = params;
    return {
      delay,
      duration:
        typeof duration === "function"
          ? duration(Math.sqrt(dx * dx + dy * dy))
          : duration,
      easing,
      css: (t: number, u: number) => {
        const x = u * dx;
        const y = u * dy;
        const sx = t + (u * from.width) / to.width;
        const sy = t + (u * from.height) / to.height;
        return `transform: ${transform} translate(${x}px, ${y}px) scale(${sx}, ${sy});`;
      },
    };
  }

  function foo(node: HTMLElement) {
    // the node has been mounted in the DOM
    //console.log("created", node);

    return {
      destroy() {
        // the node has been removed from the DOM
        //console.log("destroyed", node);
      },
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

  const debouncedClosingTabs = debounce(() => {
    lockWidth = 0;
  }, 1000);

  function closeTab(index: number) {
    // TODO: decide what to do when the last tab is closed
    if ($tabsStore.tabs.length == 1) return;

    if (index < $tabsStore.tabs.length - 1) {
      lockWidth = tabsElm.children[0].clientWidth;
      tabsElm.style.setProperty("--lock-width", `${lockWidth}px`);
      debouncedClosingTabs();
    }

    tabsHandlers.removeTab(index);
  }

  let tabsElm: HTMLDivElement;
  let lockWidth = 0;

  function test() {
    tabsHandlers.swapTabs(0, 1, () => {
      console.log("swapped");
    });
  }
</script>

<div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="toolbar" on:click|self={test}>
    <div class="tabs" bind:this={tabsElm}>
      {#each $tabsStore.tabs as tab, i (tab)}
        <div
          class="tab-container"
          class:lockMaxWidth={lockWidth > 0}
          in:expandIn
          out:expandOut
          use:foo
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
