<script>
  import Auth from "$lib/components/Auth.svelte";
  import { firebaseStore } from "$lib/stores/firebaseStore";
  import { authRedirect } from "$lib/stores/settingsStore";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";
  import ProgressBar from "$lib/components/ProgressBar.svelte";

  function redirect() {
    if ($authRedirect === "/login/") $authRedirect = "/";
    goto(base+$authRedirect);
  }

  $: if ($firebaseStore.currentUser) redirect();
</script>

{#if $firebaseStore.currentUser}
  <ProgressBar />
{:else}
  <Auth onSuccessfulLogin={redirect} />
{/if}