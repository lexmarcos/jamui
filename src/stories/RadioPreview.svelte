<script lang="ts">
  import { RadioGroup, RadioItem } from '../lib';
  import type { RadioOrientation } from '../lib/components/radio';

  type RadioPreviewProps = {
    disabled?: boolean;
    label?: string;
    orientation?: RadioOrientation;
    value?: string;
  };

  let {
    disabled = false,
    label = 'Tamanho',
    orientation = 'vertical',
    value = $bindable('md')
  }: RadioPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 20rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <RadioGroup {label} name="size" {orientation} bind:value {disabled}>
    <RadioItem label="Pequeno" value="sm" />
    <RadioItem label="Medio" value="md" />
    <RadioItem label="Grande" value="lg" />
  </RadioGroup>
</div>
