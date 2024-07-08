<script lang="ts">
  import "$lib/styles/normalize.css";
  import "$lib/styles/reset.css";
  import "$lib/styles/theme.css";
  import { onMount } from "svelte";
  import { firebaseStore, type UserData } from "$lib/stores/firebaseStore";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { auth, db } from "$lib/firebase/firebase.client";
  import { tabsHandlers } from "$lib/stores/tabsStore";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  let loaded = false;

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

  $: if (!$firebaseStore.currentUser && loaded) {
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
      let dataToSetStoreTo: UserData = { tabs: [], activeIndex: 0 };

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

      // parse tabs to update tabsStore
      parseTabStrings(dataToSetStoreTo.tabs);
      tabsHandlers.setActiveIndex(dataToSetStoreTo.activeIndex);

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
    });
  });
</script>

<svelte:head>
  <meta
    name="viewport"
    content="width=device-width, user-scalable=0, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
  />
</svelte:head>

<div class="container">
  <div class="content">
    <slot />
  </div>
</div>

<style>
  .container {
    background-color: var(--bg);
    /* make fullscreen */
    position: fixed;
    top: env(safe-area-inset-top);
    left: env(safe-area-inset-left);
    right: env(safe-area-inset-right);
    bottom: env(safe-area-inset-bottom);
  }

  .content {
    /* fill container */
    position: absolute;
    width: 100vw;
    height: 100vh;
  }
</style>
