export type ComboboxSize = 'sm' | 'md' | 'lg';

export type ComboboxProps = {
  class?: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
  id?: string;
  label?: string;
  options: string[];
  placeholder?: string;
  size?: ComboboxSize;
  value?: string;
};
