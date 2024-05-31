<script lang="ts">
  import { cubicInOut } from "svelte/easing";
  import { animateSimple, animateCSS } from "$lib/modules/animate";
  import { onMount } from "svelte";

  const TAB_MAX_WIDTH = 140; // also update in .tab css
  const TAB_MIN_WIDTH = 70; // also update in .tab css

  let tabs = ["test", "test2", "test3"];
  let tabsElm: HTMLElement;

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

  const unlockWidth = debounce((maxWidth: number) => {
    animateSimple({
      duration: 2000,
      easing: cubicInOut,
      onStep(t: number, u: number) {
        tabsElm.style.setProperty(
          "--max-width",
          `${maxWidth + t * (TAB_MAX_WIDTH - maxWidth)}px`
        );
      },
      onEnd() {
        tabsElm.style.setProperty("--max-width", `${TAB_MAX_WIDTH}px`);
      },
    });
  }, 2000);

  function newTab() {
    tabs.push("new");
    tabs = tabs;
  }

  function closeTab(index: number) {
    if (index < tabs.length - 1) {
      const maxWidth = tabsElm.children[0].clientWidth;
      tabsElm.style.setProperty("--max-width", `${maxWidth}px`);
      unlockWidth(maxWidth);
    }

    //TODO: animate close
    tabs.splice(index, 1);
    tabs = tabs;
  }

  function animateTabOpening(element: HTMLElement) {
    if (!tabsElm) return;
    const width = element.getBoundingClientRect().width;
    animateCSS(element, {
      duration: 2000,
      easing: cubicInOut,
      css: (t: number, u: number) => {
        return `min-width: ${t * TAB_MIN_WIDTH}px; width: ${t * width}px;`;
      },
      onStep(t: number, u: number) {
        tabsElm.scrollLeft = tabsElm.scrollWidth;
        if (tabs.length == 1)
          tabsElm.style.cssText = `grid-template-columns: minmax(auto, ${t * TAB_MAX_WIDTH}px);`;
        else
          tabsElm.style.cssText = `grid-template-columns: repeat(${tabs.length - 1}, minmax(auto, var(--max-width))) minmax(auto, ${t * TAB_MAX_WIDTH}px);`;
      },
      onEnd: () => {
        tabsElm.style.cssText = "";
      },
    });
  }
</script>

<div class="main">
  <div class="toolbar">
    <div class="tabs" bind:this={tabsElm}>
      {#each tabs as tab, i}
        <div class="tab" use:animateTabOpening>
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
    display: grid;
    grid-template-columns: auto auto 1fr;
  }

  .toolbar {
    width: 100%;
    height: 3rem;
    background-color: aquamarine;
    display: grid;
    grid-template-columns: auto 1fr;
  }

  .tabs {
    --max-width: 140px;
    --min-width: 70px;

    border: 2px solid red;
    overflow-x: scroll;

    transition: all 300ms ease-in-out;

    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(auto, var(--max-width));
  }

  .tab {
    min-width: var(--min-width);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr auto;
    outline: 2px solid lightblue;
    outline-offset: -2px;
  }
</style>
