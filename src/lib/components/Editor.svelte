<script lang="ts">
  import "$lib/styles/theme.css";
  import { onMount } from "svelte";

  export let text: string;

  let textarea: HTMLDivElement;
</script>

<div class="container">
  <div
    class="editor"
    bind:this={textarea}
    bind:innerHTML={text}
    spellcheck="false"
    placeholder="Enter text here"
    contenteditable="true"
    role="textbox"
  />
</div>

<style>
  .container {
    display: grid;
    background-color: var(--editor-background-color);
  }
  .editor {
    resize: none;
    font-family: var(--editor-font-family);
    font-size: var(--editor-font-size);
    color: var(--editor-text-color);
    background-color: var(--editor-background-color);

    border: none;
    outline: none;

    padding: 1em;
    margin-right: 0.2em;
  }
  .editor::-webkit-scrollbar {
    width: var(--editor-scrollbar-size);
  }
  .editor::-webkit-scrollbar-thumb {
    background-color: var(--editor-scrollbar-color);
    border-radius: 100vw;
  }
  .editor::-webkit-scrollbar-button {
    height: 0.6rem;
  }
</style>
