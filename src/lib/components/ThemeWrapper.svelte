<script lang="ts">
  import { settingsStore } from "$lib/stores/settingsStore";
  import { themes } from "$lib/modules/themes";

  $: css = updateCSS($settingsStore.theme);

  function updateCSS(themeName: string) {
    console.log(themeName);
    const theme = themes.find((t) => t.name === themeName);
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
    --font: ${theme.font};
    --font-size: ${theme.fontSize};
    --ui-font: ${theme.uiFont};
    --ui-font-size: ${theme.uiFontSize};
    --transition-speed: ${theme.transitionSpeed};
    --tabbar-scrollbar-size: ${theme.tabbarScrollbarSize};
    --tabbar-height: ${theme.tabbarHeight};
    --tab-height: ${theme.tabHeight};
    --tab-radius: ${theme.tabRadius};
    --tab-gaps: ${theme.tabGaps};
    --editor-scrollbar-size: ${theme.editorScrollbarSize};
    }
    </style>`;
  }
</script>

{@html css}
<slot />
