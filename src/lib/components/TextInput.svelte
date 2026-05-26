<script lang="ts">
  import type { TextInputProps } from './text-input';

  const inputBaseClass =
    'min-h-12 w-full rounded-none border bg-jam-text px-4 text-sm font-bold font-jam-mono tracking-[0.06em] text-jam-bg outline-none transition-shadow duration-150 ease-out placeholder:text-jam-bg/25 hover:border-jam-bg/60 focus:border-jam-bg focus:shadow-[4px_4px_0_var(--color-jam-bg)] disabled:cursor-not-allowed disabled:border-jam-bg/15 disabled:bg-jam-text/40 disabled:text-jam-bg/30 disabled:placeholder:text-jam-bg/15';

  let {
    class: className = '',
    disabled = false,
    error = '',
    hint = '',
    id,
    inputClass = '',
    label = '',
    type = 'text',
    value = $bindable(''),
    ...rest
  }: TextInputProps = $props();

  const hintId = $derived(id && hint ? `${id}-hint` : undefined);
  const errorId = $derived(id && error ? `${id}-error` : undefined);
  const describedBy = $derived([hintId, errorId].filter(Boolean).join(' ') || undefined);
  const inputBorderClass = $derived(
    error
      ? 'border-jam-danger focus:border-jam-danger focus:shadow-[4px_4px_0_#e81123]'
      : 'border-jam-bg/35'
  );
  const mergedInputClass = $derived(`${inputBaseClass} ${inputBorderClass} ${inputClass}`.trim());
</script>

<label class={`grid min-w-0 gap-3 ${className}`.trim()}>
  {#if label}
    <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">
      {label}
    </span>
  {/if}

  <input
    {...rest}
    aria-describedby={describedBy}
    aria-invalid={error ? 'true' : undefined}
    bind:value
    class={mergedInputClass}
    {disabled}
    {id}
    {type}
  />

  {#if error}
    <span id={errorId} class="text-[11px] font-bold uppercase tracking-[0.1em] text-jam-danger" aria-live="polite">
      {error}
    </span>
  {:else if hint}
    <span id={hintId} class="text-[11px] font-medium tracking-[0.08em] text-jam-soft/70">
      {hint}
    </span>
  {/if}
</label>
