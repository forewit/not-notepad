<script lang="ts">
  import "$lib/styles/theme.css";

  export let text = "";
</script>

<div id="editor">
  <textarea bind:value={text} spellcheck="false" name="editor" id="text"
  ></textarea>
</div>

<style>
  #editor {
    display: grid;
    grid-template-columns: 1fr 5px; /*spacing for scrollbar*/
    background-color: var(--editor-background-color);
  }
  #text {
    resize: none;
    font-family: var(--editor-font-family);
    font-size: var(--editor-font-size);
    color: var(--editor-text-color);
    background-color: var(--editor-background-color);

    padding: 1em;
    border: none;
    outline: none;
  }
  #text::-webkit-scrollbar {
    width: 0.3rem;
  }
  #text::-webkit-scrollbar-thumb {
    background-color: var(--ui-color);
    border-radius: 100vw;
  }
  #text::-webkit-scrollbar-button {
    height: 0.6rem;
  }
</style>
