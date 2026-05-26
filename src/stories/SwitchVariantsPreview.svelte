<script lang="ts">
  import Switch from '../lib/components/Switch.svelte';
  import type { SwitchSize } from '../lib/components/switch';

  type SwitchVariantsPreviewProps = {
    disabled?: boolean;
    size?: SwitchSize;
  };

  let {
    disabled = false,
    size = 'md'
  }: SwitchVariantsPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="display: grid; min-width: 24rem; gap: 1rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Switch checked {disabled} {size} variant="default" label="Default" description="Estado padrao ligado" />
  <Switch checked {disabled} {size} variant="success" label="Success" description="Fluxo concluido ou ativo" />
  <Switch checked {disabled} {size} variant="warning" label="Warning" description="Estado de atencao ligado" />
  <Switch checked {disabled} {size} variant="danger" label="Danger" description="Acao critica habilitada" />
</div>
