<script lang="ts">
  import { currentSession, latestFleamarket, subTitle } from "$lib/stores";
  import AddmarketForm from "./AddmarketForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { fleamarketService } from "$lib/services/fleamarket-service";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { Country, Fleamarket } from "$lib/types/fleamarket-types";
  import FleamarketList from "$lib/ui/FleamarketList.svelte";

  let countryList: Country[] = [];
  let fleamarkets: Fleamarket[] = [];
  subTitle.set("Add a Flea Market");

  onMount(async () => {
    countryList = await fleamarketService.getCountries(get(currentSession));
    fleamarkets = await fleamarketService.getFleamarkets(get(currentSession));
  });

  latestFleamarket.subscribe(async (fleamarket) => {
    if (fleamarket) {
      fleamarkets.push(fleamarket);
      fleamarkets = [...fleamarkets];
    }
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Your List of Flea Markets">
      <FleamarketList {fleamarkets} />
    </Card>
  </div>
</div>

<div class="columns">
  <div class="column">
    <Card title="Please Add a Flea Market">
      <AddmarketForm {countryList} />
    </Card>
  </div>
</div>
