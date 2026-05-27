<script lang="ts">
  import { DatePicker } from '../lib';
  import type { DatePickerDateValue, DatePickerMode, DatePickerSize, DatePickerValue, DatePickerVariant } from '../lib/components/date-picker';

  type DatePickerPreviewProps = {
    clearable?: boolean;
    disabled?: boolean;
    error?: string;
    helperText?: string;
    label?: string;
    maxDate?: DatePickerDateValue;
    minDate?: DatePickerDateValue;
    mode?: DatePickerMode;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    size?: DatePickerSize;
    value?: DatePickerValue;
    variant?: DatePickerVariant;
  };

  let {
    clearable = false,
    disabled = false,
    error = '',
    helperText = 'Use o calendario ou digite no formato dd/mm/aaaa.',
    label = 'Data de entrega',
    maxDate,
    minDate,
    mode = 'single',
    placeholder = 'dd/mm/aaaa',
    readOnly = false,
    required = false,
    size = 'md',
    value = $bindable<DatePickerValue>(null),
    variant = 'default'
  }: DatePickerPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 22rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <DatePicker
    {clearable}
    {disabled}
    {error}
    {helperText}
    {label}
    {maxDate}
    {minDate}
    {mode}
    {placeholder}
    {readOnly}
    {required}
    {size}
    {variant}
    bind:value
  />
</div>
