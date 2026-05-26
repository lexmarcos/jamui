<script lang="ts">
  import Avatar from '../lib/components/Avatar.svelte';
  import type { AvatarSize } from '../lib/components/avatar';

  type PreviewProps = {
    size?: AvatarSize;
    src?: string;
    alt?: string;
  };

  let {
    size: _size,
    src: _src,
    alt: _alt,
  }: PreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; min-height: 10rem; background: var(--color-jam-bg); padding: 2rem; display: flex; gap: 1rem; align-items: center; justify-content: center;"
>
  <Avatar size="sm">
    {#snippet fallback()}AB{/snippet}
  </Avatar>
  <Avatar size="md">
    {#snippet fallback()}CD{/snippet}
  </Avatar>
  <Avatar size="lg">
    {#snippet fallback()}EF{/snippet}
  </Avatar>
  <Avatar size="xl">
    {#snippet fallback()}GH{/snippet}
  </Avatar>
</div>
