<p align="center">
  <img src="https://i.imgur.com/ltKEcsJ.png" alt="JamUI" width="450" />
</p>

# JamUI

> Design system inspired by 8disc's frontend: mono, direct, high-contrast, sharp edges, and color-inversion interactions.

Svelte 5 (Runes) component library styled with Tailwind CSS v4.

---

## Installation

```bash
npm i @lexmarcos/jamui
```

### Peer Dependencies

- `svelte` ^5.0.0

---

## Quick Start

### Project WITHOUT Tailwind v4

Import the full CSS once in your root layout:

```ts
import '@lexmarcos/jamui/styles.css';
```

### Project WITH Tailwind v4

Import only the theme in your global CSS:

```css
@import 'tailwindcss';
@import '@lexmarcos/jamui/theme.css';
```

---

## Basic Usage

```svelte
<script lang="ts">
  import { Button, TextInput } from '@lexmarcos/jamui';

  let name = '';
</script>

<main class="min-h-screen bg-jam-bg p-6 text-jam-text font-jam-mono">
  <div class="mx-auto grid max-w-2xl gap-6">
    <TextInput id="name" label="Name" placeholder="Mark" bind:value={name} />
    <Button>Save</Button>
  </div>
</main>
```

---

## Tailwind Tokens

`@lexmarcos/jamui/theme.css` registers tokens via Tailwind v4 `@theme`.

| Token | Value | Class |
|-------|-------|--------|
| Background | `#1713c8` | `bg-jam-bg` |
| Surface | `#1410bd` | `bg-jam-surface` |
| Input Surface | `#0f0ca4` | `bg-jam-input` |
| Primary Text | `#fbfbff` | `text-jam-text` |
| Muted Text | `#d8d7ff` | `text-jam-muted` |
| Soft Text | `#bdbcff` | `text-jam-soft` |
| Danger | `#e81123` | `text-jam-danger` |
| Font | `JetBrains Mono` | `font-jam-mono` |
| Hard Shadow sm | — | `shadow-jam-hard-sm` |
| Hard Shadow md | — | `shadow-jam-hard-md` |

---

## Themes

9 built-in theme presets. Switch at runtime:

```ts
import { applyJamTheme, getJamThemePreset } from '@lexmarcos/jamui';

applyJamTheme(getJamThemePreset('ink'));
```

Available presets: `jam`, `ink`, `green`, `violet`, `solarizedDark`, `solarizedLight`, `fullBlack`, `blackGreen`, `oldTerminal`.

---

## Components

### Forms

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, ghost, danger button |
| `TextInput` | Text input with label, hint, error, and `bind:value` |
| `Textarea` | Textarea with character counter, configurable resize |
| `Checkbox` | Checkbox with label and indeterminate state |
| `Switch` | Toggle switch with label and description |
| `RadioGroup` + `RadioItem` | Radio button group |
| `Select` + `SelectOption` | Custom select with keyboard navigation |
| `Combobox` | Filterable combobox with autocomplete |
| `Slider` | Range slider with drag and keyboard support |
| `DatePicker` | Date picker (single/range) with calendar popup |

### Feedback & Status

| Component | Description |
|-----------|-------------|
| `Alert` | Dismissible alert banner (info/success/warning/danger) |
| `Badge` | Inline status tag with filled/outline/soft variants |
| `Progress` | Progress bar with variants and indeterminate mode |
| `Empty` | Empty state with icon, title, description, and optional children |

### Navigation & Layout

| Component | Description |
|-----------|-------------|
| `Breadcrumb` + 5 subs | Breadcrumb with customizable separator |
| `Tabs` (TabGroup/TabList/TabTrigger/TabPanel) | Horizontal/vertical tabs |
| `Accordion` + 3 subs | Accessible accordion (single/multiple) |
| `Sidebar` + 17 subs | Full sidebar system with collapse, mobile, persist |
| `Dropdown` + 2 subs | Menu dropdown with trigger snippet and keyboard nav |
| `ContextMenu` + 13 subs | Right-click context menu with submenus, checkbox, radio |
| `Popover` + 2 subs | Floating popover with auto-positioning |

### Containers & Display

| Component | Description |
|-----------|-------------|
| `Card` + 3 subs | Card with header/body/footer and variants |
| `Collapsible` + 2 subs | Animated expand/collapse container |
| `Table` + 6 subs | Basic HTML table with context-based size/striping |
| `DataTable` | Advanced table with sort, filter, pagination, selection |
| `Separator` | Horizontal/vertical divider with variants |
| `Dialog` + 9 subs | Modal dialog with focus trap and asChild pattern |
| `AlertDialog` + 6 subs | Modal alert dialog |
| `Drawer` + 4 subs | Slide-in panel (left/right/top/bottom) |
| `Avatar` | Avatar with fallback snippet |
| `Tooltip` | Hover tooltip with positioning |

---

## LLM Documentation

All components have detailed LLM documentation in the `llms/` directory. Each `.txt` file covers:

- Sub-component structure
- Full props API
- Design tokens
- Code examples
- Accessibility (keyboard navigation, ARIA attributes)

---

## Build

```bash
pnpm install
pnpm check
pnpm build
```

## Storybook

```bash
pnpm storybook
pnpm build-storybook
```

Storybook runs at `http://localhost:6102` by default.
