<script>
  import "$lib/styles/theme.css";
  import Spinner from "$lib/components/Spinner.svelte";
  import { firebaseStore } from "$lib/stores/firebaseStore";
</script>

{#if $firebaseStore.currentUser}
  <div class="form-container">
    <h1>Settings</h1>
    <form action="">
      <!-- theme -->
      <label for="theme">Theme</label>
      <select name="theme" id="theme">
        <option value="default">Default</option>
        <option value="darkened">Darkened</option>
      </select>

      <!-- spell check -->
      <label for="spell-check">Spellcheck</label>
      <input type="checkbox" name="spell-check" id="spell-check" checked />

      <!-- sign out -->
      <button type="submit">Sign out</button>
    </form>
  </div>
{:else}
  <Spinner />
{/if}

<style>
  .form-container {
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
  }

  select {
  }

  button {
  }

  h1 {
  }

  h2 {
  }
</style>
