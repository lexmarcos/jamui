<script lang="ts">
  import Progress from '../lib/components/Progress.svelte';
  import type { ProgressVariant } from '../lib/components/progress';

  type ProgressPreviewProps = {
    label?: string;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    value?: number;
    variant?: ProgressVariant;
  };

  let {
    label = 'Upload em andamento',
    max = 100,
    size = 'md',
    value = 42,
    variant = 'default'
  }: ProgressPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Progress {label} {max} {size} {value} {variant} />
</div>
