<script lang="ts">
  import { Combobox } from '../lib';
  import type { ComboboxSize } from '../lib/components/combobox';

  type ComboboxPreviewProps = {
    disabled?: boolean;
    error?: string;
    hint?: string;
    label?: string;
    size?: ComboboxSize;
    value?: string;
  };

  let {
    disabled = false,
    error = '',
    hint = '',
    label = 'Regiao',
    size = 'md',
    value = $bindable('')
  }: ComboboxPreviewProps = $props();

  const regions = [
    'us-east-1 — US East (N. Virginia)',
    'us-west-2 — US West (Oregon)',
    'eu-west-1 — EU (Ireland)',
    'eu-central-1 — EU (Frankfurt)',
    'ap-south-1 — Asia Pacific (Mumbai)',
    'ap-northeast-1 — Asia Pacific (Tokyo)',
    'sa-east-1 — South America (Sao Paulo)',
    'ca-central-1 — Canada (Central)'
  ];
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Combobox
    {disabled}
    {error}
    {hint}
    {label}
    options={regions}
    {size}
    bind:value
  />
</div>
