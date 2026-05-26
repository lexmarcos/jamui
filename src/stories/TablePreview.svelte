<script lang="ts">
  import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableHeader,
    TableCell,
    TableCaption
  } from '../lib';
  import type { TableSize } from '../lib/components/table';

  type TablePreviewProps = {
    size?: TableSize;
    striped?: boolean;
  };

  let {
    size = 'md',
    striped = false
  }: TablePreviewProps = $props();

  const rows = [
    { id: '001', nome: 'Alpha', status: 'Ativo', cpu: '12%' },
    { id: '002', nome: 'Beta', status: 'Inativo', cpu: '0%' },
    { id: '003', nome: 'Gamma', status: 'Ativo', cpu: '45%' },
    { id: '004', nome: 'Delta', status: 'Ativo', cpu: '8%' },
    { id: '005', nome: 'Epsilon', status: 'Manutencao', cpu: '—' }
  ];
</script>

<div
  class="jamui-root"
  style="min-width: 32rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Table {size} {striped}>
    <TableCaption>Servidores — Status em tempo real</TableCaption>
    <TableHead>
      <TableRow>
        <TableHeader>ID</TableHeader>
        <TableHeader>Nome</TableHeader>
        <TableHeader>Status</TableHeader>
        <TableHeader>CPU</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {#each rows as row}
        <TableRow>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.nome}</TableCell>
          <TableCell>
            <span
              class="inline-flex items-center gap-1.5 align-middle text-[10px] font-black uppercase leading-none tracking-[0.12em]"
              class:text-jam-text={row.status === 'Ativo'}
              class:text-jam-muted={row.status === 'Inativo'}
              class:text-jam-soft={row.status === 'Manutencao'}
            >
              <span
                class="relative top-[-1px] block h-1.5 w-1.5 shrink-0"
                class:bg-jam-text={row.status === 'Ativo'}
                class:bg-jam-muted={row.status === 'Inativo'}
                class:bg-jam-soft={row.status === 'Manutencao'}
              ></span>
              {row.status}
            </span>
          </TableCell>
          <TableCell>{row.cpu}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</div>
