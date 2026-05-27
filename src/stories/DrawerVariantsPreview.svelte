<script lang="ts">
  import { Drawer, DrawerHeader, DrawerContent, DrawerFooter, DrawerClose, Button } from '../lib';
  import type { DrawerTriggerProps } from '../lib/components/drawer';
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; min-height: 28rem; background: var(--color-jam-bg); padding: 2rem; display: grid; gap: 1rem; align-content: start;"
>
  <Drawer position="left" aria-label="Left Panel">
    {#snippet trigger(props: DrawerTriggerProps)}
      <Button {...props} variant="secondary" size="sm">Left</Button>
    {/snippet}
    <DrawerHeader>
      <span class="text-sm font-black uppercase tracking-[0.16em]">Left Panel</span>
      <DrawerClose />
    </DrawerHeader>
    <DrawerContent>
      <p class="p-4 text-xs font-medium leading-relaxed text-jam-bg/70">
        Painel deslizando da esquerda. Overlay escurecido ao fundo. Clique fora ou pressione Escape para fechar.
      </p>
    </DrawerContent>
    <DrawerFooter>
      <Button size="sm" variant="primary">Confirmar</Button>
    </DrawerFooter>
  </Drawer>

  <Drawer position="right" aria-label="Right Panel">
    {#snippet trigger(props: DrawerTriggerProps)}
      <Button {...props} variant="secondary" size="sm">Right</Button>
    {/snippet}
    <DrawerHeader>
      <span class="text-sm font-black uppercase tracking-[0.16em]">Right Panel</span>
      <DrawerClose />
    </DrawerHeader>
    <DrawerContent>
      <p class="p-4 text-xs font-medium leading-relaxed text-jam-bg/70">
        Painel deslizando da direita. Composicao com Header, Content e Footer independentes.
      </p>
    </DrawerContent>
    <DrawerFooter>
      <Button size="sm" variant="primary">Confirmar</Button>
    </DrawerFooter>
  </Drawer>

  <Drawer position="top" aria-label="Top Panel">
    {#snippet trigger(props: DrawerTriggerProps)}
      <Button {...props} variant="secondary" size="sm">Top</Button>
    {/snippet}
    <DrawerHeader>
      <span class="text-sm font-black uppercase tracking-[0.16em]">Top Panel</span>
      <DrawerClose />
    </DrawerHeader>
    <DrawerContent>
      <p class="p-4 text-xs font-medium leading-relaxed text-jam-bg/70">
        Painel deslizando do topo. Util para notificacoes ou barras de progresso.
      </p>
    </DrawerContent>
    <DrawerFooter>
      <Button size="sm" variant="primary">Confirmar</Button>
    </DrawerFooter>
  </Drawer>

  <Drawer position="bottom" aria-label="Bottom Panel">
    {#snippet trigger(props: DrawerTriggerProps)}
      <Button {...props} variant="secondary" size="sm">Bottom</Button>
    {/snippet}
    <DrawerHeader>
      <span class="text-sm font-black uppercase tracking-[0.16em]">Bottom Panel</span>
      <DrawerClose />
    </DrawerHeader>
    <DrawerContent>
      <p class="p-4 text-xs font-medium leading-relaxed text-jam-bg/70">
        Painel deslizando da base. Comum em mobile para acoes e menus contextuais.
      </p>
    </DrawerContent>
    <DrawerFooter>
      <Button size="sm" variant="primary">Confirmar</Button>
    </DrawerFooter>
  </Drawer>
</div>
