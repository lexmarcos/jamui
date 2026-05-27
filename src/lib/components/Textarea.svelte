<script lang="ts">
  import type { TextareaProps, TextareaSize, TextareaResize } from './textarea';

  const textareaBaseClass =
    'w-full rounded-none border bg-jam-text px-4 font-bold font-jam-mono tracking-[0.06em] text-jam-bg outline-none transition-shadow duration-150 ease-out placeholder:text-jam-bg/25 hover:border-jam-bg/60 focus:border-jam-bg focus:shadow-[4px_4px_0_var(--color-jam-bg)] disabled:cursor-not-allowed disabled:border-jam-bg/15 disabled:bg-jam-text/40 disabled:text-jam-bg/30 disabled:placeholder:text-jam-bg/15';

  const sizeClasses: Record<TextareaSize, string> = {
    sm: 'py-2 text-xs',
    md: 'py-3 text-sm',
    lg: 'py-4 text-base'
  };

  const resizeClasses: Record<TextareaResize, string> = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize'
  };

  let {
    class: className = '',
    disabled = false,
    error = '',
    hint = '',
    id,
    label = '',
    maxLength,
    resize = 'vertical',
    rows = 4,
    showCounter = false,
    size = 'md',
    textareaClass = '',
    value = $bindable(''),
    ...rest
  }: TextareaProps = $props();

  const hintId = $derived(id && hint ? `${id}-hint` : undefined);
  const errorId = $derived(id && error ? `${id}-error` : undefined);
  const counterId = $derived(id && showCounter && maxLength ? `${id}-counter` : undefined);
  const describedBy = $derived([hintId, errorId, counterId].filter(Boolean).join(' ') || undefined);
  const textareaBorderClass = $derived(
    error
      ? 'border-jam-danger focus:border-jam-danger focus:shadow-[4px_4px_0_#e81123]'
      : 'border-jam-bg/35'
  );
  const mergedTextareaClass = $derived(
    `${textareaBaseClass} ${sizeClasses[size]} ${resizeClasses[resize]} ${textareaBorderClass} ${textareaClass}`.trim()
  );
  const charCount = $derived(value?.length ?? 0);
  const isOverLimit = $derived(maxLength !== undefined && charCount > maxLength);
</script>

<label class={`grid min-w-0 gap-3 ${className}`.trim()}>
  {#if label}
    <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">
      {label}
    </span>
  {/if}

  <textarea
    {...rest}
    aria-describedby={describedBy}
    aria-invalid={error ? 'true' : undefined}
    bind:value
    class={mergedTextareaClass}
    {disabled}
    {id}
    maxlength={maxLength}
    {rows}
  ></textarea>

  <div class="flex items-start justify-between gap-4">
    {#if error}
      <span id={errorId} class="text-[11px] font-bold uppercase tracking-[0.1em] text-jam-danger" aria-live="polite">
        {error}
      </span>
    {:else if hint}
      <span id={hintId} class="text-[11px] font-medium tracking-[0.08em] text-jam-soft/70">
        {hint}
      </span>
    {/if}

    {#if showCounter && maxLength}
      <span
        id={counterId}
        class="ml-auto text-[11px] font-bold tracking-[0.08em] {isOverLimit ? 'text-jam-danger' : 'text-jam-soft/70'}"
        aria-live="polite"
      >
        {charCount}/{maxLength}
      </span>
    {/if}
  </div>
</label>
