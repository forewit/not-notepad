<script lang="ts">
  import "$lib/styles/theme.css";
  import Toolbar from "$lib/components/Toolbar.svelte";
  import Editor from "$lib/components/Editor.svelte";

  let tabs = [
    {
      id: Date.now().toString(),
      title: "Hello 👋",
      text: "Welcome to notep... not notepad. Something completely different (Microsoft, don't sue me). v0.2",
    },
  ];
  let activeTabID = tabs[0].id;

  $: activeTab = tabs.find((tab) => tab.id == activeTabID) || {
    text: "Click the ➕ above to create a new tab.",
  };
</script>

<div class="container">
  <Toolbar bind:tabs bind:activeTabID />
  <Editor bind:text={activeTab.text} />
</div>

<style>
  .container {
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr;
  }
</style>
