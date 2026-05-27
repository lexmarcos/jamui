<script lang="ts">
  import Empty from '../lib/components/Empty.svelte';
  import type { EmptySize } from '../lib/components/empty';

  type PreviewProps = {
    description?: string;
    size?: EmptySize;
    title?: string;
    variant?: string;
  };

  let {
    description: _d,
    size: _s,
    title: _t,
    variant: _v,
  }: PreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; background: var(--color-jam-bg); padding: 2rem; display: grid; gap: 1rem;"
>
  <Empty size="sm" title="COMPACT EMPTY" description="A tight layout for cards and sidebars." />
  <Empty size="md" title="DEFAULT EMPTY" description="Standard spacing for page-level empty states." />
  <Empty size="lg" title="LARGE EMPTY" description="Generous padding for full-page or onboarding views." />
</div>
