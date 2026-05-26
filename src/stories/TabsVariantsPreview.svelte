<script lang="ts">
  import { TabGroup, TabList, TabTrigger, TabPanel } from '../lib';
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; background: var(--color-jam-bg); padding: 2rem; display: grid; gap: 2rem;"
>
  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Default</p>
    <TabGroup value="general">
      <TabList>
        <TabTrigger value="general">Geral</TabTrigger>
        <TabTrigger value="security">Seguranca</TabTrigger>
        <TabTrigger value="network">Rede</TabTrigger>
      </TabList>
      <TabPanel value="general">
        <p class="text-xs font-medium leading-relaxed text-jam-muted">Configuracoes gerais.</p>
      </TabPanel>
      <TabPanel value="security">
        <p class="text-xs font-medium leading-relaxed text-jam-muted">Gerencie senhas.</p>
      </TabPanel>
      <TabPanel value="network">
        <p class="text-xs font-medium leading-relaxed text-jam-muted">Configure proxies.</p>
      </TabPanel>
    </TabGroup>
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Line</p>
    <TabGroup value="general" variant="line">
      <TabList>
        <TabTrigger value="general">Geral</TabTrigger>
        <TabTrigger value="security">Seguranca</TabTrigger>
        <TabTrigger value="network">Rede</TabTrigger>
      </TabList>
      <TabPanel value="general">
        <p class="text-xs font-medium leading-relaxed text-jam-muted">Configuracoes gerais.</p>
      </TabPanel>
      <TabPanel value="security">
        <p class="text-xs font-medium leading-relaxed text-jam-muted">Gerencie senhas.</p>
      </TabPanel>
      <TabPanel value="network">
        <p class="text-xs font-medium leading-relaxed text-jam-muted">Configure proxies.</p>
      </TabPanel>
    </TabGroup>
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Small</p>
    <TabGroup value="general" size="sm">
      <TabList>
        <TabTrigger value="general">Geral</TabTrigger>
        <TabTrigger value="security">Seguranca</TabTrigger>
        <TabTrigger value="network">Rede</TabTrigger>
      </TabList>
      <TabPanel value="general">
        <p class="text-xs font-medium leading-relaxed text-jam-muted">Configuracoes gerais.</p>
      </TabPanel>
      <TabPanel value="security">
        <p class="text-xs font-medium leading-relaxed text-jam-muted">Gerencie senhas.</p>
      </TabPanel>
      <TabPanel value="network">
        <p class="text-xs font-medium leading-relaxed text-jam-muted">Configure proxies.</p>
      </TabPanel>
    </TabGroup>
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Vertical</p>
    <TabGroup value="general" orientation="vertical">
      <TabList>
        <TabTrigger value="general">Geral</TabTrigger>
        <TabTrigger value="security">Seguranca</TabTrigger>
        <TabTrigger value="network">Rede</TabTrigger>
      </TabList>
      <TabPanel value="general">
        <p class="text-xs font-medium leading-relaxed text-jam-muted">Configuracoes gerais.</p>
      </TabPanel>
      <TabPanel value="security">
        <p class="text-xs font-medium leading-relaxed text-jam-muted">Gerencie senhas.</p>
      </TabPanel>
      <TabPanel value="network">
        <p class="text-xs font-medium leading-relaxed text-jam-muted">Configure proxies.</p>
      </TabPanel>
    </TabGroup>
  </div>
</div>
