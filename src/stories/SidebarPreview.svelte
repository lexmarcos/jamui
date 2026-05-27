<script lang="ts">
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    Badge
  } from '../lib';
  import type {
    SidebarCollapsible,
    SidebarSide,
    SidebarVariant
  } from '../lib/components/sidebar';
  import {
    LayoutDashboard,
    Inbox,
    Folder,
    BarChart3,
    Settings,
    LogOut,
    Search,
    Bell,
    User,
    ChevronDown,
    Activity,
    Database,
    Cpu,
    Cloud,
    Plug,
    KeyRound,
    Users,
    LifeBuoy
  } from '@lucide/svelte';

  type Props = {
    side?: SidebarSide;
    variant?: SidebarVariant;
    collapsible?: SidebarCollapsible;
    defaultOpen?: boolean;
    showSubmenu?: boolean;
    showFooter?: boolean;
    sample?: 'compact' | 'full' | 'minimal';
  };

  let {
    side = 'left',
    variant = 'sidebar',
    collapsible = 'icon',
    defaultOpen = true,
    showSubmenu = true,
    showFooter = true,
    sample = 'full'
  }: Props = $props();

  let activePath = $state('dashboard');
  let pipelineOpen = $state(true);

  const isFull = $derived(sample === 'full');
  const isMinimal = $derived(sample === 'minimal');
</script>

<div
  class="jamui-root"
  style="min-height: 100vh; width: 100%; min-width: 880px; background: var(--color-jam-bg);"
>
  <SidebarProvider {defaultOpen}>
    <Sidebar {side} {variant} {collapsible}>
      <SidebarHeader>
        <div class="flex items-center justify-between gap-2 px-1">
          <div class="flex items-center gap-2">
            <span
              class="grid h-8 w-8 place-items-center border border-jam-text/40 bg-jam-text text-[10px] font-black uppercase tracking-tight text-jam-bg"
              aria-hidden="true"
            >
              JM
            </span>
            <div class="flex min-w-0 flex-col leading-tight group-data-[icon-only=true]/jam-sidebar:hidden">
              <span class="truncate text-xs font-black uppercase tracking-[0.2em] text-jam-text">JamUI</span>
              <span class="truncate text-[10px] font-medium tracking-[0.12em] text-jam-soft/70">control plane</span>
            </div>
          </div>
          <SidebarTrigger class="group-data-[icon-only=true]/jam-sidebar:hidden" />
        </div>
        {#if !isMinimal}
          <label class="relative mt-1 flex items-center group-data-[icon-only=true]/jam-sidebar:hidden">
            <Search size={12} strokeWidth={2.5} class="pointer-events-none absolute left-2.5 text-jam-bg/40" />
            <input
              type="text"
              placeholder="Search…"
              class="h-8 w-full rounded-none border border-jam-bg/35 bg-jam-text pl-7 pr-10 text-[11px] font-bold font-jam-mono tracking-[0.06em] text-jam-bg outline-none placeholder:text-jam-bg/35 focus:border-jam-bg focus:shadow-[3px_3px_0_var(--color-jam-bg)]"
            />
            <span
              class="absolute right-1.5 border border-jam-bg/30 px-1 py-px text-[9px] font-black uppercase tracking-[0.12em] text-jam-bg/60"
              aria-hidden="true"
            >
              ⌘K
            </span>
          </label>
        {/if}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  active={activePath === 'dashboard'}
                  shortcut="⌘ 1"
                  onclick={() => (activePath = 'dashboard')}
                  icon={dashboardIcon}
                >
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  active={activePath === 'inbox'}
                  shortcut="⌘ 2"
                  badge={inboxBadge}
                  onclick={() => (activePath = 'inbox')}
                  icon={inboxIcon}
                >
                  Inbox
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  active={activePath === 'projects'}
                  shortcut="⌘ 3"
                  onclick={() => (activePath = 'projects')}
                  icon={folderIcon}
                  hasSub={isFull && showSubmenu}
                  aria-expanded={pipelineOpen}
                >
                  Projects
                </SidebarMenuButton>
                {#if isFull && showSubmenu && pipelineOpen}
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        active={activePath === 'projects/active'}
                        onclick={() => (activePath = 'projects/active')}
                      >
                        Active
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        active={activePath === 'projects/archived'}
                        onclick={() => (activePath = 'projects/archived')}
                      >
                        Archived
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton disabled>
                        Drafts
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                {/if}
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  active={activePath === 'analytics'}
                  shortcut="⌘ 4"
                  onclick={() => (activePath = 'analytics')}
                  icon={analyticsIcon}
                >
                  Analytics
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {#if isFull}
          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Infra</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    active={activePath === 'services'}
                    onclick={() => (activePath = 'services')}
                    icon={cpuIcon}
                    badge={liveBadge}
                  >
                    Services
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    active={activePath === 'database'}
                    onclick={() => (activePath = 'database')}
                    icon={databaseIcon}
                  >
                    Database
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    active={activePath === 'storage'}
                    onclick={() => (activePath = 'storage')}
                    icon={cloudIcon}
                  >
                    Storage
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled icon={plugIcon}>
                    Integrations
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    active={activePath === 'team'}
                    onclick={() => (activePath = 'team')}
                    icon={usersIcon}
                  >
                    Team
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    active={activePath === 'access'}
                    onclick={() => (activePath = 'access')}
                    icon={keyIcon}
                  >
                    Access keys
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    active={activePath === 'settings'}
                    onclick={() => (activePath = 'settings')}
                    icon={settingsIcon}
                  >
                    Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        {/if}
      </SidebarContent>

      {#if showFooter}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={lifebuoyIcon}>Help &amp; docs</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={userIcon} badge={proBadge}>
                <span class="flex min-w-0 flex-col leading-tight">
                  <span class="truncate text-xs">marcos.s</span>
                  <span class="truncate text-[10px] font-medium tracking-[0.1em] text-jam-soft/70">admin@jamui</span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={logoutIcon}>Sign out</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      {/if}

      <SidebarRail />
    </Sidebar>

    <SidebarInset>
      <header
        class="flex h-12 shrink-0 items-center gap-3 border-b border-jam-text/15 bg-jam-surface px-4 py-2"
      >
        {#if side === 'left'}
          <SidebarTrigger />
          <span class="h-3 w-px bg-jam-text/20"></span>
        {/if}
        <nav
          aria-label="Breadcrumb"
          class="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-jam-soft/70"
        >
          <span class="text-jam-soft/50">JamUI</span>
          <span class="text-jam-soft/30">/</span>
          <span class="text-jam-text">{activePath.toUpperCase()}</span>
        </nav>
        <div class="ml-auto flex items-center gap-2">
          <button
            type="button"
            class="grid h-8 w-8 place-items-center border border-jam-text/25 text-jam-soft transition-colors hover:border-jam-text hover:bg-jam-text hover:text-jam-bg"
            aria-label="Notifications"
          >
            <Bell size={12} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            class="inline-flex h-8 items-center gap-1.5 border border-jam-text/30 px-2.5 text-[10px] font-black uppercase tracking-[0.16em] text-jam-text transition-colors hover:bg-jam-text hover:text-jam-bg"
          >
            <Activity size={11} strokeWidth={2.5} />
            Live
          </button>
        </div>
        {#if side === 'right'}
          <span class="h-3 w-px bg-jam-text/20"></span>
          <SidebarTrigger />
        {/if}
      </header>
      <div class="flex-1 overflow-auto p-5">
        <h1 class="text-2xl font-black uppercase tracking-[0.16em] text-jam-text">{activePath.replace('/', ' / ').toUpperCase()}</h1>
        <p class="mt-2 max-w-prose text-xs font-medium tracking-[0.06em] text-jam-soft/80">
          Click any menu item to mark it active. Toggle the sidebar with the trigger button or
          <span class="border border-jam-text/30 px-1 py-px font-black tracking-[0.12em]">⌘ B</span>.
        </p>

        <section class="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          {#each [
            { label: 'BUILDS', value: '128' },
            { label: 'ACTIVE', value: '12' },
            { label: 'INCIDENTS', value: '00' }
          ] as cell (cell.label)}
            <article class="border border-jam-text/25 bg-jam-surface p-4 shadow-jam-hard-sm">
              <div class="text-[10px] font-black uppercase tracking-[0.22em] text-jam-soft/70">{cell.label}</div>
              <div class="mt-2 text-3xl font-black tracking-tight text-jam-text tabular-nums">{cell.value}</div>
              <div class="mt-3 h-1.5 w-full bg-jam-text/10">
                <div class="h-full w-2/3 bg-jam-text"></div>
              </div>
            </article>
          {/each}
        </section>
      </div>
    </SidebarInset>
  </SidebarProvider>
</div>

{#snippet dashboardIcon()}
  <LayoutDashboard size={14} strokeWidth={2} />
{/snippet}
{#snippet inboxIcon()}
  <Inbox size={14} strokeWidth={2} />
{/snippet}
{#snippet folderIcon()}
  <Folder size={14} strokeWidth={2} />
{/snippet}
{#snippet analyticsIcon()}
  <BarChart3 size={14} strokeWidth={2} />
{/snippet}
{#snippet settingsIcon()}
  <Settings size={14} strokeWidth={2} />
{/snippet}
{#snippet logoutIcon()}
  <LogOut size={14} strokeWidth={2} />
{/snippet}
{#snippet userIcon()}
  <User size={14} strokeWidth={2} />
{/snippet}
{#snippet cpuIcon()}
  <Cpu size={14} strokeWidth={2} />
{/snippet}
{#snippet databaseIcon()}
  <Database size={14} strokeWidth={2} />
{/snippet}
{#snippet cloudIcon()}
  <Cloud size={14} strokeWidth={2} />
{/snippet}
{#snippet plugIcon()}
  <Plug size={14} strokeWidth={2} />
{/snippet}
{#snippet usersIcon()}
  <Users size={14} strokeWidth={2} />
{/snippet}
{#snippet keyIcon()}
  <KeyRound size={14} strokeWidth={2} />
{/snippet}
{#snippet lifebuoyIcon()}
  <LifeBuoy size={14} strokeWidth={2} />
{/snippet}

{#snippet inboxBadge()}
  <Badge size="sm" style="filled" variant="danger">12</Badge>
{/snippet}
{#snippet liveBadge()}
  <span class="inline-flex items-center gap-1 border border-[#22c55e]/40 bg-[#22c55e]/15 px-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#22c55e]">
    <span class="block h-1 w-1 bg-[#22c55e]"></span>
    UP
  </span>
{/snippet}
{#snippet proBadge()}
  <span class="border border-jam-text/30 px-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-jam-soft/80">PRO</span>
{/snippet}
