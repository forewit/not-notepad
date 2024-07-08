<script lang="ts">
  import Spinner from "$lib/components/Spinner.svelte";
  import { firebaseHandlers, firebaseStore } from "$lib/stores/firebaseStore";
  import { settingsStore } from "$lib/stores/settingsStore";
  import { themes, type ThemeNames } from "$lib/modules/themes";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  function updateTheme(theme: ThemeNames) {
    settingsStore.update((curr) => ({ ...curr, theme: theme }));
  }
</script>

{#if $firebaseStore.currentUser}
  <div class="form-container">
    <form action="">
      <a href="{base}/">Back</a>
      <h1>Settings</h1>
      <section>
        <div class="themes">
          {#each themes as theme}
            <button
              class="theme-button themed-btn"
              class:selected={$settingsStore.theme == theme.name}
              on:click={() => updateTheme(theme.name)}
              >{theme.name}
            </button>
          {/each}
        </div>
      </section>

      <section>
        <div class="checkbox">
          <input
            class="themed-input"
            type="checkbox"
            name="spell-check"
            bind:checked={$settingsStore.spellCheck}
          />
          <label for="spell-check">Spellcheck</label>
        </div>
      </section>

      <section>
        <button
          class="sign-out-button themed-btn error"
          on:click={() => firebaseHandlers.logout()}>Sign out</button
        >
      </section>
    </form>
  </div>
{:else}
  <Spinner />
{/if}

<style>
  .form-container {
    width: 100%;
    height: 100%;
    background-color: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form {
    max-width: 400px;
    margin-top: 50px;
    margin-inline: 20px;

    display: grid;
    grid-template-columns: 1fr;
    justify-content: left;
    gap: 16px;
  }
  a {
    text-decoration: underline;
    color: var(--sub);
    margin-bottom: 12px;
  }

  .checkbox {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .themes {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .theme-button {
    min-width: 160px;
    flex-grow: 1;
  }

  .theme-button.selected {
  }

  .sign-out-button {
    margin-top: 20px;
    width: 100px;
  }

  .back-button {
    width: 100px;
  }
</style>
