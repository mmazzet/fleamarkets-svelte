<script lang="ts">
  import type { Fleamarket } from "$lib/types/fleamarket-types";
  import UploadWidget from "$lib/ui/UploadWidget.svelte"

  export let fleamarkets: Fleamarket[];
</script>

<div class="columns is-multiline">
  {#each fleamarkets as fleamarket}
    <div class="column is-one-third">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {fleamarket.marketname}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <strong>Category:</strong> {fleamarket.category}
          </div>
          <div class="content">
            <strong>Country:</strong> 
            {#if typeof fleamarket.country !== "string"}
              {fleamarket.country.countryname}
            {:else}
              {fleamarket.country} 
            {/if}
          </div>
          <div class="content">
            <UploadWidget />
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .card {
    margin-bottom: 1.5rem;
  }
</style>