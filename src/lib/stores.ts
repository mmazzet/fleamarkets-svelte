import { writable } from "svelte/store";
import type { Fleamarket, Session } from "$lib/types/fleamarket-types";

export const currentSession = writable<Session>();
export const subTitle = writable<string>();
export const latestFleamarket = writable<Fleamarket>();
