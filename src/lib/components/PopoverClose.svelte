<script lang="ts">
  import { getContext } from 'svelte';
  import { X } from '@lucide/svelte';
  import { POPOVER_CONTEXT, type PopoverContext, type PopoverCloseProps } from './popover';

  let {
    children,
    class: className = '',
    'aria-label': ariaLabel = children ? undefined : 'Fechar',
    ...rest
  }: PopoverCloseProps = $props();

  const ctx = getContext<PopoverContext>(POPOVER_CONTEXT);
</script>

<button
  {...rest}
  type="button"
  aria-label={ariaLabel}
  class={`flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center border border-jam-bg/20 bg-transparent text-jam-bg/70 transition-colors duration-150 hover:border-jam-bg hover:bg-jam-bg/10 hover:text-jam-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-jam-bg focus-visible:ring-offset-2 focus-visible:ring-offset-jam-text ${className}`.trim()}
  onclick={() => ctx?.close()}
>
  {#if children}
    {@render children()}
  {:else}
    <X size={12} strokeWidth={2.5} aria-hidden="true" />
  {/if}
</button>
