<script lang="ts">
  import { setContext, tick, type Snippet } from 'svelte';
  import { ChevronDown } from '@lucide/svelte';
  import { SELECT_CONTEXT, type SelectProps, type SelectSize } from './select';

  const triggerBaseClass =
    'relative flex w-full cursor-pointer items-center justify-between rounded-none border bg-jam-text px-4 outline-none transition-shadow duration-150 ease-out font-jam-mono font-bold text-jam-bg placeholder:text-jam-bg/30 hover:border-jam-bg/60 focus:border-jam-bg focus:shadow-[4px_4px_0_var(--color-jam-bg)] disabled:cursor-not-allowed disabled:border-jam-bg/15 disabled:bg-jam-text/40 disabled:text-jam-bg/30';

  const sizeClass: Record<SelectSize, string> = {
    sm: 'min-h-9 text-[10px] tracking-[0.06em]',
    md: 'min-h-12 text-xs tracking-[0.06em]',
    lg: 'min-h-14 text-sm tracking-[0.06em]'
  };

  let {
    children,
    class: className = '',
    disabled = false,
    error = '',
    hint = '',
    id: propId,
    label = '',
    placeholder = 'Selecione...',
    size = 'md',
    value = $bindable(''),
    ...rest
  }: SelectProps = $props();

  const id = $derived(propId ?? `select-${Math.random().toString(36).slice(2, 9)}`);
  const listboxId = $derived(`${id}-listbox`);
  const hintId = $derived(id && hint ? `${id}-hint` : undefined);
  const errorId = $derived(id && error ? `${id}-error` : undefined);
  const describedBy = $derived([hintId, errorId].filter(Boolean).join(' ') || undefined);

  let open = $state(false);
  let triggerRef = $state<HTMLButtonElement | null>(null);
  let menuRef = $state<HTMLDivElement | null>(null);
  let options: { node: HTMLDivElement; value: string; disabled: boolean; label: string }[] = [];
  let activeIndex = $state(-1);
  let selectedLabel = $state<string | undefined>(undefined);
  const displayLabel = $derived(selectedLabel ?? placeholder);

  const inputBorderClass = $derived(
    error
      ? 'border-jam-danger focus:border-jam-danger focus:shadow-[4px_4px_0_#e81123]'
      : 'border-jam-bg/35'
  );

  function updateSelectedLabel() {
    selectedLabel = options.find((o) => o.value === value)?.label;
  }

  $effect(() => {
    value;
    updateSelectedLabel();
  });

  function registerOption(node: HTMLDivElement, val: string, disabled: boolean, label: string) {
    const currentIndex = options.findIndex((o) => o.node === node);
    if (currentIndex !== -1) {
      options[currentIndex] = { node, value: val, disabled, label };
      updateSelectedLabel();
      return currentIndex;
    }

    const index = options.length;
    options = [...options, { node, value: val, disabled, label }];
    updateSelectedLabel();
    return index;
  }

  function unregisterOption(node: HTMLDivElement) {
    const index = options.findIndex((o) => o.node === node);
    if (index === -1) return;

    options = options.filter((o) => o.node !== node);
    if (activeIndex === index) {
      activeIndex = -1;
    } else if (activeIndex > index) {
      activeIndex -= 1;
    }
    updateSelectedLabel();
  }

  function setActiveIndex(i: number) {
    activeIndex = i;
    options[i]?.node?.focus();
  }

  function setValue(v: string) {
    value = v;
    updateSelectedLabel();
    open = false;
    activeIndex = -1;
    triggerRef?.focus();
  }

  function toggle() {
    if (disabled) return;
    if (open) {
      open = false;
      activeIndex = -1;
    } else {
      open = true;
      tick().then(() => {
        if (!open) return;
        const idx = options.findIndex((o) => o.value === value && !o.disabled);
        menuRef?.focus();
        if (idx !== -1) setActiveIndex(idx);
        else {
          const first = options.findIndex((o) => !o.disabled);
          if (first !== -1) setActiveIndex(first);
        }
      });
    }
  }

  function handleTriggerKeydown(e: KeyboardEvent) {
    if (disabled) return;
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  }

  function handleMenuKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      open = false;
      activeIndex = -1;
      triggerRef?.focus();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = options.findIndex((o, i) => i > activeIndex && !o.disabled);
      if (next !== -1) setActiveIndex(next);
      else {
        const first = options.findIndex((o) => !o.disabled);
        if (first !== -1) setActiveIndex(first);
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = [...options].findLastIndex((o, i) => i < activeIndex && !o.disabled);
      if (prev !== -1) setActiveIndex(prev);
      else {
        const last = [...options].findLastIndex((o) => !o.disabled);
        if (last !== -1) setActiveIndex(last);
      }
      return;
    }

    if (e.key === 'Home') {
      e.preventDefault();
      const first = options.findIndex((o) => !o.disabled);
      if (first !== -1) setActiveIndex(first);
      return;
    }

    if (e.key === 'End') {
      e.preventDefault();
      const last = [...options].findLastIndex((o) => !o.disabled);
      if (last !== -1) setActiveIndex(last);
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (activeIndex !== -1 && !options[activeIndex]?.disabled) {
        setValue(options[activeIndex].value);
      }
      return;
    }

    if (e.key === 'Tab') {
      open = false;
      activeIndex = -1;
      return;
    }
  }

  function handleClickOutside(e: MouseEvent) {
    if (!open) return;
    const target = e.target as Node;
    if (menuRef && !menuRef.contains(target) && (!triggerRef || !triggerRef.contains(target))) {
      open = false;
      activeIndex = -1;
    }
  }

  setContext(SELECT_CONTEXT, {
    get value() { return value; },
    setValue,
    get registerOption() { return registerOption; },
    get unregisterOption() { return unregisterOption; },
    get activeIndex() { return activeIndex; },
    setActiveIndex,
    get open() { return open; },
    get id() { return id; }
  });
</script>

<svelte:window onclick={handleClickOutside} />

<div class={`relative grid min-w-0 gap-3 ${className}`.trim()} {...rest}>
  {#if label}
    <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">
      {label}
    </span>
  {/if}

  <button
    bind:this={triggerRef}
    type="button"
    role="combobox"
    aria-expanded={open}
    aria-haspopup="listbox"
    aria-controls={listboxId}
    aria-describedby={describedBy}
    aria-invalid={error ? 'true' : undefined}
    id={id}
    class={`${triggerBaseClass} ${sizeClass[size]} ${inputBorderClass}`.trim()}
    {disabled}
    onclick={toggle}
    onkeydown={handleTriggerKeydown}
  >
    <span class="truncate">{displayLabel}</span>
    <ChevronDown size={14} class="shrink-0 text-jam-bg/50" />
  </button>

  {#if open}
    <div
      bind:this={menuRef}
      id={listboxId}
      role="listbox"
      tabindex={-1}
      class="absolute left-0 top-full z-50 mt-1 min-w-full border border-jam-bg/15 bg-jam-text py-1 shadow-jam-hard-blue-sm"
      onkeydown={handleMenuKeydown}
    >
      {#if children}
        {@render children()}
      {/if}
    </div>
  {/if}

  {#if error}
    <span id={errorId} class="text-[11px] font-bold uppercase tracking-[0.1em] text-jam-danger" aria-live="polite">
      {error}
    </span>
  {:else if hint}
    <span id={hintId} class="text-[11px] font-medium tracking-[0.08em] text-jam-soft/70">
      {hint}
    </span>
  {/if}
</div>
