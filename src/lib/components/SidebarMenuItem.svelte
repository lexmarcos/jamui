<script lang="ts">
  import type { SidebarMenuItemProps } from './sidebar';

  let { children, class: className = '', ...rest }: SidebarMenuItemProps = $props();
</script>

<li
  {...rest}
  data-jam-sidebar-menu-item=""
  class={`group/jam-sidebar-menu-item relative ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</li>
