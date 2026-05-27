<script lang="ts">
  import type { SidebarGroupContentProps } from './sidebar';

  let { children, class: className = '', ...rest }: SidebarGroupContentProps = $props();
</script>

<div
  {...rest}
  data-jam-sidebar-group-content=""
  class={`w-full text-sm ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
