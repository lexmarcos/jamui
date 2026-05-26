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
  <Avatar size="sm" src="https://picsum.photos/100">
    {#snippet fallback()}SM{/snippet}
  </Avatar>
  <Avatar size="md" src="https://picsum.photos/100">
    {#snippet fallback()}MD{/snippet}
  </Avatar>
  <Avatar size="lg" src="https://picsum.photos/100">
    {#snippet fallback()}LG{/snippet}
  </Avatar>
  <Avatar size="xl" src="https://picsum.photos/100">
    {#snippet fallback()}XL{/snippet}
  </Avatar>
</div>
