<script lang="ts">
  import "$lib/styles/theme.css";
  import "quill/dist/quill.core.css";
  import "$lib/styles/quill.css";
  import type Quill from "quill";
  import { onMount } from "svelte";

  export let text: string;

  let quillEditor: Quill;
  let toolbarDiv: HTMLElement;
  let editorDiv: HTMLElement;

  async function addEditor() {
    const { default: Quill } = await import("quill");

    if (editorDiv) {
      quillEditor = new Quill(editorDiv, {
        formats: ["bold", "italic", "underline", "strike", "code"],
        placeholder: "Enter text here",
      });

      quillEditor.on("text-change", handleQuillInput);
    }
  }

  function handleQuillInput() {}

  onMount(() => {
    addEditor().then(() => {
      quillEditor.keyboard.addBinding({ key: "/", ctrlKey: true }, () => {
        // @ts-ignore
        //quillEditor.theme.tooltip.edit();
        // @ts-ignore
        //quillEditor.theme.tooltip.show();
      });
    });
  });
</script>

<div id="quill-editor-wrapper">
  <div id="quill-editor" bind:this={editorDiv} />
  <div id="quill-toolbar" bind:this={toolbarDiv} />
</div>

<style>
  #quill-editor-wrapper {
    background-color: var(--editor-background-color);
    overflow-y: hidden;

    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  #quill-editor {
    font-size: var(--editor-font-size);
    font-family: var(--editor-font-family);
    color: var(--editor-text-color);
  }
</style>
