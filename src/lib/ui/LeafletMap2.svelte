<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount, afterUpdate } from "svelte";
  import type { Control, Map as LeafletMap2, Marker } from "leaflet";

  export let id = "map2";
  export let height = 80;
  export let location = { lat: 53.2734, lng: -7.7783203 };
  export let zoom = 8;
  export let minZoom = 3;
  export let activeLayer = "Terrain";
  export let fleamarkets: Fleamarket[] = [];
  export let selectedCategory: string = "";

  let imap2: LeafletMap2;
  let control: Control.Layers;
  let baseLayers: any;
  let markers: Marker[] = [];

  onMount(async () => {
    const leaflet = await import("leaflet");
    baseLayers = {
      Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      })
    };
    let defaultLayer = baseLayers[activeLayer];
    imap2 = leaflet.map(id, {
      center: [location.lat, location.lng],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer]
    });
    control = leaflet.control.layers(baseLayers).addTo(imap2);
  });


  afterUpdate(() => {
    /*
    markers.forEach(marker => marker.removeFrom(imap2));
    const filteredFleaMarkets = fleamarkets.filter(fleamarket => fleamarket.category === selectedCategory);
    filteredFleaMarkets.forEach(fleamarket => {
      const marker = L.marker([fleamarket.lat, fleamarket.lng]).addTo(imap2);
      markers.push(marker);
    });

    console.log("LEaflet2", selectedCategory);

    console.log("Selected Category:", selectedCategory);
    console.log("Flea Markets:", fleamarkets);
  console.log("Filtered Flea Markets:", filteredFleaMarkets);
 */

  });
</script>

<div id="{id}" class="box" style="height: {height}vh" />
