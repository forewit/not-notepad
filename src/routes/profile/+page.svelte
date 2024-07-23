<script lang="ts">
  import Spinner from "$lib/components/Spinner.svelte";
  import { firebaseHandlers, firebaseStore } from "$lib/stores/firebaseStore";
  import { settingsStore } from "$lib/stores/settingsStore";
  import { themes } from "$lib/modules/themes";
  import { base } from "$app/paths";
</script>

{#if $firebaseStore.currentUser}
  <div class="form-container">
    <form action="">
      <a href="{base}/" class="back themed-btn">
        <span
          class="back-icon"
          style="-webkit-mask: url({base}/images/svg/home.svg) no-repeat center / contain;
      mask: url({base}/images/svg/home.svg) no-repeat center / contain;"
        ></span>
        Home
      </a>
      <h1>Profile Settings</h1>
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
        <h2>Theme</h2>
        <p>Current theme: {$settingsStore.theme}</p>
        <br />
        <div class="themes">
          {#each themes as theme}
            <button
              class="theme-button themed-btn"
              class:chosen={$settingsStore.theme === theme.name}
              on:click={() => ($settingsStore.theme = theme.name)}
              style="--bg: {theme.bg}; --bg-alt: {theme.bgAlt}; --main: {theme.main}; --caret: {theme.caret}; --error: {theme.error}; --sub: {theme.sub}; --text: {theme.text};"
              >{theme.name}
            </button>
          {/each}
        </div>
      </section>

      <section>
        <h2>Account</h2>
        <p>Email: {$firebaseStore.currentUser.email}</p>
        <br />
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
    height: 100%;
    margin-right: 0.2em;
    background-color: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    overflow-x: hidden;

    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  }

  form {
    width: 80%;
    max-width: 800px;
    margin-top: 20px;
    margin-bottom: 50px;
    margin-inline: 20px;

    display: grid;
    grid-template-columns: 1fr;
    justify-content: left;
    gap: 16px;
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
    width: 100px;
  }

  .back {
    width: 70px;
    margin-inline-end: 14px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color var(--transition-speed);
  }
  .back:hover {
    background-color: var(--text);
    color: var(--bg);
  }
  .back:active {
    background-color: var(--main);
    color: var(--bg);
  }

  .back-icon {
    width: 0.9em;
    aspect-ratio: 1;
    margin-right: 6px;
  }
  .back .back-icon {
    background-color: var(--text);
  }
  .back:hover .back-icon,
  .back:active .back-icon {
    background-color: var(--bg);
  }
</style>
