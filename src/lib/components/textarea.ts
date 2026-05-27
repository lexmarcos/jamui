import type { HTMLTextareaAttributes } from 'svelte/elements';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export type TextareaProps = Omit<HTMLTextareaAttributes, 'class' | 'value'> & {
  class?: string;
  error?: string;
  hint?: string;
  label?: string;
  maxLength?: number;
  resize?: TextareaResize;
  rows?: number;
  showCounter?: boolean;
  size?: TextareaSize;
  textareaClass?: string;
  value?: string;
};
