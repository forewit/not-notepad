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

  function firstTab() {
    tabsHandlers.newTab({
      data: { id: -1, title: "Hello 👋", ops: [{insert: "Welcome to Not Notepad 🎉. v0.26"} ] },
    });
  }

  onMount(() => {
    firstTab(); // TODO: remove
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
      <div class="editor-placeholder" />
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

  .editor-placeholder {
    background-color: var(--bg-alt);
  }
</style>
