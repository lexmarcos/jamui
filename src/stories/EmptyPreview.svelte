<script lang="ts">
  import Empty from '../lib/components/Empty.svelte';
  import type { EmptySize, EmptyVariant } from '../lib/components/empty';

  type PreviewProps = {
    description?: string;
    size?: EmptySize;
    title?: string;
    variant?: EmptyVariant;
  };

  let {
    description = 'No items found. Create one to get started.',
    size = 'md',
    title = 'NOTHING HERE',
    variant = 'default',
  }: PreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 20rem; min-height: 16rem; background: var(--color-jam-bg); padding: 2rem; display: flex; justify-content: center; align-items: center;"
>
  <Empty {description} {size} {title} {variant} />
</div>
