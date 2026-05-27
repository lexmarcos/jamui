<script lang="ts">
  import type { SidebarMenuProps } from './sidebar';

  let { children, class: className = '', ...rest }: SidebarMenuProps = $props();
</script>

<ul
  {...rest}
  data-jam-sidebar-menu=""
  class={`flex w-full min-w-0 flex-col gap-0.5 ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</ul>
