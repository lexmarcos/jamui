<script lang="ts">
  import type { BreadcrumbListProps } from './breadcrumb';

  let {
    children,
    class: className = '',
    ...rest
  }: BreadcrumbListProps = $props();
</script>

<ol
  {...rest}
  class={`flex flex-wrap items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</ol>
