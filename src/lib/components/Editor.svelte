<script lang="ts">
  import "$lib/styles/theme.css";
  import "quill/dist/quill.core.css";
  import "$lib/styles/quill.css";
  import type Quill from "quill/core";
  import type { Delta, Op } from "quill/core";
  import { onMount } from "svelte";
  

  export let deltaOps: Op[];

  let quillEditor: Quill;
  let editorDiv: HTMLElement;

  async function addEditor() {
    const { default: Quill } = await import("quill");

    if (editorDiv) {
      quillEditor = new Quill(editorDiv, {
        formats: ["bold", "italic", "underline", "strike", "code"],
        placeholder: "Enter text here",
      });
      quillEditor.setContents(deltaOps);
      quillEditor.on("text-change", handleQuillInput);
    }
  }

  $: if (quillEditor) quillEditor.setContents(deltaOps);

  function handleQuillInput(delta: Delta, oldDelta: Delta, source: string) {
    if (source === "api") return;
    deltaOps.push(...delta.ops);
  }

  onMount(() => {
    addEditor().then(() => {
      quillEditor.keyboard.addBinding({ key: "/", altKey: true }, () => {
        quillEditor.format("code", !quillEditor.getFormat().code);
      });
      quillEditor.keyboard.addBinding({ key: "-", altKey: true }, () => {
        quillEditor.format("strike", !quillEditor.getFormat().strike);
      });
    });
  });
</script>

<div id="quill-editor-wrapper">
  <div id="quill-editor" bind:this={editorDiv} />
</div>

<style global="true">
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
