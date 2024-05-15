<script lang="ts">
  import { fleamarketService } from "$lib/services/fleamarket-service";
  import type { Fleamarket } from "$lib/types/fleamarket-types";
  import { currentSession, subTitle } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import FleamarketList from "$lib/ui/FleamarketList.svelte";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  subTitle.set("Fleamarkets to Date");
  let fleamarkets: Fleamarket[] = [];
  onMount(async () => {
    fleamarkets = await fleamarketService.getFleamarkets(get(currentSession));
  });
</script>

<Card title="Fleamarkets">
  <FleamarketList {fleamarkets} />
</Card>
