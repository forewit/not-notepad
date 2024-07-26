<script lang="ts">
  import { settingsStore } from "$lib/stores/settingsStore";
  import { themes, type ThemeNames } from "$lib/modules/themes";
  import { onMount } from "svelte";
  import { base } from "$app/paths";

  $: css = updateCSS($settingsStore.theme);

  function updateCSS(themeName: ThemeNames) {
    const theme = themes.find((t) => t.name === themeName);
    if (!theme) return "";

    return `<style>
    @font-face {
      font-family: "Cascadia Code";
      src: url("${base}/fonts/Cascadia.ttf") format("truetype");
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: "Selawik";
      src: url("${base}/fonts/Selawik.ttf") format("truetype");
      font-weight: normal;
      font-style: normal;
    }

    :root {
    --bg: ${theme.bg};
    --bg-alt: ${theme.bgAlt};
    --main: ${theme.main};
    --caret: ${theme.caret};
    --error: ${theme.error};
    --sub: ${theme.sub};
    --text: ${theme.text};
    }
    </style>`;
  }

  function updateThemeColor() {
    const theme = themes.find((t) => t.name === $settingsStore.theme);
    if (!theme) return;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme.bg);
  }

  onMount(() => {
    updateCSS($settingsStore.theme);
    settingsStore.subscribe(updateThemeColor);
  });
</script>

{@html css}
<slot />
