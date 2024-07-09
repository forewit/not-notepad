<script lang="ts">
  import { settingsStore } from "$lib/stores/settingsStore";
  import { themes } from "$lib/modules/themes";

  $: css = updateCSS($settingsStore.theme);

  function updateCSS(themeName: string) {
    const theme =
      themeName === "Custom"
        ? $settingsStore.customTheme
        : themes.find((t) => t.name === themeName);
    if (!theme) return "";

    return `<style>
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
</script>

{@html css}
<slot />
