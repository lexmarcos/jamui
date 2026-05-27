<script lang="ts">
  import Textarea from '../lib/components/Textarea.svelte';
  import type { TextareaProps } from '../lib/components/textarea';

  type TextareaPreviewProps = {
    disabled?: boolean;
    error?: string;
    hint?: string;
    id?: string;
    label?: string;
    maxLength?: number;
    placeholder?: string;
    resize?: TextareaProps['resize'];
    rows?: number;
    showCounter?: boolean;
    size?: TextareaProps['size'];
    value?: string;
  };

  let {
    disabled = false,
    error = '',
    hint = 'Descreva sua experiencia em detalhes.',
    id = 'description',
    label = 'Descricao',
    maxLength = 280,
    placeholder = 'Digite aqui...',
    resize = 'vertical',
    rows = 4,
    showCounter = true,
    size = 'md',
    value = ''
  }: TextareaPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Textarea
    {disabled}
    {error}
    {hint}
    {id}
    {label}
    {maxLength}
    {placeholder}
    {resize}
    {rows}
    {showCounter}
    {size}
    {value}
  />
</div>
