# jamui

Design system inspirado no frontend do 8disc: mono, direto, alto contraste, bordas retas e interacoes por inversao de cor.

## Uso em um app Svelte

Em um projeto novo, importe o CSS completo uma vez no layout raiz:

```ts
import 'jamui/styles.css';
```

Em um projeto que ja tem Tailwind v4 no CSS global, prefira importar so o tema:

```css
@import 'tailwindcss';
@import 'jamui/theme.css';
```

Use os componentes:

```svelte
<script lang="ts">
  import { Button, TextInput } from 'jamui';

  let name = '';
</script>

<main class="min-h-screen bg-jam-bg p-6 text-jam-text font-jam-mono">
  <div class="mx-auto grid max-w-2xl gap-6">
    <TextInput id="name" label="Nome" placeholder="Markzuel" bind:value={name} />
    <Button>Salvar</Button>
  </div>
</main>
```

## Tokens Tailwind

O arquivo `jamui/theme.css` registra tokens via Tailwind v4 `@theme`.

Principais tokens:

- `bg-jam-bg`, `text-jam-text`
- `bg-jam-surface`, `bg-jam-input`
- `text-jam-muted`, `text-jam-soft`
- `font-jam-mono`
- `shadow-jam-hard-sm`, `shadow-jam-hard-md`

## Componentes iniciais

- `Button`: variantes `primary`, `secondary` e `ghost`; tamanhos `sm`, `md`, `lg`.
- `TextInput`: input de texto com label, hint, erro e `bind:value`.

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

Por padrao o Storybook roda em `http://localhost:6102`.
