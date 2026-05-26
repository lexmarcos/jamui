<script lang="ts">
  import { Badge } from '../lib';
  import type { BadgeStyle, BadgeVariant } from '../lib/components/badge';

  type BadgePreviewProps = {
    size?: 'sm' | 'md';
    style?: BadgeStyle;
    variant?: BadgeVariant;
  };

  let {
    size = 'md',
    style = 'filled',
    variant = 'default'
  }: BadgePreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 20rem; background: var(--color-jam-bg); padding: 2rem; display: flex; align-items: center; gap: 0.5rem;"
>
  <Badge {size} {style} {variant}>Badge</Badge>
</div>
