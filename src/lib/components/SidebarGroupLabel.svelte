<script lang="ts">
  import type { SidebarGroupLabelProps } from './sidebar';

  let { children, class: className = '', ...rest }: SidebarGroupLabelProps = $props();
</script>

<div
  {...rest}
  data-jam-sidebar-group-label=""
  class={`mb-1 flex h-7 shrink-0 items-center gap-2 px-2 text-[10px] font-black uppercase tracking-[0.2em] text-jam-soft/70 transition-opacity duration-150 group-data-[icon-only=true]/jam-sidebar:pointer-events-none group-data-[icon-only=true]/jam-sidebar:h-0 group-data-[icon-only=true]/jam-sidebar:overflow-hidden group-data-[icon-only=true]/jam-sidebar:opacity-0 ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
