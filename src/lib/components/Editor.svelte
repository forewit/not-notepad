<script lang="ts">
  import "quill/dist/quill.core.css";
  import "$lib/styles/quill.css";
  import type Quill from "quill/core";
  import type { Delta } from "quill/core";
  import { onMount } from "svelte";
  import { tabsStore } from "../stores/tabsStore";

  export let disabled = false;
  export let tabID: string;

  let quillEditor: Quill;
  let editorDiv: HTMLElement;

  $: if (disabled) {
    quillEditor?.disable();
  } else {
    quillEditor?.enable();
  }

  function loadContentFromTab() {
    if (!quillEditor) return;
    const ops = $tabsStore.tabs.find((tab) => tab.id === tabID)?.ops;
    if (!ops) return;
    quillEditor.setContents(ops);
  }

  function saveContentToTab() {
    if (!quillEditor) return;
    const tabIndex = $tabsStore.tabs.findIndex((tab) => tab.id === tabID);
    if (tabIndex === -1) return;
    $tabsStore.tabs[tabIndex].ops = quillEditor.getContents().ops;
  }

  function handleQuillInput(newDelta: Delta, oldDelta: Delta, source: string) {
    if (source === "user") {
      saveContentToTab();
    }
  }

  async function addEditor() {
    const { default: Quill } = await import("quill");

    quillEditor = new Quill(editorDiv, {
      formats: ["bold", "italic", "underline", "strike", "code"],
      placeholder: "Enter text here",
    });

    loadContentFromTab();
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
    background-color: var(--bg);
    overflow-y: hidden;

    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }
  .quill-editor {
    font-size: var(--font-size);
    font-family: var(--font);
    color: var(--text);
  }
</style>
