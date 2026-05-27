<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { ACCORDION_CONTEXT, ACCORDION_ITEM_CONTEXT, type AccordionItemProps, type AccordionContext, type AccordionItemContext } from './accordion';

  let {
    children,
    class: className = '',
    value,
    disabled = false,
    ...rest
  }: AccordionItemProps = $props();

  const ctx = getContext<AccordionContext>(ACCORDION_CONTEXT);
  const itemId = Math.random().toString(36).substring(2, 9);
  const triggerId = `accordion-trigger-${itemId}`;
  const contentId = `accordion-content-${itemId}`;

  const isOpen = $derived(ctx?.value.includes(value) ?? false);
  const isDisabled = $derived(disabled || (ctx?.disabled ?? false));

  setContext<AccordionItemContext>(ACCORDION_ITEM_CONTEXT, {
    get value() { return value; },
    get isOpen() { return isOpen; },
    get disabled() { return isDisabled; },
    triggerId,
    contentId
  });

  const variantClasses = {
    default: 'border-b border-jam-bg/20',
    bordered: 'border border-jam-bg/30 mb-2',
    separated: 'border border-jam-bg/30 mb-3 bg-jam-surface',
    filled: 'bg-jam-surface mb-2',
    ghost: 'mb-1'
  };
</script>

<div
  {...rest}
  class={`jam-accordion-item ${variantClasses[ctx?.variant ?? 'default']} ${className}`.trim()}
  data-state={isOpen ? 'open' : 'closed'}
  data-disabled={isDisabled ? '' : undefined}
>
  {#if children}
    {@render children()}
  {/if}
</div>
