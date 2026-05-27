<script lang="ts">
  import type { ContextMenuSeparatorProps } from './context-menu';

  let {
    class: className = '',
    ...rest
  }: ContextMenuSeparatorProps = $props();
</script>

<div
  {...rest}
  role="separator"
  aria-orientation="horizontal"
  class={`my-1 h-px bg-jam-bg/10 ${className}`.trim()}
></div>
