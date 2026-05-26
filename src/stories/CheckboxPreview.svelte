<script lang="ts">
  import Checkbox from '../lib/components/Checkbox.svelte';

  type CheckboxPreviewProps = {
    checked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    label?: string;
  };

  let {
    checked = false,
    disabled = false,
    indeterminate = false,
    label = 'Aceito os termos de uso'
  }: CheckboxPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 20rem; max-width: 36rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Checkbox bind:checked {disabled} {indeterminate} {label} />
</div>
