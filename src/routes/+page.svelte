<script lang="ts">
  import "$lib/styles/theme.css";
  import "$lib/styles/quill.css";
  import Tabbar from "$lib/components/Tabbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import Auth from "$lib/components/Auth.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { tabsStore, tabsHandlers } from "../lib/stores/tabsStore";
  import { onMount } from "svelte";
  import { db } from "$lib/firebase/firebase.client";
  import { doc, setDoc } from "firebase/firestore";
  import {
    authHandlers,
    authStore,
    type UserData,
  } from "$lib/stores/authStore";
  import type { User } from "firebase/auth";

  let user: User;
  let data: UserData;
  let newText = "";

  // save data object to firestore
  async function publish() {
    if (!$authStore.currentUser) return;
    try {
      const userRef = doc(db, "users", $authStore.currentUser.uid);
      await setDoc(userRef, data, { merge: true });
      console.log("Save successful!");
    } catch (err) {
      console.log("There was an error saving data!", err);
    }
  }

  // update the authStore with new user data
  function updateStoreUserData(newData: UserData) {
    authStore.update((curr) => {
      return {
        ...curr,
        data: newData,
      };
    });

    publish();
  }

  // pull updates from the store
  authStore.subscribe((curr) => {
    if (curr.currentUser) user = curr.currentUser;
    if (curr.data) data = curr.data;
  });

  async function newTab() {
    const { Delta: Delta } = await import("quill/core");

    const initialContent = new Delta().insert("Welcome to Not Notepad 🎉\n");
    tabsHandlers.newTab({
      data: { id: 0, title: "Hello 👋", content: initialContent },
    });
  }

  onMount(() => {
    newTab(); // TODO: remove
  });
</script>

{#if $authStore.currentUser}
  <div class="container">
    <Tabbar logout={authHandlers.logout} />
    {#if $tabsStore.tabs.length > 0}
      {#each $tabsStore.tabs as tab, i (tab)}
        <Editor disabled={i !== $tabsStore.activeIndex} />
      {/each}
    {:else}
      <div class="placeholder">
        <button on:click={newTab} class="new-tab-button"
          >Create your first tab</button
        >
      </div>
    {/if}
  </div>
{:else if $authStore.isLoading}
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

  .placeholder {
    background-color: var(--editor-background-color);
  }

  .new-tab-button {
    font-size: var(--editor-font-size);
    font-family: var(--editor-font-family);
    color: var(--editor-text-color);
    background-color: var(--tab-active-color);

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: calc(var(--tabbar-height) - 1.8em);
    margin: 1em 0.8em;
    border-radius: 6px;
    padding: 8px;
  }
  .new-tab-button:not(:active):hover {
    background-color: var(--tab-hover-color);
  }
</style>
