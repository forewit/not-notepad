<script lang="ts">
  // TODO: implement tab re-ordering

  import "$lib/styles/theme.css";
  import { base } from "$app/paths";
  import Tab from "$lib/components/Tab.svelte";
  import Button from "$lib/components/Button.svelte";
  import { tabsStore, tabsHandlers } from "$lib/stores/tabsStore";
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

  function setActiveTab(index: number) {
    tabsHandlers.setActiveIndex(index);
    // TODO: scroll to the active tab
  }

  function closeTab(index: number) {
    // TODO: decide what to do when the last tab is closed
    if ($tabsStore.tabs.length == 1) return;
    tabsHandlers.removeTab(index);
  }

  // TODO: lock width until mouse moved (ignore touches)
  let lockMaxWidth = 0;
</script>

<div>
  <div class="toolbar">
    <div class="tabs">
      {#each $tabsStore.tabs as tab, i (tab)}
        <div
          class="tab-container"
          in:expandIn
          out:expandOut
          on:introstart={() => {
          }}
          on:outroend={() => {
          }}
        >
          <Tab
            bind:title={$tabsStore.tabs[i].title}
            active={$tabsStore.activeIndex == i}
            onClose={() => closeTab(i)}
            onClick={() => setActiveTab(i)}
          />
        </div>
      {/each}
    </div>

    <div class="buttons">
      <Button url="{base}/images/svg/plus.svg" onClick={tabsHandlers.newTab}
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
    width: var(--tab-max-width);
    min-width: 40px;
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
