<script lang="ts">
  import "$lib/styles/theme.css";
  import "quill/dist/quill.core.css";
  import "$lib/styles/quill.css";
  import type Quill from "quill/core";
  import type { Delta } from "quill/core";
  import { onMount } from "svelte";
  import { tabsStore } from "../stores/tabsStore";

  export let disabled = false;

  let quillEditor: Quill;
  let editorDiv: HTMLElement;

  $: if (disabled) {
    quillEditor?.disable();
  } else {
    quillEditor?.enable();
  }

  function loadContentFromActiveTab() {
    if (!quillEditor) return;
    quillEditor.setContents($tabsStore.tabs[$tabsStore.activeIndex].content);
  }

  function saveContentToActiveTab() {
    if (!quillEditor) return;
    $tabsStore.tabs[$tabsStore.activeIndex].content = quillEditor.getContents();
  }

  function handleQuillInput(newDelta: Delta, oldDelta: Delta, source: string) {
    if (source === "user") {
      saveContentToActiveTab();
    }
  }

  async function addEditor() {
    const { default: Quill } = await import("quill");

    quillEditor = new Quill(editorDiv, {
      formats: ["bold", "italic", "underline", "strike", "code"],
      placeholder: "Enter text here",
    });

    loadContentFromActiveTab();
    quillEditor.on("text-change", handleQuillInput);

    quillEditor.keyboard.addBinding({ key: "/", altKey: true }, () => {
      quillEditor.format("code", !quillEditor.getFormat().code);
    });
    quillEditor.keyboard.addBinding({ key: "-", altKey: true }, () => {
      quillEditor.format("strike", !quillEditor.getFormat().strike);
    });
  }

  onMount(() => {
    addEditor();
  });
</script>

<div class="quill-editor-wrapper" class:disabled>
  <div class="quill-editor" bind:this={editorDiv} />
</div>

<style global="true">
  .disabled {
    display: none !important;
  }
  .quill-editor-wrapper {
    background-color: var(--editor-background-color);
    overflow-y: hidden;

    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  .quill-editor {
    font-size: var(--editor-font-size);
    font-family: var(--editor-font-family);
    color: var(--editor-text-color);
  }
</style>
