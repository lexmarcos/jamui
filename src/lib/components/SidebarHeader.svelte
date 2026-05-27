<script lang="ts">
  import type { SidebarSectionProps } from './sidebar';

  let { children, class: className = '', ...rest }: SidebarSectionProps = $props();
</script>

<div
  {...rest}
  data-jam-sidebar-header=""
  class={`flex shrink-0 flex-col gap-2 border-b border-jam-text/15 px-3 py-3 group-data-[icon-only=true]/jam-sidebar:px-1.5 ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
