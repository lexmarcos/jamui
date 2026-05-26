import type { HTMLInputAttributes } from 'svelte/elements';

export type TextInputProps = Omit<HTMLInputAttributes, 'class' | 'type' | 'value'> & {
  class?: string;
  error?: string;
  hint?: string;
  inputClass?: string;
  label?: string;
  type?: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
  value?: string;
};
