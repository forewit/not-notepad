<script lang="ts">
  import { cubicInOut } from "svelte/easing";
  import { animateSimple, animateCSS } from "$lib/modules/animate";
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";

  const TAB_WIDTH = 140;
  const TAB_MIN_WIDTH = 70;
  const TAB_ANIMATION_DURATION = 2000;
  const TAB_RESIZE_DELAY = 1600;

  let id = 0;
  let tabs: string[] = ["test2", "test"];
  let tabElms: HTMLElement[] = [];
  let tabsElm: HTMLElement;
  let lockWidth = 0;
  let targetWidth = 0;

  onMount(() => {
    tabsElm.style.setProperty("--tab-width", `${TAB_WIDTH}px`);
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

  function newTab() {
    tabs.push("new" + id++);
    tabs = tabs;
  }

  function animateTabOpening(element: HTMLElement) {
    element.scrollIntoView({ behavior: "smooth" });
    return {
      duration: TAB_ANIMATION_DURATION,
      easing: cubicInOut,
      css: (t: number, u: number) => {
        return `
        width: ${t * TAB_WIDTH}px;
        min-width: ${t * TAB_MIN_WIDTH}px;
        `;
      },
    };
  }

  function animateTabClosing(element: HTMLElement) {
    return {
      duration: TAB_ANIMATION_DURATION,
      easing: cubicInOut,
      css: (t: number, u: number) => {
        return `
        max-width: ${t * lockWidth}px;
        min-width: 0px;
        `;
      },
    };
  }

  const unlockWidth = debounce(() => {
    if (!tabsElm) return;

    animateSimple({
      duration: TAB_ANIMATION_DURATION,
      easing: cubicInOut,
      onStep: (t: number, u: number) => {
        tabsElm.style.setProperty(
          "--tab-width",
          `${lockWidth + t * (TAB_WIDTH - lockWidth)}px`
        );
      },
      onEnd: () => {
        tabsElm.style.setProperty("--tab-width", `${TAB_WIDTH}px`);
      },
    });
  }, TAB_RESIZE_DELAY);

  function closeTab(index: number) {
    lockWidth = tabElms[index].getBoundingClientRect().width;
    console.log(lockWidth);

    if (index < tabs.length - 1) {
      tabsElm.style.setProperty("--tab-width", `${lockWidth}px`);
      unlockWidth();
    }

    tabs.splice(index, 1);
    tabs = tabs;
  }
</script>

<div class="main">
  <div class="toolbar">
    <div class="tabs" bind:this={tabsElm}>
      {#each tabs as tab, i (tab)}
        <div
          bind:this={tabElms[i]}
          class="tab"
          animate:flip
        >
          <div>{tab}</div>
          <button class="closeTab" on:click={() => closeTab(i)}>❌</button>
        </div>
      {/each}
    </div>
    <div class="buttons">
      <button class="newTab" on:click={newTab}>➕</button>
    </div>
  </div>
</div>

<style>
  .main {
    width: 100%;
    height: 100%;
    background-color: beige;
  }

  .buttons {
    border: 2px solid yellow;
    min-width: 100px;
  }

  .toolbar {
    width: 100%;
    height: 3rem;
    background-color: aquamarine;
    display: flex;
  }

  .tabs {
    --tab-width: 140px;
    --tab-min-width: 70px;

    min-width: none;
    overflow-x: scroll;

    display: flex;
  }

  .tab {
    width: var(--tab-width);
    min-width: var(--tab-min-width);

    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr auto;
    outline: 2px solid lightblue;
    outline-offset: -2px;
  }
</style>
