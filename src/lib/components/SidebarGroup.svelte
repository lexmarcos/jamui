<script lang="ts">
  import type { SidebarSectionProps } from './sidebar';

  let { children, class: className = '', ...rest }: SidebarSectionProps = $props();
</script>

<div
  {...rest}
  data-jam-sidebar-group=""
  class={`relative flex w-full min-w-0 flex-col px-1.5 py-2 ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
