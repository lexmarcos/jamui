<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type DropdownSeparatorProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
    class?: string;
  };

  let { class: className = '', ...rest }: DropdownSeparatorProps = $props();
</script>

<div
  {...rest}
  role="separator"
  class={`my-1 h-px bg-jam-bg/10 ${className}`.trim()}
></div>
