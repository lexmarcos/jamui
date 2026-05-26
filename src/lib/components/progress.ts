export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressVariant = 'default' | 'success' | 'warning' | 'danger';

export type ProgressProps = {
  class?: string;
  label?: string;
  max?: number;
  size?: ProgressSize;
  value?: number;
  variant?: ProgressVariant;
};
