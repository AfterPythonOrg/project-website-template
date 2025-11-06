<script lang="ts">
  import type { PageProps } from './$types';
  import MarkdownRenderer from '$components/MarkdownRenderer.svelte';

  const { data: metadataJson }: PageProps = $props();

  // Extract repository URL safely
  const repositoryUrl: string | undefined = metadataJson.project_url?.find((url: string) =>
    url.startsWith('repository,')
  )?.split(', ')[1];

  // Page-specific title
  const pageTitle = metadataJson.name
    ? `${metadataJson.name} - Home`
    : 'Home';
</script>

<svelte:head>
  <title>{pageTitle}</title>
  {#if metadataJson.summary}
		<meta name="description" content={metadataJson.summary} />
	{/if}
</svelte:head>

{#if metadataJson.metadataError}
  <!-- Error state: metadata.json is missing -->
  <section class="flex mt-[12vh] flex-col gap-6 items-center justify-center min-h-[60vh] text-center px-4">
    <div class="w-full max-w-2xl px-6 py-8 bg-bg200 rounded-2xl shadow-lg border-2 border-pm500">
      <h1 class="text-4xl font-bold text-pm500 mb-4">500</h1>
      <p class="text-xl text-tx100 mb-2 text-left">
        {metadataJson.metadataError}
      </p>
    </div>
  </section>
{:else}
  <!-- Normal state: metadata loaded successfully -->
  <section class="flex mt-[12vh] flex-col gap-6 items-center justify-center min-h-[60vh] text-center px-4">
    <h1 class="text-6xl md:text-7xl font-bold tracking-tight text-tx50">
      {metadataJson.name}
    </h1>
    <p class="text-xl md:text-2xl text-tx300 max-w-2xl">
      {metadataJson.summary}
    </p>

    <div class="flex gap-4 flex-wrap justify-center">
      {#if repositoryUrl}
        <button class="px-6 py-3 border-2 border-tx300 text-tx50 rounded-lg font-medium hover:bg-bg200 transition-colors">
          <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </button>
      {/if}
      <button class="px-6 py-3 bg-pm500 text-white rounded-lg font-medium hover:bg-pm600 transition-colors">
        Go to Playground
      </button>
    </div>

    {#if metadataJson.description}
      <div class="w-full max-w-4xl px-6 py-8 bg-bg100 rounded-2xl shadow-lg border border-bg300 text-left">
        <MarkdownRenderer content={metadataJson.description} />
      </div>
    {/if}
  </section>
{/if}
