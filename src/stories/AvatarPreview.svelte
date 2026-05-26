<script lang="ts">
  import Avatar from '../lib/components/Avatar.svelte';
  import type { AvatarSize } from '../lib/components/avatar';

  type PreviewProps = {
    size?: AvatarSize;
    src?: string;
    alt?: string;
  };

  let {
    size = 'md',
    src = 'https://picsum.photos/200',
    alt = 'User avatar',
  }: PreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 10rem; min-height: 8rem; background: var(--color-jam-bg); padding: 2rem; display: flex; justify-content: center; align-items: center;"
>
  <Avatar {size} {src} {alt}>
    {#snippet fallback()}JD{/snippet}
  </Avatar>
</div>
