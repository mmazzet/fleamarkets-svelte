<script lang="ts">
  import { currentSession, subTitle } from "$lib/stores";
  import { fleamarketService } from "$lib/services/fleamarket-service";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import LeafletMap2 from "$lib/ui/LeafletMap2.svelte";
  import { onMount } from "svelte";
  import type { Fleamarket } from "$lib/types/fleamarket-types";
  import { get } from "svelte/store";

  subTitle.set("Flea Markets Geo Data");

  let map1: LeafletMap;
  let map2: LeafletMap2;
  let categories: string[] = ["Antiques", "Vintage Clothes", "Bric-a-Brac", "Other"];
  let selectedCategory: string = categories[0];

  onMount(async () => {
    const fleamarkets = await fleamarketService.getFleamarkets(get(currentSession));
    fleamarkets.forEach((fleamarket: Fleamarket) => {
      const popup = `${fleamarket.marketname}`;
      map1.addMarker(fleamarket.lat, fleamarket.lng, popup);
      map2.addMarker2(fleamarket);
    });
    const lastFleamarket = fleamarkets[fleamarkets.length - 1];
    if (lastFleamarket) map1.moveTo(lastFleamarket.lat, lastFleamarket.lng);
  });

  function selectCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    selectedCategory = target.value;
    console.log("from page", selectedCategory);
  }
</script>

<Card title="Flea Markets Locations">
  <LeafletMap height={60} id="map1" bind:this={map1} />
</Card>

<Card title="Flea Markets by Category">
  <LeafletMap2 height={60} id="map2" bind:this={map2} />
</Card>

<select on:change={selectCategory}>
  {#each categories as category}
    <option value={category}>{category}</option>
  {/each}
</select>
