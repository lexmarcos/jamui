<script lang="ts">
  import Switch from '../lib/components/Switch.svelte';
  import type { SwitchSize, SwitchVariant } from '../lib/components/switch';

  type SwitchPreviewProps = {
    checked?: boolean;
    description?: string;
    disabled?: boolean;
    label?: string;
    size?: SwitchSize;
    variant?: SwitchVariant;
  };

  let {
    checked = $bindable(false),
    description = 'Alterna o estado da configuracao imediatamente',
    disabled = false,
    label = 'Sincronizacao ativa',
    size = 'md',
    variant = 'default'
  }: SwitchPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 22rem; max-width: 38rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Switch bind:checked {description} {disabled} {label} {size} {variant} />
</div>
