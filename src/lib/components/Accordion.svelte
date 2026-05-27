<script lang="ts">
  import { setContext, untrack } from 'svelte';
  import { ACCORDION_CONTEXT, type AccordionProps, type AccordionContext } from './accordion';

  let {
    children,
    class: className = '',
    type = 'single',
    value = $bindable(),
    defaultValue = [],
    onValueChange,
    collapsible = false,
    disabled = false,
    variant = 'default',
    size = 'md',
    icon,
    ...rest
  }: AccordionProps = $props();

  const isControlled = $derived(value !== undefined);

  function normalizeValue(rawValue: string | string[] | undefined): string[] {
    const normalized = Array.isArray(rawValue) ? rawValue.filter(Boolean) : rawValue ? [rawValue] : [];
    return type === 'single' ? normalized.slice(0, 1) : normalized;
  }

  function emitValue(newValue: string[]): string | string[] {
    return type === 'single' ? (newValue[0] ?? '') : newValue;
  }

  let internalValue = $state<string[]>(untrack(() => {
    return normalizeValue(defaultValue);
  }));

  const currentValue = $derived(isControlled ? normalizeValue(value) : normalizeValue(internalValue));

  function setValue(newValue: string[]) {
    const normalizedValue = normalizeValue(newValue);
    const nextValue = emitValue(normalizedValue);

    if (isControlled) {
      value = nextValue;
      onValueChange?.(nextValue);
    } else {
      internalValue = normalizedValue;
      onValueChange?.(nextValue);
    }
  }

  function toggleItem(itemValue: string) {
    const isOpen = currentValue.includes(itemValue);

    if (type === 'single') {
      if (isOpen) {
        if (collapsible) {
          setValue([]);
        }
      } else {
        setValue([itemValue]);
      }
    } else {
      if (isOpen) {
        setValue(currentValue.filter((v) => v !== itemValue));
      } else {
        setValue([...currentValue, itemValue]);
      }
    }
  }

  setContext<AccordionContext>(ACCORDION_CONTEXT, {
    get type() { return type; },
    get value() { return currentValue; },
    setValue,
    toggleItem,
    get disabled() { return disabled; },
    get variant() { return variant; },
    get size() { return size; },
    get icon() { return icon; }
  });
</script>

<div {...rest} class={`jam-accordion ${className}`.trim()}>
  {#if children}
    {@render children()}
  {/if}
</div>
