<script lang="ts">
  import type { BreadcrumbItemProps } from './breadcrumb';

  let {
    children,
    class: className = '',
    ...rest
  }: BreadcrumbItemProps = $props();
</script>

<li
  {...rest}
  class={`inline-flex items-center gap-1.5 ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</li>
