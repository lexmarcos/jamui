<script lang="ts">
  import { Check, Minus } from '@lucide/svelte';
  import type { CheckboxProps } from './checkbox';

  const boxBase =
    'relative inline-grid h-[18px] w-[18px] shrink-0 place-items-center overflow-hidden rounded-none border box-border leading-none transition-colors duration-150';
  const iconClass =
    'pointer-events-none absolute inset-0 m-auto block shrink-0 text-jam-bg';

  let {
    checked = $bindable(false),
    children,
    class: className = '',
    disabled = false,
    id,
    indeterminate = false,
    label = '',
    value = 'on',
    ...rest
  }: CheckboxProps = $props();

  const boxClass = $derived(
    disabled
      ? 'border-jam-text/20 bg-jam-input/40'
      : checked || indeterminate
        ? 'border-jam-text bg-jam-text'
        : 'border-jam-text/35 bg-jam-input hover:border-jam-text/60'
  );

  const labelClass = $derived(
    disabled ? 'text-jam-muted/50' : 'text-jam-text'
  );
</script>

<label
  class="inline-flex min-h-[18px] cursor-pointer items-start gap-2.5 font-jam-mono select-none {className}"
>
  <input
    {...rest}
    type="checkbox"
    bind:checked
    bind:indeterminate
    {disabled}
    {id}
    {value}
    class="sr-only peer"
  />

  <span
    class="{boxBase} {boxClass} peer-focus-visible:ring-2 peer-focus-visible:ring-jam-text peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-jam-bg"
    aria-hidden="true"
  >
    {#if indeterminate}
      <Minus size={14} strokeWidth={3} class={iconClass} />
    {:else if checked}
      <Check size={14} strokeWidth={3} class={iconClass} />
    {/if}
  </span>

  {#if children}
    <span class="text-xs font-bold leading-tight {labelClass}">
      {@render children()}
    </span>
  {:else if label}
    <span class="text-xs font-bold leading-tight {labelClass}">
      {label}
    </span>
  {/if}
</label>
