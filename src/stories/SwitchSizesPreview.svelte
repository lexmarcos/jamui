<script lang="ts">
  import Switch from '../lib/components/Switch.svelte';
  import type { SwitchVariant } from '../lib/components/switch';

  type SwitchSizesPreviewProps = {
    checked?: boolean;
    disabled?: boolean;
    variant?: SwitchVariant;
  };

  let {
    checked = true,
    disabled = false,
    variant = 'default'
  }: SwitchSizesPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="display: grid; min-width: 24rem; gap: 1rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Switch {checked} {disabled} {variant} size="sm" label="Small" description="Denso para barras de ferramentas" />
  <Switch {checked} {disabled} {variant} size="md" label="Medium" description="Padrao para formularios" />
  <Switch {checked} {disabled} {variant} size="lg" label="Large" description="Area de toque maior" />
</div>
