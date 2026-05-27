<script lang="ts">
  import { getContext } from 'svelte';
  import { X } from '@lucide/svelte';
  import { DRAWER_CONTEXT, type DrawerContext, type DrawerCloseProps } from './drawer';

  let {
    children,
    class: className = '',
    'aria-label': ariaLabel = children ? undefined : 'Fechar',
    ...rest
  }: DrawerCloseProps = $props();

  const ctx = getContext<DrawerContext>(DRAWER_CONTEXT);
</script>

<button
  {...rest}
  type="button"
  aria-label={ariaLabel}
  class={`flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-none border border-jam-bg/20 bg-transparent text-jam-bg/70 transition-colors duration-150 hover:border-jam-bg hover:bg-jam-bg/10 hover:text-jam-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-jam-bg focus-visible:ring-offset-2 focus-visible:ring-offset-jam-text ${className}`.trim()}
  onclick={() => ctx?.close()}
>
  {#if children}
    {@render children()}
  {:else}
    <X size={14} strokeWidth={2.5} aria-hidden="true" />
  {/if}
</button>
