<script>
  import Auth from "$lib/components/Auth.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { firebaseStore } from "$lib/stores/firebaseStore";
  import { appStore } from "$lib/stores/appStore";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";

  $: if ($firebaseStore.currentUser) {
    goto(base+$appStore.authRedirect);
  }
</script>

{#if $firebaseStore.currentUser || $firebaseStore.isLoading}
  <Spinner />
{:else}
  <Auth />
{/if}
