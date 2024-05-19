import { c as create_ssr_component, b as add_attribute, e as escape, v as validate_component, d as each } from "../../../chunks/ssr.js";
import { s as subTitle } from "../../../chunks/stores.js";
import { C as Card } from "../../../chunks/Card.js";
import L from "leaflet";
const LeafletMap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = "home-map-id" } = $$props;
  let { height = 80 } = $$props;
  let { location = { lat: 53.2734, lng: -7.7783203 } } = $$props;
  let { zoom = 8 } = $$props;
  let { minZoom = 7 } = $$props;
  let { activeLayer = "Terrain" } = $$props;
  let imap;
  function addMarker(lat, lng, popupText) {
    const marker = L.marker([lat, lng]).addTo(imap);
    const popup = L.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(popupText);
    marker.bindPopup(popup);
  }
  function moveTo(lat, lng) {
    imap.flyTo({ lat, lng });
  }
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.location === void 0 && $$bindings.location && location !== void 0)
    $$bindings.location(location);
  if ($$props.zoom === void 0 && $$bindings.zoom && zoom !== void 0)
    $$bindings.zoom(zoom);
  if ($$props.minZoom === void 0 && $$bindings.minZoom && minZoom !== void 0)
    $$bindings.minZoom(minZoom);
  if ($$props.activeLayer === void 0 && $$bindings.activeLayer && activeLayer !== void 0)
    $$bindings.activeLayer(activeLayer);
  if ($$props.addMarker === void 0 && $$bindings.addMarker && addMarker !== void 0)
    $$bindings.addMarker(addMarker);
  if ($$props.moveTo === void 0 && $$bindings.moveTo && moveTo !== void 0)
    $$bindings.moveTo(moveTo);
  return `<div${add_attribute("id", id, 0)} class="box" style="${"height: " + escape(height, true) + "vh"}"></div>`;
});
function getCategoryForMarker(fleamarket) {
  return fleamarket.category;
}
const LeafletMap2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = "map2" } = $$props;
  let { height = 80 } = $$props;
  let { location = { lat: 53.2734, lng: -7.7783203 } } = $$props;
  let { zoom = 8 } = $$props;
  let { minZoom = 3 } = $$props;
  let { activeLayer = "Terrain" } = $$props;
  let imap;
  let control;
  let categoryLayers = {};
  function addMarker2(fleamarket) {
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
  function moveTo(lat, lng) {
    imap.flyTo({ lat, lng });
  }
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.location === void 0 && $$bindings.location && location !== void 0)
    $$bindings.location(location);
  if ($$props.zoom === void 0 && $$bindings.zoom && zoom !== void 0)
    $$bindings.zoom(zoom);
  if ($$props.minZoom === void 0 && $$bindings.minZoom && minZoom !== void 0)
    $$bindings.minZoom(minZoom);
  if ($$props.activeLayer === void 0 && $$bindings.activeLayer && activeLayer !== void 0)
    $$bindings.activeLayer(activeLayer);
  if ($$props.addMarker2 === void 0 && $$bindings.addMarker2 && addMarker2 !== void 0)
    $$bindings.addMarker2(addMarker2);
  if ($$props.moveTo === void 0 && $$bindings.moveTo && moveTo !== void 0)
    $$bindings.moveTo(moveTo);
  return `<div${add_attribute("id", id, 0)} class="box" style="${"height: " + escape(height, true) + "vh"}"></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  subTitle.set("Flea Markets Geo Data");
  let map1;
  let map2;
  let categories = ["Antiques", "Vintage Clothes", "Bric-a-Brac", "Other"];
  categories[0];
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Card, "Card").$$render($$result, { title: "Flea Markets Locations" }, {}, {
      default: () => {
        return `${validate_component(LeafletMap, "LeafletMap").$$render(
          $$result,
          { height: 60, id: "map1", this: map1 },
          {
            this: ($$value) => {
              map1 = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, { title: "Flea Markets by Category" }, {}, {
      default: () => {
        return `${validate_component(LeafletMap2, "LeafletMap2").$$render(
          $$result,
          { height: 60, id: "map2", this: map2 },
          {
            this: ($$value) => {
              map2 = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })} <select>${each(categories, (category) => {
      return `<option${add_attribute("value", category, 0)}>${escape(category)}</option>`;
    })}</select>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
