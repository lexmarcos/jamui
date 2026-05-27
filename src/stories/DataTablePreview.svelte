<script lang="ts" module>
  export type Build = {
    id: string;
    branch: string;
    commit: string;
    author: string;
    status: 'PASSED' | 'FAILED' | 'RUNNING' | 'QUEUED' | 'CANCELLED';
    coverage: number;
    duration: number; // seconds
    triggeredAt: string;
    region: 'us-east-1' | 'us-west-2' | 'eu-west-1' | 'sa-east-1';
  };
</script>

<script lang="ts">
  import { DataTable } from '../lib';
  import type { DataTableDensity, DataTableSize } from '../lib/components/data-table';
  import { Activity, Download, Play, RefreshCw, RotateCcw, Hash, GitBranch } from '@lucide/svelte';

  type Props = {
    data?: Build[];
    density?: DataTableDensity;
    size?: DataTableSize;
    striped?: boolean;
    selectable?: boolean;
    sortable?: boolean;
    pageable?: boolean;
    pageSize?: number;
    filterable?: boolean;
    showColumnVisibility?: boolean;
    showDensityToggle?: boolean;
    stickyHeader?: boolean;
    maxHeight?: string;
    loading?: boolean;
    title?: string;
    description?: string;
  };

  let {
    data = sampleBuilds(),
    density = 'comfortable',
    size = 'md',
    striped = false,
    selectable = true,
    sortable = true,
    pageable = true,
    pageSize = 8,
    filterable = true,
    showColumnVisibility = true,
    showDensityToggle = true,
    stickyHeader = true,
    maxHeight,
    loading = false,
    title = 'CI / Build Pipeline',
    description = 'Recent builds from the past 14 days. Filter, sort, and inspect runs across all regions.'
  }: Props = $props();

  let selectedRows = $state<Build[]>([]);
  let lastAction = $state('READY / Select rows, sort columns, or run a row action.');

  const statusCounts = $derived.by(() => {
    const counts: Record<Build['status'], number> = {
      PASSED: 0,
      FAILED: 0,
      RUNNING: 0,
      QUEUED: 0,
      CANCELLED: 0
    };
    for (const build of data) counts[build.status]++;
    return counts;
  });

  const activeCount = $derived(statusCounts.RUNNING + statusCounts.QUEUED);
  const issueCount = $derived(statusCounts.FAILED + statusCounts.CANCELLED);
  const avgCoverage = $derived(
    data.length === 0
      ? 0
      : Math.round(data.reduce((sum, build) => sum + build.coverage, 0) / data.length)
  );
  const regionCount = $derived(new Set(data.map((build) => build.region)).size);
  const resolvedMaxHeight = $derived(maxHeight ?? 'min(62vh, 640px)');
  const selectedLabel = $derived.by(() => {
    if (selectedRows.length === 0) return 'NONE';
    const ids = selectedRows.slice(0, 4).map((row) => row.id).join(', ');
    return selectedRows.length > 4 ? `${ids} +${selectedRows.length - 4}` : ids;
  });

  function sampleBuilds(): Build[] {
    const branches = ['main', 'release/v4.3', 'feat/auth-rewrite', 'feat/data-table', 'fix/router-edge', 'chore/deps', 'feat/billing-portal', 'hotfix/payments'];
    const authors  = ['ana.l', 'kenji.t', 'mira.s', 'gabe.w', 'priya.r', 'dan.k', 'sven.h', 'wren.f'];
    const commits = ['8f42ac1', '2bd8e91', 'c76a004', '4fa90bd', 'd19c85a', 'a31f672', 'ee6041c', '91db3f0'];
    const regions: Build['region'][] = ['us-east-1', 'us-west-2', 'eu-west-1', 'sa-east-1'];
    const statuses: Build['status'][] = ['PASSED', 'PASSED', 'PASSED', 'FAILED', 'RUNNING', 'QUEUED', 'CANCELLED'];
    const out: Build[] = [];
    for (let i = 0; i < 42; i++) {
      const status = statuses[(i * 3 + 1) % statuses.length];
      out.push({
        id: `B-${String(8421 - i).padStart(5, '0')}`,
        branch: branches[i % branches.length],
        commit: commits[(i * 5 + 2) % commits.length],
        author: authors[i % authors.length],
        status,
        coverage: status === 'FAILED' ? 41 + (i % 32) : 76 + (i % 22),
        duration: status === 'QUEUED' ? 0 : 30 + ((i * 17) % 540),
        triggeredAt: relative(i),
        region: regions[i % regions.length]
      });
    }
    return out;
  }

  function relative(i: number): string {
    const ago = i * 23 + 4;
    if (ago < 60) return `${ago}m ago`;
    if (ago < 60 * 24) return `${Math.floor(ago / 60)}h ago`;
    return `${Math.floor(ago / (60 * 24))}d ago`;
  }

  function fmtDuration(s: number): string {
    if (s === 0) return '—';
    const m = Math.floor(s / 60);
    const sec = s % 60;
    if (m === 0) return `${sec}s`;
    return `${m}m ${String(sec).padStart(2, '0')}s`;
  }

  function onRowClick(b: Build) {
    setAction(`OPENED ${b.id} / ${b.branch}`);
  }

  function onSelectionChange(rows: Build[]) {
    const previous = selectedRows.map((row) => row.id).join('|');
    const next = rows.map((row) => row.id).join('|');
    selectedRows = rows;
    if (previous !== next) {
      setAction(rows.length > 0 ? `SELECTED ${rows.length} ROW${rows.length === 1 ? '' : 'S'} / ${rows.map((row) => row.id).join(', ')}` : 'SELECTION CLEARED');
    }
  }

  function setAction(message: string) {
    lastAction = `${new Date().toLocaleTimeString('en-US', { hour12: false })} / ${message}`;
  }
</script>

<section class="jamui-root data-table-stage">
  <div class="data-table-shell">
    <header class="story-header">
      <div class="story-title">
        <div class="story-kicker">JAMUI / GRID OPS</div>
        <h2>BUILD QUEUE MONITOR</h2>
        <p>{description}</p>
      </div>

      <div class="story-summary" aria-label="Build summary">
        <div class="story-metric">
          <span>RUNS</span>
          <strong>{String(data.length).padStart(3, '0')}</strong>
        </div>
        <div class="story-metric">
          <span>ACTIVE</span>
          <strong>{String(activeCount).padStart(2, '0')}</strong>
        </div>
        <div class="story-metric" data-hot={issueCount > 0}>
          <span>ISSUES</span>
          <strong>{String(issueCount).padStart(2, '0')}</strong>
        </div>
        <div class="story-metric">
          <span>COV</span>
          <strong>{avgCoverage}%</strong>
        </div>
        <div class="story-metric">
          <span>REGIONS</span>
          <strong>{regionCount}</strong>
        </div>
      </div>
    </header>

    <div class="story-activity" aria-live="polite">
      <div>
        <span>SELECTED</span>
        <strong>{String(selectedRows.length).padStart(2, '0')}</strong>
      </div>
      <p>{selectedLabel}</p>
      <p>{lastAction}</p>
    </div>

    <DataTable
      {data}
      {density}
      {size}
      {striped}
      {selectable}
      {sortable}
      {pageable}
      {pageSize}
      {filterable}
      {showColumnVisibility}
      {showDensityToggle}
      {stickyHeader}
      maxHeight={resolvedMaxHeight}
      {loading}
      {title}
      {description}
      {onRowClick}
      {onSelectionChange}
      toolbar={tableToolbar}
      titleAside={titleAside}
      rowKey={(row) => row.id}
      searchPlaceholder="Filter by branch, author, commit…"
      columns={[
        {
          id: 'id',
          accessor: 'id',
          header: 'Build',
          width: '110px',
          cell: idCell
        },
        {
          id: 'branch',
          accessor: 'branch',
          header: 'Branch',
          minWidth: '180px',
          cell: branchCell
        },
        {
          id: 'commit',
          accessor: 'commit',
          header: 'Commit',
          width: '112px',
          cell: commitCell
        },
        {
          id: 'author',
          accessor: 'author',
          header: 'Author',
          width: '124px',
          cell: authorCell
        },
        {
          id: 'status',
          accessor: 'status',
          header: 'Status',
          width: '144px',
          cell: statusCell
        },
        {
          id: 'coverage',
          accessor: 'coverage',
          header: 'Coverage',
          width: '164px',
          numeric: true,
          cell: coverageCell
        },
        {
          id: 'duration',
          accessor: (row) => row.duration,
          header: 'Duration',
          width: '112px',
          numeric: true,
          cell: durationCell
        },
        {
          id: 'region',
          accessor: 'region',
          header: 'Region',
          width: '124px',
          cell: regionCell
        },
        {
          id: 'triggeredAt',
          accessor: 'triggeredAt',
          header: 'Triggered',
          width: '124px',
          align: 'right'
        },
        {
          id: '__actions',
          header: '',
          enableSorting: false,
          enableHiding: false,
          enableGlobalFilter: false,
          align: 'right',
          width: '96px',
          cell: actionCell
        }
      ]}
    />
  </div>
</section>

{#snippet titleAside()}
  <span class="inline-flex items-center gap-1.5 border border-jam-text/30 bg-jam-text px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-jam-bg">
    <Activity size={11} strokeWidth={3} />
    {String(activeCount).padStart(2, '0')} Live
  </span>
  <span class={`inline-flex items-center border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] ${
    issueCount > 0
      ? 'border-jam-danger/50 bg-jam-danger/15 text-jam-text'
      : 'border-jam-text/25 bg-jam-text/10 text-jam-muted'
  }`}>
    {String(issueCount).padStart(2, '0')} Blocked
  </span>
{/snippet}

{#snippet tableToolbar()}
  <button
    type="button"
    class="inline-flex h-8 items-center gap-1.5 border border-jam-text/30 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted transition-colors hover:bg-jam-text hover:text-jam-bg"
    onclick={() => setAction(`SYNC REQUESTED / ${data.length} BUILDS`)}
  >
    <RefreshCw size={12} strokeWidth={2.75} />
    Sync
  </button>
  <button
    type="button"
    class="inline-flex h-8 items-center gap-1.5 border border-jam-text/30 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted transition-colors hover:bg-jam-text hover:text-jam-bg"
    onclick={() => setAction(`CSV EXPORT / ${selectedRows.length || data.length} ROW${(selectedRows.length || data.length) === 1 ? '' : 'S'}`)}
  >
    <Download size={12} strokeWidth={2.75} />
    CSV
  </button>
{/snippet}

{#snippet idCell({ value }: { value: unknown })}
  <span class="font-black tracking-[0.06em] text-jam-text">{String(value)}</span>
{/snippet}

{#snippet branchCell({ value }: { value: unknown })}
  <span class="inline-flex items-center gap-2">
    <GitBranch size={12} strokeWidth={2.5} class="shrink-0 text-jam-soft/70" />
    <span class="truncate font-bold tracking-[0.04em] text-jam-text">{String(value)}</span>
  </span>
{/snippet}

{#snippet commitCell({ value }: { value: unknown })}
  <span class="inline-flex items-center gap-1.5 border border-jam-text/20 bg-jam-text/[0.06] px-1.5 py-0.5 text-[10px] font-black tracking-[0.1em] text-jam-soft">
    <Hash size={9} strokeWidth={3} class="text-jam-soft/60" />
    {String(value)}
  </span>
{/snippet}

{#snippet authorCell({ value }: { value: unknown })}
  <span class="inline-flex items-center gap-2">
    <span class="grid h-5 w-5 place-items-center border border-jam-text/30 bg-jam-surface text-[8px] font-black uppercase tracking-tight text-jam-text">
      {String(value).slice(0, 2)}
    </span>
    <span class="text-jam-soft">{String(value)}</span>
  </span>
{/snippet}

{#snippet statusCell({ value }: { value: unknown })}
  {@const status = value as Build['status']}
  {@const color =
    status === 'PASSED' ? 'text-[#22c55e] border-[#22c55e]/40 bg-[#22c55e]/10' :
    status === 'FAILED' ? 'text-jam-danger border-jam-danger/40 bg-jam-danger/10' :
    status === 'RUNNING' ? 'text-jam-text border-jam-text/40 bg-jam-text/10' :
    status === 'QUEUED' ? 'text-jam-soft border-jam-soft/30 bg-jam-soft/10' :
    'text-jam-muted/70 border-jam-muted/30 bg-jam-muted/5'}
  <span class={`inline-flex items-center gap-1.5 border px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.18em] ${color}`}>
    <span
      class="block h-1.5 w-1.5 shrink-0"
      class:bg-[#22c55e]={status === 'PASSED'}
      class:bg-jam-danger={status === 'FAILED'}
      class:bg-jam-text={status === 'RUNNING'}
      class:bg-jam-soft={status === 'QUEUED'}
      class:bg-jam-muted={status === 'CANCELLED'}
      style={status === 'RUNNING' ? 'animation: jam-pulse 1.4s ease-in-out infinite;' : ''}
    ></span>
    {status}
  </span>
{/snippet}

{#snippet coverageCell({ value }: { value: unknown })}
  {@const n = Number(value)}
  {@const color = n >= 80 ? 'bg-[#22c55e]' : n >= 60 ? 'bg-[#f59e0b]' : 'bg-jam-danger'}
  <span class="inline-flex w-full items-center justify-end gap-2.5 tabular-nums">
    <span class="relative block h-1.5 w-20 bg-jam-text/10">
      <span class={`absolute inset-y-0 left-0 ${color}`} style={`width: ${Math.min(100, Math.max(0, n))}%;`}></span>
    </span>
    <span class="w-9 text-right font-black text-jam-text">{n}%</span>
  </span>
{/snippet}

{#snippet durationCell({ value }: { value: unknown })}
  <span class="font-bold tabular-nums text-jam-text">{fmtDuration(Number(value))}</span>
{/snippet}

{#snippet regionCell({ value }: { value: unknown })}
  <span class="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-jam-soft">
    <span class="h-1 w-1 bg-jam-soft/70"></span>
    {String(value)}
  </span>
{/snippet}

{#snippet actionCell({ row }: { row: Build })}
  <span class="flex justify-end gap-1">
    {#if row.status === 'FAILED' || row.status === 'CANCELLED'}
      <button
        type="button"
        class="inline-flex h-6 items-center gap-1 border border-jam-text/30 px-2 text-[9px] font-black uppercase tracking-[0.16em] text-jam-muted transition-colors hover:border-jam-text hover:bg-jam-text hover:text-jam-bg"
        onclick={(e) => { e.stopPropagation(); setAction(`RETRY QUEUED / ${row.id}`); }}
      >
        <RotateCcw size={9} strokeWidth={3} />
        Retry
      </button>
    {:else if row.status === 'PASSED'}
      <button
        type="button"
        class="inline-flex h-6 items-center gap-1 border border-jam-text/30 px-2 text-[9px] font-black uppercase tracking-[0.16em] text-jam-muted transition-colors hover:border-jam-text hover:bg-jam-text hover:text-jam-bg"
        onclick={(e) => { e.stopPropagation(); setAction(`DEPLOY REQUESTED / ${row.id}`); }}
      >
        <Play size={9} strokeWidth={3} />
        Deploy
      </button>
    {/if}
  </span>
{/snippet}

<style>
  .data-table-stage {
    position: relative;
    min-height: 100vh;
    width: 100%;
    overflow: auto;
    padding: clamp(1rem, 2vw, 2rem);
    background:
      linear-gradient(color-mix(in srgb, var(--color-jam-text) 5%, transparent) 1px, transparent 1px),
      linear-gradient(90deg, color-mix(in srgb, var(--color-jam-text) 5%, transparent) 1px, transparent 1px),
      var(--color-jam-bg);
    background-size: 24px 24px, 24px 24px, auto;
  }

  .data-table-shell {
    position: relative;
    display: grid;
    width: min(100%, 1360px);
    margin: 0 auto;
    gap: 1rem;
  }

  .story-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(34rem, 0.85fr);
    gap: 1rem;
    align-items: stretch;
    border: 1px solid color-mix(in srgb, var(--color-jam-text) 28%, transparent);
    background: color-mix(in srgb, var(--color-jam-surface) 88%, var(--color-jam-bg));
    box-shadow: var(--shadow-jam-hard-md);
  }

  .story-title {
    min-width: 0;
    padding: 1rem 1.125rem;
    border-right: 1px solid color-mix(in srgb, var(--color-jam-text) 16%, transparent);
  }

  .story-kicker {
    color: var(--color-jam-soft);
    font-size: 0.625rem;
    font-weight: 900;
    letter-spacing: 0.2em;
  }

  .story-title h2 {
    margin: 0.375rem 0 0;
    color: var(--color-jam-text);
    font-size: clamp(1rem, 1.8vw, 1.45rem);
    font-weight: 900;
    letter-spacing: 0.08em;
    line-height: 1.1;
  }

  .story-title p {
    max-width: 64rem;
    margin: 0.625rem 0 0;
    color: color-mix(in srgb, var(--color-jam-muted) 86%, transparent);
    font-size: 0.6875rem;
    font-weight: 650;
    letter-spacing: 0.06em;
    line-height: 1.55;
  }

  .story-summary {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    min-width: 0;
  }

  .story-metric {
    display: grid;
    min-width: 0;
    align-content: center;
    gap: 0.35rem;
    padding: 0.875rem;
    border-left: 1px solid color-mix(in srgb, var(--color-jam-text) 12%, transparent);
    background: color-mix(in srgb, var(--color-jam-input) 68%, var(--color-jam-surface));
  }

  .story-metric span {
    color: color-mix(in srgb, var(--color-jam-soft) 78%, transparent);
    font-size: 0.5625rem;
    font-weight: 900;
    letter-spacing: 0.18em;
  }

  .story-metric strong {
    color: var(--color-jam-text);
    font-size: clamp(1rem, 1.65vw, 1.375rem);
    font-weight: 900;
    letter-spacing: 0.04em;
    line-height: 1;
    white-space: nowrap;
  }

  .story-metric[data-hot='true'] strong {
    color: var(--color-jam-danger);
  }

  .story-activity {
    display: grid;
    grid-template-columns: auto minmax(12rem, 0.72fr) minmax(16rem, 1fr);
    align-items: center;
    min-width: 0;
    border: 1px solid color-mix(in srgb, var(--color-jam-text) 24%, transparent);
    background: color-mix(in srgb, var(--color-jam-input) 78%, var(--color-jam-surface));
    box-shadow: var(--shadow-jam-hard-sm);
  }

  .story-activity > * {
    min-width: 0;
    margin: 0;
    padding: 0.625rem 0.875rem;
    border-left: 1px solid color-mix(in srgb, var(--color-jam-text) 12%, transparent);
  }

  .story-activity > *:first-child {
    border-left: 0;
  }

  .story-activity div {
    display: inline-flex;
    align-items: baseline;
    gap: 0.625rem;
  }

  .story-activity span,
  .story-activity p {
    color: color-mix(in srgb, var(--color-jam-soft) 82%, transparent);
    font-size: 0.625rem;
    font-weight: 900;
    letter-spacing: 0.16em;
    line-height: 1.35;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .story-activity strong {
    color: var(--color-jam-text);
    font-size: 0.8125rem;
    font-weight: 900;
    letter-spacing: 0.12em;
  }

  @keyframes jam-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }

  @media (max-width: 1100px) {
    .story-header {
      grid-template-columns: 1fr;
    }

    .story-title {
      border-right: 0;
      border-bottom: 1px solid color-mix(in srgb, var(--color-jam-text) 16%, transparent);
    }

    .story-summary {
      grid-template-columns: repeat(5, minmax(5rem, 1fr));
      overflow-x: auto;
    }

    .story-activity {
      grid-template-columns: auto minmax(0, 1fr);
    }

    .story-activity > p:last-child {
      grid-column: 1 / -1;
      border-top: 1px solid color-mix(in srgb, var(--color-jam-text) 12%, transparent);
      border-left: 0;
    }
  }

  @media (max-width: 640px) {
    .data-table-stage {
      padding: 0.875rem;
    }

    .story-summary {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      overflow-x: visible;
    }

    .story-metric {
      border-top: 1px solid color-mix(in srgb, var(--color-jam-text) 12%, transparent);
    }

    .story-activity {
      grid-template-columns: 1fr;
    }

    .story-activity > * {
      border-left: 0;
      border-top: 1px solid color-mix(in srgb, var(--color-jam-text) 12%, transparent);
    }

    .story-activity > *:first-child {
      border-top: 0;
    }
  }
</style>
