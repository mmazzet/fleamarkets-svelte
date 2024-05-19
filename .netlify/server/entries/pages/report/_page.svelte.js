import { c as create_ssr_component, d as each, e as escape } from "../../../chunks/ssr.js";
import { s as subTitle } from "../../../chunks/stores.js";
/* empty css                                                           */
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  subTitle.set("Fleamarkets to Date");
  let fleamarkets = [];
  return `<table class="table is-fullwidth"><thead data-svelte-h="svelte-4150z6"><th>Flea Market Name</th> <th>Category</th> <th>Country</th></thead> <tbody>${each(fleamarkets, (fleamarket) => {
    return `<tr><td>${escape(fleamarket.marketname)}</td> <td>${escape(fleamarket.category)}</td> <td>${typeof fleamarket.country !== "string" ? `${escape(fleamarket.country.countryname)}` : `${escape(fleamarket.country)}`}</td> </tr>`;
  })}</tbody></table>`;
});
export {
  Page as default
};
