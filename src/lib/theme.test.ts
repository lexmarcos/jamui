import { describe, expect, it } from 'vitest';
import {
  applyJamTheme,
  createJamThemeStyle,
  getJamThemePreset,
  JAM_THEME_PRESETS
} from './theme';

describe('theme', () => {
  it('resolve um preset conhecido e volta para jam quando o nome e invalido', () => {
    expect(getJamThemePreset('green')).toBe(JAM_THEME_PRESETS.green);
    expect(getJamThemePreset('solarizedDark')).toBe(JAM_THEME_PRESETS.solarizedDark);
    expect(getJamThemePreset('solarizedLight')).toBe(JAM_THEME_PRESETS.solarizedLight);
    expect(getJamThemePreset('fullBlack')).toBe(JAM_THEME_PRESETS.fullBlack);
    expect(getJamThemePreset('blackGreen')).toBe(JAM_THEME_PRESETS.blackGreen);
    expect(getJamThemePreset('oldTerminal')).toBe(JAM_THEME_PRESETS.oldTerminal);
    expect(getJamThemePreset('missing')).toBe(JAM_THEME_PRESETS.jam);
  });

  it('gera CSS custom properties para todos os tokens principais', () => {
    const style = createJamThemeStyle(JAM_THEME_PRESETS.jam);

    expect(style).toContain('--color-jam-bg:#1713c8');
    expect(style).toContain('--color-jam-surface:#1410bd');
    expect(style).toContain('--color-jam-danger:#e81123');
    expect(style).toContain('--shadow-jam-hard-blue-sm:6px 6px 0 rgba(23, 19, 200, 0.35)');
  });

  it('aplica o tema em um elemento alvo', () => {
    const target = document.createElement('div');

    applyJamTheme(JAM_THEME_PRESETS.ink, target);

    expect(target.style.getPropertyValue('--color-jam-bg')).toBe('#101018');
    expect(target.style.getPropertyValue('--color-jam-text')).toBe('#f7f7ff');
    expect(target.style.getPropertyValue('--shadow-jam-hard-blue-md')).toBe(
      '8px 8px 0 rgba(16, 16, 24, 0.35)'
    );
  });
});
