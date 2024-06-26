<script lang="ts">
  import { onMount } from "svelte";
  import "$lib/styles/theme.css";

  export let text: string;

  let editor: HTMLDivElement;
  let slashCommands = ["Transcribe", "Import"];
  let showPopup = false;
  let filteredCommands: string[] = [];
  let popupPosition = { top: 0, left: 0 };
  let selectedIndex = 0;
  let clonedRange: Range;

  onMount(() => {
    editor.addEventListener("keydown", handleKeydown);
  });

  function chooseSlashCommand() {
    //TODO: filter slash commands
    if (clonedRange) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(clonedRange);
      }
    }

  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "/" && !showPopup) {
      filteredCommands = slashCommands;
      selectedIndex = 0;
      setTimeout(() => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          clonedRange = sel.getRangeAt(0).cloneRange();
          const rect = clonedRange.getBoundingClientRect();
          popupPosition = { top: rect.bottom, left: rect.left };
        }
        showPopup = true;
      });
      return;
    }

    if (!showPopup) return;

    switch (event.key) {
      case "ArrowDown":
      case "Tab":
        event.preventDefault();
        selectedIndex = (selectedIndex + 1) % filteredCommands.length;
        break;
      case "ArrowUp":
        event.preventDefault();
        selectedIndex =
          (selectedIndex - 1 + filteredCommands.length) %
          filteredCommands.length;
        break;
      case "Enter":
        event.preventDefault();
        runCommand(filteredCommands[selectedIndex]);
        showPopup = false;
        break;
      case "Escape":
        event.preventDefault();
        showPopup = false;
        break;
      default:
        chooseSlashCommand();
    }
  }

  function runCommand(command: string) {
    showPopup = false;
    console.log(command);
  }
</script>

<div class="container">
  <div
    bind:this={editor}
    bind:innerHTML={text}
    class="editor"
    spellcheck="false"
    placeholder="Enter text here"
    contenteditable="true"
    role="textbox"
  />
  {#if showPopup}
    <div
      class="popup"
      style="top: {popupPosition.top}px; left: {popupPosition.left}px;"
    >
      {#each filteredCommands as command, index}
        <button
          on:click={() => runCommand(command)}
          class="popup-item {index === selectedIndex ? 'selected' : ''}"
        >
          {command}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .container {
    overflow: hidden;
    display: grid;
    background-color: var(--editor-background-color);
  }
  .editor {
    resize: none;
    font-family: var(--editor-font-family);
    font-size: var(--editor-font-size);
    color: var(--editor-text-color);
    background-color: var(--editor-background-color);

    outline: none;

    height: 100%;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    text-wrap: wrap;
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

  .popup {
    position: fixed;
    border: 1px solid #ccc;
    background: white;
    z-index: 1000;
    max-height: 150px;
    overflow-y: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .popup-item {
    padding: 5px 10px;
    cursor: pointer;
  }

  .popup-item.selected {
    background: darkblue;
    color: white;
  }
  .popup-item:hover {
    background: #007bff;
    color: white;
  }
</style>
