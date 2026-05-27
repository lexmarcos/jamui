<script lang="ts">
  import { Drawer, DrawerHeader, DrawerContent, DrawerFooter, DrawerClose, Button, Badge } from '../lib';
  import type { DrawerPosition, DrawerTriggerProps } from '../lib/components/drawer';

  type DrawerPreviewProps = {
    open?: boolean;
    position?: DrawerPosition;
  };

  let {
    open = false,
    position = 'right'
  }: DrawerPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; min-height: 20rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Drawer bind:open {position} aria-label="Detalhes do recurso">
    {#snippet trigger(props: DrawerTriggerProps)}
      <Button {...props} variant="secondary" size="md">Abrir Painel</Button>
    {/snippet}

    <DrawerHeader>
      <div class="flex items-center gap-2">
        <Badge size="sm" variant="info" style="soft">ID: 001</Badge>
        <span class="text-sm font-black uppercase tracking-[0.16em]">Detalhes</span>
      </div>
      <DrawerClose />
    </DrawerHeader>

    <DrawerContent>
      <div class="grid gap-3 p-4 text-xs font-medium leading-relaxed text-jam-bg/70">
        <div class="flex justify-between border-b border-jam-bg/10 pb-2">
          <span>Regiao</span>
          <span class="font-bold text-jam-bg">us-east-1</span>
        </div>
        <div class="flex justify-between border-b border-jam-bg/10 pb-2">
          <span>Instancia</span>
          <span class="font-bold text-jam-bg">t3.medium</span>
        </div>
        <div class="flex justify-between border-b border-jam-bg/10 pb-2">
          <span>Uptime</span>
          <span class="font-bold text-jam-bg">99.97%</span>
        </div>
        <div class="flex justify-between">
          <span>Latencia</span>
          <span class="font-bold text-jam-bg">24ms</span>
        </div>
      </div>
    </DrawerContent>

    <DrawerFooter>
      <Button size="sm" variant="primary">Salvar</Button>
      <Button size="sm" variant="secondary">Cancelar</Button>
    </DrawerFooter>
  </Drawer>
</div>
