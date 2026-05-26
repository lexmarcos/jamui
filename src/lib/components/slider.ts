export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderVariant = 'default' | 'success' | 'warning' | 'danger';

export type SliderProps = {
  class?: string;
  label?: string;
  max?: number;
  min?: number;
  size?: SliderSize;
  step?: number;
  value?: number;
  variant?: SliderVariant;
};
