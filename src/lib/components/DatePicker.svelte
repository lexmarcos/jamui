<script lang="ts">
  import { Calendar, ChevronLeft, ChevronRight, X } from '@lucide/svelte';
  import { tick, untrack } from 'svelte';
  import type {
    DatePickerDateValue,
    DatePickerFormat,
    DatePickerProps,
    DatePickerRange,
    DatePickerSize,
    DatePickerValue,
    DatePickerVariant
  } from './date-picker';

  const fieldBaseClass =
    'flex w-full min-w-0 items-stretch overflow-hidden rounded-none border font-jam-mono font-bold outline-none transition-all duration-150 ease-out';

  const fieldSizeClass: Record<DatePickerSize, string> = {
    sm: 'min-h-9 text-[10px] tracking-[0.06em]',
    md: 'min-h-12 text-xs tracking-[0.06em]',
    lg: 'min-h-14 text-sm tracking-[0.06em]'
  };

  const inputPaddingClass: Record<DatePickerSize, string> = {
    sm: 'px-2',
    md: 'px-3',
    lg: 'px-4'
  };

  const actionSizeClass: Record<DatePickerSize, string> = {
    sm: 'w-9',
    md: 'w-11',
    lg: 'w-12'
  };

  const iconSize: Record<DatePickerSize, number> = {
    sm: 13,
    md: 15,
    lg: 17
  };

  const variantClass: Record<DatePickerVariant, string> = {
    default: 'border-jam-bg/35 bg-jam-text text-jam-bg',
    filled: 'border-jam-text/25 bg-jam-input text-jam-text',
    outline: 'border-jam-text/55 bg-transparent text-jam-text',
    ghost: 'border-transparent bg-transparent text-jam-text'
  };

  const dayButtonBaseClass =
    'grid h-9 w-full place-items-center rounded-none border text-[11px] font-black leading-none outline-none transition-colors duration-100 focus-visible:ring-2 focus-visible:ring-jam-bg focus-visible:ring-offset-1 focus-visible:ring-offset-jam-text';

  let {
    class: className = '',
    clearable = false,
    defaultValue = null,
    description = '',
    disabled = false,
    error = '',
    format = 'dd/MM/yyyy',
    helperText = '',
    hint = '',
    id: propId,
    isDateDisabled,
    label = '',
    locale = 'pt-BR',
    manualInput = true,
    maxDate,
    minDate,
    mode = 'single',
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder = 'Selecione uma data',
    rangeSeparator = ' - ',
    readOnly = false,
    readonly: readonlyProp = false,
    required = false,
    showCalendarIcon = true,
    showToday = true,
    size = 'md',
    state: visualState = 'normal',
    value = $bindable<DatePickerValue>(undefined),
    variant = 'default',
    ...rest
  }: DatePickerProps = $props();

  const generatedId = `datepicker-${Math.random().toString(36).slice(2, 9)}`;
  const id = $derived(propId ?? generatedId);
  const calendarId = $derived(`${id}-calendar`);
  const captionId = $derived(`${id}-caption`);
  const helperTextValue = $derived(helperText || description || hint);
  const helperId = $derived(helperTextValue ? `${id}-helper` : undefined);
  const errorId = $derived(error ? `${id}-error` : undefined);
  const describedBy = $derived([helperId, errorId].filter(Boolean).join(' ') || undefined);
  const isReadOnly = $derived(readOnly || readonlyProp);
  const currentState = $derived(error ? 'error' : visualState);

  const initialRangeMode = untrack(() => mode === 'range');
  const initialRange = untrack(() => parseRangeValue(value ?? defaultValue));
  const initialSelectedDate = untrack(() => initialRangeMode ? null : parseDateValue(value ?? defaultValue));
  const initialFocusDate = (initialRangeMode ? initialRange.start ?? initialRange.end : initialSelectedDate) ?? untrack(todayDate);

  let rootRef = $state<HTMLDivElement | null>(null);
  let inputRef = $state<HTMLInputElement | null>(null);
  let popoverRef = $state<HTMLDivElement | null>(null);
  let open = $state(false);
  let hasFocusWithin = $state(false);
  let popoverStyle = $state('');
  let selectedDate = $state<Date | null>(initialSelectedDate);
  let rangeStart = $state<Date | null>(initialRange.start);
  let rangeEnd = $state<Date | null>(initialRange.end);
  let rangeAnchor = $state<Date | null>(initialRange.start && !initialRange.end ? initialRange.start : null);
  let viewDate = $state(startOfMonth(initialFocusDate));
  let focusedDate = $state(initialFocusDate);
  let inputText = $state(
    initialRangeMode
      ? untrack(() => formatRangeValue(initialRange.start, initialRange.end))
      : initialSelectedDate
        ? untrack(() => formatDate(initialSelectedDate))
        : ''
  );

  const minDateValue = $derived(parseDateValue(minDate));
  const maxDateValue = $derived(parseDateValue(maxDate));
  const monthLabel = $derived(
    new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewDate)
  );
  const weekdays = $derived(getWeekdays(locale));
  const calendarWeeks = $derived(buildCalendarWeeks(viewDate));
  const placeholderClass = $derived(
    variant === 'default' ? 'placeholder:text-jam-bg/30' : 'placeholder:text-jam-text/35'
  );
  const inputPlaceholder = $derived(mode === 'range' && placeholder === 'Selecione uma data' ? 'Data inicial - final' : placeholder);
  const interactionClass = $derived(getInteractionClass());
  const validationClass = $derived(getValidationClass());
  const fieldClass = $derived(
    `${fieldBaseClass} ${fieldSizeClass[size]} ${variantClass[variant]} ${interactionClass} ${validationClass}`.trim()
  );
  const inputClass = $derived(
    `min-w-0 flex-1 border-0 bg-transparent font-jam-mono font-bold text-current outline-none disabled:cursor-not-allowed ${inputPaddingClass[size]} ${placeholderClass}`.trim()
  );
  const actionButtonClass = $derived(
    `grid shrink-0 place-items-center border-0 bg-transparent text-current outline-none transition-colors duration-150 focus-visible:bg-current/10 disabled:cursor-not-allowed disabled:opacity-35 ${actionSizeClass[size]}`.trim()
  );

  $effect(() => {
    if (value !== undefined) {
      if (mode === 'range') {
        const next = parseRangeValue(value);
        if (!isSameNullableDate(next.start, rangeStart) || !isSameNullableDate(next.end, rangeEnd)) {
          rangeStart = next.start;
          rangeEnd = next.end;
          rangeAnchor = next.start && !next.end ? next.start : null;
          const nextFocus = next.start ?? next.end;
          if (nextFocus) {
            viewDate = startOfMonth(nextFocus);
            focusedDate = nextFocus;
          }
        }
        return;
      }

      const next = parseDateValue(value);
      if (!isSameNullableDate(next, selectedDate)) {
        selectedDate = next;
        if (next) {
          viewDate = startOfMonth(next);
          focusedDate = next;
        }
      }
    }
  });

  $effect(() => {
    inputText = mode === 'range'
      ? formatRangeValue(rangeStart, rangeEnd)
      : selectedDate
        ? formatDate(selectedDate)
        : '';
  });

  $effect(() => {
    if (open) {
      viewDate;
      focusedDate;
      tick().then(() => {
        if (!open) return;
        positionPopover();
        focusActiveDay();
      });
    }
  });

  function getInteractionClass() {
    if (disabled) {
      return 'cursor-not-allowed border-jam-text/15 bg-jam-text/20 text-jam-text/35 shadow-none';
    }

    if (isReadOnly) {
      return 'cursor-default opacity-80';
    }

    if (variant === 'default') {
      return 'hover:border-jam-bg/60 focus-within:border-jam-bg focus-within:shadow-[4px_4px_0_var(--color-jam-bg)]';
    }

    return 'hover:border-jam-text focus-within:border-jam-text focus-within:shadow-jam-hard-sm';
  }

  function getValidationClass() {
    if (disabled) return '';

    if (currentState === 'error') {
      return 'border-jam-danger focus-within:border-jam-danger focus-within:shadow-[4px_4px_0_rgba(232,17,35,0.55)]';
    }

    if (currentState === 'success') {
      return 'border-jam-text focus-within:border-jam-text focus-within:shadow-jam-hard-sm';
    }

    return '';
  }

  function normalizeDate(date: Date | null | undefined) {
    if (!date || Number.isNaN(date.getTime())) return null;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function todayDate() {
    return normalizeDate(new Date()) as Date;
  }

  function startOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  function daysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  function addDays(date: Date, amount: number) {
    return normalizeDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)) as Date;
  }

  function addMonths(date: Date, amount: number) {
    const targetMonth = date.getMonth() + amount;
    const target = new Date(date.getFullYear(), targetMonth, 1);
    const day = Math.min(date.getDate(), daysInMonth(target.getFullYear(), target.getMonth()));
    return new Date(target.getFullYear(), target.getMonth(), day);
  }

  function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function isSameNullableDate(a: Date | null, b: Date | null) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return isSameDay(a, b);
  }

  function pad(value: number) {
    return String(value).padStart(2, '0');
  }

  function toISODate(date: Date) {
    const normalized = normalizeDate(date) as Date;
    return `${normalized.getFullYear()}-${pad(normalized.getMonth() + 1)}-${pad(normalized.getDate())}`;
  }

  function formatDate(date: Date) {
    const normalized = normalizeDate(date) as Date;

    if (typeof format === 'function') {
      return format(normalized, locale);
    }

    return format.replace(/yyyy|MM|dd/g, (token) => {
      if (token === 'yyyy') return String(normalized.getFullYear());
      if (token === 'MM') return pad(normalized.getMonth() + 1);
      return pad(normalized.getDate());
    });
  }

  function formatRangeValue(start: Date | null, end: Date | null) {
    if (!start && !end) return '';
    if (start && !end) return `${formatDate(start)}${rangeSeparator}`;
    if (!start && end) return `${rangeSeparator}${formatDate(end)}`;
    return `${formatDate(start as Date)}${rangeSeparator}${formatDate(end as Date)}`;
  }

  function parseDateValue(input: DatePickerValue) {
    if (!input) return null;

    if (input instanceof Date) {
      return normalizeDate(input);
    }

    if (typeof input === 'string') {
      const trimmed = input.trim();
      if (!trimmed) return null;
      return parseInputDate(trimmed);
    }

    return null;
  }

  function parseRangeValue(input: DatePickerValue): DatePickerRange {
    if (!input) return { start: null, end: null };

    if (Array.isArray(input)) {
      return normalizeRange(parseDateValue(input[0]), parseDateValue(input[1]));
    }

    if (typeof input === 'object' && !(input instanceof Date)) {
      const range = input as { start?: DatePickerDateValue; end?: DatePickerDateValue };
      return normalizeRange(parseDateValue(range.start), parseDateValue(range.end));
    }

    const date = parseDateValue(input);
    return { start: date, end: null };
  }

  function parseRangeInput(text: string) {
    const parts = text.includes(rangeSeparator)
      ? text.split(rangeSeparator)
      : text.split(/\s+-\s+|\s+to\s+/i);

    if (parts.length < 2) return null;

    const start = parseInputDate(parts[0].trim());
    const end = parseInputDate(parts.slice(1).join(rangeSeparator).trim());
    if (!start || !end) return null;

    return normalizeRange(start, end);
  }

  function normalizeRange(start: Date | null, end: Date | null): DatePickerRange {
    if (start && end && start.getTime() > end.getTime()) {
      return { start: end, end: start };
    }

    return { start, end };
  }

  function isDateInRange(date: Date, start: Date | null, end: Date | null) {
    if (!start || !end) return false;
    const time = date.getTime();
    return time >= start.getTime() && time <= end.getTime();
  }

  function rangeContainsUnavailable(start: Date, end: Date) {
    let cursor = normalizeDate(start) as Date;
    const finalDate = normalizeDate(end) as Date;

    while (cursor.getTime() <= finalDate.getTime()) {
      if (isDateUnavailable(cursor)) return true;
      cursor = addDays(cursor, 1);
    }

    return false;
  }

  function parseInputDate(text: string) {
    const isoMatch = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(text);
    if (isoMatch) {
      return createDate(Number(isoMatch[1]), Number(isoMatch[2]), Number(isoMatch[3]));
    }

    if (typeof format === 'string') {
      const parsedByFormat = parseByFormat(text, format);
      if (parsedByFormat) return parsedByFormat;
    }

    const fallback = new Date(text);
    return normalizeDate(fallback);
  }

  function parseByFormat(text: string, dateFormat: DatePickerFormat) {
    if (typeof dateFormat !== 'string') return null;

    let pattern = '^';
    const tokens: string[] = [];

    for (let i = 0; i < dateFormat.length; i += 1) {
      const rest = dateFormat.slice(i);
      if (rest.startsWith('yyyy')) {
        tokens.push('yyyy');
        pattern += '(\\d{4})';
        i += 3;
      } else if (rest.startsWith('MM')) {
        tokens.push('MM');
        pattern += '(\\d{1,2})';
        i += 1;
      } else if (rest.startsWith('dd')) {
        tokens.push('dd');
        pattern += '(\\d{1,2})';
        i += 1;
      } else {
        pattern += escapeRegex(dateFormat[i]);
      }
    }

    pattern += '$';
    const match = new RegExp(pattern).exec(text);
    if (!match) return null;

    let year = 0;
    let month = 0;
    let day = 0;

    tokens.forEach((token, index) => {
      const value = Number(match[index + 1]);
      if (token === 'yyyy') year = value;
      if (token === 'MM') month = value;
      if (token === 'dd') day = value;
    });

    return createDate(year, month, day);
  }

  function escapeRegex(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function createDate(year: number, month: number, day: number) {
    if (!year || !month || !day) return null;
    const parsed = new Date(year, month - 1, day);
    if (parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) {
      return null;
    }
    return normalizeDate(parsed);
  }

  function buildCalendarWeeks(monthDate: Date) {
    const first = startOfMonth(monthDate);
    const gridStart = addDays(first, -first.getDay());
    const weeks: Date[][] = [];

    for (let week = 0; week < 6; week += 1) {
      const days: Date[] = [];
      for (let day = 0; day < 7; day += 1) {
        days.push(addDays(gridStart, week * 7 + day));
      }
      weeks.push(days);
    }

    return weeks;
  }

  function getWeekdays(activeLocale: string) {
    const base = new Date(2024, 0, 7);
    const formatter = new Intl.DateTimeFormat(activeLocale, { weekday: 'short' });

    return Array.from({ length: 7 }, (_, index) => formatter.format(addDays(base, index)).replace('.', ''));
  }

  function isDateUnavailable(date: Date) {
    const normalized = normalizeDate(date);
    if (!normalized) return true;

    if (minDateValue && normalized.getTime() < minDateValue.getTime()) return true;
    if (maxDateValue && normalized.getTime() > maxDateValue.getTime()) return true;
    if (isDateDisabled?.(new Date(normalized))) return true;

    return false;
  }

  function resolveInitialFocusDate() {
    if (mode === 'range') {
      if (rangeStart && !isDateUnavailable(rangeStart)) return rangeStart;
      if (rangeEnd && !isDateUnavailable(rangeEnd)) return rangeEnd;
    }

    if (selectedDate && !isDateUnavailable(selectedDate)) return selectedDate;
    const today = todayDate();
    if (!isDateUnavailable(today)) return today;

    const monthDays = calendarWeeks.flat();
    return monthDays.find((date) => !isDateUnavailable(date)) ?? viewDate;
  }

  function openCalendar() {
    if (disabled || isReadOnly) return;

    const nextFocus = resolveInitialFocusDate();
    focusedDate = nextFocus;
    viewDate = startOfMonth(nextFocus);
    open = true;
  }

  function closeCalendar(restoreFocus = true) {
    if (!open) return;
    open = false;

    if (restoreFocus) {
      tick().then(() => inputRef?.focus());
    }
  }

  function toggleCalendar() {
    if (open) closeCalendar(true);
    else openCalendar();
  }

  function positionPopover() {
    if (!rootRef || !popoverRef) return;

    const rootRect = rootRef.getBoundingClientRect();
    const popoverRect = popoverRef.getBoundingClientRect();
    const gap = 8;
    const width = Math.max(rootRect.width, 320);
    const left = Math.max(gap, Math.min(rootRect.left, window.innerWidth - width - gap));
    let top = rootRect.bottom + gap;

    if (top + popoverRect.height > window.innerHeight - gap && rootRect.top - popoverRect.height - gap > gap) {
      top = rootRect.top - popoverRect.height - gap;
    }

    top = Math.max(gap, Math.min(top, window.innerHeight - popoverRect.height - gap));
    popoverStyle = `position:fixed;top:${top}px;left:${left}px;min-width:${width}px;`;
  }

  function focusActiveDay() {
    const activeDate = toISODate(focusedDate);
    popoverRef?.querySelector<HTMLButtonElement>(`button[data-date="${activeDate}"]`)?.focus();
  }

  function setSelectedDate(nextDate: Date | null, shouldClose = true) {
    const next = nextDate ? normalizeDate(nextDate) : null;
    if (next && isDateUnavailable(next)) return;

    selectedDate = next;
    value = next;

    const formattedValue = next ? formatDate(next) : '';
    inputText = formattedValue;
    onChange?.(next, { value: next, formattedValue, name });

    if (shouldClose) {
      closeCalendar(true);
    }
  }

  function setSelectedRange(startDate: Date | null, endDate: Date | null, shouldClose = true) {
    const normalized = normalizeRange(normalizeDate(startDate), normalizeDate(endDate));
    const nextStart = normalized.start;
    const nextEnd = normalized.end;

    if (nextStart && isDateUnavailable(nextStart)) return;
    if (nextEnd && isDateUnavailable(nextEnd)) return;
    if (nextStart && nextEnd && rangeContainsUnavailable(nextStart, nextEnd)) return;

    rangeStart = nextStart;
    rangeEnd = nextEnd;
    rangeAnchor = nextStart && !nextEnd ? nextStart : null;

    const nextValue: DatePickerRange = { start: nextStart, end: nextEnd };
    value = nextValue;

    const formattedValue = formatRangeValue(nextStart, nextEnd);
    inputText = formattedValue;
    onChange?.(nextValue, {
      value: nextValue,
      formattedValue,
      name,
      startDate: nextStart,
      endDate: nextEnd
    });

    if (shouldClose && nextStart && nextEnd) {
      closeCalendar(true);
    }
  }

  function clearSelection() {
    if (mode === 'range') {
      setSelectedRange(null, null, false);
      return;
    }

    setSelectedDate(null, false);
  }

  function selectRangeDate(date: Date) {
    const next = normalizeDate(date) as Date;
    if (isDateUnavailable(next)) return;

    if (!rangeStart || rangeEnd) {
      focusedDate = next;
      setSelectedRange(next, null, false);
      return;
    }

    const nextRange = normalizeRange(rangeStart, next);
    if (nextRange.start && nextRange.end && rangeContainsUnavailable(nextRange.start, nextRange.end)) return;

    focusedDate = next;
    setSelectedRange(nextRange.start, nextRange.end, true);
  }

  function commitManualInput() {
    if (!manualInput || disabled || isReadOnly) return;

    const text = inputText.trim();
    if (!text) {
      if (mode === 'range') {
        if (rangeStart || rangeEnd) setSelectedRange(null, null, false);
      } else if (selectedDate) setSelectedDate(null, false);
      return;
    }

    if (mode === 'range') {
      const parsedRange = parseRangeInput(text);
      if (parsedRange?.start && parsedRange.end && !rangeContainsUnavailable(parsedRange.start, parsedRange.end)) {
        setSelectedRange(parsedRange.start, parsedRange.end, false);
        return;
      }

      inputText = formatRangeValue(rangeStart, rangeEnd);
      return;
    }

    const parsed = parseInputDate(text);
    if (parsed && !isDateUnavailable(parsed)) {
      setSelectedDate(parsed, false);
      return;
    }

    inputText = selectedDate ? formatDate(selectedDate) : '';
  }

  function moveView(monthAmount: number) {
    const nextView = addMonths(viewDate, monthAmount);
    const nextFocus = addMonths(focusedDate, monthAmount);
    viewDate = startOfMonth(nextView);
    focusedDate = nextFocus;
  }

  function moveFocusByDays(dayAmount: number) {
    const nextFocus = addDays(focusedDate, dayAmount);
    focusedDate = nextFocus;
    viewDate = startOfMonth(nextFocus);
  }

  function handleInput(event: Event) {
    if (!manualInput || disabled || isReadOnly) return;
    inputText = (event.currentTarget as HTMLInputElement).value;
  }

  function handleInputClick() {
    if (disabled || isReadOnly) return;
    openCalendar();
  }

  function handleInputChange() {
    commitManualInput();
  }

  function handleInputKeydown(event: KeyboardEvent) {
    if (disabled) return;

    if (event.key === 'Escape' && open) {
      event.preventDefault();
      closeCalendar(true);
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'Enter' || (!manualInput && event.key === ' ')) {
      event.preventDefault();
      openCalendar();
    }
  }

  function handleCalendarKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeCalendar(true);
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveFocusByDays(1);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveFocusByDays(-1);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveFocusByDays(7);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveFocusByDays(-7);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      moveFocusByDays(-focusedDate.getDay());
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      moveFocusByDays(6 - focusedDate.getDay());
      return;
    }

    if (event.key === 'PageUp') {
      event.preventDefault();
      moveView(event.shiftKey ? -12 : -1);
      return;
    }

    if (event.key === 'PageDown') {
      event.preventDefault();
      moveView(event.shiftKey ? 12 : 1);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (mode === 'range') selectRangeDate(focusedDate);
      else setSelectedDate(focusedDate, true);
    }
  }

  function handleDayFocus(date: Date) {
    focusedDate = date;
  }

  function handleDayClick(date: Date) {
    if (mode === 'range') selectRangeDate(date);
    else setSelectedDate(date, true);
  }

  function handleClear(event: MouseEvent) {
    event.stopPropagation();
    clearSelection();
    inputRef?.focus();
  }

  function handleToday() {
    const today = todayDate();
    if (mode === 'range') setSelectedRange(today, today, true);
    else setSelectedDate(today, true);
  }

  function handleWindowClick(event: MouseEvent) {
    if (!open) return;

    const target = event.target as Node;
    if (!rootRef?.contains(target) && !popoverRef?.contains(target)) {
      commitManualInput();
      closeCalendar(false);
    }
  }

  function handleWindowResize() {
    if (open) positionPopover();
  }

  function handleFocusIn(event: FocusEvent) {
    if (hasFocusWithin) return;
    hasFocusWithin = true;
    onFocus?.(event);
  }

  function handleFocusOut(event: FocusEvent) {
    const nextTarget = event.relatedTarget as Node | null;
    if (nextTarget && (rootRef?.contains(nextTarget) || popoverRef?.contains(nextTarget))) return;

    if (hasFocusWithin) {
      hasFocusWithin = false;
      commitManualInput();
      onBlur?.(event);
    }
  }

  function getDayLabel(date: Date, unavailable: boolean) {
    const formatted = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);

    const action = mode === 'range' ? 'Selecionar data do intervalo' : 'Selecionar data';
    return `${unavailable ? 'Data indisponivel' : action} ${toISODate(date)} - ${formatted}`;
  }
</script>

<svelte:window onclick={handleWindowClick} onresize={handleWindowResize} />

<div
  bind:this={rootRef}
  class={`relative grid min-w-0 gap-3 ${className}`.trim()}
  data-state={currentState}
  onfocusin={handleFocusIn}
  onfocusout={handleFocusOut}
  {...rest}
>
  {#if label}
    <label for={id} class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">
      {label}
    </label>
  {/if}

  <div class={fieldClass}>
    {#if showCalendarIcon}
      <button
        type="button"
        class={`${actionButtonClass} ${variant === 'default' ? 'hover:bg-jam-bg/10' : 'hover:bg-jam-text/10'}`.trim()}
        aria-label={open ? 'Fechar calendario' : 'Abrir calendario'}
        aria-expanded={open}
        aria-controls={calendarId}
        disabled={disabled || isReadOnly}
        onclick={toggleCalendar}
      >
        <Calendar size={iconSize[size]} strokeWidth={2.5} aria-hidden="true" />
      </button>
    {/if}

    <input
      bind:this={inputRef}
      id={id}
      type="text"
      role="combobox"
      autocomplete="off"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={calendarId}
      aria-describedby={describedBy}
      aria-invalid={currentState === 'error' ? 'true' : undefined}
      aria-readonly={isReadOnly ? 'true' : undefined}
      aria-required={required ? 'true' : undefined}
      {disabled}
      {name}
      placeholder={inputPlaceholder}
      readonly={isReadOnly || !manualInput}
      {required}
      class={inputClass}
      value={inputText}
      onclick={handleInputClick}
      oninput={handleInput}
      onchange={handleInputChange}
      onkeydown={handleInputKeydown}
    />

    {#if clearable && (mode === 'range' ? rangeStart || rangeEnd : selectedDate)}
      <button
        type="button"
        class={`${actionButtonClass} ${variant === 'default' ? 'hover:bg-jam-bg/10' : 'hover:bg-jam-text/10'}`.trim()}
        aria-label="Limpar data"
        disabled={disabled || isReadOnly}
        onclick={handleClear}
      >
        <X size={iconSize[size]} strokeWidth={2.5} aria-hidden="true" />
      </button>
    {/if}
  </div>

  {#if helperTextValue}
    <span id={helperId} class="text-[11px] font-medium tracking-[0.08em] text-jam-soft/70">
      {helperTextValue}
    </span>
  {/if}

  {#if error}
    <span id={errorId} class="text-[11px] font-bold uppercase tracking-[0.1em] text-jam-danger" aria-live="polite">
      {error}
    </span>
  {/if}
</div>

{#if open}
  <div
    bind:this={popoverRef}
    id={calendarId}
    role="dialog"
    aria-modal="false"
    aria-labelledby={captionId}
    tabindex={-1}
    class="fixed z-50 w-[20rem] border border-jam-bg/15 bg-jam-text p-3 font-jam-mono text-jam-bg shadow-jam-hard-blue-sm outline-none"
    style={popoverStyle}
    onfocusin={handleFocusIn}
    onfocusout={handleFocusOut}
    onkeydown={handleCalendarKeydown}
  >
    <div class="mb-3 grid grid-cols-[2rem_2rem_1fr_2rem_2rem] items-center gap-1">
      <button
        type="button"
        class="grid h-8 place-items-center border border-jam-bg/20 bg-transparent text-[11px] font-black text-jam-bg transition-colors hover:border-jam-bg hover:bg-jam-bg hover:text-jam-text focus:outline-none focus-visible:ring-2 focus-visible:ring-jam-bg focus-visible:ring-offset-2 focus-visible:ring-offset-jam-text"
        aria-label="Ano anterior"
        onclick={() => moveView(-12)}
      >
        <span aria-hidden="true">&lt;&lt;</span>
      </button>
      <button
        type="button"
        class="grid h-8 place-items-center border border-jam-bg/20 bg-transparent text-jam-bg transition-colors hover:border-jam-bg hover:bg-jam-bg hover:text-jam-text focus:outline-none focus-visible:ring-2 focus-visible:ring-jam-bg focus-visible:ring-offset-2 focus-visible:ring-offset-jam-text"
        aria-label="Mes anterior"
        onclick={() => moveView(-1)}
      >
        <ChevronLeft size={15} strokeWidth={2.5} aria-hidden="true" />
      </button>
      <div id={captionId} class="truncate px-2 text-center text-[11px] font-black uppercase tracking-[0.14em] text-jam-bg">
        {monthLabel}
      </div>
      <button
        type="button"
        class="grid h-8 place-items-center border border-jam-bg/20 bg-transparent text-jam-bg transition-colors hover:border-jam-bg hover:bg-jam-bg hover:text-jam-text focus:outline-none focus-visible:ring-2 focus-visible:ring-jam-bg focus-visible:ring-offset-2 focus-visible:ring-offset-jam-text"
        aria-label="Proximo mes"
        onclick={() => moveView(1)}
      >
        <ChevronRight size={15} strokeWidth={2.5} aria-hidden="true" />
      </button>
      <button
        type="button"
        class="grid h-8 place-items-center border border-jam-bg/20 bg-transparent text-[11px] font-black text-jam-bg transition-colors hover:border-jam-bg hover:bg-jam-bg hover:text-jam-text focus:outline-none focus-visible:ring-2 focus-visible:ring-jam-bg focus-visible:ring-offset-2 focus-visible:ring-offset-jam-text"
        aria-label="Proximo ano"
        onclick={() => moveView(12)}
      >
        <span aria-hidden="true">&gt;&gt;</span>
      </button>
    </div>

    <div role="grid" aria-labelledby={captionId} class="grid gap-1">
      <div role="row" class="grid grid-cols-7 gap-1">
        {#each weekdays as weekday}
          <div role="columnheader" class="py-1 text-center text-[10px] font-black uppercase tracking-[0.08em] text-jam-bg/55">
            {weekday}
          </div>
        {/each}
      </div>

      {#each calendarWeeks as week}
        <div role="row" class="grid grid-cols-7 gap-1">
          {#each week as day (toISODate(day))}
            {@const unavailable = isDateUnavailable(day)}
            {@const rangeStartSelected = rangeStart ? isSameDay(day, rangeStart) : false}
            {@const rangeEndSelected = rangeEnd ? isSameDay(day, rangeEnd) : false}
            {@const inSelectedRange = mode === 'range' && isDateInRange(day, rangeStart, rangeEnd)}
            {@const selected = mode === 'range' ? rangeStartSelected || rangeEndSelected : selectedDate ? isSameDay(day, selectedDate) : false}
            {@const today = isSameDay(day, todayDate())}
            {@const inCurrentMonth = day.getMonth() === viewDate.getMonth()}
            {@const focused = isSameDay(day, focusedDate)}
            <div role="gridcell">
              <button
                id={`${id}-day-${toISODate(day)}`}
                type="button"
                class={`${dayButtonBaseClass} ${
                  unavailable
                    ? 'cursor-not-allowed border-transparent text-jam-bg/25 line-through'
                    : selected
                      ? 'border-jam-bg bg-jam-bg text-jam-text'
                      : inSelectedRange
                        ? 'border-jam-bg/20 bg-jam-bg/10 text-jam-bg'
                      : today
                        ? 'border-jam-bg/55 text-jam-bg hover:bg-jam-bg/10'
                        : inCurrentMonth
                          ? 'border-transparent text-jam-bg hover:border-jam-bg/30 hover:bg-jam-bg/10'
                          : 'border-transparent text-jam-bg/40 hover:border-jam-bg/20 hover:bg-jam-bg/5'
                } ${focused ? 'ring-1 ring-jam-bg/60' : ''}`.trim()}
                data-date={toISODate(day)}
                aria-label={getDayLabel(day, unavailable)}
                aria-disabled={unavailable ? 'true' : undefined}
                aria-current={today ? 'date' : undefined}
                aria-pressed={selected || inSelectedRange}
                tabindex={focused ? 0 : -1}
                onclick={() => handleDayClick(day)}
                onfocus={() => handleDayFocus(day)}
              >
                {day.getDate()}
              </button>
            </div>
          {/each}
        </div>
      {/each}
    </div>

    {#if showToday}
      <div class="mt-3 flex justify-between gap-2 border-t border-jam-bg/15 pt-3">
        <button
          type="button"
          class="min-h-8 border border-jam-bg/25 bg-transparent px-3 text-[10px] font-black uppercase tracking-[0.16em] text-jam-bg transition-colors hover:border-jam-bg hover:bg-jam-bg hover:text-jam-text focus:outline-none focus-visible:ring-2 focus-visible:ring-jam-bg focus-visible:ring-offset-2 focus-visible:ring-offset-jam-text disabled:cursor-not-allowed disabled:border-jam-bg/10 disabled:text-jam-bg/25"
          disabled={isDateUnavailable(todayDate())}
          onclick={handleToday}
        >
          Hoje
        </button>
      </div>
    {/if}
  </div>
{/if}
