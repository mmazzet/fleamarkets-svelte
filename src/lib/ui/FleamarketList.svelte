<script lang="ts">
  import type { Fleamarket } from "$lib/types/fleamarket-types";

  export let fleamarkets: Fleamarket[];
</script>

<table class="table is-fullwidth">
  <thead>
    <th> Flea Market Name</th>
    <th>Category</th>
    <th>Country</th>
    <th>Donor</th>
  </thead>
  <tbody>
    {#each fleamarkets as fleamarket}
      <tr>
        <td>
          {fleamarket.marketname}
        </td>
        <td>
          {fleamarket.category}
        </td>
        <td>
          {#if fleamarket.country}
          {fleamarket.country.countryname}
        {/if}
        </td>
        <td>
          {#if typeof fleamarket.donor !== "string"}
            {fleamarket.donor.lastName}, {fleamarket.donor.firstName}
          {:else}
            {fleamarket.donor}
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
