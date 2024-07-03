<script lang="ts">
  import "$lib/styles/theme.css";
  import "$lib/styles/quill.css";
  import Tabbar from "$lib/components/Tabbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import Auth from "$lib/components/Auth.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { tabsStore } from "$lib/stores/tabsStore";
  import { firebaseHandlers, firebaseStore } from "$lib/stores/firebaseStore";

  // update firebaseStore and publish whenever tabsStore changes
  tabsStore.subscribe((curr) => {
    const tabStrings = curr.tabs.map((tab) => {
      return JSON.stringify(tab);
    });

    firebaseStore.update((curr) => {
      return {
        ...curr,
        data: { activeIndex: $tabsStore.activeIndex, tabs: tabStrings },
      };
    });

    firebaseHandlers.publish();
  });
</script>

{#if $firebaseStore.currentUser}
    <div class="container">
      <Tabbar logout={firebaseHandlers.logout} />
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
{:else if $firebaseStore.isLoading}
  <Spinner />
{:else}
  <Auth />
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
    background-color: var(--bg-alt);
  }
</style>
