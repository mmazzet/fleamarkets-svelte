<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMap2, Marker } from "leaflet";

  export let id = "map2";
  export let height = 80;
  export let location = { lat: 53.2734, lng: -7.7783203 };
  export let zoom = 8;
  export let minZoom = 3;
  export let activeLayer = "Terrain";
  import L from "leaflet";
  import type { Fleamarket } from "$lib/types/fleamarket-types";

  let imap: LeafletMap2;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};
  let baseLayers: any;

  let categoryLayers: Record<string, L.LayerGroup> = {};

  onMount(async () => {
    const leaflet = await import("leaflet");

    baseLayers = {
      Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
      Satellite: leaflet.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      })
    };

    let defaultLayer = baseLayers[activeLayer];

    imap = leaflet.map(id, {
      center: [location.lat, location.lng],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer]
    });

    control = leaflet.control.layers(baseLayers, overlays).addTo(imap);
  });

  export function addMarker2(fleamarket: Fleamarket) {
  const { lat, lng, marketname } = fleamarket;
  const marker = L.marker([lat, lng]);

  const category = getCategoryForMarker(fleamarket);
  if (!categoryLayers[category]) {
    categoryLayers[category] = L.layerGroup().addTo(imap);
    control.addOverlay(categoryLayers[category], category); 
  }
  marker.addTo(categoryLayers[category]);

  const popup = L.popup({ autoClose: false, closeOnClick: false });
  popup.setContent(marketname);
  marker.bindPopup(popup);
}
  export function moveTo(lat: number, lng: number) {
    imap.flyTo({ lat: lat, lng: lng });
  }

  function getCategoryForMarker(fleamarket: Fleamarket): string {
  return fleamarket.category;
}
</script>

<div {id} class="box" style="height: {height}vh" />
