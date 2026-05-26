<script lang="ts">
  import TextInput from '../lib/components/TextInput.svelte';
  import type { TextInputProps } from '../lib/components/text-input';

  type TextInputPreviewProps = {
    disabled?: boolean;
    error?: string;
    hint?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    type?: TextInputProps['type'];
    value?: string;
  };

  let {
    disabled = false,
    error = '',
    hint = 'Digite seu nome publico.',
    id = 'name',
    label = 'Nome',
    placeholder = 'Markzuel',
    type = 'text',
    value = ''
  }: TextInputPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 20rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <TextInput {disabled} {error} {hint} {id} {label} {placeholder} {type} {value} />
</div>
