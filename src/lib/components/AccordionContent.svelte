<script lang="ts">
  import { getContext } from 'svelte';
  import { ACCORDION_CONTEXT, ACCORDION_ITEM_CONTEXT, type AccordionContentProps, type AccordionContext, type AccordionItemContext } from './accordion';

  let {
    children,
    class: className = '',
    ...rest
  }: AccordionContentProps = $props();

  const ctx = getContext<AccordionContext>(ACCORDION_CONTEXT);
  const itemCtx = getContext<AccordionItemContext>(ACCORDION_ITEM_CONTEXT);

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-3 text-sm',
    lg: 'px-5 py-4 text-base'
  };
</script>

<div
  {...rest}
  id={itemCtx?.contentId}
  role="region"
  aria-labelledby={itemCtx?.triggerId}
  aria-hidden={itemCtx?.isOpen ? undefined : 'true'}
  inert={itemCtx?.isOpen ? undefined : true}
  data-state={itemCtx?.isOpen ? 'open' : 'closed'}
  class={`jam-accordion-content grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out ${
    itemCtx?.isOpen ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'
  } ${className}`.trim()}
>
  <div class={`min-h-0 overflow-hidden ${sizeClasses[ctx?.size ?? 'md']}`}>
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
