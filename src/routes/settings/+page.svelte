<script lang="ts">
  import Spinner from "$lib/components/Spinner.svelte";
  import { firebaseHandlers, firebaseStore } from "$lib/stores/firebaseStore";
  import { settingsStore } from "$lib/stores/settingsStore";
  import { themes, type ThemeNames } from "$lib/modules/themes";
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
              class:chosen={$settingsStore.theme === theme.name}
              on:click={() => updateTheme(theme.name)}
              style="--bg: {theme.bg}; --bg-alt: {theme.bgAlt}; --main: {theme.main}; --caret: {theme.caret}; --error: {theme.error}; --sub: {theme.sub}; --text: {theme.text};"
              >{theme.name}
            </button>
          {/each}
          <button
            class="theme-button themed-btn"
            class:chosen={$settingsStore.theme === "Custom"}
            on:click={() => updateTheme("Custom")}
            style="--bg: {$settingsStore.customTheme.bg}; --bg-alt: {$settingsStore.customTheme.bgAlt}; --main: {$settingsStore.customTheme.main}; --caret: {$settingsStore.customTheme.caret}; --error: {$settingsStore.customTheme.error}; --sub: {$settingsStore.customTheme.sub}; --text: {$settingsStore.customTheme.text};"
            >Custom
          </button>
        </div>
      </section>

      <section>
        <div class="checkbox">
          <input
            class="themed-checkbox"
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
    width: 80%;
    max-width: 800px;
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }

  .theme-button:active,
  .theme-button.chosen {
    outline: 3px solid var(--caret);
  }

  .sign-out-button {
    margin-top: 20px;
    width: 100px;
  }
</style>
