<script lang="ts">
  import "quill/dist/quill.core.css";
  import "$lib/styles/quill.css";
  import type Quill from "quill/core";
  import type { Delta } from "quill/core";
  import type { HistoryStack } from "$lib/stores/tabsStore";
  import type { StackItem } from "quill/modules/history";
  import { onMount } from "svelte";
  import { tabsStore } from "../stores/tabsStore";
  import { settingsStore } from "../stores/settingsStore";

  export let tabID: string;
  export let disabled = false;

  let quillEditor: Quill;
  let editorDiv: HTMLElement;

  $: if (disabled && quillEditor) {
    quillEditor.disable();
  } else {
    quillEditor.enable();
  }

  $: if (quillEditor) {
    quillEditor.root.setAttribute("spellcheck", $settingsStore.spellCheck.toString());
  }

  async function rebuildHistoryStack(stack: HistoryStack) {
    if (!quillEditor) return;
    const { Delta: Delta, Range: Range } = await import("quill/core");
    if (stack.undo.length > 0) {
      for (var i = 0; i < stack.undo.length; i++) {
        const index = stack.undo[i].range?.index;
        const length = stack.undo[i].range?.length;

        const item: StackItem = {
          delta: new Delta(stack.undo[i].delta.ops),
          range:
            index !== undefined && length !== undefined
              ? new Range(index, length)
              : null,
        };
        quillEditor.history.stack.undo.push(item);
      }
    }
    if (stack.redo.length > 0) {
      for (var i = 0; i < stack.redo.length; i++) {
        const index = stack.redo[i].range?.index;
        const length = stack.redo[i].range?.length;

        const item: StackItem = {
          delta: new Delta(stack.redo[i].delta.ops),
          range:
            index !== undefined && length !== undefined
              ? new Range(index, length)
              : null,
        };
        quillEditor.history.stack.redo.push(item);
      }
    }
  }

  function loadContentFromTab() {
    if (!quillEditor || !$tabsStore[tabID]) return;

    const ops = $tabsStore[tabID].ops;
    quillEditor.setContents(ops);

    const history = $tabsStore[tabID].history;
    rebuildHistoryStack(history);
  }

  function saveContentToTab() {
    if (!quillEditor || !$tabsStore[tabID]) return;

    $tabsStore[tabID].ops = quillEditor.getContents().ops;
    const history = structuredClone(quillEditor.history.stack);
    $tabsStore[tabID].history = history;
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
      console.log(quillEditor.history);
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

<style>
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
    margin-left: var(--safe-area-left);
    margin-right: var(--safe-area-right);
  }
</style>
