<script lang="ts">
  import "$lib/styles/theme.css";
  import "$lib/styles/quill.css";
  import Tabbar from "$lib/components/Tabbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import Auth from "$lib/components/Auth.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { tabsStore } from "$lib/stores/tabsStore";
  import { firebaseHandlers, firebaseStore } from "$lib/stores/firebaseStore";
  import { base } from "$app/paths";

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
    <div
    class="status"
      class:saving={$firebaseStore.savingStatus === "saving"}
      class:saved={$firebaseStore.savingStatus === "saved"}
      class:error={$firebaseStore.savingStatus === "error"}
    >
      <span
        class="status-icon"
        style="-webkit-mask: url({base}/images/svg/double-checkmark.svg) no-repeat center / contain;
        mask: url({base}/images/svg/double-checkmark.svg) no-repeat center / contain;"
      ></span>
    </div>
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


  .status {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    width: 1rem;
    aspect-ratio: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
  }
  .status.saved,
  .status.error,
  .status.saving {
    opacity: 1;
  }
  .status-icon {
    background-color: var(--main);
    width: 100%;
    aspect-ratio: 1;
  }
  .error .status-icon {
    /* TODO: style this */
    background-color: var(--error);
  }
  .saving .status-icon {
    mask: none !important;
    -webkit-mask: none !important;
    background-color: transparent;

    width: 90%;
    border-radius: 50%;
    border: 2px solid var(--bg-alt);
    border-right-color: var(--main);
    animation: rotate 1s infinite linear;
  }
  @keyframes rotate {
    to {
      transform: rotate(1turn);
    }
  }
  
</style>
