import {
  applyJamTheme,
  getJamThemePreset,
  JAM_THEME_PRESETS,
  type JamThemeName,
  type JamThemeTokens
} from '../lib/theme';

export type JamStorybookThemeName = JamThemeName | 'custom';

export const JAM_STORYBOOK_CUSTOM_THEME_KEY = 'jamui:storybook:custom-theme';

export const JAM_STORYBOOK_THEME_OPTIONS: Array<{
  value: JamStorybookThemeName;
  title: string;
}> = [
  { value: 'jam', title: 'Jam Blue' },
  { value: 'ink', title: 'Ink' },
  { value: 'green', title: 'Ops Green' },
  { value: 'violet', title: 'Violet' },
  { value: 'solarizedDark', title: 'Solarized Dark' },
  { value: 'solarizedLight', title: 'Solarized Light' },
  { value: 'fullBlack', title: 'Full Black' },
  { value: 'blackGreen', title: 'Black + Green' },
  { value: 'oldTerminal', title: 'Old Terminal' },
  { value: 'custom', title: 'Custom' }
];

export function resolveStorybookTheme(themeName: string | undefined): JamThemeTokens {
  if (themeName === 'custom') {
    return loadCustomStorybookTheme();
  }

  return getJamThemePreset(themeName);
}

export function loadCustomStorybookTheme(): JamThemeTokens {
  if (typeof window === 'undefined') return JAM_THEME_PRESETS.jam;

  try {
    const raw = window.localStorage.getItem(JAM_STORYBOOK_CUSTOM_THEME_KEY);
    if (!raw) return JAM_THEME_PRESETS.jam;
    const parsed = JSON.parse(raw) as Partial<JamThemeTokens>;
    return { ...JAM_THEME_PRESETS.jam, ...parsed };
  } catch {
    return JAM_THEME_PRESETS.jam;
  }
}

export function saveCustomStorybookTheme(theme: JamThemeTokens): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(JAM_STORYBOOK_CUSTOM_THEME_KEY, JSON.stringify(theme));
  } catch {
    // Storybook can run in storage-restricted browser contexts.
  }
}

export function applyStorybookTheme(themeNameOrTokens: string | JamThemeTokens | undefined): void {
  const theme =
    typeof themeNameOrTokens === 'object'
      ? themeNameOrTokens
      : resolveStorybookTheme(themeNameOrTokens);

  applyJamTheme(theme);

  if (typeof document !== 'undefined') {
    document.documentElement.style.background = theme.bg;
    document.body.style.background = theme.bg;
    document.body.style.color = theme.text;
  }
}
