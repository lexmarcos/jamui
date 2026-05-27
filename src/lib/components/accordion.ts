import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export type AccordionType = 'single' | 'multiple';
export type AccordionVariant = 'default' | 'bordered' | 'separated' | 'filled' | 'ghost';
export type AccordionSize = 'sm' | 'md' | 'lg';
export type AccordionHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type AccordionProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
  type?: AccordionType;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  disabled?: boolean;
  variant?: AccordionVariant;
  size?: AccordionSize;
  icon?: Snippet<[boolean]>;
};

export type AccordionItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
  value: string;
  disabled?: boolean;
};

export type AccordionTriggerProps = Omit<HTMLButtonAttributes, 'class'> & {
  children?: Snippet;
  class?: string;
  headingLevel?: AccordionHeadingLevel;
};

export type AccordionContentProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type AccordionContext = {
  type: AccordionType;
  value: string[];
  setValue: (value: string[]) => void;
  toggleItem: (itemValue: string) => void;
  disabled: boolean;
  variant: AccordionVariant;
  size: AccordionSize;
  icon?: Snippet<[boolean]>;
};

export type AccordionItemContext = {
  value: string;
  isOpen: boolean;
  disabled: boolean;
  triggerId: string;
  contentId: string;
};

export const ACCORDION_CONTEXT = Symbol('accordion');
export const ACCORDION_ITEM_CONTEXT = Symbol('accordion-item');
