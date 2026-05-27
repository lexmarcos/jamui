export const JAM_THEME_TOKEN_NAMES = [
  'bg',
  'surface',
  'surfaceStrong',
  'input',
  'text',
  'muted',
  'soft',
  'danger'
] as const;

export type JamThemeTokenName = (typeof JAM_THEME_TOKEN_NAMES)[number];

export type JamThemeTokens = Record<JamThemeTokenName, string>;

export const JAM_THEME_CSS_VARIABLES: Record<JamThemeTokenName, string> = {
  bg: '--color-jam-bg',
  surface: '--color-jam-surface',
  surfaceStrong: '--color-jam-surface-strong',
  input: '--color-jam-input',
  text: '--color-jam-text',
  muted: '--color-jam-muted',
  soft: '--color-jam-soft',
  danger: '--color-jam-danger'
};

export const JAM_THEME_PRESETS = {
  jam: {
    bg: '#1713c8',
    surface: '#1410bd',
    surfaceStrong: '#1110aa',
    input: '#0f0ca4',
    text: '#fbfbff',
    muted: '#d8d7ff',
    soft: '#bdbcff',
    danger: '#e81123'
  },
  ink: {
    bg: '#101018',
    surface: '#171723',
    surfaceStrong: '#0c0c13',
    input: '#08080d',
    text: '#f7f7ff',
    muted: '#d7d7e8',
    soft: '#a8a8c7',
    danger: '#ff3b57'
  },
  green: {
    bg: '#063a32',
    surface: '#082f2b',
    surfaceStrong: '#05241f',
    input: '#041f1b',
    text: '#f2fffb',
    muted: '#c8f7e8',
    soft: '#8ee0c8',
    danger: '#ff4d4f'
  },
  violet: {
    bg: '#2a1768',
    surface: '#211254',
    surfaceStrong: '#190d42',
    input: '#140936',
    text: '#fbfaff',
    muted: '#ded7ff',
    soft: '#c0b2ff',
    danger: '#ff3d72'
  },
  solarizedDark: {
    bg: '#002b36',
    surface: '#073642',
    surfaceStrong: '#00212b',
    input: '#001f27',
    text: '#fdf6e3',
    muted: '#93a1a1',
    soft: '#839496',
    danger: '#dc322f'
  },
  solarizedLight: {
    bg: '#fdf6e3',
    surface: '#eee8d5',
    surfaceStrong: '#e4dcc7',
    input: '#f6efdc',
    text: '#073642',
    muted: '#586e75',
    soft: '#657b83',
    danger: '#dc322f'
  },
  fullBlack: {
    bg: '#000000',
    surface: '#050505',
    surfaceStrong: '#0a0a0a',
    input: '#000000',
    text: '#ffffff',
    muted: '#d9d9d9',
    soft: '#a3a3a3',
    danger: '#ff1744'
  },
  blackGreen: {
    bg: '#000000',
    surface: '#031006',
    surfaceStrong: '#010803',
    input: '#000000',
    text: '#00ff66',
    muted: '#8cffb5',
    soft: '#3bdc7b',
    danger: '#ff3b30'
  },
  oldTerminal: {
    bg: '#120f08',
    surface: '#1f1a0f',
    surfaceStrong: '#0c0905',
    input: '#080603',
    text: '#ffb000',
    muted: '#d18b00',
    soft: '#9c6a13',
    danger: '#ff4b2f'
  }
} satisfies Record<string, JamThemeTokens>;

export type JamThemeName = keyof typeof JAM_THEME_PRESETS;

export function getJamThemePreset(name: string | undefined): JamThemeTokens {
  if (name && name in JAM_THEME_PRESETS) {
    return JAM_THEME_PRESETS[name as JamThemeName];
  }
  return JAM_THEME_PRESETS.jam;
}

export function createJamThemeStyle(theme: JamThemeTokens): string {
  const declarations = JAM_THEME_TOKEN_NAMES.map((token) => {
    return `${JAM_THEME_CSS_VARIABLES[token]}:${theme[token]}`;
  });

  declarations.push(`--shadow-jam-hard-sm:${createShadow(theme.text, 0.16, 6)}`);
  declarations.push(`--shadow-jam-hard-md:${createShadow(theme.text, 0.16, 8)}`);
  declarations.push(`--shadow-jam-hard-blue-sm:${createShadow(theme.bg, 0.35, 6)}`);
  declarations.push(`--shadow-jam-hard-blue-md:${createShadow(theme.bg, 0.35, 8)}`);

  return declarations.join(';');
}

export function applyJamTheme(theme: JamThemeTokens, target?: HTMLElement): void {
  const element = target ?? (typeof document === 'undefined' ? undefined : document.documentElement);
  if (!element) return;

  for (const token of JAM_THEME_TOKEN_NAMES) {
    element.style.setProperty(JAM_THEME_CSS_VARIABLES[token], theme[token]);
  }

  element.style.setProperty('--shadow-jam-hard-sm', createShadow(theme.text, 0.16, 6));
  element.style.setProperty('--shadow-jam-hard-md', createShadow(theme.text, 0.16, 8));
  element.style.setProperty('--shadow-jam-hard-blue-sm', createShadow(theme.bg, 0.35, 6));
  element.style.setProperty('--shadow-jam-hard-blue-md', createShadow(theme.bg, 0.35, 8));
}

function createShadow(color: string, alpha: number, offset: number): string {
  return `${offset}px ${offset}px 0 ${toRgba(color, alpha)}`;
}

function toRgba(color: string, alpha: number): string {
  const rgb = parseHexColor(color);
  if (!rgb) return color;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function parseHexColor(color: string): { r: number; g: number; b: number } | undefined {
  const normalized = color.trim();
  const shorthand = /^#([0-9a-f]{3})$/i.exec(normalized);
  if (shorthand) {
    const [r, g, b] = shorthand[1].split('').map((char) => parseInt(`${char}${char}`, 16));
    return { r, g, b };
  }

  const full = /^#([0-9a-f]{6})$/i.exec(normalized);
  if (!full) return undefined;

  return {
    r: parseInt(full[1].slice(0, 2), 16),
    g: parseInt(full[1].slice(2, 4), 16),
    b: parseInt(full[1].slice(4, 6), 16)
  };
}
