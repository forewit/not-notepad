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
  import {
    tabsStore,
    tabsHandlers,
    metadataStore,
    type PackedTabs,
  } from "$lib/stores/tabsStore";
  import { settingsStore, authRedirect } from "$lib/stores/settingsStore";
  import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
  import { auth, db } from "$lib/firebase/firebase.client";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import ThemeWrapper from "$lib/components/ThemeWrapper.svelte";
  import SyncStatus from "$lib/components/SyncStatus.svelte";

  let preventPublishing = true;

  async function loadFromFirestore() {
    const user = $firebaseStore.currentUser;
    if (!user) return;

    preventPublishing = true;

    // get firestore document data
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    let userDataToSetStoreTo: UserData = {
      activeIndex: 0,
      order: [],
      settings: { theme: "Canvas", spellCheck: true },
    };
    let packedTabsToSetStoreTo: PackedTabs = {};

    // create a new user doc if it doesn't exist
    if (!userSnap.exists()) {
      console.log("Creating firestore user doc...");
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, userDataToSetStoreTo, { merge: true });
    }
    // otherwise, fetch the user doc
    else {
      console.log("Fetching firestore user doc...");
      const userData = userSnap.data();
      userDataToSetStoreTo = { ...userDataToSetStoreTo, ...userData };

      for (let i = 0; i < userDataToSetStoreTo.order.length; i++) {
        const tabID = userDataToSetStoreTo.order[i];
        const tabSnap = await getDoc(doc(userRef, "tabs", tabID));
        if (!tabSnap.exists()) {
          userDataToSetStoreTo.order.splice(i, 1);
          i--;
          continue;
        }
        packedTabsToSetStoreTo[tabID] = tabSnap.data() as PackedTabs[0];
      }
    }

    // save user data to tabsStore and settingsStore
    tabsHandlers.loadPackedTabs(packedTabsToSetStoreTo);
    $metadataStore.order = userDataToSetStoreTo.order;
    tabsHandlers.setActiveIndex(userDataToSetStoreTo.activeIndex);
    $settingsStore = userDataToSetStoreTo.settings;

    // update firebaseStore
    firebaseStore.update((curr) => {
      return {
        ...curr,
        isAuthenticating: false,
        userData: userDataToSetStoreTo,
        packedTabs: packedTabsToSetStoreTo,
      };
    });
    preventPublishing = false;
  }

  function publishToFirestore() {
    if (!preventPublishing) {
      firebaseHandlers.publish();
    }
  }

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

  // publish to firestore when settingsStore or tabsStore changes
  tabsStore.subscribe(publishToFirestore);
  settingsStore.subscribe(publishToFirestore);

  function preventCloseIfSaving(e: BeforeUnloadEvent) {
    if ($firebaseStore.savingStatus === "saving") e.preventDefault();
  }

  onMount(() => {
    window.addEventListener("beforeunload", preventCloseIfSaving);
    screen.orientation.addEventListener("change", handleOrientationChange);

    // update firebaseStore on authentication state changes
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      // logged out
      if (!user) {
        firebaseStore.update((curr) => {
          return {
            ...curr,
            currentUser: user,
          };
        });

        // redirect to login page
        $authRedirect = window.location.pathname.slice(base.length);
        goto(base + "/login");
        return;
      }

      // logged in
      firebaseStore.update((curr) => ({
        ...curr,
        isLoading: true,
        currentUser: user,
      }));

      await loadFromFirestore();

      firebaseStore.update((curr) => ({ ...curr, isLoading: false }));
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
    <div class="sync-status">
      <SyncStatus></SyncStatus>
    </div>
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
  }
</style>
