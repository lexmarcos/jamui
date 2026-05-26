<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import { RADIO_CONTEXT, type RadioGroupProps } from './radio';

  let {
    children,
    class: className = '',
    disabled = false,
    label = '',
    name,
    orientation = 'vertical',
    value = $bindable(''),
    ...rest
  }: RadioGroupProps = $props();

  const orientationClass = $derived(
    orientation === 'horizontal' ? 'flex flex-wrap gap-2' : 'grid gap-2'
  );

  setContext(RADIO_CONTEXT, {
    get name() { return name; },
    get groupValue() { return value; },
    get groupDisabled() { return disabled; },
    setValue: (v: string) => { value = v; }
  });
</script>

<div
  {...rest}
  role="radiogroup"
  aria-label={label || undefined}
  class={`${orientationClass} ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
