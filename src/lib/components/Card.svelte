<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import { CARD_CONTEXT, type CardProps } from './card';

  let {
    children,
    class: className = '',
    size = 'md',
    variant = 'default',
    ...rest
  }: CardProps = $props();

  const baseClass = 'relative overflow-hidden rounded-none border font-jam-mono transition-shadow duration-150';

  const sizeClass: Record<string, string> = {
    sm: '',
    md: '',
    lg: ''
  };

  const variantClass: Record<string, string> = {
    default: 'border-jam-text/15 bg-jam-surface',
    filled: 'border-jam-bg/15 bg-jam-text text-jam-bg',
    bordered: 'border-jam-text/25 bg-transparent',
    elevated: 'border-jam-text/15 bg-jam-surface shadow-jam-hard-sm'
  };

  const mergedClass = $derived(
    `${baseClass} ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()
  );

  setContext(CARD_CONTEXT, {
    get variant() { return variant; },
    get size() { return size; }
  });
</script>

<div {...rest} class={mergedClass}>
  {#if children}
    {@render children()}
  {/if}
</div>
