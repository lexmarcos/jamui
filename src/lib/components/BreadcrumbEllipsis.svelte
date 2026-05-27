<script lang="ts">
  import { Ellipsis } from '@lucide/svelte';
  import type { BreadcrumbEllipsisProps } from './breadcrumb';

  let {
    children,
    class: className = '',
    ...rest
  }: BreadcrumbEllipsisProps = $props();
</script>

<button
  {...rest}
  type="button"
  aria-label="More breadcrumbs"
  class={`grid h-5 w-5 place-items-center text-jam-muted transition-colors duration-100 hover:text-jam-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jam-text focus-visible:ring-offset-2 focus-visible:ring-offset-jam-bg ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {:else}
    <Ellipsis size={14} strokeWidth={2.5} />
  {/if}
</button>
