import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'title'> & {
  children?: Snippet;
  class?: string;
  description?: string;
  dismissible?: boolean;
  title?: string;
  variant?: AlertVariant;
  /** Bindable: true when the alert is visible. Set to false to dismiss. */
  visible?: boolean;
  /** Fires when the dismiss button is clicked. */
  ondismiss?: () => void;
};
