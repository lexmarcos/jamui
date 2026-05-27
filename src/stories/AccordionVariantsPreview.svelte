<script lang="ts">
  import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../lib';
  import { Plus, Minus, ChevronRight } from '@lucide/svelte';
</script>

<div class="jamui-root min-h-screen bg-jam-bg p-8">
  <div class="mx-auto max-w-4xl space-y-12">
    <div>
      <h2 class="mb-4 text-lg font-black uppercase tracking-wider text-jam-text">Basic (Single)</h2>
      <Accordion type="single" collapsible={true}>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is JamUI?</AccordionTrigger>
          <AccordionContent>
            JamUI is a design system with a sharp, mono, high-contrast utility interface.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. All components follow WAI-ARIA guidelines and support keyboard navigation.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I customize it?</AccordionTrigger>
          <AccordionContent>
            Absolutely. All components accept class props and support theming through CSS variables.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <div>
      <h2 class="mb-4 text-lg font-black uppercase tracking-wider text-jam-text">Multiple Open</h2>
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Feature One</AccordionTrigger>
          <AccordionContent>
            This is the first feature description with detailed information.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Feature Two</AccordionTrigger>
          <AccordionContent>
            This is the second feature description with more details.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Feature Three</AccordionTrigger>
          <AccordionContent>
            This is the third feature description with additional context.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <div>
      <h2 class="mb-4 text-lg font-black uppercase tracking-wider text-jam-text">Disabled Item</h2>
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Active Item</AccordionTrigger>
          <AccordionContent>
            This item can be opened and closed normally.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" disabled={true}>
          <AccordionTrigger>Disabled Item</AccordionTrigger>
          <AccordionContent>
            This content cannot be accessed because the item is disabled.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Another Active Item</AccordionTrigger>
          <AccordionContent>
            This item works normally as well.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <div>
      <h2 class="mb-4 text-lg font-black uppercase tracking-wider text-jam-text">Custom Icon</h2>
      <Accordion type="single" collapsible={true}>
        {#snippet icon(isOpen: boolean)}
          {#if isOpen}
            <Minus size={16} />
          {:else}
            <Plus size={16} />
          {/if}
        {/snippet}
        <AccordionItem value="item-1">
          <AccordionTrigger>Custom Plus/Minus Icon</AccordionTrigger>
          <AccordionContent>
            This accordion uses plus/minus icons instead of chevrons.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Another Item</AccordionTrigger>
          <AccordionContent>
            The icon changes based on the open/closed state.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <div>
      <h2 class="mb-4 text-lg font-black uppercase tracking-wider text-jam-text">Variants</h2>
      <div class="space-y-6">
        <div>
          <h3 class="mb-2 text-sm font-bold uppercase tracking-wide text-jam-muted">Default</h3>
          <Accordion type="single" variant="default">
            <AccordionItem value="item-1">
              <AccordionTrigger>Default Variant</AccordionTrigger>
              <AccordionContent>Simple border-bottom style.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Second Item</AccordionTrigger>
              <AccordionContent>More content here.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-bold uppercase tracking-wide text-jam-muted">Bordered</h3>
          <Accordion type="single" variant="bordered">
            <AccordionItem value="item-1">
              <AccordionTrigger>Bordered Variant</AccordionTrigger>
              <AccordionContent>Each item has a border.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Second Item</AccordionTrigger>
              <AccordionContent>More content here.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-bold uppercase tracking-wide text-jam-muted">Separated</h3>
          <Accordion type="single" variant="separated">
            <AccordionItem value="item-1">
              <AccordionTrigger>Separated Variant</AccordionTrigger>
              <AccordionContent>Items have spacing between them.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Second Item</AccordionTrigger>
              <AccordionContent>More content here.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-bold uppercase tracking-wide text-jam-muted">Filled</h3>
          <Accordion type="single" variant="filled">
            <AccordionItem value="item-1">
              <AccordionTrigger>Filled Variant</AccordionTrigger>
              <AccordionContent>Items have a background color.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Second Item</AccordionTrigger>
              <AccordionContent>More content here.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-bold uppercase tracking-wide text-jam-muted">Ghost</h3>
          <Accordion type="single" variant="ghost">
            <AccordionItem value="item-1">
              <AccordionTrigger>Ghost Variant</AccordionTrigger>
              <AccordionContent>No borders or backgrounds.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Second Item</AccordionTrigger>
              <AccordionContent>More content here.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>

    <div>
      <h2 class="mb-4 text-lg font-black uppercase tracking-wider text-jam-text">Sizes</h2>
      <div class="space-y-6">
        <div>
          <h3 class="mb-2 text-sm font-bold uppercase tracking-wide text-jam-muted">Small</h3>
          <Accordion type="single" size="sm">
            <AccordionItem value="item-1">
              <AccordionTrigger>Small Size</AccordionTrigger>
              <AccordionContent>Compact padding and text size.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-bold uppercase tracking-wide text-jam-muted">Medium</h3>
          <Accordion type="single" size="md">
            <AccordionItem value="item-1">
              <AccordionTrigger>Medium Size</AccordionTrigger>
              <AccordionContent>Default padding and text size.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-bold uppercase tracking-wide text-jam-muted">Large</h3>
          <Accordion type="single" size="lg">
            <AccordionItem value="item-1">
              <AccordionTrigger>Large Size</AccordionTrigger>
              <AccordionContent>Generous padding and larger text.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</div>
