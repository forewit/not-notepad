<script lang="ts">
  import { onMount } from "svelte";

  let logs: string[] = [];

  onMount(() => {
    const log = console.log;
    console.log = function (e) {
      log.apply(console, [].slice.call(arguments));

      // Custom logging
      logs.push(e);
      logs = logs;
      setTimeout(() => {
        logs = logs.slice(1);
      }, 10000);

      
    };
  });
</script>

{#each logs as log}
  <p>{log}</p>
{/each}

<style>
  p {
    font-size: 12px;
    opacity: 0.8;
    color: var(--text);
    pointer-events: none;
    user-select: none;
  }
</style>
