<script lang="ts">
  import { onMount } from "svelte";

  let logs: string[] = [];

  onMount(() => {
    const log = console.log;
    console.log = function (e) {
      log.apply(console, [].slice.call(arguments));
      logs.push(e); //custom code

      setTimeout(() => {
        logs = logs.slice(1);
      }, 5000);

      logs = logs;
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
  }
</style>
