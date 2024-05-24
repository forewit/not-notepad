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
    background-color: var(--editor-background-color);
  }
  #text {
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
  #text::-webkit-scrollbar {
    width: var(--editor-scrollbar-size);
  }
  #text::-webkit-scrollbar-thumb {
    background-color: var(--editor-scrollbar-color);
    border-radius: 100vw;
  }
  #text::-webkit-scrollbar-button {
    height: calc(2 * var(--editor-scrollbar-size));
  }
</style>
