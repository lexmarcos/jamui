import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type DropdownTriggerProps = {
  onclick: (e: MouseEvent) => void;
  onkeydown: (e: KeyboardEvent) => void;
  'aria-haspopup': 'menu';
  'aria-expanded': boolean;
  ref: (el: HTMLElement | null) => void;
};

export type DropdownItemProps = Omit<HTMLAttributes<HTMLButtonElement>, 'class' | 'onclick' | 'role' | 'tabindex'> & {
  class?: string;
  disabled?: boolean;
  onclick?: (e: MouseEvent) => void;
};

export type DropdownContext = {
  registerItem: (node: HTMLButtonElement, disabled: boolean) => number;
  unregisterItem: (node: HTMLButtonElement) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  close: () => void;
};

export const DROPDOWN_CONTEXT = Symbol('dropdown');
