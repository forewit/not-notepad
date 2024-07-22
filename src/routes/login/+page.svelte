<script>
  import Auth from "$lib/components/Auth.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { firebaseStore } from "$lib/stores/firebaseStore";
  import { authRedirect } from "$lib/stores/settingsStore";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";

  $: if ($firebaseStore.currentUser) {
    goto(base+$authRedirect);
  }
</script>

{#if $firebaseStore.currentUser}
  <Spinner />
{:else if $firebaseStore.isLoading}
<h1>Loading from Firestore</h1>
{:else}
  <Auth />
{/if}

<style>
  h1 {
    margin: 0;
  }
</style>