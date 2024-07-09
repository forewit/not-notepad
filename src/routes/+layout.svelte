<script lang="ts">
  import "$lib/styles/normalize.css";
  import "$lib/styles/reset.css";
  import "$lib/styles/global.css";
  import { onMount } from "svelte";
  import {
    firebaseHandlers,
    firebaseStore,
    type UserData,
  } from "$lib/stores/firebaseStore";
  import { tabsStore } from "$lib/stores/tabsStore";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { auth, db } from "$lib/firebase/firebase.client";
  import { tabsHandlers } from "$lib/stores/tabsStore";
  import { settingsStore } from "$lib/stores/settingsStore";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { authRedirect } from "$lib/stores/settingsStore";
  import ThemeWrapper from "$lib/components/ThemeWrapper.svelte";
  import SyncStatus from "$lib/components/SyncStatus.svelte";

  let preventPublishing = true;

  function publishToFirestore() {
    if (preventPublishing) return;

    const tabStrings = $tabsStore.tabs.map((tab) => {
      return JSON.stringify(tab);
    });
    firebaseStore.update((curr) => {
      return {
        ...curr,
        data: {
          activeIndex: $tabsStore.activeIndex,
          tabs: tabStrings,
          settings: $settingsStore,
        },
      };
    });
    firebaseHandlers.publish();
  }

  // publish to firestore when settingsStore or tabsStore changes
  tabsStore.subscribe(()=> { 
    publishToFirestore();
  });
  settingsStore.subscribe(publishToFirestore);

  function parseTabStrings(tabStrings: string[]) {
    if (tabStrings.length === 0) return;
    tabStrings.forEach((tabString) => {
      try {
        tabsHandlers.newTabFromString(tabString);
      } catch (err) {
        console.warn("Failed to parse tab!", tabString, err);
        return;
      }
    });
  }

  let loaded = false;
  $: if (!$firebaseStore.currentUser && loaded) {
    $authRedirect = window.location.pathname;
    goto(base + "/login");
  }

  onMount(() => {
    // update firebaseStore on authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // logged out
      if (!user) {
        firebaseStore.update((curr) => {
          return {
            ...curr,
            isLoading: false,
            currentUser: user,
          };
        });

        loaded = true;
        return;
      }

      // logged in
      // get firestore document data
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      let dataToSetStoreTo: UserData = {
        tabs: [],
        activeIndex: 0,
        settings: { theme: "Canvas", spellCheck: true },
      };

      // create a new user doc if it doesn't exist
      if (!docSnap.exists()) {
        console.log("Creating firestore user doc...");
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, dataToSetStoreTo, { merge: true });
      } else {
        console.log("Fetching firestore user doc...");
        const userData = docSnap.data();
        dataToSetStoreTo = userData as UserData;
      }

      // save user data to tabsStore and settingsStore
      parseTabStrings(dataToSetStoreTo.tabs);
      tabsHandlers.setActiveIndex(dataToSetStoreTo.activeIndex);
      $settingsStore = dataToSetStoreTo.settings;

      // update firebaseStore
      firebaseStore.update((curr) => {
        return {
          ...curr,
          isLoading: false,
          currentUser: user,
          data: dataToSetStoreTo,
        };
      });
      loaded = true;
      preventPublishing = false;
    });
  });
</script>

<svelte:head>
  <meta
    name="viewport"
    content="width=device-width, user-scalable=0, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
  />
</svelte:head>

<ThemeWrapper>
  <div class="container">
    <div class="content">
      <slot />
      <div class="sync-status">
        <SyncStatus></SyncStatus>
      </div>
    </div>
  </div>
</ThemeWrapper>

<style>
  .container {
    background-color: var(--bg);
    /* make fullscreen */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .content {
    /* fill container */
    position: absolute;
    width: 100vw;
    height: 100vh;
  }

  .sync-status {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
</style>
