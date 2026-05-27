<script lang="ts">
  import type { SidebarSeparatorProps } from './sidebar';

  let { class: className = '', ...rest }: SidebarSeparatorProps = $props();
</script>

<hr
  {...rest}
  data-jam-sidebar-separator=""
  aria-orientation="horizontal"
  class={`mx-2 my-2 h-px border-0 bg-jam-text/15 group-data-[icon-only=true]/jam-sidebar:mx-1 ${className}`.trim()}
/>
