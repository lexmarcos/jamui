<script lang="ts">
  import { getContext } from 'svelte';
  import { RADIO_CONTEXT, type RadioContext, type RadioItemProps } from './radio';

  let {
    class: className = '',
    disabled = false,
    label,
    value,
    ...rest
  }: RadioItemProps = $props();

  const ctx = getContext<RadioContext>(RADIO_CONTEXT);

  const name = $derived(ctx?.name ?? '');
  const groupValue = $derived(ctx?.groupValue ?? '');
  const groupDisabled = $derived(ctx?.groupDisabled ?? false);
  const isChecked = $derived(groupValue === value);
  const isDisabled = $derived(disabled || groupDisabled);

  const baseClass =
    'flex min-h-11 cursor-pointer select-none items-center justify-center gap-2 rounded-none border px-4 text-xs font-black uppercase tracking-[0.18em] transition-all duration-150 ease-out focus-within:ring-2 focus-within:ring-jam-text focus-within:ring-offset-2 focus-within:ring-offset-jam-bg';

  const stateClass = $derived(
    isDisabled
      ? 'border-jam-text/20 bg-jam-surface/30 text-jam-text/30 cursor-not-allowed'
      : isChecked
        ? 'border-jam-text bg-jam-text text-jam-bg shadow-jam-hard-md'
        : 'border-jam-text/35 bg-transparent text-jam-muted hover:border-jam-text hover:bg-jam-text/10 hover:text-jam-text'
  );
</script>

<label
  {...rest}
  class={`${baseClass} ${stateClass} ${className}`.trim()}
>
  <input
    type="radio"
    class="sr-only"
    {name}
    {value}
    checked={isChecked}
    disabled={isDisabled}
    onchange={() => ctx?.setValue(value)}
  />
  <span>{label}</span>
</label>
