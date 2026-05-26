import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type TabVariant = 'default' | 'line';
export type TabOrientation = 'horizontal' | 'vertical';
export type TabSize = 'md' | 'sm';

export type TabContext = {
  activeTab: string;
  setTab: (value: string) => void;
  variant: TabVariant;
  orientation: TabOrientation;
  size: TabSize;
};

export type TabGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
  orientation?: TabOrientation;
  size?: TabSize;
  value?: string;
  variant?: TabVariant;
};

export type TabListProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type TabTriggerProps = Omit<HTMLAttributes<HTMLButtonElement>, 'class' | 'onclick' | 'role' | 'aria-selected' | 'tabindex'> & {
  children?: Snippet;
  class?: string;
  value: string;
};

export type TabPanelProps = Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'role'> & {
  children?: Snippet;
  class?: string;
  value: string;
};

export const TAB_CONTEXT = Symbol('tab-group');
