<script lang="ts">
  import "$lib/styles/normalize.css";
  import "$lib/styles/reset.css";
  import "$lib/styles/global.css";
  import { onMount } from "svelte";
  import { firebaseHandlers, firebaseStore } from "$lib/stores/firebaseStore";
  import { tabsStore } from "$lib/stores/tabsStore";
  import { settingsStore, authRedirect } from "$lib/stores/settingsStore";
  import { auth } from "$lib/firebase/firebase.client";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import ThemeWrapper from "$lib/components/ThemeWrapper.svelte";
  import SyncStatus from "$lib/components/SyncStatus.svelte";

  function handleOrientationChange() {
    switch (screen.orientation.type) {
      case "portrait-primary":
        document.documentElement.style.setProperty(
          "--safe-area-top",
          "env(safe-area-inset-top)"
        );
        document.documentElement.style.setProperty("--safe-area-left", "0px");
        document.documentElement.style.setProperty("--safe-area-right", "0px");
        break;
      case "landscape-primary":
        document.documentElement.style.setProperty("--safe-area-top", "0px");
        document.documentElement.style.setProperty(
          "--safe-area-left",
          "env(safe-area-inset-left)"
        );
        document.documentElement.style.setProperty("--safe-area-right", "0px");
        break;
      case "landscape-secondary":
        document.documentElement.style.setProperty("--safe-area-top", "0px");
        document.documentElement.style.setProperty("--safe-area-left", "0px");
        document.documentElement.style.setProperty(
          "--safe-area-right",
          "env(safe-area-inset-right)"
        );
        break;
    }
  }

  function preventCloseIfSaving(e: BeforeUnloadEvent) {
    if ($firebaseStore.savingStatus === "saving") e.preventDefault();
  }

  onMount(() => {
    window.addEventListener("beforeunload", preventCloseIfSaving);
    screen.orientation.addEventListener("change", handleOrientationChange);

    // publish to firestore when settingsStore or tabsStore changes
    tabsStore.subscribe(firebaseHandlers.publishToFirestore);
    settingsStore.subscribe(firebaseHandlers.publishToFirestore);

    // update firebaseStore on authentication state changes
    const unsubscribeAuth = auth.onAuthStateChanged(async (user: any) => {
      // logged out
      if (!user) {
        $firebaseStore.currentUser = user;
        // redirect to login page
        $authRedirect = window.location.pathname.slice(base.length);
        goto(base + "/login");
        return;
      }

      // logged in
      $firebaseStore.currentUser = user;

      try {
        firebaseHandlers.loadFromFirestore();
      } catch (err) {
        console.error(err);
      }
    });
  });
</script>

<svelte:head>
  <meta
    name="viewport"
    content="width=device-width, user-scalable=0, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
  />
  <meta name="theme-color" content="var(--bg)" />
</svelte:head>

<ThemeWrapper>
  <div class="layout-container">
    <slot />
    {#if !$firebaseStore.isLoading}
      <div class="sync-status">
        <SyncStatus></SyncStatus>
      </div>
    {/if}
  </div>
</ThemeWrapper>

<style>
  .layout-container {
    background-color: var(--bg);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .sync-status {
    pointer-events: none;
    position: absolute;
    bottom: 1.2rem;
    right: calc(1.2rem + var(--safe-area-right));
    z-index: 1;
  }
</style>
