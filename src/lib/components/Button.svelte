<script lang="ts">
  import "$lib/styles/theme.css";

  export let onClick = () => {};
  export let url = "";
</script>

<button on:click|stopPropagation={onClick} >
  <!-- svg from url -->
  <div
    class="icon"
    style="-webkit-mask: url({url}) no-repeat center / contain;
    mask: url({url}) no-repeat center / contain;"
  ></div>
</button>

<style>
  button {
    width: 28px;
    height: 22px;
    margin: 4px;
    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  button:hover {
    background-color: var(--slight-transparent);
  }
  button:active {
    opacity: 0.8;
  }
  .icon {
    background-color: var(--ui-color);
    width: 10px;
    aspect-ratio: 1;
  }
</style>
