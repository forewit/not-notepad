<script lang="ts">
  import "$lib/styles/theme.css";
  import Toolbar from "$lib/components/Toolbar.svelte";
  import Editor from "$lib/components/Editor.svelte";
</script>

<div class="container">
  <Toolbar />
  <Editor />
</div>

<style>
  .container {
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr;
  }
</style>
