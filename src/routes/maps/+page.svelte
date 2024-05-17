<script lang="ts">
  import { currentSession, subTitle } from "$lib/stores";
  import { fleamarketService } from "$lib/services/fleamarket-service";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import type { Fleamarket } from "$lib/types/fleamarket-types";
  import { get } from "svelte/store";

  subTitle.set("Flea Markets Geo Data");
  let map: LeafletMap;

  onMount(async () => {
    const fleamarkets = await fleamarketService.getFleamarkets(get(currentSession));
    fleamarkets.forEach((fleamarket: Fleamarket) => {
      const popup = `${fleamarket.marketname}`;
      map.addMarker(fleamarket.lat, fleamarket.lng, popup);
    });
    const lastFleamarket = fleamarkets[fleamarkets.length - 1];
    if (lastFleamarket) map.moveTo(lastFleamarket.lat, lastFleamarket.lng);
  });

</script>

<Card title="Flea Markets Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>