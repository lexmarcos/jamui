import type { Snippet } from 'svelte';
import type {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState
} from '@tanstack/table-core';

export type DataTableDensity = 'comfortable' | 'compact' | 'condensed';
export type DataTableSize = 'md' | 'sm';
export type DataTableColumnAlign = 'left' | 'center' | 'right';

export type CellContext<TData> = {
  value: unknown;
  row: TData;
  rowIndex: number;
  column: DataTableColumn<TData>;
  selected: boolean;
};

export type HeaderContext<TData> = {
  column: DataTableColumn<TData>;
  sorted: false | 'asc' | 'desc';
};

export type DataTableColumn<TData> = {
  id?: string;
  accessor?: keyof TData | ((row: TData) => unknown);
  header: string;
  align?: DataTableColumnAlign;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  enableSorting?: boolean;
  enableHiding?: boolean;
  enableGlobalFilter?: boolean;
  cell?: Snippet<[CellContext<TData>]>;
  headerCell?: Snippet<[HeaderContext<TData>]>;
  cellClass?: string;
  headerClass?: string;
  /**
   * When true, the column is treated as numeric — right-aligned by default,
   * uses tabular numerals.
   */
  numeric?: boolean;
};

export type DataTableProps<TData> = {
  class?: string;
  data: TData[];
  columns: DataTableColumn<TData>[];

  /** Visual density of rows. */
  density?: DataTableDensity;
  /** Visual size scale (typography). */
  size?: DataTableSize;
  /** Subtle alternate row tint. */
  striped?: boolean;

  /** Adds a leading selection column with checkboxes. */
  selectable?: boolean;
  /** Optional callback when the row selection changes. */
  onSelectionChange?: (selectedRows: TData[]) => void;

  /** Globally enables column sorting (per-column override via `enableSorting`). */
  sortable?: boolean;
  initialSorting?: SortingState;

  /** Renders pagination footer. */
  pageable?: boolean;
  pageSize?: number;
  pageSizes?: number[];

  /** Shows the global search input. */
  filterable?: boolean;
  searchPlaceholder?: string;

  /** Shows the column visibility menu in the toolbar. */
  showColumnVisibility?: boolean;
  /** Shows the density toggle in the toolbar. */
  showDensityToggle?: boolean;

  /** Sticky thead while the body scrolls. */
  stickyHeader?: boolean;
  /** Max height of the scrollable body. CSS value. */
  maxHeight?: string;

  /** Extra trailing toolbar content (e.g. action buttons). */
  toolbar?: Snippet;

  /** Title strip at the top of the table card. */
  title?: string;
  description?: string;
  /** Renders inside the title strip on the right (e.g. badges). */
  titleAside?: Snippet;
  caption?: string;

  /** Renders a skeleton state inside the body. */
  loading?: boolean;
  skeletonRows?: number;

  /** Custom empty-state snippet or fallback text. */
  empty?: Snippet;
  emptyTitle?: string;
  emptyDescription?: string;

  /** Pluck a stable key from each row. Defaults to row index. */
  rowKey?: (row: TData, index: number) => string | number;
  onRowClick?: (row: TData, index: number) => void;

  initialColumnVisibility?: VisibilityState;
};

export type DataTablePagerLabels = {
  first?: string;
  prev?: string;
  next?: string;
  last?: string;
};
