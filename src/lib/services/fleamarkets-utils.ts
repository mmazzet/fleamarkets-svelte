import type { Country, DataSet, Fleamarket } from "$lib/types/fleamarket-types";

export function generateByCategory(fleamarketList: Fleamarket[]): DataSet {
  const fleamarketsByCategory: DataSet = { 
    labels: ["Antiques", "Vintage Clothes", "Bric-a-brac", "Other"], 
    datasets: [
      {
        values: [0, 0, 0, 0] 
      }
    ]
  };
  fleamarketList.forEach((fleamarket) => {
    if (fleamarket.category == "Antiques") {
      fleamarketsByCategory.datasets[0].values[0] += 1;
    } else if (fleamarket.category == "Vintage Clothes") {
      fleamarketsByCategory.datasets[0].values[1] += 1;
    } else if (fleamarket.category == "Bric-a-Brac") {
      fleamarketsByCategory.datasets[0].values[2] += 1;
    } else if (fleamarket.category == "Other"){
      fleamarketsByCategory.datasets[0].values[3] += 1;
    }
  });

  return fleamarketsByCategory;
}

export function generateByCountry(fleamarketList: Fleamarket[], countries: Country[]): DataSet {
  const fleamarketsByCountry: DataSet = {
    labels: [],
    datasets: [
      {
        values: []
      }
    ]
  };

  fleamarketsByCountry.labels = countries.map(country => country.countryname);
  fleamarketsByCountry.datasets[0].values = new Array(countries.length).fill(0);

  countries.forEach((country, i) => {
    fleamarketList.forEach((fleamarket) => {
      if (typeof fleamarket.country === "string" && fleamarket.country === country.countryname) {
        fleamarketsByCountry.datasets[0].values[i] += 1;
      } else if (typeof fleamarket.country === "object" && fleamarket.country._id === country._id) {
        fleamarketsByCountry.datasets[0].values[i] += 1;
      }
    });
  });

  return fleamarketsByCountry;
}