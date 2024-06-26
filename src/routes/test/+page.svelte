<script lang="ts">
  import { cubicInOut } from "svelte/easing";
  import { animateSimple } from "$lib/modules/animate";
  import { onMount } from "svelte";

  const TAB_MAX_WIDTH = 140;
  const TAB_MIN_WIDTH = 70;
  const TAB_ANIMATION_DURATION = 160;
  const TAB_RESIZE_DELAY = 1600;

  let tabs: string[] = ["test", "test"];
  let tabElms: HTMLElement[] = [];
  let tabsElm: HTMLElement;
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

  function newTab() {
    tabs.push("new");
    tabs = tabs;
  }

  function animateTabOpening(element: HTMLElement) {
    // animate grid-template columns
    if (!tabsElm) return;
    const targetWidth = element.getBoundingClientRect().width;

    animateSimple({
      duration: TAB_ANIMATION_DURATION,
      easing: cubicInOut,
      onStep: (t: number, u: number) => {
        if (tabs.length == 1)
          tabsElm.style.gridTemplateColumns = `minmax(${t * TAB_MIN_WIDTH}px, ${t * targetWidth}px)`;
        else
          tabsElm.style.gridTemplateColumns = `repeat(${tabs.length - 1}, minmax(var(--tab-min-width), var(--tab-max-width))) minmax(${t * TAB_MIN_WIDTH}px, ${t * targetWidth}px)`;
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
        tabsElm.style.setProperty("--tab-max-width", `${lockWidth + t * (targetWidth - lockWidth)}px`);
      },
      onEnd: () => {
        tabsElm.style.setProperty("--tab-max-width", `${TAB_MAX_WIDTH}px`);
        lockWidth = 0;
      },
    });
  }, TAB_RESIZE_DELAY);

  function closeTab(index: number) {
    lockWidth = tabElms[index].getBoundingClientRect().width;

    if (index < tabs.length - 1) {
      tabsElm.style.setProperty("--tab-max-width", `${lockWidth}px`);
      unlockWidth();
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
        tabs.splice(index, 1);
        tabs = tabs;
      },
    });
  }
</script>

<div class="main">
  <div class="toolbar">
    <div class="tabs" bind:this={tabsElm}>
      {#each tabs as tab, i}
        <div bind:this={tabElms[i]} class="tab" use:animateTabOpening>
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
    --tab-max-width: 140px;
    --tab-min-width: 70px;

    min-width: none;
    overflow-x: scroll;

    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(var(--tab-min-width), var(--tab-max-width));
  }

  .tab {
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr auto;
    outline: 2px solid lightblue;
    outline-offset: -2px;
  }
</style>