<script lang="ts">
  import { getContext } from 'svelte';
  import { ChevronDown } from '@lucide/svelte';
  import { COLLAPSIBLE_CONTEXT, type CollapsibleContext, type CollapsibleTriggerProps } from './collapsible';

  let {
    children,
    class: className = '',
    ...rest
  }: CollapsibleTriggerProps = $props();

  const ctx = getContext<CollapsibleContext>(COLLAPSIBLE_CONTEXT);

  const isOpen = $derived(ctx?.open ?? false);
  const variant = $derived(ctx?.variant ?? 'default');

  const baseClass =
    'group flex w-full cursor-pointer select-none items-center justify-between font-black uppercase outline-none transition-all duration-150 ease-out focus-visible:ring-2 focus-visible:ring-jam-text focus-visible:ring-offset-2 focus-visible:ring-offset-jam-bg';

  const variantClass = $derived(
    variant === 'ghost'
      ? 'min-h-9 px-0 text-xs tracking-[0.18em] text-jam-text hover:text-jam-muted bg-transparent border-0'
      : variant === 'bordered'
        ? 'min-h-10 px-3 text-xs tracking-[0.18em] text-jam-text border border-jam-text/25 bg-transparent hover:bg-jam-text/5 hover:border-jam-text/40'
        : 'min-h-10 px-3 text-xs tracking-[0.18em] text-jam-text border border-jam-text/15 bg-jam-surface hover:border-jam-text/30 hover:bg-jam-surface-strong'
  );
</script>

<button
  {...rest}
  type="button"
  aria-expanded={isOpen}
  aria-controls={ctx?.panelId}
  class={`${baseClass} ${variantClass} ${className}`.trim()}
  onclick={() => ctx?.toggle()}
>
  {#if children}
    {@render children()}
  {/if}
  <ChevronDown
    size={14}
    class="shrink-0 text-jam-muted transition-transform duration-150 ease-out {isOpen ? 'rotate-180' : ''}"
  />
</button>
