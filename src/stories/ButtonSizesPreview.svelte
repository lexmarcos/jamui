<script lang="ts">
  import Button from '../lib/components/Button.svelte';
  import type { ButtonVariant } from '../lib/components/button';

  type ButtonSizesPreviewProps = {
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariant;
  };

  let { disabled = false, type = 'button', variant = 'primary' }: ButtonSizesPreviewProps =
    $props();
</script>

<div
  class="jamui-root"
  style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Button {disabled} size="sm" {type} {variant}>Small</Button>
  <Button {disabled} size="md" {type} {variant}>Medium</Button>
  <Button {disabled} size="lg" {type} {variant}>Large</Button>
</div>
