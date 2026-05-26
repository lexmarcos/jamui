import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLTableAttributes } from 'svelte/elements';

export type TableSize = 'md' | 'sm' | 'compact';

export type TableContext = {
  size: TableSize;
  striped: boolean;
};

export type TableProps = Omit<HTMLTableAttributes, 'class'> & {
  children?: Snippet;
  class?: string;
  size?: TableSize;
  striped?: boolean;
};

export type TableHeadProps = Omit<HTMLAttributes<HTMLTableSectionElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type TableBodyProps = Omit<HTMLAttributes<HTMLTableSectionElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type TableRowProps = Omit<HTMLAttributes<HTMLTableRowElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type TableHeaderProps = Omit<HTMLAttributes<HTMLTableCellElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type TableCellProps = Omit<HTMLAttributes<HTMLTableCellElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type TableCaptionProps = Omit<HTMLAttributes<any>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export const TABLE_CONTEXT = Symbol('table');
