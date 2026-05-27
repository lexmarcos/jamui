import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export type BreadcrumbContext = {
  separator?: Snippet;
};

export type BreadcrumbProps = Omit<HTMLAttributes<HTMLElement>, 'class'> & {
  children?: Snippet;
  class?: string;
  separator?: Snippet;
};

export type BreadcrumbListProps = Omit<HTMLAttributes<HTMLOListElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type BreadcrumbItemProps = Omit<HTMLAttributes<HTMLLIElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type BreadcrumbLinkProps = Omit<HTMLAnchorAttributes, 'class'> & {
  children?: Snippet;
  class?: string;
  current?: boolean;
};

export type BreadcrumbSeparatorProps = Omit<HTMLAttributes<HTMLSpanElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type BreadcrumbEllipsisProps = Omit<HTMLButtonAttributes, 'class'> & {
  children?: Snippet;
  class?: string;
};

export const BREADCRUMB_CONTEXT = Symbol('breadcrumb');
