<script>
  import Auth from "$lib/components/Auth.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { firebaseStore } from "$lib/stores/firebaseStore";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";

  export let redirect = "/";

  $: if ($firebaseStore.currentUser) {
    goto(base + redirect);
  }
</script>

{#if $firebaseStore.currentUser || $firebaseStore.isLoading}
  <Spinner />
{:else}
  <Auth />
{/if}
