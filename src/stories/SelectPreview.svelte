<script lang="ts">
  import { Select, SelectOption } from '../lib';
  import type { SelectSize } from '../lib/components/select';

  type SelectPreviewProps = {
    disabled?: boolean;
    error?: string;
    hint?: string;
    label?: string;
    size?: SelectSize;
    value?: string;
  };

  let {
    disabled = false,
    error = '',
    hint = '',
    label = 'Regiao',
    size = 'md',
    value = $bindable('')
  }: SelectPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 20rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Select {disabled} {error} {hint} {label} {size} bind:value>
    <SelectOption value="us-east-1" label="US East 1" />
    <SelectOption value="us-west-2" label="US West 2" />
    <SelectOption value="eu-west-1" label="EU West 1" />
    <SelectOption value="sa-east-1" label="SA East 1" disabled />
    <SelectOption value="ap-south-1" label="AP South 1" />
  </Select>
</div>
