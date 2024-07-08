<script>
  import Auth from "$lib/components/Auth.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { firebaseStore } from "$lib/stores/firebaseStore";
  import { settingsStore } from "$lib/stores/settingsStore";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";

  $: if ($firebaseStore.currentUser) {
    goto(base+$settingsStore.authRedirect);
  }
</script>

{#if $firebaseStore.currentUser || $firebaseStore.isLoading}
  <Spinner />
{:else}
  <Auth />
{/if}
