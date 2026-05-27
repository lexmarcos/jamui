<script lang="ts">
  import type { SidebarMenuSubProps } from './sidebar';

  let { children, class: className = '', ...rest }: SidebarMenuSubProps = $props();
</script>

<ul
  {...rest}
  data-jam-sidebar-menu-sub=""
  class={`mt-0.5 ml-3.5 flex min-w-0 flex-col gap-0.5 border-l border-jam-text/15 pl-2 group-data-[icon-only=true]/jam-sidebar:hidden ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</ul>
