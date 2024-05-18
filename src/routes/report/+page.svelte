<script lang="ts">
  import { fleamarketService } from "$lib/services/fleamarket-service";
  import type { Fleamarket } from "$lib/types/fleamarket-types";
  import { currentSession, subTitle } from "$lib/stores";
  import FleamarketList from "$lib/ui/FleamarketList.svelte";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  subTitle.set("Fleamarkets to Date");
  let fleamarkets: Fleamarket[] = [];
  onMount(async () => {
    fleamarkets = await fleamarketService.getFleamarkets(get(currentSession));
  });
</script>

<table class="table is-fullwidth">
  <thead>
    <th>Flea Market Name</th>
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
            {#if typeof fleamarket.country !== "string"}
              {fleamarket.country.countryname}
            {:else}
              {fleamarket.country} 
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
