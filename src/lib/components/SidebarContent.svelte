<script lang="ts">
  import type { SidebarSectionProps } from './sidebar';

  let { children, class: className = '', ...rest }: SidebarSectionProps = $props();
</script>

<div
  {...rest}
  data-jam-sidebar-content=""
  class={`flex min-h-0 flex-1 flex-col gap-1 overflow-x-hidden overflow-y-auto py-2 ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
