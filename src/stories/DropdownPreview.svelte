<script lang="ts">
  import { Button, Dropdown, DropdownItem, DropdownSeparator } from '../lib';
  import type { DropdownTriggerProps } from '../lib/components/dropdown';
  import { ChevronDown } from '@lucide/svelte';

  type DropdownPreviewProps = {
    align?: 'start' | 'end';
  };

  let { align = 'start' }: DropdownPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 20rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Dropdown {align}>
    {#snippet trigger(props: DropdownTriggerProps)}
      <Button {...props} variant="secondary" size="md">
        Acoes
        <ChevronDown size={14} class="ml-1" />
      </Button>
    {/snippet}

    <DropdownItem onclick={() => console.log('editar')}>Editar</DropdownItem>
    <DropdownItem onclick={() => console.log('duplicar')}>Duplicar</DropdownItem>
    <DropdownItem onclick={() => console.log('mover')}>Mover</DropdownItem>
    <DropdownSeparator />
    <DropdownItem disabled onclick={() => console.log('deletar')}>Deletar</DropdownItem>
    <DropdownSeparator />
    <DropdownItem onclick={() => console.log('sair')}>Sair</DropdownItem>
  </Dropdown>
</div>
