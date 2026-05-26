<script lang="ts">
  import { Card, CardHeader, CardBody, CardFooter, Button } from '../lib';
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; background: var(--color-jam-bg); padding: 2rem; display: grid; gap: 1.5rem;"
>
  <div>
    <p class="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Default</p>
    <Card variant="default" class="max-w-sm">
      <CardHeader>
        <p class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Servidor 001</p>
      </CardHeader>
      <CardBody>
        <h3 class="mb-2 text-sm font-black uppercase tracking-[0.16em] text-jam-text">Alpha Node</h3>
        <p class="text-xs font-medium leading-relaxed text-jam-muted">
          Instancia ativa em regiao us-east-1. Latencia media 24ms.
        </p>
      </CardBody>
      <CardFooter>
        <div class="flex items-center justify-between gap-2">
          <span class="text-[10px] font-black uppercase tracking-[0.12em] text-jam-soft">CPU 12%</span>
          <Button size="sm" variant="secondary">Detalhes</Button>
        </div>
      </CardFooter>
    </Card>
  </div>

  <div>
    <p class="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Filled</p>
    <Card variant="filled" class="max-w-sm">
      <CardHeader>
        <p class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-bg/60">Servidor 002</p>
      </CardHeader>
      <CardBody>
        <h3 class="mb-2 text-sm font-black uppercase tracking-[0.16em] text-jam-bg">Beta Node</h3>
        <p class="text-xs font-medium leading-relaxed text-jam-bg/70">
          Instancia em standby. Pronta para failover automatico.
        </p>
      </CardBody>
      <CardFooter>
        <div class="flex items-center justify-between gap-2">
          <span class="text-[10px] font-black uppercase tracking-[0.12em] text-jam-bg/60">CPU 0%</span>
          <Button size="sm" variant="primary">Detalhes</Button>
        </div>
      </CardFooter>
    </Card>
  </div>

  <div>
    <p class="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Bordered</p>
    <Card variant="bordered" class="max-w-sm">
      <CardHeader>
        <p class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Servidor 003</p>
      </CardHeader>
      <CardBody>
        <h3 class="mb-2 text-sm font-black uppercase tracking-[0.16em] text-jam-text">Gamma Node</h3>
        <p class="text-xs font-medium leading-relaxed text-jam-muted">
          Instancia em manutencao. Agendado para reinicio 02:00 UTC.
        </p>
      </CardBody>
      <CardFooter>
        <div class="flex items-center justify-between gap-2">
          <span class="text-[10px] font-black uppercase tracking-[0.12em] text-jam-soft">CPU —</span>
          <Button size="sm" variant="secondary">Detalhes</Button>
        </div>
      </CardFooter>
    </Card>
  </div>

  <div>
    <p class="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Elevated</p>
    <Card variant="elevated" class="max-w-sm">
      <CardHeader>
        <p class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Servidor 004</p>
      </CardHeader>
      <CardBody>
        <h3 class="mb-2 text-sm font-black uppercase tracking-[0.16em] text-jam-text">Delta Node</h3>
        <p class="text-xs font-medium leading-relaxed text-jam-muted">
          Instancia com carga alta. Escalando recursos automaticamente.
        </p>
      </CardBody>
      <CardFooter>
        <div class="flex items-center justify-between gap-2">
          <span class="text-[10px] font-black uppercase tracking-[0.12em] text-jam-soft">CPU 89%</span>
          <Button size="sm" variant="secondary">Detalhes</Button>
        </div>
      </CardFooter>
    </Card>
  </div>
</div>
