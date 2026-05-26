import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type RadioOrientation = 'horizontal' | 'vertical';

export type RadioContext = {
  name: string;
  groupValue: string;
  groupDisabled: boolean;
  setValue: (v: string) => void;
};

export type RadioGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'role'> & {
  children?: Snippet;
  class?: string;
  disabled?: boolean;
  label?: string;
  name: string;
  orientation?: RadioOrientation;
  value?: string;
};

export type RadioItemProps = Omit<HTMLAttributes<HTMLLabelElement>, 'class' | 'for'> & {
  class?: string;
  disabled?: boolean;
  label: string;
  value: string;
};

export const RADIO_CONTEXT = Symbol('radio-group');
