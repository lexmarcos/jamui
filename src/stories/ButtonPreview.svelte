<script lang="ts">
  import Button from '../lib/components/Button.svelte';
  import type { ButtonSize, ButtonVariant } from '../lib/components/button';

  type ButtonPreviewProps = {
    disabled?: boolean;
    label?: string;
    size?: ButtonSize;
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariant;
  };

  let {
    disabled = false,
    label = 'Salvar',
    size = 'md',
    type = 'button',
    variant = 'primary'
  }: ButtonPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 20rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Button {disabled} {size} {type} {variant}>{label}</Button>
</div>
