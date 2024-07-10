<script lang="ts">
  import Tabbar from "$lib/components/Tabbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { tabsStore, metadataStore } from "$lib/stores/tabsStore";
  import { firebaseStore } from "$lib/stores/firebaseStore";

  $: activeTabID = $metadataStore.order[$metadataStore.activeIndex];
</script>

{#if $firebaseStore.currentUser}
  <div class="page-container">
    <Tabbar />
    {#each Object.keys($tabsStore) as id}
      <Editor disabled={id !== activeTabID} tabID={id} />
    {/each}
  </div>
{:else}
  <Spinner />
{/if}

<style>
  .page-container {
    background-color: var(--bg);
    height: 100%;
    position: relative;
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-template-columns: 100%;
  }
</style>
