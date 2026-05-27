<script lang="ts">
  import Sidebar from './Sidebar.svelte';
  import SidebarProvider from './SidebarProvider.svelte';
  import SidebarTrigger from './SidebarTrigger.svelte';
  import SidebarRail from './SidebarRail.svelte';
  import SidebarInset from './SidebarInset.svelte';
  import SidebarHeader from './SidebarHeader.svelte';
  import SidebarContent from './SidebarContent.svelte';
  import SidebarFooter from './SidebarFooter.svelte';
  import SidebarGroup from './SidebarGroup.svelte';
  import SidebarGroupLabel from './SidebarGroupLabel.svelte';
  import SidebarGroupContent from './SidebarGroupContent.svelte';
  import SidebarMenu from './SidebarMenu.svelte';
  import SidebarMenuItem from './SidebarMenuItem.svelte';
  import SidebarMenuButton from './SidebarMenuButton.svelte';
  import SidebarMenuSub from './SidebarMenuSub.svelte';
  import SidebarMenuSubItem from './SidebarMenuSubItem.svelte';
  import SidebarMenuSubButton from './SidebarMenuSubButton.svelte';
  import SidebarSeparator from './SidebarSeparator.svelte';
  import type {
    SidebarCollapsible,
    SidebarSide,
    SidebarVariant
  } from './sidebar';

  type Props = {
    side?: SidebarSide;
    variant?: SidebarVariant;
    collapsible?: SidebarCollapsible;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    openMobile?: boolean;
    onOpenMobileChange?: (open: boolean) => void;
    activeId?: string;
    persistKey?: string;
    renderSubmenu?: boolean;
    renderFooter?: boolean;
  };

  let {
    side = 'left',
    variant = 'sidebar',
    collapsible = 'icon',
    open,
    defaultOpen = true,
    onOpenChange,
    openMobile,
    onOpenMobileChange,
    activeId = 'inbox',
    persistKey,
    renderSubmenu = true,
    renderFooter = true
  }: Props = $props();
</script>

<SidebarProvider
  {open}
  {defaultOpen}
  {onOpenChange}
  {openMobile}
  {onOpenMobileChange}
  {persistKey}
>
  <Sidebar {side} {variant} {collapsible} aria-label="Primary navigation">
    <SidebarHeader>
      <div data-testid="sidebar-header-content">Header</div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton active={activeId === 'dashboard'}>
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton active={activeId === 'inbox'} shortcut="⌘ I">
                Inbox
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                Disabled item
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/projects" active={activeId === 'projects'}>
                Projects
              </SidebarMenuButton>
              {#if renderSubmenu}
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton active={activeId === 'projects/active'}>
                      Active
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
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarSeparator />
    </SidebarContent>
    {#if renderFooter}
      <SidebarFooter>
        <div data-testid="sidebar-footer-content">Footer</div>
      </SidebarFooter>
    {/if}
    <SidebarRail />
  </Sidebar>

  <SidebarInset>
    <SidebarTrigger />
    <main data-testid="inset-main">Content</main>
  </SidebarInset>
</SidebarProvider>
