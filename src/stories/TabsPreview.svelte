<script lang="ts">
  import { TabGroup, TabList, TabTrigger, TabPanel } from '../lib';
  import type { TabOrientation, TabSize, TabVariant } from '../lib/components/tab';

  type TabsPreviewProps = {
    orientation?: TabOrientation;
    size?: TabSize;
    value?: string;
    variant?: TabVariant;
  };

  let {
    orientation = 'horizontal',
    size = 'md',
    value = $bindable('general'),
    variant = 'default'
  }: TabsPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <TabGroup {orientation} {size} bind:value {variant}>
    <TabList>
      <TabTrigger value="general">Geral</TabTrigger>
      <TabTrigger value="security">Seguranca</TabTrigger>
      <TabTrigger value="network">Rede</TabTrigger>
    </TabList>

    <TabPanel value="general">
      <p class="text-xs font-medium leading-relaxed text-jam-muted">
        Configuracoes gerais do sistema. Ajuste preferencias, idioma e tema.
      </p>
    </TabPanel>

    <TabPanel value="security">
      <p class="text-xs font-medium leading-relaxed text-jam-muted">
        Gerencie senhas, autenticacao de dois fatores e chaves de API.
      </p>
    </TabPanel>

    <TabPanel value="network">
      <p class="text-xs font-medium leading-relaxed text-jam-muted">
        Configure proxies, DNS e regras de firewall.
      </p>
    </TabPanel>
  </TabGroup>
</div>
