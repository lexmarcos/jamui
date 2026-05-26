import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type SelectSize = 'sm' | 'md' | 'lg';

export type SelectContext = {
  value: string;
  setValue: (v: string) => void;
  registerOption: (node: HTMLDivElement, val: string, disabled: boolean, label: string) => number;
  unregisterOption: (node: HTMLDivElement) => void;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  open: boolean;
  id: string;
};

export type SelectProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
  id?: string;
  label?: string;
  placeholder?: string;
  size?: SelectSize;
  value?: string;
};

export type SelectOptionProps = Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'onclick' | 'role'> & {
  children?: Snippet;
  class?: string;
  disabled?: boolean;
  label: string;
  value: string;
};

export const SELECT_CONTEXT = Symbol('select');
