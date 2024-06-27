<script lang="ts">
  import "$lib/styles/theme.css";
  import "$lib/styles/quill-theme.css";
  import type Quill from "quill";
  import { onMount } from "svelte";

  export let text: string;

  let quillEditor: Quill;
  let editorDiv: HTMLElement;

  async function addEditor() {
    const { default: Quill } = await import("quill/quill");

    if (editorDiv) {
      quillEditor = new Quill(editorDiv, {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "bullet" }],
          ],
        },
        formats: ["bold", "italic", "underline", "strike", "code"],
        theme: "snow",
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
  <div bind:this={editorDiv}></div>
</div>

<style>
  #quill-editor-wrapper {
    background-color: var(--editor-background-color);
    overflow-y: hidden;
    position: relative;
  }
</style>
