<script lang="ts">
  import Button from '../lib/components/Button.svelte';
  import Dialog from '../lib/components/Dialog.svelte';
  import DialogClose from '../lib/components/DialogClose.svelte';
  import DialogContent from '../lib/components/DialogContent.svelte';
  import DialogDescription from '../lib/components/DialogDescription.svelte';
  import DialogFooter from '../lib/components/DialogFooter.svelte';
  import DialogHeader from '../lib/components/DialogHeader.svelte';
  import DialogPortal from '../lib/components/DialogPortal.svelte';
  import DialogTitle from '../lib/components/DialogTitle.svelte';
  import DialogTrigger from '../lib/components/DialogTrigger.svelte';
  import TextInput from '../lib/components/TextInput.svelte';
  import Textarea from '../lib/components/Textarea.svelte';

  let confirmationOpen = $state(false);
  let formOpen = $state(false);
  let destructiveOpen = $state(false);
  let fullscreenOpen = $state(false);
  let noOverlayCloseOpen = $state(false);
  let smallOpen = $state(false);
  let largeOpen = $state(false);
  let xlOpen = $state(false);

  let formName = $state('');
  let formEmail = $state('');
  let formMessage = $state('');

  const anatomyCode = `<Dialog bind:open>
  <DialogTrigger asChild>...</DialogTrigger>
  <DialogPortal>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Titulo</DialogTitle>
        <DialogDescription>Descricao</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>Fechar</DialogClose>
      </DialogFooter>
    </DialogContent>
  </DialogPortal>
</Dialog>`;
</script>

<div class="jamui-root min-h-screen bg-jam-bg p-8">
  <div class="mx-auto max-w-4xl space-y-8">
    <div class="grid gap-3 border border-jam-text/20 bg-jam-surface p-5 shadow-jam-hard-sm">
      <p class="text-[10px] font-black uppercase tracking-[0.22em] text-jam-soft">Documentacao</p>
      <h1 class="text-2xl font-black uppercase tracking-wider text-jam-text">Dialog</h1>
      <p class="max-w-3xl text-xs font-medium leading-relaxed text-jam-muted">
        Dialog cria uma camada modal para decisoes, formularios curtos e fluxos que precisam interromper a tela atual.
        A composicao explicita deixa claro onde fica o trigger, o portal, o painel, a semantica do titulo e as acoes.
      </p>
    </div>

    <div class="grid gap-4 border border-jam-text/20 bg-jam-input p-5">
      <h2 class="text-lg font-bold uppercase tracking-wide text-jam-text">Anatomia recomendada</h2>
      <pre class="overflow-x-auto border border-jam-text/20 bg-jam-bg p-4 text-[11px] font-bold leading-relaxed text-jam-muted"><code>{anatomyCode}</code></pre>
      <p class="text-xs font-medium leading-relaxed text-jam-muted">
        Para botoes customizados, passe <code class="text-jam-text">asChild</code> e renderize o snippet <code class="text-jam-text">child</code>.
        <code class="text-jam-text">DialogTitle</code> e <code class="text-jam-text">DialogDescription</code> alimentam os atributos ARIA do painel automaticamente.
      </p>
    </div>

    <div class="grid gap-4">
      <h2 class="text-lg font-bold uppercase tracking-wide text-jam-text">Tamanhos</h2>
      <div class="flex flex-wrap gap-3">
        <Dialog>
          <DialogTrigger asChild>
            {#snippet child({ props })}
              <Button {...props} variant="primary">Default (md)</Button>
            {/snippet}
          </DialogTrigger>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog padrao</DialogTitle>
                <DialogDescription>
                  Tamanho medio para confirmacoes e conteudo curto.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  {#snippet child({ props })}
                    <Button {...props} variant="secondary">Fechar</Button>
                  {/snippet}
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>

        <Dialog bind:open={smallOpen}>
          <DialogTrigger asChild>
            {#snippet child({ props })}
              <Button {...props} variant="secondary">Small</Button>
            {/snippet}
          </DialogTrigger>
          <DialogPortal>
            <DialogContent size="sm">
              <DialogHeader>
                <DialogTitle>Dialog pequeno</DialogTitle>
                <DialogDescription>
                  Use para mensagens objetivas com uma acao simples.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  {#snippet child({ props })}
                    <Button {...props} variant="primary">OK</Button>
                  {/snippet}
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>

        <Dialog bind:open={largeOpen}>
          <DialogTrigger asChild>
            {#snippet child({ props })}
              <Button {...props} variant="secondary">Large</Button>
            {/snippet}
          </DialogTrigger>
          <DialogPortal>
            <DialogContent size="lg">
              <DialogHeader>
                <DialogTitle>Dialog grande</DialogTitle>
                <DialogDescription>
                  Use quando o conteudo precisa de mais respiro ou multiplas linhas.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  {#snippet child({ props })}
                    <Button {...props} variant="primary">OK</Button>
                  {/snippet}
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>

        <Dialog bind:open={xlOpen}>
          <DialogTrigger asChild>
            {#snippet child({ props })}
              <Button {...props} variant="secondary">Extra Large</Button>
            {/snippet}
          </DialogTrigger>
          <DialogPortal>
            <DialogContent size="xl">
              <DialogHeader>
                <DialogTitle>Dialog extra grande</DialogTitle>
                <DialogDescription>
                  Use para fluxos mais densos sem ocupar a tela inteira.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  {#snippet child({ props })}
                    <Button {...props} variant="primary">OK</Button>
                  {/snippet}
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </div>

    <div class="grid gap-4">
      <h2 class="text-lg font-bold uppercase tracking-wide text-jam-text">Confirmacao</h2>
      <Dialog bind:open={confirmationOpen}>
        <DialogTrigger asChild>
          {#snippet child({ props })}
            <Button {...props} variant="primary">Abrir confirmacao</Button>
          {/snippet}
        </DialogTrigger>
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar acao</DialogTitle>
              <DialogDescription>
                Revise a operacao antes de continuar. Use acoes explicitas para confirmar ou cancelar.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                {#snippet child({ props })}
                  <Button {...props} variant="secondary">Cancelar</Button>
                {/snippet}
              </DialogClose>
              <DialogClose asChild>
                {#snippet child({ props })}
                  <Button {...props} variant="primary">Confirmar</Button>
                {/snippet}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>

    <div class="grid gap-4">
      <h2 class="text-lg font-bold uppercase tracking-wide text-jam-text">Formulario</h2>
      <Dialog bind:open={formOpen}>
        <DialogTrigger asChild>
          {#snippet child({ props })}
            <Button {...props} variant="primary">Abrir formulario</Button>
          {/snippet}
        </DialogTrigger>
        <DialogPortal>
          <DialogContent size="lg">
            <DialogHeader>
              <DialogTitle>Formulario de contato</DialogTitle>
              <DialogDescription>
                Use para formularios curtos. Para fluxos longos, prefira uma pagina dedicada ou dialog full.
              </DialogDescription>
            </DialogHeader>
            <form class="space-y-4" onsubmit={(e) => { e.preventDefault(); formOpen = false; }}>
              <TextInput label="Nome" bind:value={formName} placeholder="Markzuel" />
              <TextInput label="Email" type="email" bind:value={formEmail} placeholder="john@example.com" />
              <Textarea label="Mensagem" bind:value={formMessage} placeholder="Digite a mensagem..." rows={4} />
              <DialogFooter>
                <DialogClose asChild>
                  {#snippet child({ props })}
                    <Button {...props} variant="secondary" type="button">Cancelar</Button>
                  {/snippet}
                </DialogClose>
                <Button variant="primary" type="submit">Enviar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>

    <div class="grid gap-4">
      <h2 class="text-lg font-bold uppercase tracking-wide text-jam-text">Acao destrutiva</h2>
      <Dialog bind:open={destructiveOpen}>
        <DialogTrigger asChild>
          {#snippet child({ props })}
            <Button {...props} variant="danger">Excluir item</Button>
          {/snippet}
        </DialogTrigger>
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Excluir item</DialogTitle>
              <DialogDescription>
                Esta acao nao pode ser desfeita. Deixe a acao destrutiva explicita e mantenha cancelar como primeira opcao.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                {#snippet child({ props })}
                  <Button {...props} variant="secondary">Cancelar</Button>
                {/snippet}
              </DialogClose>
              <DialogClose asChild>
                {#snippet child({ props })}
                  <Button {...props} variant="danger">Excluir</Button>
                {/snippet}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>

    <div class="grid gap-4">
      <h2 class="text-lg font-bold uppercase tracking-wide text-jam-text">Tela cheia</h2>
      <Dialog bind:open={fullscreenOpen}>
        <DialogTrigger asChild>
          {#snippet child({ props })}
            <Button {...props} variant="primary">Abrir tela cheia</Button>
          {/snippet}
        </DialogTrigger>
        <DialogPortal>
          <DialogContent size="full" class="h-screen max-h-screen">
            <DialogHeader>
              <DialogTitle>Dialog em tela cheia</DialogTitle>
              <DialogDescription>
                Use para fluxos complexos que ainda precisam preservar o contexto da tela anterior.
              </DialogDescription>
            </DialogHeader>
            <div class="flex-1 overflow-auto py-4">
              <p class="text-sm text-jam-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                {#snippet child({ props })}
                  <Button {...props} variant="secondary">Fechar</Button>
                {/snippet}
              </DialogClose>
              <DialogClose asChild>
                {#snippet child({ props })}
                  <Button {...props} variant="primary">Salvar</Button>
                {/snippet}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>

    <div class="grid gap-4">
      <h2 class="text-lg font-bold uppercase tracking-wide text-jam-text">Sem fechar pelo overlay</h2>
      <Dialog bind:open={noOverlayCloseOpen}>
        <DialogTrigger asChild>
          {#snippet child({ props })}
            <Button {...props} variant="primary">Abrir bloqueante</Button>
          {/snippet}
        </DialogTrigger>
        <DialogPortal>
          <DialogContent closeOnOverlayClick={false}>
            <DialogHeader>
              <DialogTitle>Acao obrigatoria</DialogTitle>
              <DialogDescription>
                Este dialog nao fecha ao clicar no overlay. Use para decisoes que exigem resposta explicita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                {#snippet child({ props })}
                  <Button {...props} variant="secondary">Cancelar</Button>
                {/snippet}
              </DialogClose>
              <DialogClose asChild>
                {#snippet child({ props })}
                  <Button {...props} variant="primary">Confirmar</Button>
                {/snippet}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  </div>
</div>
