<script lang="ts">
  import Tabbar from "$lib/components/Tabbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { tabsStore, metadataStore } from "$lib/stores/tabsStore";
  import { firebaseStore } from "$lib/stores/firebaseStore";

  $: activeTabID = $metadataStore.order[$metadataStore.activeIndex];
</script>

{#if $firebaseStore.currentUser}
  <div class="container">
    <Tabbar />
    {#if $metadataStore.order.length > 0}
        {#each Object.keys($tabsStore) as id}
          <Editor disabled={id !== activeTabID} tabID={id}/>
        {/each}
    {:else}
      <div class="editor-placeholder" />
    {/if}
  </div>
{:else}
  <Spinner />
{/if}

<style>
  .container {
    position: relative;
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-template-columns: 100%;
  }

  .editor-placeholder {
    background-color: var(--bg);
  }
</style>
