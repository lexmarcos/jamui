<script lang="ts">
  import { getContext } from 'svelte';
  import { CARD_CONTEXT, type CardContext, type CardHeaderProps } from './card';

  let {
    children,
    class: className = '',
    ...rest
  }: CardHeaderProps = $props();

  const ctx = getContext<CardContext>(CARD_CONTEXT);
  const variant = $derived(ctx?.variant ?? 'default');

  const borderClass = $derived(
    variant === 'filled'
      ? 'border-b border-jam-bg/10'
      : 'border-b border-jam-text/10'
  );
</script>

<div
  {...rest}
  class={`px-4 py-3 ${borderClass} ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
