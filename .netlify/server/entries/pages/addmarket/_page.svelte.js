import { c as create_ssr_component, b as add_attribute, d as each, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { s as subTitle, l as latestFleamarket } from "../../../chunks/stores.js";
import { C as Card } from "../../../chunks/Card.js";
/* empty css                                                           */
const Coordinates = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { lat = 0 } = $$props;
  let { lng = 0 } = $$props;
  if ($$props.lat === void 0 && $$bindings.lat && lat !== void 0)
    $$bindings.lat(lat);
  if ($$props.lng === void 0 && $$bindings.lng && lng !== void 0)
    $$bindings.lng(lng);
  return `<div class="box field is-horizontal"><div class="field-label is-normal" data-svelte-h="svelte-1go6eec"><label for="lng" class="label">Lat</label></div> <div class="field-body"><div class="field"><p class="control is-expanded"><input id="lng" class="input" type="float"${add_attribute("value", lat, 0)}></p></div> <div class="field-label is-normal" data-svelte-h="svelte-x7m2jk"><label for="lat" class="label">Lng</label></div> <div class="field"><p class="control is-expanded"><input id="lat" class="input" type="float"${add_attribute("value", lng, 0)}></p></div></div></div>`;
});
const AddmarketForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { countryList = [] } = $$props;
  let marketname = "";
  let lat = "";
  let lng = "";
  let categories = ["Antiques", "Vintage Clothes", "Bric-a-Brac", "Other"];
  let selectedCategory = "";
  let message = "Please Add Market";
  if ($$props.countryList === void 0 && $$bindings.countryList && countryList !== void 0)
    $$bindings.countryList(countryList);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<form><div class="field"><label class="label" for="marketname" data-svelte-h="svelte-j3a7nr">Enter  Flea Market Name:</label> <input class="input" id="marketname" name="marketname" type="text"${add_attribute("value", marketname, 0)}></div> <div class="field"><div class="control"><label class="label" for="marketname" data-svelte-h="svelte-13q35fs">Select Category:</label> ${each(categories, (category) => {
      return `<input class="radio" type="radio"${add_attribute("value", category, 0)}${category === selectedCategory ? add_attribute("checked", true, 1) : ""}> ${escape(category)}`;
    })}</div></div> <div class="field"><label class="label" for="marketname" data-svelte-h="svelte-tuvnfq">Select Country:</label> <div class="select"><select>${each(countryList, (country) => {
      return `<option${add_attribute("value", country._id, 0)}>${escape(country.countryname)}</option>`;
    })}</select></div></div> ${validate_component(Coordinates, "Coordinates").$$render(
      $$result,
      { lat, lng },
      {
        lat: ($$value) => {
          lat = $$value;
          $$settled = false;
        },
        lng: ($$value) => {
          lng = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="field" data-svelte-h="svelte-17dnuj9"><div class="control"><button class="button is-success is-fullwidth">Add Market</button></div></div></form> <div class="box mt-4"><div class="content has-text-centered">${``} ${escape(message)}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
const css$1 = {
  code: ".button-container.svelte-1x97txd.svelte-1x97txd{margin-top:20px;display:flex;justify-content:space-between;align-items:center}.image-container.svelte-1x97txd.svelte-1x97txd{margin-top:20px}.image-container.svelte-1x97txd img.svelte-1x97txd{max-width:100%;height:auto}",
  map: null
};
const UploadWidget = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="button-container svelte-1x97txd"><button class="button is-primary" data-svelte-h="svelte-2b041z">Upload Image</button> <button class="button is-danger" data-svelte-h="svelte-di4oh5">Delete Image</button></div> ${`<div class="image-container svelte-1x97txd" data-svelte-h="svelte-btkwab"><h4>No Image Uploaded Yet</h4></div>`}`;
});
const css = {
  code: ".card.svelte-1wq5e4o{margin-bottom:1.5rem}",
  map: null
};
const FleamarketList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { fleamarkets } = $$props;
  if ($$props.fleamarkets === void 0 && $$bindings.fleamarkets && fleamarkets !== void 0)
    $$bindings.fleamarkets(fleamarkets);
  $$result.css.add(css);
  return `<div class="columns is-multiline">${each(fleamarkets, (fleamarket) => {
    return `<div class="column is-one-third"><div class="card svelte-1wq5e4o"><header class="card-header"><p class="card-header-title">${escape(fleamarket.marketname)} </p></header> <div class="card-content"><div class="content"><strong data-svelte-h="svelte-vdh0ps">Category:</strong> ${escape(fleamarket.category)}</div> <div class="content"><strong data-svelte-h="svelte-1ukrej0">Country:</strong> ${typeof fleamarket.country !== "string" ? `${escape(fleamarket.country.countryname)}` : `${escape(fleamarket.country)}`}</div> <div class="content">${validate_component(UploadWidget, "UploadWidget").$$render($$result, {}, {}, {})}</div> </div></div> </div>`;
  })} </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let countryList = [];
  let fleamarkets = [];
  subTitle.set("Add a Flea Market");
  latestFleamarket.subscribe(async (fleamarket) => {
    console.log("Latest Fleamarket:", fleamarket);
    if (fleamarket) {
      fleamarkets.push(fleamarket);
      fleamarkets = [...fleamarkets];
      console.log("Updated Fleamarkets:", fleamarkets);
    }
  });
  return `<div class="columns"><div class="column">${validate_component(Card, "Card").$$render($$result, { title: "Please Add a Flea Market" }, {}, {
    default: () => {
      return `${validate_component(AddmarketForm, "AddmarketForm").$$render($$result, { countryList }, {}, {})}`;
    }
  })}</div></div> <div class="columns"><div class="column">${validate_component(Card, "Card").$$render($$result, { title: "Your List of Flea Markets" }, {}, {
    default: () => {
      return `${validate_component(FleamarketList, "FleamarketList").$$render($$result, { fleamarkets }, {}, {})}`;
    }
  })}</div></div>`;
});
export {
  Page as default
};
