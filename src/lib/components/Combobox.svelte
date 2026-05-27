<script lang="ts">
  import type { ComboboxProps, ComboboxSize } from './combobox';

  const sizeInputClass: Record<ComboboxSize, string> = {
    sm: 'min-h-9 px-3 text-[10px] tracking-[0.06em]',
    md: 'min-h-12 px-4 text-xs tracking-[0.06em]',
    lg: 'min-h-14 px-5 text-sm tracking-[0.06em]'
  };

  let {
    class: className = '',
    disabled = false,
    error = '',
    hint = '',
    id: propId,
    label = '',
    options,
    placeholder = 'Digite para buscar...',
    size = 'md',
    value = $bindable('')
  }: ComboboxProps = $props();

  const id = $derived(propId ?? `combobox-${Math.random().toString(36).slice(2, 9)}`);
  const labelId = $derived(label ? `${id}-label` : undefined);
  const listboxId = $derived(`${id}-listbox`);
  const hintId = $derived(id && hint ? `${id}-hint` : undefined);
  const errorId = $derived(id && error ? `${id}-error` : undefined);
  const describedBy = $derived([hintId, errorId].filter(Boolean).join(' ') || undefined);

  let open = $state(false);
  let inputRef = $state<HTMLInputElement | null>(null);
  let menuRef = $state<HTMLDivElement | null>(null);
  let activeIndex = $state(-1);
  let inputValue = $state(value);
  let justSelected = $state(false);

  const filtered = $derived(
    inputValue.trim() === ''
      ? options
      : options.filter((o) => o.toLowerCase().includes(inputValue.toLowerCase()))
  );

  const selectedIndex = $derived(filtered.findIndex((o) => o === value));
  const activeOptionId = $derived(
    open && activeIndex >= 0 && activeIndex < filtered.length ? `${id}-option-${activeIndex}` : undefined
  );

  const inputBorderClass = $derived(
    error
      ? 'border-jam-danger focus:border-jam-danger focus:shadow-[4px_4px_0_#e81123]'
      : 'border-jam-bg/35'
  );

  $effect(() => {
    inputValue = value;
  });

  function openMenu() {
    if (disabled || justSelected) return;
    open = true;
    activeIndex = selectedIndex !== -1 ? selectedIndex : filtered.length > 0 ? 0 : -1;
  }

  function closeMenu() {
    open = false;
    activeIndex = -1;
  }

  function commitValue() {
    if (inputValue.trim() === '') {
      value = '';
      inputValue = '';
    } else if (options.includes(inputValue)) {
      value = inputValue;
    } else {
      inputValue = value;
    }
  }

  function dismissMenu() {
    closeMenu();
    commitValue();
  }

  function selectOption(option: string) {
    value = option;
    inputValue = option;
    closeMenu();
    justSelected = true;
    inputRef?.focus();
    // Clear the lock after this event cycle so future focus/click can reopen
    requestAnimationFrame(() => {
      justSelected = false;
    });
  }

  function handleInput() {
    if (disabled) return;
    open = true;
    activeIndex = filtered.length > 0 ? 0 : -1;
  }

  function handleInputClick() {
    if (disabled || justSelected) return;
    if (open) {
      dismissMenu();
    } else {
      openMenu();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (disabled) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) openMenu();
      else {
        const next = activeIndex + 1;
        if (next < filtered.length) activeIndex = next;
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) openMenu();
      else {
        const prev = activeIndex - 1;
        if (prev >= 0) activeIndex = prev;
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (open && activeIndex >= 0 && activeIndex < filtered.length) {
        selectOption(filtered[activeIndex]);
      } else {
        openMenu();
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      dismissMenu();
      inputRef?.focus();
      return;
    }

    if (e.key === 'Tab') {
      dismissMenu();
      return;
    }
  }

  function handleClickOutside(e: MouseEvent) {
    if (!open) return;
    const target = e.target as Node;
    if (!menuRef?.contains(target) && !inputRef?.contains(target)) {
      dismissMenu();
    }
  }

  function handleOptionClick(option: string, e: MouseEvent) {
    e.stopPropagation();
    selectOption(option);
  }

  function handleOptionMouseEnter(index: number) {
    activeIndex = index;
  }
</script>

<svelte:window onclick={handleClickOutside} />

<div class={`relative grid min-w-0 gap-3 ${className}`.trim()}>
  {#if label}
    <label id={labelId} for={id} class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">
      {label}
    </label>
  {/if}

  <input
    bind:this={inputRef}
    bind:value={inputValue}
    {id}
    type="text"
    role="combobox"
    aria-expanded={open}
    aria-autocomplete="list"
    aria-controls={listboxId}
    aria-activedescendant={activeOptionId}
    aria-labelledby={labelId}
    aria-describedby={describedBy}
    aria-invalid={error ? 'true' : undefined}
    {disabled}
    {placeholder}
    class={`w-full rounded-none border bg-jam-text font-bold font-jam-mono text-jam-bg outline-none transition-shadow duration-150 ease-out placeholder:text-jam-bg/25 hover:border-jam-bg/60 focus:border-jam-bg focus:shadow-[4px_4px_0_var(--color-jam-bg)] disabled:cursor-not-allowed disabled:border-jam-bg/15 disabled:bg-jam-text/40 disabled:text-jam-bg/30 disabled:placeholder:text-jam-bg/15 ${sizeInputClass[size]} ${inputBorderClass}`.trim()}
    oninput={handleInput}
    onkeydown={handleKeydown}
    onclick={handleInputClick}
  />

  {#if open && filtered.length > 0}
    <div
      bind:this={menuRef}
      id={listboxId}
      role="listbox"
      class="absolute left-0 right-0 z-50 mt-1 border border-jam-bg/15 bg-jam-text py-1 shadow-jam-hard-blue-sm"
      style="top: calc(100% + 0.25rem);"
    >
      {#each filtered as option, i (option)}
        <div
          id="{id}-option-{i}"
          role="option"
          aria-selected={value === option}
          tabindex={-1}
          class={`relative flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-xs font-bold font-jam-mono tracking-[0.06em] outline-none transition-colors duration-100 ${
            i === activeIndex || value === option
              ? 'bg-jam-bg text-jam-text'
              : 'text-jam-bg hover:bg-jam-bg/10'
          }`}
          onclick={(e: MouseEvent) => handleOptionClick(option, e)}
          onmouseenter={() => handleOptionMouseEnter(i)}
          onkeydown={(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              selectOption(option);
            }
          }}
        >
          {option}
        </div>
      {/each}
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
