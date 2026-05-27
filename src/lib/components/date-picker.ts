import type { HTMLAttributes } from 'svelte/elements';

export type DatePickerDateValue = Date | string | null | undefined;
export type DatePickerRange = {
  start: Date | null;
  end: Date | null;
};
export type DatePickerRangeValue = {
  start?: DatePickerDateValue;
  end?: DatePickerDateValue;
} | [DatePickerDateValue, DatePickerDateValue];
export type DatePickerValue = DatePickerDateValue | DatePickerRangeValue;
export type DatePickerMode = 'single' | 'range';
export type DatePickerVariant = 'default' | 'filled' | 'outline' | 'ghost';
export type DatePickerSize = 'sm' | 'md' | 'lg';
export type DatePickerState = 'normal' | 'error' | 'success';
export type DatePickerFormat = string | ((date: Date, locale?: string) => string);

export type DatePickerChangeDetails = {
  value: Date | DatePickerRange | null;
  formattedValue: string;
  name?: string;
  startDate?: Date | null;
  endDate?: Date | null;
};

export type DatePickerProps = Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'onchange' | 'onblur' | 'onfocus'> & {
  class?: string;
  clearable?: boolean;
  defaultValue?: DatePickerValue;
  description?: string;
  disabled?: boolean;
  error?: string;
  format?: DatePickerFormat;
  helperText?: string;
  hint?: string;
  id?: string;
  isDateDisabled?: (date: Date) => boolean;
  label?: string;
  locale?: string;
  manualInput?: boolean;
  maxDate?: DatePickerDateValue;
  minDate?: DatePickerDateValue;
  mode?: DatePickerMode;
  name?: string;
  onBlur?: (event: FocusEvent) => void;
  onChange?: (value: Date | DatePickerRange | null, details: DatePickerChangeDetails) => void;
  onFocus?: (event: FocusEvent) => void;
  placeholder?: string;
  rangeSeparator?: string;
  readOnly?: boolean;
  readonly?: boolean;
  required?: boolean;
  showCalendarIcon?: boolean;
  showToday?: boolean;
  size?: DatePickerSize;
  state?: DatePickerState;
  value?: DatePickerValue;
  variant?: DatePickerVariant;
};
