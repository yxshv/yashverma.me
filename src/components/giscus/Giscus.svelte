
<script>
  // @ts-nocheck
  
  import { onMount } from "svelte";
  export let id = undefined;
  export let host = "https://giscus.app";
  export let repo;
  export let repoId;
  export let category = undefined;
  export let categoryId = undefined;
  export let mapping = "pathname";
  export let term = undefined;
  export let strict = "0";
  export let reactionsEnabled = "1";
  export let emitMetadata = "0";
  export let inputPosition = "bottom";
  export let theme = "light";
  export let lang = "en";
  export let loading = "eager";
  let mounted = false;
  onMount(() => {
    mounted = true;
    import("giscus");
  });
</script>

{#if mounted}
  <giscus-widget
    {id}
    {host}
    {repo}
    repoid={repoId}
    {category}
    categoryid={categoryId}
    {mapping}
    {term}
    {strict}
    reactionsenabled={reactionsEnabled}
    emitmetadata={emitMetadata}
    inputposition={inputPosition}
    {theme}
    {lang}
    {loading}
  />
{/if}
