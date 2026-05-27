<script lang="ts">
  import { getContext } from 'svelte';
  import { ChevronRight } from '@lucide/svelte';
  import { BREADCRUMB_CONTEXT, type BreadcrumbContext, type BreadcrumbSeparatorProps } from './breadcrumb';

  let {
    children,
    class: className = '',
    ...rest
  }: BreadcrumbSeparatorProps = $props();

  const ctx = getContext<BreadcrumbContext>(BREADCRUMB_CONTEXT);
</script>

<span
  {...rest}
  role="presentation"
  aria-hidden="true"
  class={`text-jam-muted/50 ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {:else if ctx?.separator}
    {@render ctx.separator()}
  {:else}
    <ChevronRight size={12} strokeWidth={2.5} />
  {/if}
</span>
