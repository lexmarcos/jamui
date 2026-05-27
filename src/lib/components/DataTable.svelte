<script lang="ts" generics="TData">
  import { untrack } from 'svelte';
  import {
    createTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    type ColumnDef,
    type SortingState,
    type ColumnFiltersState,
    type VisibilityState,
    type RowSelectionState,
    type PaginationState,
    type TableOptions,
    type TableOptionsResolved,
    type TableState,
    type Updater
  } from '@tanstack/table-core';
  import {
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Search,
    Settings2,
    X,
    Check,
    Minus,
    Inbox
  } from '@lucide/svelte';
  import type {
    DataTableProps,
    DataTableColumn,
    DataTableDensity,
    CellContext,
    HeaderContext
  } from './data-table';

  let {
    class: className = '',
    data,
    columns,
    density = 'comfortable',
    size = 'md',
    striped = false,
    selectable = false,
    onSelectionChange,
    sortable = true,
    initialSorting = [],
    pageable = true,
    pageSize = 10,
    pageSizes = [5, 10, 25, 50],
    filterable = true,
    searchPlaceholder = 'Search…',
    showColumnVisibility = true,
    showDensityToggle = true,
    stickyHeader = true,
    maxHeight,
    toolbar,
    title = '',
    description = '',
    titleAside,
    caption = '',
    loading = false,
    skeletonRows = 6,
    empty,
    emptyTitle = 'No results',
    emptyDescription = 'Try adjusting search or filters.',
    rowKey,
    onRowClick,
    initialColumnVisibility = {}
  }: DataTableProps<TData> = $props();

  // ─── internal state ─────────────────────────────────────────────────────
  let sorting = $state<SortingState>(untrack(() => initialSorting));
  let columnFilters = $state<ColumnFiltersState>([]);
  let columnVisibility = $state<VisibilityState>(untrack(() => initialColumnVisibility));
  let rowSelection = $state<RowSelectionState>({});
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: untrack(() => pageSize) });
  let globalFilter = $state<string>('');
  let densityState = $state<DataTableDensity>(untrack(() => density));
  let visibilityMenuOpen = $state(false);
  let pageJumpValue = $state('');

  $effect(() => { densityState = density; });

  let prevPageSize = $state(untrack(() => pageSize));
  $effect(() => {
    const ps = pageSize;
    untrack(() => {
      if (prevPageSize !== ps) {
        prevPageSize = ps;
        pagination = { pageIndex: 0, pageSize: ps };
      }
    });
  });

  // ─── build column definitions for tanstack-table ────────────────────────
  const baseColumnDefs = $derived.by<ColumnDef<TData>[]>(() => {
    const defs: ColumnDef<TData>[] = [];

    if (selectable) {
      defs.push({
        id: '__select__',
        header: '',
        enableSorting: false,
        enableHiding: false,
        enableGlobalFilter: false,
        size: 36,
        meta: { isSelection: true }
      });
    }

    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      const id = col.id ?? (typeof col.accessor === 'string' ? String(col.accessor) : `col-${i}`);
      const shared = {
        id,
        header: col.header,
        enableSorting: col.enableSorting ?? sortable,
        enableHiding: col.enableHiding ?? true,
        enableGlobalFilter: col.enableGlobalFilter ?? true,
        meta: { original: col }
      };
      let def: ColumnDef<TData>;
      if (typeof col.accessor === 'function') {
        def = { ...shared, accessorFn: col.accessor as (row: TData) => unknown } as ColumnDef<TData>;
      } else if (typeof col.accessor === 'string') {
        def = { ...shared, accessorKey: col.accessor as string } as ColumnDef<TData>;
      } else {
        def = shared as ColumnDef<TData>;
      }
      defs.push(def);
    }
    return defs;
  });

  // ─── tanstack table wiring ──────────────────────────────────────────────
  function applyUpdater<T>(current: T, updater: Updater<T>): T {
    return typeof updater === 'function' ? (updater as (old: T) => T)(current) : updater;
  }

  function buildOptions(): TableOptions<TData> {
    return {
      data,
      columns: baseColumnDefs,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        pagination,
        globalFilter
      },
      enableRowSelection: selectable,
      enableSorting: sortable,
      enableGlobalFilter: filterable,
      autoResetPageIndex: false,
      onSortingChange: (u) => { sorting = applyUpdater(sorting, u); },
      onColumnFiltersChange: (u) => { columnFilters = applyUpdater(columnFilters, u); },
      onColumnVisibilityChange: (u) => { columnVisibility = applyUpdater(columnVisibility, u); },
      onRowSelectionChange: (u) => { rowSelection = applyUpdater(rowSelection, u); },
      onPaginationChange: (u) => { pagination = applyUpdater(pagination, u); },
      onGlobalFilterChange: (u) => { globalFilter = applyUpdater(globalFilter, u); },
      globalFilterFn: 'includesString',
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: pageable ? getPaginationRowModel() : undefined,
      manualPagination: !pageable
    };
  }

  function resolveOptions(
    options: TableOptions<TData>,
    baseState: Partial<TableState> = {}
  ): TableOptionsResolved<TData> {
    return {
      onStateChange: () => {},
      renderFallbackValue: null,
      ...options,
      state: {
        ...baseState,
        ...options.state
      }
    } as TableOptionsResolved<TData>;
  }

  const table = createTable<TData>({
    ...resolveOptions(buildOptions()),
    state: {}
  });

  table.setOptions((prev) => ({
    ...prev,
    ...resolveOptions(buildOptions(), table.initialState)
  }));

  const tableSnapshot = $derived.by(() => {
    table.setOptions((prev) => ({
      ...prev,
      ...resolveOptions(buildOptions(), table.initialState)
    }));

    return {
      headerGroups: table.getHeaderGroups(),
      pageRows: table.getRowModel().rows,
      allLeafColumns: table.getAllLeafColumns(),
      totalRowCount: table.getPrePaginationRowModel().rows.length,
      filteredRowCount: table.getFilteredRowModel().rows.length,
      pageCount: Math.max(table.getPageCount(), 1),
      canPrev: table.getCanPreviousPage(),
      canNext: table.getCanNextPage(),
      isAllPageSelected: table.getIsAllPageRowsSelected(),
      isSomePageSelected: table.getIsSomePageRowsSelected(),
      selectedSignature: table.getSelectedRowModel().rows.map((row) => row.id).join('|'),
      selectedRows: table.getSelectedRowModel().rows.map((row) => row.original)
    };
  });

  // ─── derived views ─────────────────────────────────────────────────────
  const headerGroups = $derived(tableSnapshot.headerGroups);
  const pageRows = $derived(tableSnapshot.pageRows);
  const allLeafColumns = $derived(tableSnapshot.allLeafColumns);
  const totalRowCount = $derived(tableSnapshot.totalRowCount);
  const filteredRowCount = $derived(tableSnapshot.filteredRowCount);
  const pageCount = $derived(tableSnapshot.pageCount);
  const canPrev = $derived(tableSnapshot.canPrev);
  const canNext = $derived(tableSnapshot.canNext);
  const selectablePageRows = $derived.by(() => pageRows.filter((row) => row.getCanSelect()));
  const isAllPageSelected = $derived.by(() =>
    selectablePageRows.length > 0 && selectablePageRows.every((row) => !!rowSelection[row.id])
  );
  const isSomePageSelected = $derived.by(() =>
    !isAllPageSelected && selectablePageRows.some((row) => !!rowSelection[row.id])
  );
  const selectedCount = $derived.by(() => Object.keys(rowSelection).filter(k => rowSelection[k]).length);

  let lastSelectionSignature = '';

  $effect(() => {
    if (!onSelectionChange) return;
    if (tableSnapshot.selectedSignature === lastSelectionSignature) return;
    lastSelectionSignature = tableSnapshot.selectedSignature;
    onSelectionChange(tableSnapshot.selectedRows);
  });

  // ─── style maps ─────────────────────────────────────────────────────────
  const cellPadByDensity = $derived<Record<DataTableDensity, string>>({
    comfortable: size === 'sm' ? 'px-4 py-3' : 'px-5 py-3.5',
    compact:     size === 'sm' ? 'px-3 py-2'  : 'px-4 py-2.5',
    condensed:   size === 'sm' ? 'px-2.5 py-1' : 'px-3 py-1.5'
  });

  const headerPadByDensity = $derived<Record<DataTableDensity, string>>({
    comfortable: size === 'sm' ? 'px-4 py-3' : 'px-5 py-3.5',
    compact:     size === 'sm' ? 'px-3 py-2.5' : 'px-4 py-3',
    condensed:   size === 'sm' ? 'px-2.5 py-1.5' : 'px-3 py-2'
  });

  const bodyTextClass = $derived(size === 'sm' ? 'text-[11px]' : 'text-xs');

  const alignClass = (a?: 'left' | 'center' | 'right') =>
    a === 'right' ? 'text-right' : a === 'center' ? 'text-center' : 'text-left';

  function cellWidthStyle(col?: DataTableColumn<TData>) {
    if (!col) return '';
    const parts: string[] = [];
    if (col.width) parts.push(`width:${col.width};`);
    if (col.minWidth) parts.push(`min-width:${col.minWidth};`);
    if (col.maxWidth) parts.push(`max-width:${col.maxWidth};`);
    return parts.join('');
  }

  function getOriginalColumn(meta: unknown): DataTableColumn<TData> | undefined {
    if (meta && typeof meta === 'object' && 'original' in meta) {
      return (meta as { original: DataTableColumn<TData> }).original;
    }
    return undefined;
  }

  function isSelectionColumn(meta: unknown): boolean {
    return !!(meta && typeof meta === 'object' && 'isSelection' in meta &&
      (meta as { isSelection: boolean }).isSelection);
  }

  function resolveKey(row: TData, idx: number): string | number {
    return rowKey ? rowKey(row, idx) : idx;
  }

  function clearGlobalFilter() {
    globalFilter = '';
  }

  function setRowSelected(rowId: string, selected: boolean) {
    if (selected) {
      rowSelection = { ...rowSelection, [rowId]: true };
      return;
    }

    const next = { ...rowSelection };
    delete next[rowId];
    rowSelection = next;
  }

  function setPageRowsSelected(selected: boolean) {
    const next = { ...rowSelection };
    for (const row of selectablePageRows) {
      if (selected) next[row.id] = true;
      else delete next[row.id];
    }
    rowSelection = next;
  }

  function gotoPage(idx: number) {
    const clamped = Math.max(0, Math.min(idx, pageCount - 1));
    pagination = { ...pagination, pageIndex: clamped };
  }

  function setPageSize(s: number) {
    pagination = { pageIndex: 0, pageSize: s };
  }

  function handlePageJump(e: KeyboardEvent) {
    if (e.key !== 'Enter') return;
    const n = parseInt(pageJumpValue, 10);
    if (Number.isFinite(n)) gotoPage(n - 1);
    pageJumpValue = '';
  }

  function handleVisibilityClickOutside(e: MouseEvent) {
    if (!visibilityMenuOpen) return;
    const target = e.target as Element | null;
    if (target?.closest('[data-jam-visibility-menu]')) return;
    if (target?.closest('[data-jam-visibility-trigger]')) return;
    visibilityMenuOpen = false;
  }

  // numeric range info for footer
  const rangeStart = $derived(filteredRowCount === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1);
  const rangeEnd = $derived(Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredRowCount));
</script>

<svelte:window onclick={handleVisibilityClickOutside} />

<div
  class={`jam-data-table relative isolate flex w-full min-w-0 flex-col border border-jam-text/30 bg-jam-surface font-jam-mono text-jam-text shadow-jam-hard-md ${className}`.trim()}
>
  <!-- Title strip -->
  {#if title || description || titleAside}
    <header class="flex flex-wrap items-end justify-between gap-4 border-b border-jam-text/15 bg-jam-bg px-5 py-4">
      <div class="min-w-0">
        {#if title}
          <div class="flex items-baseline gap-3">
            <h3 class="text-[13px] font-black uppercase tracking-[0.22em] text-jam-text">
              {title}
            </h3>
            <span class="text-[10px] font-black uppercase tracking-[0.16em] text-jam-soft/70">
              [{String(filteredRowCount).padStart(3, '0')} / {String(totalRowCount).padStart(3, '0')}]
            </span>
          </div>
        {/if}
        {#if description}
          <p class="mt-1.5 max-w-prose text-[11px] font-medium tracking-[0.08em] text-jam-soft/80">
            {description}
          </p>
        {/if}
      </div>
      {#if titleAside}
        <div class="flex items-center gap-2">{@render titleAside()}</div>
      {/if}
    </header>
  {/if}

  <!-- Toolbar -->
  {#if filterable || showColumnVisibility || showDensityToggle || toolbar || (selectable && selectedCount > 0)}
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-jam-text/15 bg-jam-surface-strong/40 px-3 py-2.5">
      <div class="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        {#if filterable}
          <label class="relative flex min-w-[14rem] flex-1 items-center">
            <Search size={14} class="pointer-events-none absolute left-3 text-jam-bg/45" />
            <input
              type="text"
              bind:value={globalFilter}
              placeholder={searchPlaceholder}
              class="min-h-9 w-full rounded-none border border-jam-bg/35 bg-jam-text pl-9 pr-9 text-[11px] font-bold font-jam-mono tracking-[0.06em] text-jam-bg outline-none transition-shadow duration-150 ease-out placeholder:text-jam-bg/30 hover:border-jam-bg/60 focus:border-jam-bg focus:shadow-[4px_4px_0_var(--color-jam-bg)]"
            />
            {#if globalFilter}
              <button
                type="button"
                aria-label="Clear search"
                class="absolute right-2 grid h-5 w-5 place-items-center text-jam-bg/45 transition-colors hover:bg-jam-bg hover:text-jam-text"
                onclick={clearGlobalFilter}
              >
                <X size={12} strokeWidth={3} />
              </button>
            {/if}
          </label>
        {/if}

        {#if selectable && selectedCount > 0}
          <div class="inline-flex items-center gap-2 border border-jam-text/30 bg-jam-text px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-jam-bg">
            <span>{selectedCount} selected</span>
            <button
              type="button"
              class="grid h-4 w-4 place-items-center text-jam-bg/60 transition-colors hover:bg-jam-bg hover:text-jam-text"
              aria-label="Clear selection"
              onclick={() => { rowSelection = {}; }}
            >
              <X size={10} strokeWidth={3.5} />
            </button>
          </div>
        {/if}
      </div>

      <div class="flex flex-wrap items-center gap-2">
        {#if showDensityToggle}
          <div
            role="group"
            aria-label="Row density"
            class="inline-flex items-stretch border border-jam-text/30 divide-x divide-jam-text/25 leading-none"
          >
            {#each [
              { id: 'comfortable', label: 'COMFY' },
              { id: 'compact', label: 'COMPACT' },
              { id: 'condensed', label: 'TIGHT' }
            ] as opt (opt.id)}
              <button
                type="button"
                aria-pressed={densityState === opt.id}
                class={`px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] transition-colors ${
                  densityState === opt.id
                    ? 'bg-jam-text text-jam-bg'
                    : 'bg-transparent text-jam-muted hover:bg-jam-text/10 hover:text-jam-text'
                }`}
                onclick={() => { densityState = opt.id as DataTableDensity; }}
              >
                {opt.label}
              </button>
            {/each}
          </div>
        {/if}

        {#if showColumnVisibility}
          <div class="relative">
            <button
              type="button"
              data-jam-visibility-trigger
              aria-haspopup="menu"
              aria-expanded={visibilityMenuOpen}
              class={`inline-flex h-8 items-center gap-1.5 border border-jam-text/30 px-3 text-[10px] font-black uppercase tracking-[0.18em] transition-colors ${
                visibilityMenuOpen
                  ? 'bg-jam-text text-jam-bg'
                  : 'bg-transparent text-jam-muted hover:bg-jam-text/10 hover:text-jam-text'
              }`}
              onclick={() => { visibilityMenuOpen = !visibilityMenuOpen; }}
            >
              <Settings2 size={12} strokeWidth={2.5} />
              COLUMNS
            </button>
            {#if visibilityMenuOpen}
              <div
                data-jam-visibility-menu
                role="menu"
                class="absolute right-0 top-full z-40 mt-1 min-w-[12rem] border border-jam-bg/15 bg-jam-text py-1 shadow-jam-hard-blue-sm"
              >
                <div class="border-b border-jam-bg/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-jam-bg/55">
                  Toggle columns
                </div>
                {#each allLeafColumns as col (col.id)}
                  {@const original = getOriginalColumn(col.columnDef.meta)}
                  {#if !isSelectionColumn(col.columnDef.meta) && col.getCanHide()}
                    <button
                      type="button"
                      role="menuitemcheckbox"
                      aria-checked={col.getIsVisible()}
                      class="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[11px] font-bold font-jam-mono tracking-[0.06em] text-jam-bg transition-colors hover:bg-jam-bg hover:text-jam-text"
                      onclick={() => col.toggleVisibility()}
                    >
                      <span class={`grid h-3.5 w-3.5 shrink-0 place-items-center border ${
                        col.getIsVisible()
                          ? 'border-jam-bg bg-jam-bg text-jam-text'
                          : 'border-jam-bg/50 bg-transparent'
                      }`}>
                        {#if col.getIsVisible()}
                          <Check size={10} strokeWidth={3.5} />
                        {/if}
                      </span>
                      <span class="truncate">{original?.header ?? col.id}</span>
                    </button>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>
        {/if}

        {#if toolbar}
          {@render toolbar()}
        {/if}
      </div>
    </div>
  {/if}

  <!-- Scroll body -->
  <div
    class="relative w-full overflow-auto"
    style={maxHeight ? `max-height:${maxHeight};` : ''}
  >
    <table class="w-full border-collapse text-left">
      {#if caption}
        <caption class="caption-top px-5 pt-3 pb-2 text-left text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">
          {caption}
        </caption>
      {/if}

      <thead class={stickyHeader ? 'sticky top-0 z-20' : ''}>
        {#each headerGroups as group (group.id)}
          <tr class="bg-jam-bg shadow-[inset_0_-2px_0_0_var(--color-jam-text)]">
            {#each group.headers as header (header.id)}
              {@const original = getOriginalColumn(header.column.columnDef.meta)}
              {@const isSelCol = isSelectionColumn(header.column.columnDef.meta)}
              {@const canSort = header.column.getCanSort()}
              {@const sorted = header.column.getIsSorted() as false | 'asc' | 'desc'}
              <th
                scope="col"
                aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : canSort ? 'none' : undefined}
                class={`${headerPadByDensity[densityState]} ${alignClass(original?.align ?? (original?.numeric ? 'right' : 'left'))} text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted ${original?.headerClass ?? ''} ${isSelCol ? 'w-[44px]' : ''}`.trim()}
                style={cellWidthStyle(original)}
              >
                {#if isSelCol}
                  <span class="flex items-center justify-center">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={isAllPageSelected ? 'true' : isSomePageSelected ? 'mixed' : 'false'}
                      aria-label="Select all rows on this page"
                      class={`grid h-4 w-4 place-items-center border transition-colors ${
                        isAllPageSelected || isSomePageSelected
                          ? 'border-jam-text bg-jam-text text-jam-bg'
                          : 'border-jam-text/50 hover:border-jam-text'
                      }`}
                      onclick={(e) => { e.stopPropagation(); setPageRowsSelected(!isAllPageSelected); }}
                    >
                      {#if isAllPageSelected}
                        <Check size={11} strokeWidth={3.5} />
                      {:else if isSomePageSelected}
                        <Minus size={11} strokeWidth={3.5} />
                      {/if}
                    </button>
                  </span>
                {:else if original?.headerCell}
                  {@render original.headerCell({ column: original, sorted })}
                {:else if canSort}
                  <button
                    type="button"
                    class="group/sort inline-flex w-full items-center gap-2 leading-none text-jam-muted transition-colors hover:text-jam-text focus-visible:outline-none focus-visible:text-jam-text"
                    style={`justify-content: ${original?.align === 'right' || original?.numeric ? 'flex-end' : original?.align === 'center' ? 'center' : 'flex-start'};`}
                    onclick={header.column.getToggleSortingHandler()}
                  >
                    <span class="truncate">{header.column.columnDef.header as string}</span>
                    <span class="relative inline-flex h-3 w-2 shrink-0 flex-col items-center justify-between">
                      <ChevronUp
                        size={8}
                        strokeWidth={3.5}
                        class={sorted === 'asc' ? 'text-jam-text' : 'text-jam-text/25 group-hover/sort:text-jam-text/50'}
                      />
                      <ChevronDown
                        size={8}
                        strokeWidth={3.5}
                        class={sorted === 'desc' ? 'text-jam-text' : 'text-jam-text/25 group-hover/sort:text-jam-text/50'}
                      />
                    </span>
                  </button>
                {:else}
                  <span class="truncate">{header.column.columnDef.header as string}</span>
                {/if}
              </th>
            {/each}
          </tr>
        {/each}
      </thead>

      <tbody>
        {#if loading}
          {#each Array.from({ length: skeletonRows }) as _, i (i)}
            <tr class="border-b border-jam-text/10">
              {#each headerGroups[0]?.headers ?? [] as h, hi (h.id)}
                {@const isSel = isSelectionColumn(h.column.columnDef.meta)}
                <td class={`${cellPadByDensity[densityState]} ${bodyTextClass}`}>
                  {#if isSel}
                    <span class="mx-auto block h-4 w-4 animate-pulse bg-jam-text/15"></span>
                  {:else}
                    <span
                      class="block h-3 animate-pulse bg-jam-text/15"
                      style={`width: ${[40, 65, 80, 55, 70, 45, 85, 60][hi % 8]}%; animation-delay: ${i * 60}ms;`}
                    ></span>
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        {:else if pageRows.length === 0}
          <tr>
            <td colspan={headerGroups[0]?.headers.length ?? 1} class="px-6 py-16 text-center">
              {#if empty}
                {@render empty()}
              {:else}
                <div class="mx-auto flex max-w-sm flex-col items-center gap-3">
                  <div class="relative grid h-14 w-14 place-items-center border-2 border-dashed border-jam-text/30">
                    <Inbox size={22} strokeWidth={1.75} class="text-jam-soft/70" />
                  </div>
                  <div>
                    <div class="text-[11px] font-black uppercase tracking-[0.24em] text-jam-text">
                      [{emptyTitle}]
                    </div>
                    {#if emptyDescription}
                      <div class="mt-2 text-[10px] font-medium tracking-[0.1em] text-jam-soft/70">
                        {emptyDescription}
                      </div>
                    {/if}
                  </div>
                </div>
              {/if}
            </td>
          </tr>
        {:else}
          {#each pageRows as row, idx (resolveKey(row.original, idx))}
            {@const isSelected = !!rowSelection[row.id]}
            <tr
              data-selected={isSelected}
              class={`group/row relative border-b border-jam-text/10 transition-colors ${
                striped ? 'odd:bg-jam-text/[0.03]' : ''
              } ${
                isSelected
                  ? 'bg-jam-text/[0.10] shadow-[inset_3px_0_0_0_var(--color-jam-text)]'
                  : 'hover:bg-jam-text/[0.07] hover:shadow-[inset_3px_0_0_0_rgba(251,251,255,0.45)]'
              } ${onRowClick ? 'cursor-pointer' : ''}`}
              onclick={() => onRowClick?.(row.original, idx)}
            >
              {#each row.getVisibleCells() as cell (cell.id)}
                {@const original = getOriginalColumn(cell.column.columnDef.meta)}
                {@const isSelCol = isSelectionColumn(cell.column.columnDef.meta)}
                {@const value = cell.getValue()}
                <td
                  class={`${cellPadByDensity[densityState]} ${bodyTextClass} font-medium tracking-[0.05em] text-jam-text ${
                    alignClass(original?.align ?? (original?.numeric ? 'right' : 'left'))
                  } ${original?.numeric ? 'tabular-nums' : ''} ${original?.cellClass ?? ''} ${isSelCol ? 'w-[44px]' : ''}`.trim()}
                  style={cellWidthStyle(original)}
                >
                  {#if isSelCol}
                    <span class="flex items-center justify-center">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={isSelected}
                        aria-label="Select row"
                        class={`grid h-4 w-4 place-items-center border transition-colors ${
                          isSelected
                            ? 'border-jam-text bg-jam-text text-jam-bg'
                            : 'border-jam-text/40 hover:border-jam-text'
                        }`}
                        onclick={(e) => { e.stopPropagation(); setRowSelected(row.id, !isSelected); }}
                      >
                        {#if isSelected}
                          <Check size={11} strokeWidth={3.5} />
                        {/if}
                      </button>
                    </span>
                  {:else if original?.cell}
                    {@render original.cell({
                      value,
                      row: row.original,
                      rowIndex: idx,
                      column: original,
                      selected: isSelected
                    })}
                  {:else if value === null || value === undefined || value === ''}
                    <span class="text-jam-soft/40">—</span>
                  {:else}
                    {String(value)}
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  <!-- Footer / pagination -->
  {#if pageable}
    <footer class="flex flex-wrap items-center justify-between gap-3 border-t border-jam-text/15 bg-jam-bg px-4 py-2.5">
      <div class="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.16em] text-jam-soft/80">
        <span>
          {#if filteredRowCount === 0}
            <span class="text-jam-text">NO ROWS</span>
          {:else}
            <span class="text-jam-text">{String(rangeStart).padStart(3, '0')}–{String(rangeEnd).padStart(3, '0')}</span>
            <span class="mx-1.5 text-jam-soft/40">/</span>
            <span>{String(filteredRowCount).padStart(3, '0')}</span>
            {#if filteredRowCount !== totalRowCount}
              <span class="ml-1.5 text-jam-soft/40">({totalRowCount} total)</span>
            {/if}
          {/if}
        </span>

        <span class="hidden h-3 w-px bg-jam-text/20 sm:inline-block"></span>

        <label class="hidden items-center gap-2 sm:inline-flex">
          <span class="text-jam-soft/70">Rows</span>
          <span class="relative">
            <select
              value={pagination.pageSize}
              onchange={(e) => setPageSize(parseInt((e.currentTarget as HTMLSelectElement).value, 10))}
              class="h-7 cursor-pointer appearance-none border border-jam-text/30 bg-transparent pl-2 pr-6 text-[10px] font-black uppercase tracking-[0.18em] text-jam-text outline-none transition-colors hover:border-jam-text focus:border-jam-text focus:bg-jam-text focus:text-jam-bg"
            >
              {#each pageSizes as s (s)}
                <option value={s} class="bg-jam-bg text-jam-text">{s}</option>
              {/each}
            </select>
            <ChevronDown size={10} strokeWidth={3} class="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-jam-text" />
          </span>
        </label>
      </div>

      <div class="flex items-center gap-2">
        <input
          type="text"
          inputmode="numeric"
          placeholder={`PG ${pagination.pageIndex + 1}/${pageCount}`}
          bind:value={pageJumpValue}
          onkeydown={handlePageJump}
          class="hidden h-7 w-20 border border-jam-text/30 bg-transparent px-2 text-center text-[10px] font-black uppercase tracking-[0.16em] text-jam-text outline-none transition-colors placeholder:text-jam-soft/60 hover:border-jam-text focus:border-jam-text focus:bg-jam-text focus:text-jam-bg focus:placeholder:text-jam-bg/40 sm:block"
        />

        <div class="inline-flex divide-x divide-jam-text/25 border border-jam-text/30">
          <button type="button" aria-label="First page" class="inline-flex h-7 w-7 items-center justify-center text-jam-text transition-colors hover:bg-jam-text hover:text-jam-bg disabled:cursor-not-allowed disabled:bg-transparent disabled:text-jam-text/25 disabled:hover:bg-transparent disabled:hover:text-jam-text/25" disabled={!canPrev} onclick={() => gotoPage(0)}>
            <ChevronsLeft size={12} strokeWidth={2.75} />
          </button>
          <button type="button" aria-label="Previous page" class="inline-flex h-7 w-7 items-center justify-center text-jam-text transition-colors hover:bg-jam-text hover:text-jam-bg disabled:cursor-not-allowed disabled:bg-transparent disabled:text-jam-text/25 disabled:hover:bg-transparent disabled:hover:text-jam-text/25" disabled={!canPrev} onclick={() => table.previousPage()}>
            <ChevronLeft size={12} strokeWidth={2.75} />
          </button>
          <span class="inline-flex h-7 items-center justify-center px-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-text">
            {String(pagination.pageIndex + 1).padStart(2, '0')}<span class="mx-1 text-jam-soft/40">/</span>{String(pageCount).padStart(2, '0')}
          </span>
          <button type="button" aria-label="Next page" class="inline-flex h-7 w-7 items-center justify-center text-jam-text transition-colors hover:bg-jam-text hover:text-jam-bg disabled:cursor-not-allowed disabled:bg-transparent disabled:text-jam-text/25 disabled:hover:bg-transparent disabled:hover:text-jam-text/25" disabled={!canNext} onclick={() => table.nextPage()}>
            <ChevronRight size={12} strokeWidth={2.75} />
          </button>
          <button type="button" aria-label="Last page" class="inline-flex h-7 w-7 items-center justify-center text-jam-text transition-colors hover:bg-jam-text hover:text-jam-bg disabled:cursor-not-allowed disabled:bg-transparent disabled:text-jam-text/25 disabled:hover:bg-transparent disabled:hover:text-jam-text/25" disabled={!canNext} onclick={() => gotoPage(pageCount - 1)}>
            <ChevronsRight size={12} strokeWidth={2.75} />
          </button>
        </div>
      </div>
    </footer>
  {/if}
</div>
