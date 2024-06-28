<script lang="ts">
  import Tabbar from "$lib/components/Tabbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import { tabsStore, tabsHandlers } from "../lib/stores/tabsStore";
  import type { Op } from "quill/core";


  const defaultDeltaOps: Op[] = [
    { insert: "Testing " },
    { insert: "inline", attributes: { code: true } },
    { insert: " code!" },
  ];
  tabsHandlers.newTab({ data: { id: 0, title: "Hey 👋", DeltaOps: defaultDeltaOps }});
  
  $: deltaOps =
    $tabsStore.tabs.length > 0
      ? $tabsStore.tabs[$tabsStore.activeIndex].DeltaOps
      : [
    { insert: "Click the " },
    { insert: "+", attributes: { code: true } },
    { insert: " to create a new tab" },
  ];

</script>

<div class="container">
  <Tabbar />
  <Editor bind:deltaOps />
</div>

<style>
  .container {
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-template-columns: 100%;
  }
</style>
