<script lang="ts">
  import Tabbar from "$lib/components/Tabbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { tabsStore } from "$lib/stores/tabsStore";
  import { firebaseHandlers, firebaseStore } from "$lib/stores/firebaseStore";
  import { base } from "$app/paths";
  import { settingsStore } from "$lib/stores/settingsStore";
  import SyncStatus from "$lib/components/SyncStatus.svelte";

  
  function publishToFirestore() {
    const tabStrings = $tabsStore.tabs.map((tab) => {
      return JSON.stringify(tab);
    });

    firebaseStore.update((curr) => {
      return {
        ...curr,
        data: { activeIndex: $tabsStore.activeIndex, tabs: tabStrings, settings: $settingsStore },
      };
    });

    firebaseHandlers.publish();
  }

  // publish to firestore when settingsStore or tabsStore changes
  tabsStore.subscribe(publishToFirestore);
  settingsStore.subscribe(publishToFirestore)
</script>

{#if $firebaseStore.currentUser}
  <div class="container">
    <Tabbar />
    {#if $tabsStore.tabs.length > 0}
      {#key $tabsStore.activeIndex}
        {#each $tabsStore.tabs as tab, i}
          <Editor disabled={i !== $tabsStore.activeIndex} />
        {/each}
      {/key}
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
