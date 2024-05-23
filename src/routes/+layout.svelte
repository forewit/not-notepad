<script>
 import "$lib/styles/normalize.css";
 import "$lib/styles/reset.css";
</script>

<svelte:head>
  <meta
    name="viewport"
    content="width=device-width, user-scalable=0, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
  />
</svelte:head>

<div class="container">
  <div class="content">
    <slot />
  </div>
</div>

<style>
.container {
    /* make fullscreen */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .content {
    /* fill container */
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
