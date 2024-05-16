<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { onMount } from "svelte";
  import { fleamarketService } from "$lib/services/fleamarket-service";
  import { currentSession, subTitle } from "$lib/stores";
  import { get } from "svelte/store";
  import Card from "$lib/ui/Card.svelte";
  import type { DataSet } from "$lib/types/fleamarket-types";
  import { generateByCategory, generateByCountry } from "$lib/services/fleamarkets-utils";

  let fleamarketsByCategory: DataSet;
  let fleamarketsByCountry: DataSet;

  subTitle.set("App Data");

  onMount(async () => {
    const fleamarketList = await fleamarketService.getFleamarkets(get(currentSession));
    const countries = await fleamarketService.getCountries(get(currentSession));

    fleamarketsByCategory = generateByCategory(fleamarketList);
    fleamarketsByCountry = generateByCountry(fleamarketList, countries);
  });

</script>

<div class="columns">
  <div class="column">
    <Card title="Fleamarkets by Category">
      <Chart data={fleamarketsByCategory} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Fleamarkets by Country">
      <Chart data={fleamarketsByCountry} type="pie" />
    </Card>
  </div>
</div>