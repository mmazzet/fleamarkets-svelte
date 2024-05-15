<script lang="ts">
  import { fleamarketService } from "$lib/services/fleamarket-service";
  import type { Country, Fleamarket } from "$lib/types/fleamarket-types";
  import { currentSession, latestFleamarket } from "$lib/stores";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import { get } from "svelte/store";

  export let countryList: Country[] = [];

  let marketname = "";
  let lat = 52.160858;
  let lng = -7.15242;
  let selectedCountry = "";
  let categories = ["paypal", "direct"];
  let selectedCategory = "";
  let message = "Please Add Market";

  async function addmarket() {
    if (selectedCountry && marketname && selectedCategory) {
      const country = countryList.find((country) => country._id === selectedCountry);
      if (country) {
        const fleamarket: Fleamarket = {
          marketname: marketname,
          category: selectedCategory,
          country: selectedCountry,
          lat: lat,
          lng: lng,
          donor: $currentSession._id
        };
        const success = await fleamarketService.addmarket(fleamarket, get(currentSession));
        if (!success) {
          message = "Fleamarket not completed - some error occurred";
          return;
        }
        fleamarket.country = country;
        fleamarket.donor = $currentSession.name;
        latestFleamarket.set(fleamarket);
        message = `Thanks! You added ${marketname} to ${country.firstName} ${country.lastName}`;
      }
    } else {
      message = "Please select market name, category and country";
    }
  }
</script>

<form on:submit|preventDefault={addmarket}>
  <div class="field">
    <label class="label" for="marketname">Enter  Flea Market Name:</label>
    <input bind:value={marketname} class="input" id="marketname" name="marketname" type="text" />
  </div>
  <div class="field">
    <div class="control">
      <label class="label" for="marketname">Select Category:</label>
      {#each categories as category}
        <input bind:group={selectedCategory} class="radio" type="radio" value={category} /> {category}
      {/each}
    </div>
  </div>
  <div class="field">
    <label class="label" for="marketname">Select Country:</label>
    <div class="select">
      <select bind:value={selectedCountry}>
        {#each countryList as country}
          <option value={country._id}>{country.lastName},{country.firstName}</option>
        {/each}
      </select>
    </div>
  </div>
  <Coordinates bind:lat bind:lng />
  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth">Add Market</button>
    </div>
  </div>
</form>
<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>
