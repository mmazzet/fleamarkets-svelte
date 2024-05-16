<script lang="ts">
  import { fleamarketService } from "$lib/services/fleamarket-service";
  import type { Country, Fleamarket } from "$lib/types/fleamarket-types";
  import { currentSession, latestFleamarket } from "$lib/stores";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import { get } from "svelte/store";
  import sanitizeHtml from "sanitize-html";

  export let countryList: Country[] = [];

  let marketname = "";
  let lat = 52.160858;
  let lng = -7.15242;
  let selectedCountry = "";
  let categories = ["Antiques", "Vintage Clothes", "Bric-a-Brac", "Other"];
  let selectedCategory = "";
  let message = "Please Add Market";
  let errorMessage = "";

  async function addmarket() {
    if (!isValidInput(marketname)) {
      errorMessage = "Invalid characters in market name";
      return;
    }
    if (marketname.length > 40) { 
        errorMessage = "Market name is too long, max 40 chars allowed";
        return;
    }
    if (!isValidNumber(parseFloat(lat), -90, 90) || !isValidNumber(parseFloat(lng), -180, 180)) {
        errorMessage = "Latitude must be between -90 and 90, and longitude must be between -180 and 180";
        return;
}
    if (selectedCountry && marketname && selectedCategory) {
      const country = countryList.find((country) => country._id === selectedCountry);
      
      if (country) {
        const sanitizedMarketname = sanitizeHtml(marketname);
        const fleamarket: Fleamarket = {
          marketname: sanitizedMarketname,
          category: selectedCategory,
          country: selectedCountry,
          lat: parseFloat(lat as string), 
          lng: parseFloat(lng as string), 
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
        message = `Thanks! You added ${sanitizedMarketname} to ${country.countryname}`;
      }
    } else {
      message = "Please select market name, category and country";
    }
  }

  function isValidInput(input: string): boolean {
    const regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(input);
  }

  function isValidNumber(input: number, min: number, max: number): boolean {
  return !isNaN(input) && isFinite(input) &&
         input >= min && input <= max;
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
          <option value={country._id}>{country.countryname}</option>
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
    {#if errorMessage}
      <p class="has-text-danger">{errorMessage}</p>
    {/if}
    {message}
  </div>
</div>

