<script lang="ts">
  import {
    JAM_THEME_PRESETS,
    type JamThemeName,
    type JamThemeTokenName,
    type JamThemeTokens
  } from '../lib/theme';
  import {
    applyStorybookTheme,
    JAM_STORYBOOK_THEME_OPTIONS,
    saveCustomStorybookTheme
  } from './theme-controls';

  type Props = Partial<JamThemeTokens>;

  let {
    bg = JAM_THEME_PRESETS.jam.bg,
    surface = JAM_THEME_PRESETS.jam.surface,
    surfaceStrong = JAM_THEME_PRESETS.jam.surfaceStrong,
    input = JAM_THEME_PRESETS.jam.input,
    text = JAM_THEME_PRESETS.jam.text,
    muted = JAM_THEME_PRESETS.jam.muted,
    soft = JAM_THEME_PRESETS.jam.soft,
    danger = JAM_THEME_PRESETS.jam.danger
  }: Props = $props();

  const tokenRows: Array<{
    key: JamThemeTokenName;
    label: string;
    role: string;
  }> = [
    { key: 'bg', label: 'Background', role: 'App canvas' },
    { key: 'surface', label: 'Surface', role: 'Panels' },
    { key: 'surfaceStrong', label: 'Strong surface', role: 'Raised panels' },
    { key: 'input', label: 'Input', role: 'Fields' },
    { key: 'text', label: 'Text', role: 'Primary' },
    { key: 'muted', label: 'Muted', role: 'Secondary' },
    { key: 'soft', label: 'Soft', role: 'Tertiary' },
    { key: 'danger', label: 'Danger', role: 'Errors' }
  ];

  const presetOptions = JAM_STORYBOOK_THEME_OPTIONS.filter((option) => option.value !== 'custom');

  const argsTheme = $derived<JamThemeTokens>({
    bg,
    surface,
    surfaceStrong,
    input,
    text,
    muted,
    soft,
    danger
  });

  let theme = $state<JamThemeTokens>({ ...JAM_THEME_PRESETS.jam });
  let argsSignature = $state('');

  $effect(() => {
    const nextSignature = JSON.stringify(argsTheme);
    if (nextSignature !== argsSignature) {
      theme = { ...argsTheme };
      argsSignature = nextSignature;
    }
  });

  $effect(() => {
    applyStorybookTheme(theme);
    saveCustomStorybookTheme(theme);
  });

  function setPreset(name: JamThemeName) {
    theme = { ...JAM_THEME_PRESETS[name] };
  }

  function setToken(token: JamThemeTokenName, value: string) {
    theme = { ...theme, [token]: value };
  }
</script>

<div class="jamui-root min-h-screen bg-jam-bg p-6 text-jam-text">
  <div class="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[minmax(20rem,0.9fr)_minmax(0,1.1fr)]">
    <section class="border border-jam-text/25 bg-jam-surface shadow-jam-hard-sm">
      <header class="border-b border-jam-text/15 px-4 py-3">
        <p class="text-[10px] font-black uppercase tracking-[0.22em] text-jam-soft">Design System</p>
        <h1 class="mt-1 text-xl font-black uppercase tracking-[0.18em] text-jam-text">
          Theme Config
        </h1>
      </header>

      <div class="grid gap-3 p-4">
        <div class="grid grid-cols-2 gap-2">
          {#each presetOptions as preset}
            <button
              type="button"
              class="min-h-10 border border-jam-text/30 px-3 text-left text-[10px] font-black uppercase tracking-[0.16em] text-jam-text transition-colors hover:bg-jam-text hover:text-jam-bg"
              onclick={() => setPreset(preset.value as JamThemeName)}
            >
              {preset.title}
            </button>
          {/each}
        </div>

        <div class="grid gap-2">
          {#each tokenRows as token}
            <label
              class="grid grid-cols-[2.25rem_minmax(0,1fr)_6.5rem] items-center gap-3 border border-jam-text/15 bg-jam-bg px-2 py-2"
            >
              <input
                type="color"
                value={theme[token.key]}
                aria-label={`${token.label} color`}
                class="h-8 w-8 cursor-pointer appearance-none border border-jam-text/30 bg-transparent p-0"
                oninput={(event) => setToken(token.key, event.currentTarget.value)}
              />
              <span class="min-w-0">
                <span class="block truncate text-[11px] font-black uppercase tracking-[0.16em] text-jam-text">
                  {token.label}
                </span>
                <span class="block truncate text-[10px] font-medium tracking-[0.08em] text-jam-soft/75">
                  {token.role}
                </span>
              </span>
              <input
                type="text"
                value={theme[token.key]}
                aria-label={`${token.label} hex`}
                class="h-8 min-w-0 border border-jam-text/20 bg-jam-input px-2 text-[10px] font-bold uppercase tracking-[0.08em] text-jam-text outline-none focus:border-jam-text"
                oninput={(event) => setToken(token.key, event.currentTarget.value)}
              />
            </label>
          {/each}
        </div>
      </div>
    </section>

    <section class="grid gap-4">
      <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
        {#each tokenRows as token}
          <article class="border border-jam-text/20 bg-jam-surface p-3">
            <div
              class="mb-3 h-12 border border-jam-text/25"
              style={`background: ${theme[token.key]};`}
            ></div>
            <div class="text-[9px] font-black uppercase tracking-[0.18em] text-jam-soft">
              {token.key}
            </div>
            <div class="mt-1 text-[11px] font-bold uppercase tracking-[0.1em] text-jam-text">
              {theme[token.key]}
            </div>
          </article>
        {/each}
      </div>

      <article class="border border-jam-text/25 bg-jam-surface p-5 shadow-jam-hard-sm">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-[10px] font-black uppercase tracking-[0.22em] text-jam-soft">
              Preview
            </p>
            <h2 class="mt-2 text-2xl font-black uppercase tracking-[0.18em] text-jam-text">
              Build Queue
            </h2>
            <p class="mt-2 max-w-md text-xs font-medium leading-relaxed tracking-[0.05em] text-jam-muted">
              Recent deploys, incidents, and operators across the current workspace.
            </p>
          </div>
          <button
            type="button"
            class="min-h-10 border border-jam-text bg-jam-text px-4 text-[10px] font-black uppercase tracking-[0.18em] text-jam-bg transition-all hover:shadow-jam-hard-md"
          >
            Sync
          </button>
        </div>

        <div class="mt-5 grid gap-3 md:grid-cols-3">
          <div class="border border-jam-text/20 bg-jam-bg p-4">
            <p class="text-[9px] font-black uppercase tracking-[0.2em] text-jam-soft">Runs</p>
            <p class="mt-3 text-3xl font-black text-jam-text">042</p>
          </div>
          <div class="border border-jam-text/20 bg-jam-bg p-4">
            <p class="text-[9px] font-black uppercase tracking-[0.2em] text-jam-soft">Active</p>
            <p class="mt-3 text-3xl font-black text-jam-text">12</p>
          </div>
          <div class="border border-jam-danger/70 bg-jam-bg p-4">
            <p class="text-[9px] font-black uppercase tracking-[0.2em] text-jam-danger">Issues</p>
            <p class="mt-3 text-3xl font-black text-jam-danger">03</p>
          </div>
        </div>

        <div class="mt-5 border border-jam-text/20 bg-jam-text p-4 text-jam-bg shadow-jam-hard-blue-sm">
          <div class="flex items-center justify-between gap-3">
            <span class="text-[10px] font-black uppercase tracking-[0.18em]">Selected Job</span>
            <span class="border border-jam-bg/30 px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em]">
              Live
            </span>
          </div>
          <div class="mt-3 h-2 bg-jam-bg/10">
            <div class="h-full w-2/3 bg-jam-bg"></div>
          </div>
        </div>
      </article>
    </section>
  </div>
</div>
