<script lang="ts">
  import Button from '../lib/components/Button.svelte';
  import type { ButtonSize } from '../lib/components/button';

  type ButtonVariantsPreviewProps = {
    disabled?: boolean;
    size?: ButtonSize;
    type?: 'button' | 'submit' | 'reset';
  };

  let { disabled = false, size = 'md', type = 'button' }: ButtonVariantsPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="display: flex; flex-wrap: wrap; gap: 0.75rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Button {disabled} {size} {type} variant="primary">Primary</Button>
  <Button {disabled} {size} {type} variant="secondary">Secondary</Button>
  <Button {disabled} {size} {type} variant="ghost">Ghost</Button>
  <Button {disabled} {size} {type} variant="danger">Danger</Button>
</div>
