<script lang="ts">
  import { Collapsible, CollapsibleTrigger, CollapsiblePanel } from '../lib';
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; background: var(--color-jam-bg); padding: 2rem; display: grid; gap: 1.5rem;"
>
  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Default</p>
    <Collapsible open={false} variant="default">
      <CollapsibleTrigger>Configuracoes Avancadas</CollapsibleTrigger>
      <CollapsiblePanel>
        <p class="text-xs font-medium leading-relaxed text-jam-muted">
          Ajuste parametros de performance, cache e logging. Alteracoes aplicadas imediatamente.
        </p>
      </CollapsiblePanel>
    </Collapsible>
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Ghost</p>
    <Collapsible open={false} variant="ghost">
      <CollapsibleTrigger>Ver Logs</CollapsibleTrigger>
      <CollapsiblePanel>
        <p class="text-xs font-medium leading-relaxed text-jam-muted">
          [14:32:01] Conexao estabelecida com db-primary
          <br />
          [14:32:04] Cache invalidado — 127 chaves
          <br />
          [14:32:09] Health check OK
        </p>
      </CollapsiblePanel>
    </Collapsible>
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Bordered</p>
    <Collapsible open={true} variant="bordered">
      <CollapsibleTrigger>Documentacao</CollapsibleTrigger>
      <CollapsiblePanel>
        <p class="text-xs font-medium leading-relaxed text-jam-muted">
          API RESTful com autenticacao via Bearer token. Rate limit: 1000 req/min.
          Timeout padrao: 30s.
        </p>
      </CollapsiblePanel>
    </Collapsible>
  </div>
</div>
