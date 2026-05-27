<script lang="ts">
  import type { SidebarMenuSubItemProps } from './sidebar';

  let { children, class: className = '', ...rest }: SidebarMenuSubItemProps = $props();
</script>

<li
  {...rest}
  data-jam-sidebar-menu-sub-item=""
  class={`group/jam-sidebar-menu-sub-item relative ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</li>
